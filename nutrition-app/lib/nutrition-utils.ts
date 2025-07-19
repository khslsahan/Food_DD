export interface NutritionResponse {
  success: boolean;
  nutrition?: {
    macros?: {
      calories?: number;
      fat?: number;
      protein?: number;
      carbohydrates?: number;
    };
    per100gData?: {
      calories?: number;
      fat?: number;
      protein?: number;
      carbohydrates?: number;
    };
  };
  error?: string;
  source?: string;
}

export interface IngredientInput {
  name: string;
  quantity: string | number;
  unit?: string;
  calories?: string;
  fat?: string;
  protein?: string;
  carbohydrates?: string;
  caloriesPer100g?: string;
  fatPer100g?: string;
  proteinPer100g?: string;
  carbohydratesPer100g?: string;
}

/**
 * Database-first nutrition fetching function
 * Checks database first, then falls back to external APIs
 */
export async function fetchNutritionData(
  ingredientName: string,
  quantity: string | number = 100,
  unit: string = "g"
): Promise<NutritionResponse | null> {
  try {
    // First, try to get ingredient from database
    const dbResponse = await fetch(`/api/ingredients?search=${encodeURIComponent(ingredientName)}`);
    
    if (dbResponse.ok) {
      const dbIngredients = await dbResponse.json();
      
      // Find exact match only (case-insensitive and trimmed)
      const exactMatch = dbIngredients.find((ing: any) => 
        ing.ingredient_name.toLowerCase().trim() === ingredientName.toLowerCase().trim()
      );
      
      if (exactMatch) {
        // Calculate nutrition for the requested quantity
        const qty = Number(quantity) || 100;
        const factor = qty / 100;
        
        const macros = {
          calories: Math.round((Number(exactMatch.calories_per_100g) || 0) * factor),
          fat: Math.round((Number(exactMatch.fat_g) || 0) * factor),
          protein: Math.round((Number(exactMatch.protein_g) || 0) * factor),
          carbohydrates: Math.round((Number(exactMatch.carbohydrates_g) || 0) * factor),
        };
        
        // Store per-100g values for the ingredient update
        const per100gData = {
          calories: Number(exactMatch.calories_per_100g) || 0,
          fat: Number(exactMatch.fat_g) || 0,
          protein: Number(exactMatch.protein_g) || 0,
          carbohydrates: Number(exactMatch.carbohydrates_g) || 0,
        };
        
        return {
          success: true,
          nutrition: { macros, per100gData },
          source: "database"
        };
      }
    }
    
    // If not found in database, return null to trigger fallback
    return null;
    
  } catch (error) {
    console.error("Database nutrition fetch error:", error);
    return null;
  }
}

/**
 * Unified nutrition fetch handler with database-first approach
 * This is the main function that should be used across all contexts
 */
export async function handleNutritionFetch(
  ingredientName: string,
  quantity: string | number = 100,
  unit: string = "g"
): Promise<NutritionResponse | null> {
  console.log("handleNutritionFetch called with:", {
    ingredientName,
    quantity,
    unit,
    quantityType: typeof quantity,
    unitType: typeof unit
  });

  try {
    // 1. Try database first
    const dbResult = await fetchNutritionData(ingredientName, quantity, unit);
    
    if (dbResult && dbResult.success) {
      // Return success with database source - client components can handle notifications
      return dbResult;
    }

    // 2. If database fails, try Edamam fallback
    const edamamQuery = `${quantity}${unit} ${ingredientName}`;
    console.log("Calling Edamam with query:", edamamQuery);
    
    const edamamResponse = await fetch("/api/edamam-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingr: edamamQuery,
      }),
    });

    if (edamamResponse.status === 429) {
      return {
        success: false,
        error: "Edamam API Rate Limit - You have reached the Edamam API rate limit. Please try again later.",
        source: "edamam"
      };
    }

    const edamamData = await edamamResponse.json();
    
    if (edamamResponse.ok && edamamData.macros) {
      return { success: true, nutrition: { macros: edamamData.macros }, source: "edamam" };
    }

    // 3. If Edamam fails, try ChatGPT fallback
    const gptResponse = await fetch("/api/gpt-nutrition", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredient: ingredientName }),
    });

    const gptData = await gptResponse.json();
    
    if (gptResponse.ok && gptData) {
      return { 
        success: true, 
        nutrition: { 
          macros: {
            calories: gptData.calories,
            fat: gptData.fat,
            protein: gptData.protein,
            carbohydrates: gptData.carbs
          }
        }, 
        source: "gpt" 
      };
    }

    // 4. If all sources fail
    return {
      success: false,
      error: `Could not find nutrition data for ${ingredientName} in database or external sources. Please add this ingredient to the database first.`,
      source: "none"
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred during nutrition lookup.",
      source: "error"
    };
  }
}

/**
 * Calculate nutrition values for a given quantity
 */
export function calculateNutritionForQuantity(
  nutritionData: any,
  quantity: number,
  baseQuantity: number = 100
): {
  calories: string;
  fat: string;
  protein: string;
  carbohydrates: string;
} {
  const factor = quantity / baseQuantity;
  
  return {
    calories: nutritionData.calories ? (Number(nutritionData.calories) * factor).toFixed(2) : "",
    fat: nutritionData.fat ? (Number(nutritionData.fat) * factor).toFixed(2) : "",
    protein: nutritionData.protein ? (Number(nutritionData.protein) * factor).toFixed(2) : "",
    carbohydrates: nutritionData.carbohydrates ? (Number(nutritionData.carbohydrates) * factor).toFixed(2) : "",
  };
}

/**
 * Update ingredient with nutrition data
 */
export function updateIngredientWithNutrition(
  ingredient: IngredientInput,
  nutritionData: any,
  quantity?: number,
  per100gData?: any
): IngredientInput {
  // Use the already-calculated nutrition data directly
  return {
    ...ingredient,
    calories: nutritionData.calories?.toString() ?? "",
    fat: nutritionData.fat?.toString() ?? "",
    protein: nutritionData.protein?.toString() ?? "",
    carbohydrates: nutritionData.carbohydrates?.toString() ?? "",
    caloriesPer100g: per100gData?.calories?.toString() ?? "",
    fatPer100g: per100gData?.fat?.toString() ?? "",
    proteinPer100g: per100gData?.protein?.toString() ?? "",
    carbohydratesPer100g: per100gData?.carbohydrates?.toString() ?? "",
  };
} 