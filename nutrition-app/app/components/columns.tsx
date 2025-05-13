"use client";

import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "component_id",
    header: "ID",
  },
  {
    accessorKey: "meal_id",
    header: "Meal ID",
  },
  {
    accessorKey: "component_name",
    header: "Name",
  },
  {
    accessorKey: "base_quantity_g",
    header: "Base Quantity (g)",
    cell: ({ row }) => Number(row.original.base_quantity_g),
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