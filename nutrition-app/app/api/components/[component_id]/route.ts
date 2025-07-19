import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ component_id: string }> }) {
  try {
    const { component_id } = await params;
    const componentId = Number(component_id);
    const body = await request.json();
    const { meal_id, component_name, before_cook_weight_g, after_cook_weight_g, ingredients, portions, category_id } = body;
    if (!meal_id || !component_name || !before_cook_weight_g || !after_cook_weight_g || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // For each ingredient, find or create
    const ingredientIds = [];
    for (const ing of ingredients) {
      let dbIngredient = await prisma.ingredients.findUnique({
        where: { ingredient_name: ing.name },
      });
      if (!dbIngredient) {
        // Normalize nutrition values to per 100g (same logic as AddComponentModal)
        const quantity = Number(ing.quantity) || 100;
        const factor = 100 / quantity;
        
        const normalizedCalories = (Number(ing.calories) * factor) || 0;
        const normalizedFat = (Number(ing.fat) * factor) || 0;
        const normalizedProtein = (Number(ing.protein) * factor) || 0;
        const normalizedCarbohydrates = (Number(ing.carbohydrates) * factor) || 0;

        dbIngredient = await prisma.ingredients.create({
          data: {
            ingredient_name: ing.name,
            default_unit: "g",
            calories_per_100g: normalizedCalories,
            fat_g: normalizedFat,
            protein_g: normalizedProtein,
            carbohydrates_g: normalizedCarbohydrates,
          },
        });
      }
      ingredientIds.push({
        ingredient_id: dbIngredient.ingredient_id,
        raw_quantity_g: Number(ing.quantity) || 0,
      });
    }

    // Update the component
    const updatedComponent = await prisma.components.update({
      where: { component_id: componentId },
      data: {
        meal_id,
        component_name,
        before_cook_weight_g: Number(before_cook_weight_g),
        after_cook_weight_g: Number(after_cook_weight_g),
        category_id: category_id || null,
        // Remove and recreate recipe_ingredients and component_portions for simplicity
        recipe_ingredients: {
          deleteMany: {},
          create: ingredientIds.map((ri) => ({
            ingredient_id: ri.ingredient_id,
            raw_quantity_g: ri.raw_quantity_g,
            cooked_quantity_g: ri.raw_quantity_g, // Set cooked_quantity_g to same as raw_quantity_g for consistency
          })),
        },
        component_portions: {
          deleteMany: {},
          create: (portions && Array.isArray(portions))
            ? portions.map((p) => ({
                label: p.label,
                total_weight_g: Number(p.total_weight_g) || 0,
              }))
            : [],
        },
      },
      include: {
        recipe_ingredients: true,
        component_portions: true,
      },
    });
    return NextResponse.json(updatedComponent, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ component_id: string }> }) {
  try {
    const { component_id } = await params;
    const componentId = Number(component_id);
    await prisma.components.delete({
      where: { component_id: componentId },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 