import { notFound } from "next/navigation";
import { getMeals, getComponents, getRecipeIngredients, getIngredients } from "@/lib/data";
import { Header } from "@/components/layout/header";

export default async function MealDetailsPage({ params }: { params: { meal_id: string } }) {
  const mealId = Number(params.meal_id);
  const meals = await getMeals();
  const meal = meals.find((m) => m.meal_id === mealId);
  if (!meal) return notFound();

  const components = await getComponents(mealId);
  const ingredients = await getIngredients();
  const ingredientMap = new Map(ingredients.map(i => [i.ingredient_id, i]));

  return (
    <div className="flex flex-col min-h-screen p-6">
      <Header title={meal.meal_name} description={meal.description || ""} />
      <div className="mb-4">
        <strong>Serving Size:</strong> {meal.serving_size}
      </div>
      <h2 className="text-lg font-bold mb-2">Components</h2>
      {components.length === 0 && <div>No components found.</div>}
      {await Promise.all(components.map(async (component) => {
        const recipeIngredients = await getRecipeIngredients(component.component_id);
        return (
          <div key={component.component_id} className="mb-6 border rounded p-4">
            <div className="font-semibold">{component.component_name}</div>
            <div>Base Quantity: {component.base_quantity_g} g</div>
            <div className="mt-2">
              <strong>Ingredients:</strong>
              {recipeIngredients.length === 0 ? (
                <div className="ml-2">No ingredients found.</div>
              ) : (
                <ul className="ml-4 list-disc">
                  {recipeIngredients.map((ri) => {
                    const ing = ingredientMap.get(ri.ingredient_id);
                    let calc = null;
                    if (ing) {
                      const factor = ri.raw_quantity_g / 100;
                      calc = {
                        calories: (ing.calories_per_100g * factor).toFixed(2),
                        fat: (ing.fat_g * factor).toFixed(2),
                        protein: (ing.protein_g * factor).toFixed(2),
                        carbs: (ing.carbohydrates_g * factor).toFixed(2),
                      };
                    }
                    return (
                      <li key={ri.ingredient_id} className="mb-2">
                        <div><strong>{ing?.ingredient_name || `Ingredient ID: ${ri.ingredient_id}`}</strong></div>
                        <div>Raw: {ri.raw_quantity_g}g{ri.cooked_quantity_g ? `, Cooked: ${ri.cooked_quantity_g}g` : ""}</div>
                        {ing && (
                          <div className="text-sm text-gray-600">
                            <div>Per 100g: Calories: {ing.calories_per_100g}, Fat: {ing.fat_g}g, Protein: {ing.protein_g}g, Carbs: {ing.carbohydrates_g}g</div>
                            <div>For {ri.raw_quantity_g}g: Calories: {calc?.calories}, Fat: {calc?.fat}g, Protein: {calc?.protein}g, Carbs: {calc?.carbs}g</div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        );
      }))}
    </div>
  );
} 