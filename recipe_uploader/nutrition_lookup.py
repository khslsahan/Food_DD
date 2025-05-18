import requests
import logging
from config import EDAMAM_APP_ID, EDAMAM_APP_KEY

def get_nutrition(ingredient_str):
    url = 'https://api.edamam.com/api/nutrition-data'
    params = {
        'app_id': EDAMAM_APP_ID,
        'app_key': EDAMAM_APP_KEY,
        'nutrition-type': 'cooking',
        'ingr': ingredient_str
    }
    try:
        resp = requests.get(url, params=params)
        data = resp.json()
        nutrients = data.get('totalNutrients', {})
        fat = nutrients.get('FAT', {}).get('quantity', 0)
        carbs = nutrients.get('CHOCDF', {}).get('quantity', 0)
        protein = nutrients.get('PROCNT', {}).get('quantity', 0)
        kcal = nutrients.get('ENERC_KCAL', {}).get('quantity', 0)
        # Get weight in grams
        weight = 0
        try:
            weight = data['ingredients'][0]['parsed'][0]['weight']
        except Exception:
            pass
        calories_per_100g = (kcal / weight * 100) if weight else 0
        return fat, carbs, protein, calories_per_100g
    except Exception as e:
        logging.error(f"Edamam API error for '{ingredient_str}': {e}")
        return 0, 0, 0, 0 