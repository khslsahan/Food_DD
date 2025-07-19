// Utility functions for ingredient usage alerts

export interface UsageAlertInfo {
  ingredient_id: number
  ingredient_name: string
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

/**
 * Check ingredient usage and trigger alert if used
 */
export async function checkIngredientUsage(ingredientId: number): Promise<UsageAlertInfo | null> {
  try {
    const response = await fetch(`/api/ingredients/${ingredientId}/usage`)
    
    if (response.ok) {
      const data = await response.json()
      
      // Trigger alert if ingredient is used
      if (data.isUsed) {
        triggerUsageAlert(data)
      }
      
      return data
    } else {
      console.error('Failed to check ingredient usage:', response.status)
      return null
    }
  } catch (error) {
    console.error('Error checking ingredient usage:', error)
    return null
  }
}

/**
 * Trigger a usage alert for an ingredient
 */
export function triggerUsageAlert(usageInfo: UsageAlertInfo) {
  // Create a custom event to trigger alerts
  const alertEvent = new CustomEvent('ingredient-usage-alert', {
    detail: {
      type: 'usage-alert',
      ingredient: usageInfo.ingredient_name,
      usageCount: usageInfo.usageCount,
      meals: usageInfo.usageDetails.map(m => m.meal_name),
      timestamp: new Date().toISOString()
    }
  })
  
  // Dispatch the event
  window.dispatchEvent(alertEvent)
  
  // Also log to console for debugging
  console.log(`🚨 USAGE ALERT: "${usageInfo.ingredient_name}" is used in ${usageInfo.usageCount} recipe(s)`)
  console.log('Affected meals:', usageInfo.usageDetails.map(m => m.meal_name))
}

/**
 * Listen for usage alert events
 */
export function listenForUsageAlerts(callback: (event: CustomEvent) => void) {
  const handleEvent = (event: CustomEvent) => {
    if (event.detail.type === 'usage-alert') {
      callback(event)
    }
  }
  
  window.addEventListener('ingredient-usage-alert', handleEvent as EventListener)
  
  // Return cleanup function
  return () => {
    window.removeEventListener('ingredient-usage-alert', handleEvent as EventListener)
  }
}

/**
 * Show a toast notification for usage alerts
 */
export function showUsageAlertToast(usageInfo: UsageAlertInfo) {
  // This can be used with your toast system
  const message = `🚨 "${usageInfo.ingredient_name}" is used in ${usageInfo.usageCount} recipe(s) across ${usageInfo.usageDetails.length} meal(s)`
  
  // You can integrate this with your toast system
  console.log('TOAST:', message)
  
  return message
} 