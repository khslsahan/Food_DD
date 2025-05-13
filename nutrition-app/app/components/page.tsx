import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { getComponents } from "@/lib/data"
import { DataTable } from "../meals/data-table"
import { columns } from "./columns"

export default async function ComponentsPage() {
  const components = await getComponents()

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Components" description="Manage your recipe components" />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">All Components</h2>
          <Button asChild>
            <Link href="/components/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Component
            </Link>
          </Button>
        </div>

        <DataTable columns={columns} data={components} filterColumn="component_name" />
      </main>
    </div>
  )
} 