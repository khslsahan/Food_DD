"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import type { Ingredient } from "@/lib/types"
import { checkIngredientUsage } from "@/lib/usage-alerts"

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
    id: "usage_status",
    header: "Usage Status",
    cell: ({ row }) => {
      const ingredient = row.original
      const [usageInfo, setUsageInfo] = useState<any>(null)
      const [loading, setLoading] = useState(true)

      useEffect(() => {
        const checkUsage = async () => {
          try {
            const response = await fetch(`/api/ingredients/${ingredient.ingredient_id}/usage`)
            if (response.ok) {
              const data = await response.json()
              setUsageInfo(data)
            }
          } catch (error) {
            console.error('Error checking usage:', error)
          } finally {
            setLoading(false)
          }
        }
        checkUsage()
      }, [ingredient.ingredient_id])

      if (loading) {
        return <div className="text-gray-400">Loading...</div>
      }

      if (!usageInfo) {
        return <div className="text-gray-400">Unknown</div>
      }

      if (usageInfo.isUsed) {
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-orange-700">
              Used in {usageInfo.usageCount} recipe(s)
            </span>
          </div>
        )
      }

      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-green-700">Not used</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ingredient = row.original
      const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
      const [isDeleting, setIsDeleting] = useState(false)
      const [usageAlertOpen, setUsageAlertOpen] = useState(false)
      const [usageInfo, setUsageInfo] = useState<any>(null)
      const router = useRouter()
      const { toast } = useToast()

      const handleDelete = async () => {
        setIsDeleting(true)
        try {
          console.log('🔍 Checking usage for ingredient:', ingredient.ingredient_name, 'ID:', ingredient.ingredient_id)
          
          // First check usage and trigger alert if used
          const usageData = await checkIngredientUsage(ingredient.ingredient_id)
          console.log('📊 Usage info received:', usageData)
          
          if (usageData && usageData.isUsed) {
            console.log('🚨 Ingredient is used, showing alert...')
            
            // Set usage info and show custom alert
            setUsageInfo(usageData)
            setUsageAlertOpen(true)
            
            setIsDeleting(false)
            setDeleteDialogOpen(false)
            return
          }
          
          console.log('✅ Ingredient is not used, proceeding with deletion...')
          const response = await fetch(`/api/ingredients/${ingredient.ingredient_id}`, {
            method: 'DELETE',
          })

          if (response.ok) {
            toast({
              title: "Ingredient deleted",
              description: `"${ingredient.ingredient_name}" has been successfully deleted.`,
            })
            router.refresh()
          } else {
            const error = await response.json()
            console.log('❌ Delete API error:', error)
            toast({
              title: "Cannot delete ingredient",
              description: error.error || "This ingredient cannot be deleted because it is used in recipes.",
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error('💥 Delete function error:', error)
          toast({
            title: "Error",
            description: "An unexpected error occurred while deleting the ingredient",
            variant: "destructive",
          })
        } finally {
          setIsDeleting(false)
          setDeleteDialogOpen(false)
        }
      }

      return (
        <>
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
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  toast({
                    title: "Test Toast",
                    description: "This is a test toast notification to verify the system is working.",
                    variant: "default",
                  })
                }}
              >
                Test Toast
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Ingredient</AlertDialogTitle>
                <div className="text-sm text-muted-foreground">
                  Are you sure you want to delete <strong>"{ingredient.ingredient_name}"</strong>?
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Beautiful Usage Alert Modal */}
          <AlertDialog open={usageAlertOpen} onOpenChange={setUsageAlertOpen}>
            <AlertDialogContent className="max-w-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-orange-600">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-lg">🚨</span>
                  </div>
                  Ingredient Usage Alert
                </AlertDialogTitle>
                <div className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-orange-800 font-medium">
                      <strong>"{ingredient.ingredient_name}"</strong> cannot be deleted because it is currently being used in your recipes.
                    </p>
                  </div>
                  
                  {usageInfo && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="font-medium text-gray-700">
                            Used in {usageInfo.usageCount} recipe(s)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="font-medium text-gray-700">
                            Across {usageInfo.usageDetails.length} meal(s)
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                          <h4 className="font-medium text-gray-700">Affected Meals & Components</h4>
                        </div>
                        <div className="p-4 space-y-3">
                          {usageInfo.usageDetails.map((meal: any) => (
                            <div key={meal.meal_id} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-800 flex items-center gap-2">
                                  <span className="text-blue-600">🍽️</span>
                                  {meal.meal_name}
                                </h5>
                                <Link 
                                  href={`/meals/${meal.meal_id}`}
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  View Meal →
                                </Link>
                              </div>
                              <div className="space-y-1">
                                {meal.components.map((component: any) => (
                                  <div key={component.component_id} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 flex items-center gap-2">
                                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                      {component.component_name}
                                    </span>
                                    <span className="text-gray-500 font-mono">
                                      {component.quantity}g
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-yellow-800 text-sm">
                          <strong>Note:</strong> To delete this ingredient, you must first remove it from all recipes above.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel 
                  onClick={() => setUsageAlertOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Got it
                </AlertDialogCancel>
                <Button
                  onClick={() => {
                    setUsageAlertOpen(false)
                    // Optionally navigate to the first affected meal
                    if (usageInfo?.usageDetails?.[0]?.meal_id) {
                      router.push(`/meals/${usageInfo.usageDetails[0].meal_id}`)
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  View First Meal
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )
    },
  },
]
