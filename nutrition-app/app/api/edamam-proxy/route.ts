import { NextRequest, NextResponse } from 'next/server';
import { getMultipleSystemConfigs } from '../../../lib/system-config';

export async function POST(req: NextRequest) {
  try {
    const { ingr } = await req.json();
    
    console.log("Edamam API called with ingredient:", ingr);
    
    // Get Edamam API credentials from system config
    const configs = await getMultipleSystemConfigs(['EDAMAM_APP_ID', 'EDAMAM_APP_KEY']);
    const APP_ID = configs.EDAMAM_APP_ID;
    const APP_KEY = configs.EDAMAM_APP_KEY;
    
    if (!APP_ID || !APP_KEY) {
      console.error("Edamam API credentials not configured");
      return NextResponse.json(
        { error: 'Edamam API credentials not configured in system config' },
        { status: 500 }
      );
    }
    
    const url = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&nutrition-type=cooking&ingr=${encodeURIComponent(ingr)}`;
    console.log("Calling Edamam API:", url);
    
    const apiRes = await fetch(url, {
      method: 'GET',
      headers: { 'accept': 'application/json' },
    });
    
    console.log("Edamam API response status:", apiRes.status);
    
    if (!apiRes.ok) {
      console.error("Edamam API error:", apiRes.status);
      return NextResponse.json(
        { error: `Edamam API error: ${apiRes.status}` },
        { status: apiRes.status }
      );
    }
    
    const data = await apiRes.json();
    console.log("Raw Edamam response:", JSON.stringify(data, null, 2));
    
    // Extract macros from the nutrients object
    let macros = null;
    let totalNutrients = null;
    
    // Check for totalNutrients first (most common format)
    if (data.totalNutrients) {
      totalNutrients = data.totalNutrients;
    } else if (data.ingredients && data.ingredients[0] && data.ingredients[0].parsed && data.ingredients[0].parsed[0]) {
      // Fallback to ingredients[0].parsed[0].nutrients
      totalNutrients = data.ingredients[0].parsed[0].nutrients;
    }
    
    if (totalNutrients) {
      // Extract the main macros
      const calories = totalNutrients.ENERC_KCAL?.quantity || 0;
      const fat = totalNutrients.FAT?.quantity || 0;
      const protein = totalNutrients.PROCNT?.quantity || 0;
      const carbs = totalNutrients.CHOCDF?.quantity || 0;
      
      macros = {
        calories: Math.round(calories),
        fat: Math.round(fat * 10) / 10, // Keep one decimal place for fat
        protein: Math.round(protein * 10) / 10, // Keep one decimal place for protein
        carbohydrates: Math.round(carbs * 10) / 10 // Keep one decimal place for carbs
      };
      
      console.log("Extracted macros:", macros);
    } else {
      console.warn("No nutrients found in Edamam response");
    }
    
    // Return both the original data and the extracted macros
    return NextResponse.json({
      ...data,
      macros: macros
    }, { status: 200 });
    
  } catch (error) {
    console.error("Edamam proxy error:", error);
    return NextResponse.json(
      { error: 'Failed to fetch nutrition data from Edamam' },
      { status: 500 }
    );
  }
} 