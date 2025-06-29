import { getMealById } from "@/lib/data"
import EditMealForm from "./form"
import { notFound } from "next/navigation"

export default async function EditMealPage({ params }: { params: { meal_id: string } }) {
  const mealId = Number(params.meal_id)
  const meal = await getMealById(mealId)

  if (!meal) {
    notFound()
  }

  return <EditMealForm meal={meal} />
} 