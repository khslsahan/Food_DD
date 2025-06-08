export const dynamic = "force-dynamic"

import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { getMeals } from "@/lib/data"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default async function MealsPage() {
  const meals = await getMeals()

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Meals" description="Manage your meal recipes" />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">All Meals</h2>
          <Button asChild>
            <Link href="/meals/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Meal
            </Link>
          </Button>
        </div>

        <DataTable columns={columns} data={meals} />
      </main>
    </div>
  )
}
