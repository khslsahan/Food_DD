import { getIngredients } from "@/lib/data";
import { Header } from "@/components/layout/header";

export default async function IngredientEditPage({ params }: { params: { ingredient_id: string } }) {
  const ingredientId = Number(params.ingredient_id);
  const ingredients = await getIngredients();
  const ingredient = ingredients.find(i => i.ingredient_id === ingredientId);
  if (!ingredient) return <div>Ingredient not found.</div>;

  return (
    <div className="flex flex-col min-h-screen p-6">
      <Header title="Edit Ingredient" description={`Edit details for ingredient: ${ingredient.ingredient_name}`} />
      <div className="max-w-xl bg-blue-50 rounded shadow p-6 mt-6 flex flex-row items-start">
        <div className="w-2 h-full rounded-l bg-blue-600 mr-4" />
        <form action={`/api/ingredients/${ingredient.ingredient_id}`} method="POST" className="space-y-4 flex-1">
          <div>
            <label className="block font-semibold">Name</label>
            <input name="ingredient_name" defaultValue={ingredient.ingredient_name} className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Default Unit</label>
            <input name="default_unit" defaultValue={ingredient.default_unit} className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Calories (per 100g)</label>
            <input name="calories_per_100g" type="number" step="any" defaultValue={ingredient.calories_per_100g} className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Fat (g)</label>
            <input name="fat_g" type="number" step="any" defaultValue={ingredient.fat_g} className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Protein (g)</label>
            <input name="protein_g" type="number" step="any" defaultValue={ingredient.protein_g} className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Carbohydrates (g)</label>
            <input name="carbohydrates_g" type="number" step="any" defaultValue={ingredient.carbohydrates_g} className="border rounded px-2 py-1 w-full" required />
          </div>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save Changes</button>
        </form>
      </div>
    </div>
  );
} 