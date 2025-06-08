export const dynamic = "force-dynamic"

import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { getPortionOptions } from "@/lib/data"
import { DataTable } from "../meals/data-table"
import { columns } from "./columns"

export default async function PortionOptionsPage() {
  const portionOptions = await getPortionOptions()

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Portion Options" description="Manage your portion options" />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">All Portion Options</h2>
          <Button asChild>
            <Link href="/portion-options/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Portion Option
            </Link>
          </Button>
        </div>

        <DataTable columns={columns} data={portionOptions} filterColumn="size_name" />
      </main>
    </div>
  )
} 