import { NextResponse } from "next/server"
import { createMeal, getMeals } from "@/lib/data"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  try {
    // Check authentication
    await requireAuth()

    const meals = await getMeals()
    return NextResponse.json(meals)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.meal_name) {
      return NextResponse.json({ error: "Meal name is required" }, { status: 400 })
    }

    const newMeal = await createMeal({
      meal_name: body.meal_name,
      description: body.description || "",
      is_balanced: body.is_balanced,
      is_gourmet: body.is_gourmet,
      is_weight_loss: body.is_weight_loss,
    })

    return NextResponse.json({ meal_id: newMeal.meal_id }, { status: 201 })
  } catch (error) {
    console.error("Failed to create meal:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
