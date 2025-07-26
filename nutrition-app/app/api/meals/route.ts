import { NextResponse } from "next/server"
import { createMeal, findMealByNameCaseInsensitive } from "@/lib/data"
import { requireAuth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Check authentication
    await requireAuth()

    const meals = await prisma.meals.findMany({
      orderBy: { created_at: "desc" },
    })
    return NextResponse.json(meals)
  } catch (error) {
    console.error("Failed to fetch meals:", error)
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

    // Check for duplicate meal name (case insensitive)
    const existingMeal = await findMealByNameCaseInsensitive(body.meal_name)
    if (existingMeal) {
      return NextResponse.json({ 
        error: "A meal with this name already exists. Please choose a different name.",
        code: "DUPLICATE_MEAL_NAME"
      }, { status: 409 })
    }

    const newMeal = await createMeal({
      meal_name: body.meal_name,
      description: body.description || "",
      is_balanced: body.is_balanced,
      is_gourmet: body.is_gourmet,
      is_weight_loss: body.is_weight_loss,
      package: body.package,
      objective: body.objective,
      item_code: body.item_code,
    })

    return NextResponse.json({ meal_id: newMeal.meal_id }, { status: 201 })
  } catch (error) {
    console.error("Failed to create meal:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
