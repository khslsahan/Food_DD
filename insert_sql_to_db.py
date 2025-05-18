import psycopg2

# Database connection parameters (from your docker-compose-dev.yml)
DB_HOST = "localhost"
DB_PORT = 5433
DB_NAME = "food_nutrition_db"
DB_USER = "food_nutrition_user"
DB_PASS = "food_nutrition_pass"


def run_sql_file(sql_file_path):
    with open(sql_file_path, "r", encoding="utf-8") as f:
        sql = f.read()
    
    # Split into statements and categorize them
    statements = [s.strip() for s in sql.split(';') if s.strip() and not s.strip().startswith('--')]
    
    # Categorize statements
    meals_inserts = []
    ingredients_inserts = []
    components_inserts = []
    recipe_ingredients_inserts = []
    portion_options_inserts = []
    
    for stmt in statements:
        if "INSERT INTO meals" in stmt:
            meals_inserts.append(stmt)
        elif "INSERT INTO ingredients" in stmt:
            ingredients_inserts.append(stmt)
        elif "INSERT INTO components" in stmt:
            components_inserts.append(stmt)
        elif "INSERT INTO recipe_ingredients" in stmt:
            recipe_ingredients_inserts.append(stmt)
        elif "INSERT INTO portion_options" in stmt:
            portion_options_inserts.append(stmt)

    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )
    
    try:
        with conn:
            with conn.cursor() as cur:
                # Execute statements in correct order
                for stmt in meals_inserts:
                    try:
                        cur.execute(stmt)
                    except Exception as e:
                        print(f"Error executing meals insert:\n{stmt}\n{e}\n")
                        raise
                
                for stmt in ingredients_inserts:
                    try:
                        cur.execute(stmt)
                    except Exception as e:
                        print(f"Error executing ingredients insert:\n{stmt}\n{e}\n")
                        raise
                
                for stmt in components_inserts:
                    try:
                        cur.execute(stmt)
                    except Exception as e:
                        print(f"Error executing components insert:\n{stmt}\n{e}\n")
                        raise
                
                for stmt in recipe_ingredients_inserts:
                    try:
                        cur.execute(stmt)
                    except Exception as e:
                        print(f"Error executing recipe_ingredients insert:\n{stmt}\n{e}\n")
                        raise
                
                for stmt in portion_options_inserts:
                    try:
                        cur.execute(stmt)
                    except Exception as e:
                        print(f"Error executing portion_options insert:\n{stmt}\n{e}\n")
                        raise
                
        print("All statements executed successfully.")
    except Exception as e:
        print(f"Transaction failed: {e}")
        raise
    finally:
        conn.close()

if __name__ == "__main__":
    run_sql_file("recipe_inserts.sql") 