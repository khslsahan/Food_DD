"use client";

import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "portion_id",
    header: "ID",
  },
  {
    accessorKey: "meal_id",
    header: "Meal ID",
  },
  {
    accessorKey: "size_name",
    header: "Size Name",
  },
  {
    accessorKey: "multiplier",
    header: "Multiplier",
    cell: ({ row }) => Number(row.original.multiplier),
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