"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Meal } from "@/lib/types"

export const columns: ColumnDef<Meal>[] = [
  {
    accessorKey: "meal_id",
    header: "ID",
    cell: ({ row }) => <div className="w-[40px]">{row.getValue("meal_id")}</div>,
  },
  {
    accessorKey: "meal_name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Meal Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("meal_name")}</div>,
  },
  {
    accessorKey: "serving_size",
    header: "Serving Size",
    cell: ({ row }) => <div>{row.getValue("serving_size")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "updated_at",
    header: "Last Updated",
    cell: ({ row }) => <div>{new Date(row.getValue("updated_at")).toLocaleDateString()}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const meal = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/meals/${meal.meal_id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/meals/${meal.meal_id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/meals/${meal.meal_id}/components`}>Manage Components</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/meals/${meal.meal_id}/portions`}>Manage Portions</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
