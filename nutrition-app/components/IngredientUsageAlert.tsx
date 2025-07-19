"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, ChefHat, Package, ExternalLink, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"

interface UsageInfo {
  ingredient: {
    ingredient_id: number
    ingredient_name: string
    default_unit: string
  }
  isUsed: boolean
  usageCount: number
  usageDetails: Array<{
    meal_name: string
    meal_id: number
    components: Array<{
      component_name: string
      component_id: number
      quantity: number
    }>
  }>
}

interface IngredientUsageAlertProps {
  ingredientId: number
  ingredientName: string
  showAlert?: boolean
  onUsageCheck?: (usageInfo: UsageInfo) => void
  triggerCheck?: boolean // New prop to trigger manual checks
}

export function IngredientUsageAlert({ 
  ingredientId, 
  ingredientName, 
  showAlert = true,
  onUsageCheck,
  triggerCheck = false
}: IngredientUsageAlertProps) {
  const [usageInfo, setUsageInfo] = useState<UsageInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkUsage = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/ingredients/${ingredientId}/usage`)
      if (response.ok) {
        const data = await response.json()
        setUsageInfo(data)
        onUsageCheck?.(data)
        
        // Show alert if ingredient is used
        if (data.isUsed) {
          console.log(`🚨 ALERT: Ingredient "${ingredientName}" is used in ${data.usageCount} recipe(s)`)
        }
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to fetch usage info')
        console.error('Failed to fetch usage info:', errorData)
      }
    } catch (error) {
      setError('Network error occurred')
      console.error('Error checking ingredient usage:', error)
    } finally {
      setLoading(false)
    }
  }

  // Manual trigger for usage check
  useEffect(() => {
    if (triggerCheck) {
      checkUsage()
    }
  }, [triggerCheck])

  // Auto-check on mount
  useEffect(() => {
    if (showAlert) {
      checkUsage()
    }
  }, [ingredientId, showAlert])

  // Show loading state
  if (loading) {
    return (
      <Alert className="border-blue-200 bg-blue-50">
        <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
        <AlertTitle className="text-blue-800">Checking Usage...</AlertTitle>
        <AlertDescription className="text-blue-700">
          Checking if this ingredient is used in any recipes...
        </AlertDescription>
      </Alert>
    )
  }

  // Show error state
  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800">Error</AlertTitle>
        <AlertDescription className="text-red-700">
          {error}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkUsage}
            className="ml-2"
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!usageInfo) {
    return null
  }

  if (!usageInfo.isUsed) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <ChefHat className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">No Usage Found</AlertTitle>
        <AlertDescription className="text-green-700">
          This ingredient is not currently used in any recipes or meals.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <AlertTriangle className="h-4 w-4 text-orange-600" />
      <AlertTitle className="text-orange-800">🚨 Ingredient Usage Alert</AlertTitle>
      <AlertDescription className="text-orange-700">
        <div className="space-y-3">
          <p>
            <strong>"{ingredientName}"</strong> is currently used in{" "}
            <Badge variant="secondary" className="text-orange-700">
              {usageInfo.usageCount} recipe(s)
            </Badge>{" "}
            across{" "}
            <Badge variant="secondary" className="text-orange-700">
              {usageInfo.usageDetails.length} meal(s)
            </Badge>
          </p>
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="text-orange-700 border-orange-300">
                {isOpen ? "Hide Details" : "Show Usage Details"}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="space-y-3">
                {usageInfo.usageDetails.map((meal) => (
                  <Card key={meal.meal_id} className="border-orange-200 bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span className="text-orange-800">
                          <Package className="h-4 w-4 inline mr-1" />
                          {meal.meal_name}
                        </span>
                        <Link href={`/meals/${meal.meal_id}`}>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {meal.components.map((component) => (
                          <div key={component.component_id} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">
                              • {component.component_name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {component.quantity}g
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="text-xs text-orange-600 mt-2">
            <strong>Note:</strong> This ingredient cannot be deleted while it's being used in recipes. 
            Remove it from all recipes first if you want to delete it.
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
} 