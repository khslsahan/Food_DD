# Meal and Component Categories

This document describes the new category features added to the Recipe Generator API.

## Overview

The system now supports categorization for both meals and components, allowing for better organization and filtering of nutritional data.

## Meal Categories

The following meal categories are supported using boolean fields in the database:

- **Balanced Meal**: Nutritionally balanced meals with good proportions of macronutrients (`is_balanced = true`)
- **Gourmet Meal**: High-quality, premium dishes with sophisticated flavors (`is_gourmet = true`)
- **Weight Loss Meal**: Meals suitable for weight loss with controlled calories (`is_weight_loss = true`)

## Component Categories

Components can be categorized using the `component_category` table. Each component can have a category assigned via the `category_id` field.

### Get Components by Category
```
GET /api/components/category/{componentCategory}
```
Returns all components in the specified category.

### Get Available Component Categories
```
GET /api/categories/components
```
Returns a list of all available component category names.

### Get All Component Categories
```
GET /api/component-categories
```
Returns all component categories with their IDs and names.

## API Endpoints

### Get Meals by Category
```
GET /api/meals/category/{mealCategory}
```
Returns all meals in the specified category. Valid categories: "Balanced Meal", "Gourmet Meal", "Weight Loss Meal"

### Get Components by Category
```
GET /api/components/category/{componentCategory}
```
Returns all components in the specified category.

### Get Nutrition by Meal Category
```
GET /api/nutrition/category/{mealCategory}
```
Returns nutrition information for all meals in the specified category.

### Get Available Meal Categories
```
GET /api/categories/meals
```
Returns a list of all available meal categories.

### Get Available Component Categories
```
GET /api/categories/components
```
Returns a list of all available component category names.

### Get All Component Categories
```
GET /api/component-categories
```
Returns all component categories with their IDs and names.

### Get All Categorized Meals
```
GET /api/meals/categorized
```
Returns all meals that have any category assigned.

## Response Format

The nutrition response now includes boolean category fields for meals and component categories:

```json
{
  "food_item": "Shrimp Noodles",
  "is_balanced": true,
  "is_gourmet": false,
  "is_weight_loss": false,
  "calories": 522,
  "serving_size": "2P",
  "fat_g": 15,
  "carbohydrates_g": 68,
  "protein_g": 23,
  "ingredients": [...],
  "components": [
    {
      "component_name": "Shrimp Marination",
      "component_category": "Seasoning",
      "calories": 64,
      "fat_g": 0,
      "protein_g": 11,
      "carbohydrates_g": 1
    },
    {
      "component_name": "SAUCE",
      "component_category": "Sauce",
      "calories": 42,
      "fat_g": 1,
      "protein_g": 0,
      "carbohydrates_g": 6
    },
    {
      "component_name": "Noodles",
      "component_category": "Carbohydrate",
      "calories": 416,
      "fat_g": 14,
      "protein_g": 12,
      "carbohydrates_g": 61
    }
  ]
}
```

Component category response format:
```json
[
  {
    "id": 1,
    "name": "Protein"
  },
  {
    "id": 2,
    "name": "Sauce"
  },
  {
    "id": 3,
    "name": "Carbohydrate"
  }
]
```

## Database Schema

The meals table structure:

```sql
CREATE TABLE meals (
  meal_id         INT PRIMARY KEY AUTO_INCREMENT,
  meal_name       VARCHAR(100) UNIQUE,
  description     TEXT,
  is_balanced     BOOLEAN DEFAULT FALSE,
  is_gourmet      BOOLEAN DEFAULT FALSE,
  is_weight_loss  BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

## Usage Examples

### Get all balanced meals:
```bash
curl -X GET "http://localhost:8080/api/meals/category/Balanced%20Meal"
```

### Get nutrition for all gourmet meals:
```bash
curl -X GET "http://localhost:8080/api/nutrition/category/Gourmet%20Meal"
```

### Get available meal categories:
```bash
curl -X GET "http://localhost:8080/api/categories/meals"
```

### Get all categorized meals:
```bash
curl -X GET "http://localhost:8080/api/meals/categorized"
```

### Get all component categories:
```bash
curl -X GET "http://localhost:8080/api/component-categories"
```

### Get components by category:
```bash
curl -X GET "http://localhost:8080/api/components/category/Protein"
```

### Get available component categories:
```bash
curl -X GET "http://localhost:8080/api/categories/components"
```