import prisma from './prisma'
import type { Meal, Component, PortionOption, Ingredient, RecipeIngredient } from "./types"

// CRUD operations for Meals
export async function getMeals() {
  return prisma.meals.findMany({
    orderBy: { updated_at: 'desc' },
  })
}

export async function getMealById(id: number) {
  return prisma.meals.findUnique({ where: { meal_id: id } })
}

// CRUD operations for Components
export async function getComponents(mealId?: number) {
  if (mealId) {
    return prisma.components.findMany({
      where: { meal_id: mealId },
      orderBy: { updated_at: 'desc' },
    })
  }
  return prisma.components.findMany({
    orderBy: { updated_at: 'desc' },
  })
}

// CRUD operations for Portion Options
export async function getPortionOptions(mealId?: number) {
  if (mealId) {
    return prisma.portion_options.findMany({
      where: { meal_id: mealId },
      orderBy: { updated_at: 'desc' },
    })
  }
  return prisma.portion_options.findMany({
    orderBy: { updated_at: 'desc' },
  })
}

// CRUD operations for Ingredients
export async function getIngredients() {
  const ingredients = await prisma.ingredients.findMany({
    orderBy: { updated_at: 'desc' },
  })
  return ingredients.map(ingredient => ({
    ...ingredient,
    calories_per_100g: Number(ingredient.calories_per_100g),
    fat_g: Number(ingredient.fat_g),
    protein_g: Number(ingredient.protein_g),
    carbohydrates_g: Number(ingredient.carbohydrates_g),
  }))
}

// CRUD operations for Recipe Ingredients
export async function getRecipeIngredients(componentId?: number) {
  const recipeIngredients = componentId
    ? await prisma.recipe_ingredients.findMany({
        where: { component_id: componentId },
        orderBy: { updated_at: 'desc' },
      })
    : await prisma.recipe_ingredients.findMany({
        orderBy: { updated_at: 'desc' },
      })
  return recipeIngredients.map(ri => ({
    ...ri,
    raw_quantity_g: Number(ri.raw_quantity_g),
    cooked_quantity_g: ri.cooked_quantity_g !== null ? Number(ri.cooked_quantity_g) : null,
  }))
}
