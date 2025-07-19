import { getMealById } from "@/lib/data"
import EditMealForm from "./form"
import { notFound } from "next/navigation"

export default async function EditMealPage({ params }: { params: Promise<{ meal_id: string }> }) {
  const { meal_id } = await params;
  const mealId = Number(meal_id)
  const meal = await getMealById(mealId)

  if (!meal) {
    notFound()
  }

  return <EditMealForm meal={meal} />
} 