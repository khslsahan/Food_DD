"use client"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { listenForUsageAlerts } from "@/lib/usage-alerts"

export function GlobalUsageAlertListener() {
  const { toast } = useToast()

  useEffect(() => {
    const cleanup = listenForUsageAlerts((event) => {
      const { ingredient, usageCount, meals } = event.detail
      
      toast({
        title: "🚨 Ingredient Usage Alert",
        description: (
          <div className="space-y-2">
            <p>
              <strong>"{ingredient}"</strong> is currently used in{" "}
              <span className="font-semibold text-orange-600">{usageCount} recipe(s)</span>
            </p>
            <p className="text-sm text-gray-600">
              Affected meals: {meals.join(', ')}
            </p>
            <p className="text-xs text-gray-500">
              This ingredient cannot be deleted while it's being used in recipes.
            </p>
          </div>
        ),
        variant: "destructive",
        duration: 8000, // Show for 8 seconds
      })
    })

    return cleanup
  }, [toast])

  // This component doesn't render anything visible
  return null
} 