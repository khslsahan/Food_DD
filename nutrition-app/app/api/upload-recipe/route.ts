import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { spawn } from "child_process";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Types for the extracted recipe data
interface ExtractedIngredient {
  name: string;
  quantity: number;
  unit: string;
  calories?: number;
  fat?: number;
  protein?: number;
  carbohydrates?: number;
  raw_quantity?: number;
  cooked_quantity?: number;
}

interface ExtractedComponent {
  name: string;
  base_quantity?: number;
  ingredients: ExtractedIngredient[];
  before_cook_weight_g?: number;
  after_cook_weight_g?: number;
  category_id?: number;
  portions?: { label: string; total_weight_g: number }[];
}

interface ExtractedRecipe {
  name: string;
  description?: string;
  packaging?: string;
  objective?: string;
  itemCode?: string;
  isBalancedMeal?: boolean;
  isGourmetMeal?: boolean;
  isWeightLossMeal?: boolean;
  components: ExtractedComponent[];
  notes?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.name.endsWith('.docx')) {
      return NextResponse.json({ error: "Only .docx files are supported" }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "uploads");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Save file to uploads directory
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    // Extract recipe data using Python script
    const extractionResult = await extractRecipesFromFile(filePath);
    
    if (!extractionResult) {
      return NextResponse.json({ error: "Failed to extract recipe data" }, { status: 500 });
    }

    // Return the extracted data for user verification
    return NextResponse.json({
      success: true,
      fileName,
      recipes: extractionResult.recipes,
      documentContent: extractionResult.documentContent
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

async function extractRecipesFromFile(filePath: string): Promise<{recipes: ExtractedRecipe[], documentContent: string} | null> {
  return new Promise((resolve, reject) => {
    const pythonScript = join(process.cwd(), "scripts", "extract_recipe.py");
    
    // Check if Python script exists
    if (!existsSync(pythonScript)) {
      console.error("Python script not found:", pythonScript);
      resolve(null);
      return;
    }

    const pythonProcess = spawn("python3", [pythonScript, filePath]);
    
    let stdout = "";
    let stderr = "";

    pythonProcess.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error("Python script failed:", stderr);
        resolve(null);
        return;
      }

      try {
        const result = JSON.parse(stdout);
        if (result.success && result.recipes) {
          resolve({
            recipes: result.recipes,
            documentContent: result.documentContent || ""
          });
        } else {
          console.error("Python script returned error:", result.error);
          resolve(null);
        }
      } catch (error) {
        console.error("Failed to parse Python script output:", error);
        resolve(null);
      }
    });

    pythonProcess.on("error", (error) => {
      console.error("Failed to start Python script:", error);
      resolve(null);
    });
  });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipe, fileName, recipeIndex } = body;

    if (!recipe || !fileName) {
      return NextResponse.json({ error: "Missing recipe data or filename" }, { status: 400 });
    }

    // Save the verified recipe to database
    const savedRecipe = await saveRecipeToDatabase(recipe);

    // Check if this was an update or new creation
    const existingMeal = await prisma.meals.findUnique({
      where: { meal_name: recipe.name }
    });

    const isUpdate = existingMeal && existingMeal.meal_id === savedRecipe.mealId;

    return NextResponse.json({
      success: true,
      message: isUpdate ? "Recipe updated successfully" : "Recipe saved successfully",
      mealId: savedRecipe.mealId,
      recipeIndex: recipeIndex,
      isUpdate: isUpdate
    });

  } catch (error) {
    console.error("Save error:", error);
    
    // Handle duplicate meal name error (this should no longer happen with our fix)
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ 
        error: "A meal with this name already exists. Please choose a different name.",
        code: "DUPLICATE_MEAL_NAME"
      }, { status: 409 });
    }
    
    return NextResponse.json({ error: "Failed to save recipe" }, { status: 500 });
  }
}

async function saveRecipeToDatabase(recipe: ExtractedRecipe) {
  // Check if meal already exists
  let meal = await prisma.meals.findUnique({
    where: { meal_name: recipe.name }
  });

  if (meal) {
    // Meal already exists, update it instead of creating new one
    meal = await prisma.meals.update({
      where: { meal_id: meal.meal_id },
      data: {
        description: recipe.description || "",
        package: recipe.packaging || null,
        objective: recipe.objective || null,
        item_code: recipe.itemCode || null,
        is_balanced: recipe.isBalancedMeal || false,
        is_gourmet: recipe.isGourmetMeal || false,
        is_weight_loss: recipe.isWeightLossMeal || false
      }
    });

    // Delete existing components and their related data
    const existingComponents = await prisma.components.findMany({
      where: { meal_id: meal.meal_id }
    });

    for (const component of existingComponents) {
      // Delete recipe_ingredients
      await prisma.recipe_ingredients.deleteMany({
        where: { component_id: component.component_id }
      });

      // Delete component_portions
      await prisma.component_portions.deleteMany({
        where: { component_id: component.component_id }
      });
    }

    // Delete components
    await prisma.components.deleteMany({
      where: { meal_id: meal.meal_id }
    });
  } else {
    // Create new meal
    meal = await prisma.meals.create({
      data: {
        meal_name: recipe.name,
        description: recipe.description || "",
        package: recipe.packaging || null,
        objective: recipe.objective || null,
        item_code: recipe.itemCode || null,
        is_balanced: recipe.isBalancedMeal || false,
        is_gourmet: recipe.isGourmetMeal || false,
        is_weight_loss: recipe.isWeightLossMeal || false
      }
    });
  }

  // Create components and ingredients
  for (const component of recipe.components) {
    const dbComponent = await prisma.components.create({
      data: {
        meal_id: meal.meal_id,
        component_name: component.name,
        before_cook_weight_g: component.before_cook_weight_g ?? component.base_quantity ?? 0,
        after_cook_weight_g: component.after_cook_weight_g ?? component.base_quantity ?? 0,
        category_id: component.category_id ?? null,
      }
    });

    // Save portion sizes if present
    if (component.portions && Array.isArray(component.portions)) {
      for (const portion of component.portions) {
        await prisma.component_portions.create({
          data: {
            component_id: dbComponent.component_id,
            label: portion.label,
            total_weight_g: Number(portion.total_weight_g) || 0,
          }
        });
      }
    }

    // Create ingredients and recipe_ingredients
    for (const ingredient of component.ingredients) {
      // Find or create ingredient
      let dbIngredient = await prisma.ingredients.findUnique({
        where: { ingredient_name: ingredient.name }
      });

      if (!dbIngredient) {
        // Normalize nutrition values to per 100g (same logic as AddComponentModal)
        const quantity = ingredient.raw_quantity || ingredient.quantity || 100;
        const factor = 100 / quantity;
        
        const normalizedCalories = (Number(ingredient.calories) * factor) || 0;
        const normalizedFat = (Number(ingredient.fat) * factor) || 0;
        const normalizedProtein = (Number(ingredient.protein) * factor) || 0;
        const normalizedCarbohydrates = (Number(ingredient.carbohydrates) * factor) || 0;

        dbIngredient = await prisma.ingredients.create({
          data: {
            ingredient_name: ingredient.name,
            default_unit: ingredient.unit || "g",
            calories_per_100g: normalizedCalories,
            fat_g: normalizedFat,
            protein_g: normalizedProtein,
            carbohydrates_g: normalizedCarbohydrates
          }
        });
      }

      // Create recipe_ingredients relationship
      await prisma.recipe_ingredients.create({
        data: {
          component_id: dbComponent.component_id,
          ingredient_id: dbIngredient.ingredient_id,
          raw_quantity_g: ingredient.raw_quantity || ingredient.quantity,
          cooked_quantity_g: ingredient.cooked_quantity || ingredient.quantity
        }
      });
    }
  }

  return { mealId: meal.meal_id };
} 