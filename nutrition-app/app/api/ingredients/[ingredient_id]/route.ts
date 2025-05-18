import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { ingredient_id: string } }) {
  try {
    const id = Number(params.ingredient_id);
    const data = await req.json();
    const updated = await prisma.ingredients.update({
      where: { ingredient_id: id },
      data: {
        ingredient_name: data.ingredient_name,
        default_unit: data.default_unit,
        calories_per_100g: Number(data.calories_per_100g),
        fat_g: Number(data.fat_g),
        protein_g: Number(data.protein_g),
        carbohydrates_g: Number(data.carbohydrates_g),
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error('PATCH update failed:', e);
    return NextResponse.json({ error: "Ingredient not found or update failed" }, { status: 404 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { ingredient_id: string } }) {
  // For form submissions from the edit page
  const id = Number(params.ingredient_id);
  const form = await req.formData();
  const formObj = Object.fromEntries(form.entries());
  console.log('Updating ingredient:', id, formObj);
  try {
    const updated = await prisma.ingredients.update({
      where: { ingredient_id: id },
      data: {
        ingredient_name: form.get("ingredient_name") as string,
        default_unit: form.get("default_unit") as string,
        calories_per_100g: Number(form.get("calories_per_100g")),
        fat_g: Number(form.get("fat_g")),
        protein_g: Number(form.get("protein_g")),
        carbohydrates_g: Number(form.get("carbohydrates_g")),
      },
    });
    const origin = req.headers.get("origin") || "http://localhost:3000";
    return NextResponse.redirect(`${origin}/ingredients/${id}`);
  } catch (e) {
    console.error('POST update failed:', e, 'ID:', id, 'Form:', formObj);
    return NextResponse.json({ error: "Ingredient not found or update failed" }, { status: 404 });
  }
} 