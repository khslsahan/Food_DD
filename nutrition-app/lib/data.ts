import type { Meal, Component, PortionOption, Ingredient, RecipeIngredient } from "./types"

// Mock data - in a real app, this would be fetched from a database
const meals: Meal[] = [
  {
    meal_id: 1,
    meal_name: "Chicken Salad",
    description: "A healthy chicken salad with mixed greens",
    serving_size: "300g",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    meal_id: 2,
    meal_name: "Vegetable Stir Fry",
    description: "Quick and easy vegetable stir fry",
    serving_size: "250g",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

let components: Component[] = [
  {
    component_id: 1,
    meal_id: 1,
    component_name: "Grilled Chicken",
    base_quantity_g: 150,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    component_id: 2,
    meal_id: 1,
    component_name: "Mixed Greens",
    base_quantity_g: 100,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    component_id: 3,
    meal_id: 2,
    component_name: "Mixed Vegetables",
    base_quantity_g: 200,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

let portionOptions: PortionOption[] = [
  {
    portion_id: 1,
    meal_id: 1,
    size_name: "Small",
    multiplier: 0.75,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    portion_id: 2,
    meal_id: 1,
    size_name: "Regular",
    multiplier: 1.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    portion_id: 3,
    meal_id: 1,
    size_name: "Large",
    multiplier: 1.5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const ingredients: Ingredient[] = [
  {
    ingredient_id: 1,
    ingredient_name: "Chicken Breast",
    default_unit: "g",
    calories_per_100g: 165,
    fat_g: 3.6,
    protein_g: 31,
    carbohydrates_g: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    ingredient_id: 2,
    ingredient_name: "Lettuce",
    default_unit: "g",
    calories_per_100g: 15,
    fat_g: 0.2,
    protein_g: 1.4,
    carbohydrates_g: 2.9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    ingredient_id: 3,
    ingredient_name: "Carrot",
    default_unit: "g",
    calories_per_100g: 41,
    fat_g: 0.2,
    protein_g: 0.9,
    carbohydrates_g: 9.6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

let recipeIngredients: RecipeIngredient[] = [
  {
    component_id: 1,
    ingredient_id: 1,
    raw_quantity_g: 150,
    cooked_quantity_g: 120,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    component_id: 2,
    ingredient_id: 2,
    raw_quantity_g: 80,
    cooked_quantity_g: 80,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    component_id: 2,
    ingredient_id: 3,
    raw_quantity_g: 50,
    cooked_quantity_g: 45,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// CRUD operations for Meals
export async function getMeals() {
  return [...meals]
}

export async function getMealById(id: number) {
  return meals.find((meal) => meal.meal_id === id)
}

export async function createMeal(meal: Omit<Meal, "meal_id" | "created_at" | "updated_at">) {
  const newMeal: Meal = {
    meal_id: meals.length > 0 ? Math.max(...meals.map((m) => m.meal_id)) + 1 : 1,
    ...meal,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  meals.push(newMeal)
  return newMeal
}

export async function updateMeal(id: number, meal: Partial<Omit<Meal, "meal_id" | "created_at" | "updated_at">>) {
  const index = meals.findIndex((m) => m.meal_id === id)

  if (index === -1) {
    return null
  }

  meals[index] = {
    ...meals[index],
    ...meal,
    updated_at: new Date().toISOString(),
  }

  return meals[index]
}

export async function deleteMeal(id: number) {
  const index = meals.findIndex((m) => m.meal_id === id)

  if (index === -1) {
    return false
  }

  meals.splice(index, 1)

  // Also delete related components and portion options
  components = components.filter((c) => c.meal_id !== id)
  portionOptions = portionOptions.filter((p) => p.meal_id !== id)

  return true
}

// CRUD operations for Components
export async function getComponents(mealId?: number) {
  if (mealId) {
    return components.filter((c) => c.meal_id === mealId)
  }
  return [...components]
}

export async function getComponentById(id: number) {
  return components.find((c) => c.component_id === id)
}

export async function createComponent(component: Omit<Component, "component_id" | "created_at" | "updated_at">) {
  const newComponent: Component = {
    component_id: components.length > 0 ? Math.max(...components.map((c) => c.component_id)) + 1 : 1,
    ...component,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  components.push(newComponent)
  return newComponent
}

export async function updateComponent(
  id: number,
  component: Partial<Omit<Component, "component_id" | "created_at" | "updated_at">>,
) {
  const index = components.findIndex((c) => c.component_id === id)

  if (index === -1) {
    return null
  }

  components[index] = {
    ...components[index],
    ...component,
    updated_at: new Date().toISOString(),
  }

  return components[index]
}

export async function deleteComponent(id: number) {
  const index = components.findIndex((c) => c.component_id === id)

  if (index === -1) {
    return false
  }

  components.splice(index, 1)

  // Also delete related recipe ingredients
  recipeIngredients = recipeIngredients.filter((ri) => ri.component_id !== id)

  return true
}

// CRUD operations for Portion Options
export async function getPortionOptions(mealId?: number) {
  if (mealId) {
    return portionOptions.filter((p) => p.meal_id === mealId)
  }
  return [...portionOptions]
}

export async function getPortionOptionById(id: number) {
  return portionOptions.find((p) => p.portion_id === id)
}

export async function createPortionOption(
  portionOption: Omit<PortionOption, "portion_id" | "created_at" | "updated_at">,
) {
  const newPortionOption: PortionOption = {
    portion_id: portionOptions.length > 0 ? Math.max(...portionOptions.map((p) => p.portion_id)) + 1 : 1,
    ...portionOption,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  portionOptions.push(newPortionOption)
  return newPortionOption
}

export async function updatePortionOption(
  id: number,
  portionOption: Partial<Omit<PortionOption, "portion_id" | "created_at" | "updated_at">>,
) {
  const index = portionOptions.findIndex((p) => p.portion_id === id)

  if (index === -1) {
    return null
  }

  portionOptions[index] = {
    ...portionOptions[index],
    ...portionOption,
    updated_at: new Date().toISOString(),
  }

  return portionOptions[index]
}

export async function deletePortionOption(id: number) {
  const index = portionOptions.findIndex((p) => p.portion_id === id)

  if (index === -1) {
    return false
  }

  portionOptions.splice(index, 1)
  return true
}

// CRUD operations for Ingredients
export async function getIngredients() {
  return [...ingredients]
}

export async function getIngredientById(id: number) {
  return ingredients.find((i) => i.ingredient_id === id)
}

export async function createIngredient(ingredient: Omit<Ingredient, "ingredient_id" | "created_at" | "updated_at">) {
  const newIngredient: Ingredient = {
    ingredient_id: ingredients.length > 0 ? Math.max(...ingredients.map((i) => i.ingredient_id)) + 1 : 1,
    ...ingredient,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  ingredients.push(newIngredient)
  return newIngredient
}

export async function updateIngredient(
  id: number,
  ingredient: Partial<Omit<Ingredient, "ingredient_id" | "created_at" | "updated_at">>,
) {
  const index = ingredients.findIndex((i) => i.ingredient_id === id)

  if (index === -1) {
    return null
  }

  ingredients[index] = {
    ...ingredients[index],
    ...ingredient,
    updated_at: new Date().toISOString(),
  }

  return ingredients[index]
}

export async function deleteIngredient(id: number) {
  const index = ingredients.findIndex((i) => i.ingredient_id === id)

  if (index === -1) {
    return false
  }

  ingredients.splice(index, 1)

  // Also delete related recipe ingredients
  recipeIngredients = recipeIngredients.filter((ri) => ri.ingredient_id !== id)

  return true
}

// CRUD operations for Recipe Ingredients
export async function getRecipeIngredients(componentId?: number) {
  if (componentId) {
    return recipeIngredients.filter((ri) => ri.component_id === componentId)
  }
  return [...recipeIngredients]
}

export async function getRecipeIngredientByIds(componentId: number, ingredientId: number) {
  return recipeIngredients.find((ri) => ri.component_id === componentId && ri.ingredient_id === ingredientId)
}

export async function createRecipeIngredient(recipeIngredient: Omit<RecipeIngredient, "created_at" | "updated_at">) {
  // Check if this combination already exists
  const exists = recipeIngredients.some(
    (ri) => ri.component_id === recipeIngredient.component_id && ri.ingredient_id === recipeIngredient.ingredient_id,
  )

  if (exists) {
    return null
  }

  const newRecipeIngredient: RecipeIngredient = {
    ...recipeIngredient,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  recipeIngredients.push(newRecipeIngredient)
  return newRecipeIngredient
}

export async function updateRecipeIngredient(
  componentId: number,
  ingredientId: number,
  recipeIngredient: Partial<Omit<RecipeIngredient, "component_id" | "ingredient_id" | "created_at" | "updated_at">>,
) {
  const index = recipeIngredients.findIndex(
    (ri) => ri.component_id === componentId && ri.ingredient_id === ingredientId,
  )

  if (index === -1) {
    return null
  }

  recipeIngredients[index] = {
    ...recipeIngredients[index],
    ...recipeIngredient,
    updated_at: new Date().toISOString(),
  }

  return recipeIngredients[index]
}

export async function deleteRecipeIngredient(componentId: number, ingredientId: number) {
  const index = recipeIngredients.findIndex(
    (ri) => ri.component_id === componentId && ri.ingredient_id === ingredientId,
  )

  if (index === -1) {
    return false
  }

  recipeIngredients.splice(index, 1)
  return true
}
