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
  const components = mealId
    ? await prisma.components.findMany({
        where: { meal_id: mealId },
        orderBy: { updated_at: 'desc' },
        include: { component_portions: true, category: true },
      })
    : await prisma.components.findMany({
        orderBy: { updated_at: 'desc' },
        include: { component_portions: true, category: true },
      })
  return components.map(component => ({
    ...component,
    before_cook_weight_g: Number(component.before_cook_weight_g),
    after_cook_weight_g: Number(component.after_cook_weight_g),
    component_portions: component.component_portions?.map(p => ({
      ...p,
      total_weight_g: Number(p.total_weight_g),
    })) || [],
  }))
}

// CRUD operations for Portion Options
export async function getPortionOptions(mealId?: number) {
  const options = mealId
    ? await prisma.portion_options.findMany({
        where: { meal_id: mealId },
        orderBy: { updated_at: 'desc' },
      })
    : await prisma.portion_options.findMany({
        orderBy: { updated_at: 'desc' },
      })
  return options.map(option => ({
    ...option,
    multiplier: Number(option.multiplier),
  }))
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

export async function createMeal({ meal_name, description, is_balanced, is_gourmet, is_weight_loss }: { meal_name: string, description?: string, is_balanced?: boolean, is_gourmet?: boolean, is_weight_loss?: boolean }) {
  return prisma.meals.create({
    data: {
      meal_name,
      description: description || null,
      is_balanced: is_balanced || false,
      is_gourmet: is_gourmet || false,
      is_weight_loss: is_weight_loss || false,
    },
  });
}

export async function createIngredient({
  ingredient_name,
  default_unit,
  calories_per_100g,
  fat_g,
  protein_g,
  carbohydrates_g,
}: {
  ingredient_name: string;
  default_unit: string;
  calories_per_100g: number;
  fat_g: number;
  protein_g: number;
  carbohydrates_g: number;
}) {
  return prisma.ingredients.create({
    data: {
      ingredient_name,
      default_unit,
      calories_per_100g,
      fat_g,
      protein_g,
      carbohydrates_g,
    },
  });
}

export async function updateMeal(id: number, data: Partial<Omit<Meal, 'meal_id'>>) {
  return prisma.meals.update({
    where: { meal_id: id },
    data: {
      ...data,
    },
  });
}
