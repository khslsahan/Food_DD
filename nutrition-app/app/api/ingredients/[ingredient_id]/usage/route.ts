import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ ingredient_id: string }> }) {
  try {
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

    // Get detailed usage information
    const usageInfo = {
      ingredient: {
        ingredient_id: ingredient.ingredient_id,
        ingredient_name: ingredient.ingredient_name,
        default_unit: ingredient.default_unit
      },
      isUsed: ingredient.recipe_ingredients.length > 0,
      usageCount: ingredient.recipe_ingredients.length,
      usageDetails: []
    };

    if (ingredient.recipe_ingredients.length > 0) {
      // Group by meal and component
      const mealUsage = new Map();
      
      ingredient.recipe_ingredients.forEach(ri => {
        const mealName = ri.components.meals.meal_name;
        const componentName = ri.components.component_name;
        const quantity = ri.raw_quantity_g;
        
        if (!mealUsage.has(mealName)) {
          mealUsage.set(mealName, {
            meal_name: mealName,
            meal_id: ri.components.meals.meal_id,
            components: new Map()
          });
        }
        
        const meal = mealUsage.get(mealName);
        if (!meal.components.has(componentName)) {
          meal.components.set(componentName, {
            component_name: componentName,
            component_id: ri.components.component_id,
            quantity: 0
          });
        }
        
        meal.components.get(componentName).quantity += quantity;
      });

      // Convert to array format
      usageInfo.usageDetails = Array.from(mealUsage.values()).map(meal => ({
        meal_name: meal.meal_name,
        meal_id: meal.meal_id,
        components: Array.from(meal.components.values()).map(comp => ({
          component_name: comp.component_name,
          component_id: comp.component_id,
          quantity: comp.quantity
        }))
      }));
    }

    return NextResponse.json(usageInfo);

  } catch (error) {
    console.error('GET ingredient usage failed:', error);
    return NextResponse.json({ 
      error: "Failed to get ingredient usage information. Please try again." 
    }, { status: 500 });
  }
} 