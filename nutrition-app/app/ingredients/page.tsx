export const dynamic = "force-dynamic"

import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { getIngredients } from "@/lib/data"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default async function IngredientsPage() {
  const ingredients = await getIngredients()

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Ingredients" description="Manage your ingredient database" />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">All Ingredients</h2>
          <Button asChild>
            <Link href="/ingredients/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Ingredient
            </Link>
          </Button>
        </div>

        <DataTable columns={columns} data={ingredients} />
      </main>
    </div>
  )
}
