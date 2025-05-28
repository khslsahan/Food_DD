# Nutrition Calculation Equations

## 1. Total Macros for a Component Batch

For each component (e.g., "Basmati Rice with Corn", "Stroganoff Sauce", etc.), calculate the total macros for the whole cooked batch:

- **Total Calories:**
  ```
  total_calories = sum(ingredient_raw_weight / 100 * ingredient_calories_per_100g)
  ```
- **Total Fat:**
  ```
  total_fat = sum(ingredient_raw_weight / 100 * ingredient_fat_per_100g)
  ```
- **Total Protein:**
  ```
  total_protein = sum(ingredient_raw_weight / 100 * ingredient_protein_per_100g)
  ```
- **Total Carbs:**
  ```
  total_carbs = sum(ingredient_raw_weight / 100 * ingredient_carbs_per_100g)
  ```

## 2. Per-Gram Macro Value for the Cooked Batch

After cooking, you know the total cooked weight (e.g., 2977g for rice). Calculate the per-gram value for each macro:

- **Calories per gram:**
  ```
  calories_per_g = total_calories / total_cooked_weight
  ```
- **Fat per gram:**
  ```
  fat_per_g = total_fat / total_cooked_weight
  ```
- **Protein per gram:**
  ```
  protein_per_g = total_protein / total_cooked_weight
  ```
- **Carbs per gram:**
  ```
  carbs_per_g = total_carbs / total_cooked_weight
  ```

## 3. Macros for a Portion (e.g., 2P, 3P, etc.)

For a given portion, you know the portion cooked weight (e.g., 100g for 2P rice):

- **Portion Calories:**
  ```
  portion_calories = portion_weight * calories_per_g
  ```
- **Portion Fat:**
  ```
  portion_fat = portion_weight * fat_per_g
  ```
- **Portion Protein:**
  ```
  portion_protein = portion_weight * protein_per_g
  ```
- **Portion Carbs:**
  ```
  portion_carbs = portion_weight * carbs_per_g
  ```

## 4. Total Meal Macros

Sum the macros for all components in the meal for the selected portion:

```
meal_calories = sum(component portion_calories)
meal_fat = sum(component portion_fat)
meal_protein = sum(component portion_protein)
meal_carbs = sum(component portion_carbs)
```

---

**This is the exact logic implemented in the code and matches the spreadsheet calculations.** 