import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ ingredient_id: string }> }) {
  try {
    // Check authentication
    await requireAuth();
    
    const { ingredient_id } = await params;
    const id = Number(ingredient_id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ingredient ID" }, { status: 400 });
    }

    // Check if ingredient exists
    const ingredient = await prisma.ingredients.findUnique({
      where: { ingredient_id: id },
      include: {
        recipe_ingredients: {
          include: {
            components: {
              include: {
                meals: true
              }
            }
          }
        }
      }
    });

    if (!ingredient) {
      return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
    }

    // Check if ingredient is used in any recipes - if so, prevent deletion
    if (ingredient.recipe_ingredients.length > 0) {
      // Get unique meals that use this ingredient
      const uniqueMeals = [...new Set(ingredient.recipe_ingredients.map(ri => ri.components.meals.meal_name))];
      
      return NextResponse.json({ 
        error: `Cannot delete ingredient "${ingredient.ingredient_name}" because it is used in ${ingredient.recipe_ingredients.length} recipe(s) across ${uniqueMeals.length} meal(s): ${uniqueMeals.join(', ')}. Please remove this ingredient from all recipes before deleting it.`
      }, { status: 400 });
    }

    // Only delete if ingredient is not used in any recipes
    await prisma.ingredients.delete({
      where: { ingredient_id: id }
    });

    return NextResponse.json({ 
      message: `Ingredient "${ingredient.ingredient_name}" deleted successfully` 
    });

  } catch (error) {
    console.error('DELETE ingredient failed:', error);
    return NextResponse.json({ 
      error: "Failed to delete ingredient. Please try again." 
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ ingredient_id: string }> }) {
  try {
    // Check authentication
    await requireAuth();
    
    const { ingredient_id } = await params;
    const id = Number(ingredient_id);
    const data = await req.json();
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ingredient ID" }, { status: 400 });
    }

    const updated = await prisma.ingredients.update({
      where: { ingredient_id: id },
      data: {
        ingredient_name: data.ingredient_name,
        default_unit: data.default_unit,
        calories_per_100g: Number(data.calories_per_100g),
        fat_g: Number(data.fat_g),
        protein_g: Number(data.protein_g),
        carbohydrates_g: Number(data.carbohydrates_g),
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error('PUT update failed:', e);
    return NextResponse.json({ error: "Ingredient not found or update failed" }, { status: 404 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ ingredient_id: string }> }) {
  try {
    const { ingredient_id } = await params;
    const id = Number(ingredient_id);
    const data = await req.json();
    const updated = await prisma.ingredients.update({
      where: { ingredient_id: id },
      data: {
        ingredient_name: data.ingredient_name,
        default_unit: data.default_unit,
        calories_per_100g: Number(data.calories_per_100g),
        fat_g: Number(data.fat_g),
        protein_g: Number(data.protein_g),
        carbohydrates_g: Number(data.carbohydrates_g),
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error('PATCH update failed:', e);
    return NextResponse.json({ error: "Ingredient not found or update failed" }, { status: 404 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ ingredient_id: string }> }) {
  // For form submissions from the edit page
  const { ingredient_id } = await params;
  const id = Number(ingredient_id);
  const form = await req.formData();
  const formObj = Object.fromEntries(form.entries());
  console.log('Updating ingredient:', id, formObj);
  try {
    const updated = await prisma.ingredients.update({
      where: { ingredient_id: id },
      data: {
        ingredient_name: form.get("ingredient_name") as string,
        default_unit: form.get("default_unit") as string,
        calories_per_100g: Number(form.get("calories_per_100g")),
        fat_g: Number(form.get("fat_g")),
        protein_g: Number(form.get("protein_g")),
        carbohydrates_g: Number(form.get("carbohydrates_g")),
      },
    });
    const origin = req.headers.get("origin") || "http://localhost:3000";
    return NextResponse.redirect(`${origin}/ingredients/${id}`);
  } catch (e) {
    console.error('POST update failed:', e, 'ID:', id, 'Form:', formObj);
    return NextResponse.json({ error: "Ingredient not found or update failed" }, { status: 404 });
  }
} 