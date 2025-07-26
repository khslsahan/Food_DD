import { NextResponse } from "next/server"
import { updateMeal, deleteMeal } from "@/lib/data"
import { requireAuth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ meal_id: string }> }) {
  try {
    const { meal_id } = await params;
    const mealId = Number(meal_id);
    
    if (isNaN(mealId)) {
      return NextResponse.json({ error: "Invalid meal ID" }, { status: 400 });
    }

    const meal = await prisma.meals.findUnique({
      where: { meal_id: mealId }
    });

    if (!meal) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 });
    }

    return NextResponse.json(meal);
  } catch (error) {
    console.error("Failed to fetch meal:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ meal_id: string }> }) {
  try {
    let user = null;
    try {
      user = await requireAuth();
    } catch (error: any) {
      // If it's a redirect error, return 401
      if (error?.message?.includes("NEXT_REDIRECT")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      throw error;
    }

    const { meal_id } = await params;
    const mealId = Number(meal_id)
    const body = await request.json()

    const updatedMeal = await updateMeal(mealId, body)

    return NextResponse.json(updatedMeal)
  } catch (error) {
    console.error("Failed to update meal:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ meal_id: string }> }) {
  try {
    let user = null;
    try {
      user = await requireAuth();
    } catch (error: any) {
      if (error?.message?.includes("NEXT_REDIRECT")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      throw error;
    }
    const { meal_id } = await params;
    const mealId = Number(meal_id);
    await deleteMeal(mealId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete meal:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 