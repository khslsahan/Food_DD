"use client";

import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "component_id",
    header: "Component ID",
  },
  {
    accessorKey: "ingredient_id",
    header: "Ingredient ID",
  },
  {
    accessorKey: "raw_quantity_g",
    header: "Raw Quantity (g)",
    cell: ({ row }) => Number(row.original.raw_quantity_g),
  },
  {
    accessorKey: "cooked_quantity_g",
    header: "Cooked Quantity (g)",
    cell: ({ row }) => row.original.cooked_quantity_g !== null ? Number(row.original.cooked_quantity_g) : "",
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => row.original.created_at ? new Date(row.original.created_at).toLocaleString() : "",
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
    cell: ({ row }) => row.original.updated_at ? new Date(row.original.updated_at).toLocaleString() : "",
  },
] 