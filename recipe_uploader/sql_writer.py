import logging
# from nutrition_lookup import get_nutrition  # Edamam call removed

def get_ingredient_name(ingredient):
    for key in ['name', 'item_name', 'ingredient_name']:
        if key in ingredient:
            return ingredient[key]
    return None

def is_summary_row(ingredient):
    summary_keys = {'total', 'total_weight', 'total_quantity', 'total_calories', 'calories_per_unit', 'portion_description', 'calorie_density'}
    return any(k in ingredient for k in summary_keys)

def parse_quantity(val):
    # Try to extract a numeric value from a string or return as is if already numeric
    if isinstance(val, (int, float)):
        return val
    if isinstance(val, str):
        import re
        match = re.search(r"[\d.]+", val)
        if match:
            return float(match.group(0))
    return 0

def generate_sql_inserts(recipe):
    sql_statements = []
    meal_name = recipe['name'].replace("'", "''")
    description = '; '.join(recipe.get('notes', []))
    serving_size = recipe.get('serving_size', '1P') if 'serving_size' in recipe else '1P'
    sql_statements.append(f"""
    INSERT INTO meals (meal_name, description, serving_size)
    VALUES ('{meal_name}', '{description}', '{serving_size}')
    RETURNING meal_id;
    """)
    for component in recipe.get('components', []):
        component_name = component['name'].replace("'", "''")
        # Use base_quantity from Gemini if present, else sum ingredient quantities
        base_quantity = 0
        if 'base_quantity' in component:
            base_quantity = parse_quantity(component['base_quantity'])
        else:
            for ingredient in component.get('ingredients', []):
                if is_summary_row(ingredient):
                    continue
                q = ingredient.get('quantity') or ingredient.get('raw_quantity')
                base_quantity += parse_quantity(q)
        for ingredient in component.get('ingredients', []):
            if is_summary_row(ingredient):
                logging.info(f"Skipping summary/total row in component '{component_name}': {ingredient}")
                continue
            ingredient_name = get_ingredient_name(ingredient)
            if not ingredient_name:
                logging.warning(f"Skipping ingredient with no name in component '{component_name}': {ingredient}")
                continue
            ingredient_name_sql = ingredient_name.replace("'", "''")
            # Use raw_quantity, cooked_quantity, or quantity for quantity_g
            quantity_g = 0
            if 'raw_quantity' in ingredient:
                quantity_g = parse_quantity(ingredient['raw_quantity'])
            elif 'quantity' in ingredient:
                quantity_g = parse_quantity(ingredient['quantity'])
            # Use calories if present (for future use)
            calories = ingredient.get('calories', 0)
            # Nutrition values set to 0 (Edamam call removed)
            fat = 0
            carbs = 0
            protein = 0
            calories_per_100g = 0
            sql_statements.append(f"""
            INSERT INTO ingredients (ingredient_name, default_unit, calories_per_100g, fat_g, protein_g, carbohydrates_g)
            VALUES ('{ingredient_name_sql}', 'g', {calories_per_100g}, {fat}, {protein}, {carbs})
            ON CONFLICT (ingredient_name) DO NOTHING;
            """)
            sql_statements.append(f"""
            INSERT INTO recipe_ingredients (component_id, ingredient_id, raw_quantity_g)
            SELECT 
                (SELECT component_id FROM components WHERE meal_id = (SELECT meal_id FROM meals WHERE meal_name = '{meal_name}') AND component_name = '{component_name}'),
                (SELECT ingredient_id FROM ingredients WHERE ingredient_name = '{ingredient_name_sql}'),
                {quantity_g};
            """)
        sql_statements.append(f"""
        INSERT INTO components (meal_id, component_name, base_quantity_g)
        VALUES ((SELECT meal_id FROM meals WHERE meal_name = '{meal_name}'), '{component_name}', {base_quantity})
        RETURNING component_id;
        """)
    sql_statements.append(f"""
    INSERT INTO portion_options (meal_id, size_name, multiplier)
    VALUES ((SELECT meal_id FROM meals WHERE meal_name = '{meal_name}'), '{serving_size}', 1);
    """)
    return sql_statements 