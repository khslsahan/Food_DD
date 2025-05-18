import google.generativeai as genai
import logging
import re
import json
from config import GOOGLE_API_KEY

genai.configure(api_key=GOOGLE_API_KEY)

class GeminiRecipeExtractor:
    def __init__(self, model_name='models/gemini-1.5-pro-latest'):
        self.model = genai.GenerativeModel(model_name)

    @staticmethod
    def extract_json_from_response(text):
        cleaned = re.sub(r"^```(?:json)?\s*|```$", "", text.strip(), flags=re.MULTILINE | re.IGNORECASE)
        cleaned = re.sub(r"//.*", "", cleaned)
        # Accept both arrays and objects as valid JSON
        try:
            return json.loads(cleaned)
        except Exception:
            # Fallback: try to extract the first JSON object or array
            match = re.search(r"(\[.*\]|\{.*\})", cleaned, flags=re.DOTALL)
            if match:
                return json.loads(match.group(1))
            raise

    def extract_recipe(self, prompt):
        try:
            response = self.model.generate_content(prompt)
            result = self.extract_json_from_response(response.text)
            return result
        except Exception as e:
            logging.error(f"Gemini extraction error: {e}\nRaw response: {getattr(response, 'text', None)}")
            return None

    def build_prompt(self, recipe_text):
        return f"""Extract the following information from this recipe in JSON format:\n1. If the recipe contains tables, treat each table or section header as a component.\n2. For each table, extract:\n   - The component name (from the table header or title)\n   - Each row as an ingredient, with:\n     - name (from the first column)\n     - quantity and unit (from the second column)\n     - calories (from the third column, if present)\n     - If a cell contains both raw and cooked weights, include both as 'raw_quantity' and 'cooked_quantity'\n3. Return a JSON with:\n   - name: Recipe name\n   - components: list of components, each with:\n     - name: component name\n     - ingredients: list of ingredients (name, quantity, unit, calories, raw_quantity, cooked_quantity as available)\n\nHere is the recipe text:\n{recipe_text}\n\nReturn the data in this exact JSON format:\n{{\n  \"name\": \"Recipe Name\",\n  \"components\": [\n    {{\n      \"name\": \"Component Name\",\n      \"ingredients\": [\n        {{\n          \"name\": \"Ingredient Name\",\n          \"quantity\": \"200\",\n          \"unit\": \"g\",\n          \"calories\": 300,\n          \"raw_quantity\": \"250g\",\n          \"cooked_quantity\": \"640g\"\n        }}\n      ]\n    }}\n  ]\n}}\n""" 