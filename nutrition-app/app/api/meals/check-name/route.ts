import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ error: "Meal name is required" }, { status: 400 });
    }

    // Check if meal exists (case insensitive)
    const existingMeal = await prisma.meals.findFirst({
      where: {
        meal_name: {
          equals: name.trim(),
          mode: 'insensitive'
        }
      }
    });

    return NextResponse.json({
      exists: !!existingMeal,
      mealId: existingMeal?.meal_id || null
    });

  } catch (error) {
    console.error("Error checking meal name:", error);
    return NextResponse.json({ error: "Failed to check meal name" }, { status: 500 });
  }
} 