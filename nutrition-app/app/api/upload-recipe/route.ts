import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { spawn } from "child_process";
import prisma from "@/lib/prisma";

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
}

interface ExtractedRecipe {
  name: string;
  description?: string;
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
    const extractionResult = await extractRecipeFromFile(filePath);
    
    if (!extractionResult) {
      return NextResponse.json({ error: "Failed to extract recipe data" }, { status: 500 });
    }

    // Return the extracted data for user verification
    return NextResponse.json({
      success: true,
      fileName,
      recipe: extractionResult.recipe,
      documentContent: extractionResult.documentContent
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

async function extractRecipeFromFile(filePath: string): Promise<{recipe: ExtractedRecipe, documentContent: string} | null> {
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
        if (result.success && result.recipe) {
          resolve({
            recipe: result.recipe,
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
    const { recipe, fileName } = body;

    if (!recipe || !fileName) {
      return NextResponse.json({ error: "Missing recipe data or filename" }, { status: 400 });
    }

    // Save the verified recipe to database
    const savedRecipe = await saveRecipeToDatabase(recipe);

    return NextResponse.json({
      success: true,
      message: "Recipe saved successfully",
      mealId: savedRecipe.mealId
    });

  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ error: "Failed to save recipe" }, { status: 500 });
  }
}

async function saveRecipeToDatabase(recipe: ExtractedRecipe) {
  // Create meal
  const meal = await prisma.meals.create({
    data: {
      meal_name: recipe.name,
      description: recipe.description || "",
      is_balanced: false,
      is_gourmet: false,
      is_weight_loss: false
    }
  });

  // Create components and ingredients
  for (const component of recipe.components) {
    const dbComponent = await prisma.components.create({
      data: {
        meal_id: meal.meal_id,
        component_name: component.name,
        before_cook_weight_g: component.base_quantity || 0,
        after_cook_weight_g: component.base_quantity || 0
      }
    });

    // Create ingredients and recipe_ingredients
    for (const ingredient of component.ingredients) {
      // Find or create ingredient
      let dbIngredient = await prisma.ingredients.findUnique({
        where: { ingredient_name: ingredient.name }
      });

      if (!dbIngredient) {
        dbIngredient = await prisma.ingredients.create({
          data: {
            ingredient_name: ingredient.name,
            default_unit: ingredient.unit,
            calories_per_100g: ingredient.calories || 0,
            fat_g: ingredient.fat || 0,
            protein_g: ingredient.protein || 0,
            carbohydrates_g: ingredient.carbohydrates || 0
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