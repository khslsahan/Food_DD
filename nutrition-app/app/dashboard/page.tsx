import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { getIngredients, getMeals } from "@/lib/data"
import { Apple, ChefHat, Salad } from "lucide-react"

export default async function DashboardPage() {
  const meals = await getMeals()
  const ingredients = await getIngredients()

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Dashboard" description="Overview of your nutrition management system" />

      <main className="flex-1 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
              <Salad className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{meals.length}</div>
              <p className="text-xs text-muted-foreground">Recipes in your collection</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Ingredients</CardTitle>
              <Apple className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ingredients.length}</div>
              <p className="text-xs text-muted-foreground">Ingredients in your database</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Components</CardTitle>
              <ChefHat className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Recipe components created</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 mt-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Meals</CardTitle>
              <CardDescription>Recently added or updated meals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meals.slice(0, 5).map((meal) => (
                  <div key={meal.meal_id} className="flex items-center gap-4">
                    <div className="rounded-full bg-secondary p-2">
                      <Salad className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{meal.meal_name}</p>
                      <p className="text-sm text-muted-foreground">{meal.description || "No description"}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {meal.updated_at ? new Date(meal.updated_at).toLocaleDateString() : "Unknown"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Ingredients</CardTitle>
              <CardDescription>Recently added or updated ingredients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ingredients.slice(0, 5).map((ingredient) => (
                  <div key={ingredient.ingredient_id} className="flex items-center gap-4">
                    <div className="rounded-full bg-secondary p-2">
                      <Apple className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{ingredient.ingredient_name}</p>
                      <p className="text-sm text-muted-foreground">{ingredient.calories_per_100g} kcal/100g</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {ingredient.updated_at ? new Date(ingredient.updated_at).toLocaleDateString() : "Unknown"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
