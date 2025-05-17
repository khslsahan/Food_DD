import os
import json
from docx import Document
import google.generativeai as genai
from typing import Dict, List
import sys
import re

# Configure Gemini API
GOOGLE_API_KEY = 'AIzaSyCOuC_JgtbGUpKCRGcQgD5pbnw8AKo4jLc'
if not GOOGLE_API_KEY:
    print("Error: GOOGLE_API_KEY not set")
    sys.exit(1)

genai.configure(api_key=GOOGLE_API_KEY)

def list_available_models():
    print("\nAvailable Gemini models:")
    for m in genai.list_models():
        print(f"- {m.name}")
    print("\nUpdate your script to use one of the above model names if needed.")

# List models and exit (for debugging)
# if __name__ == "__main__":
#     # sys.exit(0)

# Try to use the correct model name
try:
    model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
except Exception as e:
    print(f"Error loading model: {e}")
    print("Available models:")
    for m in genai.list_models():
        print(m.name)
    sys.exit(1)

def extract_text_from_docx(docx_path: str) -> str:
    """Extract text from a Word document."""
    try:
        doc = Document(docx_path)
        return "\n".join(p.text for p in doc.paragraphs if p.text.strip())
    except Exception as e:
        print(f"Error reading document: {e}")
        sys.exit(1)

def extract_json_from_response(text):
    # Remove markdown and 'json' label
    cleaned = re.sub(r"^```(?:json)?\s*|```$", "", text.strip(), flags=re.MULTILINE | re.IGNORECASE)
    # Remove inline comments (// ...)
    cleaned = re.sub(r"//.*", "", cleaned)
    # Extract the first JSON object only
    match = re.search(r"\{.*\}", cleaned, flags=re.DOTALL)
    if match:
        return match.group(0)
    return cleaned.strip()

def extract_recipe_with_gemini(text: str) -> Dict:
    """Use Gemini to extract structured recipe data."""
    prompt = f"""Extract the following information from this recipe in JSON format:
1. Recipe name
2. Serving size (in format "XP" where X is the number)
3. Notes (if any)
4. Components (each component should have a name and list of ingredients)
5. Each ingredient should have:
   - name
   - quantity
   - unit
   - quantity in grams (convert all units to grams)

Here's the recipe text:
{text}

Return the data in this exact JSON format:
{{
    "name": "Recipe Name",
    "serving_size": "XP",
    "notes": ["Note 1", "Note 2"],
    "components": [
        {{
            "name": "Component Name",
            "ingredients": [
                {{
                    "name": "Ingredient Name",
                    "quantity": "1",
                    "unit": "cup",
                    "quantity_g": 240
                }}
            ]
        }}
    ]
}}

Important:
- Convert all measurements to grams
- If no serving size is specified, use "1P"
- If no components are specified, create a "Main Dish" component
- Ensure all quantities are numeric values
- Use standard units (g, ml, etc.)"""

    try:
        response = model.generate_content(prompt)
        cleaned = extract_json_from_response(response.text)
        recipe_data = json.loads(cleaned)
        return recipe_data
    except Exception as e:
        print(f"Error extracting recipe with Gemini: {e}")
        print("Raw response:", response.text if 'response' in locals() else "No response")
        return None

def generate_sql_inserts(recipe: Dict, meal_id: int) -> List[str]:
    """Generate SQL insert statements for the recipe."""
    sql_statements = []
    
    # Insert meal
    meal_name = recipe['name'].replace("'", "''")
    description = '; '.join(recipe['notes']).replace("'", "''") if recipe['notes'] else ''
    serving_size = recipe['serving_size']
    
    sql_statements.append(f"""
    INSERT INTO meals (meal_id, meal_name, description, serving_size)
    VALUES ({meal_id}, '{meal_name}', '{description}', '{serving_size}');
    """)
    
    # Insert components and their ingredients
    for component in recipe['components']:
        component_name = component['name'].replace("'", "''")
        base_quantity = sum(ing['quantity_g'] if isinstance(ing['quantity_g'], (int, float)) and ing['quantity_g'] is not None else 0 for ing in component['ingredients'])
        
        # Insert component
        sql_statements.append(f"""
        INSERT INTO components (meal_id, component_name, base_quantity_g)
        VALUES ({meal_id}, '{component_name}', {base_quantity})
        RETURNING component_id;
        """)
        
        # For each ingredient in the component
        for ingredient in component['ingredients']:
            ingredient_name = ingredient['name'].replace("'", "''")
            quantity_g = ingredient['quantity_g'] if isinstance(ingredient['quantity_g'], (int, float)) and ingredient['quantity_g'] is not None else 0
            
            # Insert ingredient if it doesn't exist
            sql_statements.append(f"""
            INSERT INTO ingredients (ingredient_name, default_unit, calories_per_100g, fat_g, protein_g, carbohydrates_g)
            VALUES ('{ingredient_name}', 'g', 0, 0, 0, 0)
            ON CONFLICT (ingredient_name) DO NOTHING;
            """)
            
            # Insert recipe_ingredient
            sql_statements.append(f"""
            INSERT INTO recipe_ingredients (component_id, ingredient_id, raw_quantity_g)
            SELECT 
                (SELECT component_id FROM components WHERE meal_id = {meal_id} AND component_name = '{component_name}'),
                (SELECT ingredient_id FROM ingredients WHERE ingredient_name = '{ingredient_name}'),
                {quantity_g};
            """)
    
    # Insert portion options
    serving_num = int(serving_size.replace('P', ''))
    sql_statements.append(f"""
    INSERT INTO portion_options (meal_id, size_name, multiplier)
    VALUES ({meal_id}, '{serving_size}', {serving_num});
    """)
    
    return sql_statements

def process_recipe_file(docx_path: str, meal_id: int) -> List[str]:
    """Process a recipe file and generate SQL statements."""
    text = extract_text_from_docx(docx_path)
    recipe = extract_recipe_with_gemini(text)
    
    if not recipe:
        print(f"Failed to extract recipe from {docx_path}")
        return []
    
    return generate_sql_inserts(recipe, meal_id)

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 extract_recipe_gemini.py <recipe_directory>")
        sys.exit(1)
    
    recipe_dir = sys.argv[1]
    output_file = "recipe_inserts.sql"
    
    # Get all .docx files in the directory
    recipe_files = [f for f in os.listdir(recipe_dir) if f.endswith('.docx')]
    
    all_sql_statements = []
    meal_id = 1
    
    for recipe_file in recipe_files:
        print(f"\nProcessing {recipe_file}...")
        docx_path = os.path.join(recipe_dir, recipe_file)
        sql_statements = process_recipe_file(docx_path, meal_id)
        all_sql_statements.extend(sql_statements)
        meal_id += 1
    
    # Write all SQL statements to file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- Generated SQL statements for recipe import\n")
        f.write("BEGIN;\n\n")
        for statement in all_sql_statements:
            f.write(statement + "\n")
        f.write("\nCOMMIT;\n")
    
    print(f"\nSQL statements written to {output_file}")

# Only run extraction if this is the main script
if __name__ == "__main__":
    main() 