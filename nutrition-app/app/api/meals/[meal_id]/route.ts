import { NextResponse } from "next/server"
import { updateMeal, deleteMeal } from "@/lib/data"
import { requireAuth } from "@/lib/auth"

export async function PUT(request: Request, { params }: { params: { meal_id: string } }) {
  try {
    // Try to require auth, but catch redirect error
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

    const mealId = Number(params.meal_id)
    const body = await request.json()

    const updatedMeal = await updateMeal(mealId, body)

    return NextResponse.json(updatedMeal)
  } catch (error) {
    console.error("Failed to update meal:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { meal_id: string } }) {
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
    const mealId = Number(params.meal_id);
    await deleteMeal(mealId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete meal:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 