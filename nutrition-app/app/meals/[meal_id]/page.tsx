import { notFound } from "next/navigation";
import { getMeals, getComponents, getRecipeIngredients, getIngredients } from "@/lib/data";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import BackButton from "@/components/layout/BackButton";
import AddComponentModalClientWrapper from "@/components/AddComponentModalClientWrapper";
import { EditComponentModal } from "@/components/EditComponentModal";
import ComponentListClient from "@/components/ComponentListClient";

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
          Calories: {ingredient.calories_per_100g ?? 0}, 
          Fat: {ingredient.fat_g ?? 0}g, 
          Protein: {ingredient.protein_g ?? 0}g, 
          Carbs: {ingredient.carbohydrates_g ?? 0}g
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

export default async function MealDetailsPage({ params }: { params: Promise<{ meal_id: string }> }) {
  const { meal_id } = await params;
  const mealId = Number(meal_id);
  const meals = await getMeals();
  const meal = meals.find((m) => m.meal_id === mealId);
  
  if (!meal) return notFound();

  const components = await getComponents(mealId);
  const ingredients = await getIngredients();
  const ingredientMap = new Map(ingredients.map(i => [i.ingredient_id, i]));
  // Fetch recipeIngredients for each component
  const componentsWithIngredients = await Promise.all(
    components.map(async (component) => {
      const recipeIngredients = await getRecipeIngredients(component.component_id);
      return { ...component, recipeIngredients };
    })
  );

  return (
    <div className="flex flex-col min-h-screen p-2 sm:p-4 md:p-6">
      <div className="mb-2"><BackButton href="/meals" /></div>
      <Header title={meal.meal_name} description={meal.description || ""} />
      {/* Info tags row, always show all three with positive/negative meaning */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 mt-6 sm:mt-8">
        <span className={`inline-flex items-center px-2 py-1 rounded text-xs sm:text-sm font-semibold ${meal.is_balanced ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {meal.is_balanced ? '✔ Balanced' : '✖ Not Balanced'}
        </span>
        <span className={`inline-flex items-center px-2 py-1 rounded text-xs sm:text-sm font-semibold ${meal.is_gourmet ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
          {meal.is_gourmet ? '🍽 Gourmet' : '🍽 Not Gourmet'}
        </span>
        <span className={`inline-flex items-center px-2 py-1 rounded text-xs sm:text-sm font-semibold ${meal.is_weight_loss ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
          {meal.is_weight_loss ? '🏃‍♂️ Weight Loss' : '🏃‍♂️ Not Weight Loss'}
        </span>
      </div>

      {/* Additional meal information */}
      {(meal.package || meal.objective || meal.item_code) && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold mb-3">Additional Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {meal.package && (
              <div>
                <span className="font-medium text-gray-700 text-sm">Package:</span>
                <p className="text-gray-900 text-sm sm:text-base break-words">{meal.package}</p>
              </div>
            )}
            {meal.objective && (
              <div>
                <span className="font-medium text-gray-700 text-sm">Objective:</span>
                <p className="text-gray-900 text-sm sm:text-base break-words">{meal.objective}</p>
              </div>
            )}
            {meal.item_code && (
              <div>
                <span className="font-medium text-gray-700 text-sm">Item Code:</span>
                <p className="text-gray-900 text-sm sm:text-base break-words">{meal.item_code}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Components</h2>
      <div className="mb-3 sm:mb-4">
        <AddComponentModalClientWrapper mealId={mealId} />
      </div>
      
      {componentsWithIngredients.length === 0 && (
        <div className="text-gray-500 italic">No components found.</div>
      )}

      <ComponentListClient
        components={componentsWithIngredients}
        ingredientMap={ingredientMap}
        mealId={mealId}
      />
    </div>
  );
}