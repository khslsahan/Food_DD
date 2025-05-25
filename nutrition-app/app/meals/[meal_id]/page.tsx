import { notFound } from "next/navigation";
import { getMeals, getComponents, getRecipeIngredients, getIngredients } from "@/lib/data";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import BackButton from "@/components/layout/BackButton";
import AddComponentModalClientWrapper from "@/components/AddComponentModalClientWrapper";

function ViewIcon() {
  return (
    <svg className="inline-block ml-2 mr-1" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M2.05 12C3.81 7.61 7.92 4.5 12 4.5s8.19 3.11 9.95 7.5c-1.76 4.39-5.87 7.5-9.95 7.5s-8.19-3.11-9.95-7.5z"/></svg>
  );
}

function EditIcon() {
  return (
    <svg className="inline-block ml-1" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 1 1 2.828 2.828L11.828 15.828a2 2 0 0 1-2.828 0L9 13z"/><path d="M16 21H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7"/></svg>
  );
}

function NutritionInfo({ ingredient, rawQuantity }: { ingredient: any, rawQuantity: number }) {
  const factor = rawQuantity / 100;
  const calc = {
    calories: (ingredient.calories_per_100g * factor).toFixed(2),
    fat: (ingredient.fat_g * factor).toFixed(2),
    protein: (ingredient.protein_g * factor).toFixed(2),
    carbs: (ingredient.carbohydrates_g * factor).toFixed(2),
  };

  return (
    <div className="ml-8 mt-2 text-sm text-gray-700 bg-gray-100 rounded p-3">
      <div>Raw: {rawQuantity}g</div>
      <div className="mb-1">
        <span className="font-semibold">Per 100g:</span> 
        <span className="font-mono">
          Calories: {ingredient.calories_per_100g}, 
          Fat: {ingredient.fat_g}g, 
          Protein: {ingredient.protein_g}g, 
          Carbs: {ingredient.carbohydrates_g}g
        </span>
      </div>
      <div>
        <span className="font-semibold">For {rawQuantity}g:</span> 
        <span className="font-mono">
          Calories: {calc.calories}, 
          Fat: {calc.fat}g, 
          Protein: {calc.protein}g, 
          Carbs: {calc.carbs}g
        </span>
      </div>
    </div>
  );
}

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
      <div className="mb-2"><BackButton href="/meals" /></div>
      <Header title={meal.meal_name} description={meal.description || ""} />
      
      <h2 className="text-xl font-bold mb-4">Components</h2>
      <div className="mb-4">
        <AddComponentModalClientWrapper mealId={mealId} />
      </div>
      
      {components.length === 0 && (
        <div className="text-gray-500 italic">No components found.</div>
      )}

      {await Promise.all(components.map(async (component) => {
        const recipeIngredients = await getRecipeIngredients(component.component_id);
        
        return (
          <div key={component.component_id} className="mb-8 border rounded-lg p-6 bg-white shadow-sm">
            <div className="font-semibold text-xl mb-2 text-blue-700">{component.component_name}</div>
            <div className="mb-4 text-sm text-gray-600">
              Before Cook Weight: {component.before_cook_weight_g ? Number(component.before_cook_weight_g) : ""}g<br />
              After Cook Weight: {component.after_cook_weight_g ? Number(component.after_cook_weight_g) : ""}g
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Ingredients:</h3>
              
              {recipeIngredients.length === 0 ? (
                <div className="text-gray-500 italic ml-2">No ingredients found.</div>
              ) : (
                <ul className="space-y-4">
                  {recipeIngredients.map((ri) => {
                    const ingredient = ingredientMap.get(ri.ingredient_id);
                    
                    return (
                      <li key={ri.ingredient_id}>
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg shadow-sm border-l-4 border-blue-400 px-6 py-4">
                          <div className="flex items-center min-w-0">
                            <span className="font-semibold text-lg truncate">
                              {ingredient?.ingredient_name || `Ingredient ID: ${ri.ingredient_id}`}
                            </span>
                          </div>
                          {ingredient && (
                            <div className="flex items-center space-x-2">
                              <Link href={`/ingredients/${ingredient.ingredient_id}`} className="hover:text-blue-600" title="View Ingredient">
                                <ViewIcon />
                              </Link>
                              <Link href={`/ingredients/${ingredient.ingredient_id}/edit`} className="hover:text-green-600" title="Edit Ingredient">
                                <EditIcon />
                              </Link>
                            </div>
                          )}
                        </div>
                        
                        {ingredient && (
                          <NutritionInfo ingredient={ingredient} rawQuantity={ri.raw_quantity_g} />
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