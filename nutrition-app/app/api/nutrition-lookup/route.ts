import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ingredientName, quantity, unit } = body;

    if (!ingredientName) {
      return NextResponse.json({ error: "Ingredient name is required" }, { status: 400 });
    }

    // Use the existing nutrition API endpoint
    const nutritionResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/nutrition-proxy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        food_items: [`${quantity || 100}${unit || 'g'} ${ingredientName}`],
      }),
    });

    if (!nutritionResponse.ok) {
      throw new Error("Failed to fetch nutrition data");
    }

    const nutritionData = await nutritionResponse.json();
    
    return NextResponse.json({
      success: true,
      nutrition: nutritionData
    });

  } catch (error) {
    console.error("Nutrition lookup error:", error);
    return NextResponse.json({ 
      error: "Failed to fetch nutrition data",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 