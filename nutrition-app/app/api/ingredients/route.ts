import { NextResponse } from "next/server"
import { createIngredient, getIngredients } from "@/lib/data"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  try {
    // Check authentication
    await requireAuth()

    const ingredients = await getIngredients()
    return NextResponse.json(ingredients)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    await requireAuth()

    const body = await request.json()

    // Validate required fields
    if (!body.ingredient_name || !body.default_unit) {
      return NextResponse.json({ error: "Ingredient name and default unit are required" }, { status: 400 })
    }

    const newIngredient = await createIngredient({
      ingredient_name: body.ingredient_name,
      default_unit: body.default_unit,
      calories_per_100g: body.calories_per_100g || 0,
      fat_g: body.fat_g || 0,
      protein_g: body.protein_g || 0,
      carbohydrates_g: body.carbohydrates_g || 0,
    })

    return NextResponse.json(newIngredient, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
