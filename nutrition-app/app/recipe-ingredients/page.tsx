export const dynamic = "force-dynamic"

import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { getRecipeIngredients } from "@/lib/data"
import { DataTable } from "../meals/data-table"
import { columns } from "./columns"

export default async function RecipeIngredientsPage() {
  const recipeIngredients = await getRecipeIngredients()

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Recipe Ingredients" description="Manage your recipe ingredients" />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">All Recipe Ingredients</h2>
          <Button asChild>
            <Link href="/recipe-ingredients/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Recipe Ingredient
            </Link>
          </Button>
        </div>

        <DataTable columns={columns} data={recipeIngredients} filterColumn="ingredient_id" />
      </main>
    </div>
  )
} 