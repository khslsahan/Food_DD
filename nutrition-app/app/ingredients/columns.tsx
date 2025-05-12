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
import type { Ingredient } from "@/lib/types"

export const columns: ColumnDef<Ingredient>[] = [
  {
    accessorKey: "ingredient_id",
    header: "ID",
    cell: ({ row }) => <div className="w-[40px]">{row.getValue("ingredient_id")}</div>,
  },
  {
    accessorKey: "ingredient_name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Ingredient Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("ingredient_name")}</div>,
  },
  {
    accessorKey: "default_unit",
    header: "Default Unit",
    cell: ({ row }) => <div>{row.getValue("default_unit")}</div>,
  },
  {
    accessorKey: "calories_per_100g",
    header: "Calories (per 100g)",
    cell: ({ row }) => <div>{row.getValue("calories_per_100g")}</div>,
  },
  {
    accessorKey: "protein_g",
    header: "Protein (g)",
    cell: ({ row }) => <div>{row.getValue("protein_g")}</div>,
  },
  {
    accessorKey: "fat_g",
    header: "Fat (g)",
    cell: ({ row }) => <div>{row.getValue("fat_g")}</div>,
  },
  {
    accessorKey: "carbohydrates_g",
    header: "Carbs (g)",
    cell: ({ row }) => <div>{row.getValue("carbohydrates_g")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ingredient = row.original

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
              <Link href={`/ingredients/${ingredient.ingredient_id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/ingredients/${ingredient.ingredient_id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
