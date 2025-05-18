"use client";
import EdamamCard from "./EdamamCard";

export default function EditIngredientClient({ ingredient }: { ingredient: any }) {
  return (
    <div className="flex flex-row max-w-5xl mt-6">
      <div className="max-w-xl bg-blue-50 rounded shadow p-6 flex-1">
        <form id="ingredient-edit-form" action={`/api/ingredients/${ingredient.ingredient_id}`} method="POST" className="space-y-4">
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
            <input id="calories_per_100g" name="calories_per_100g" type="number" step="any" defaultValue={ingredient.calories_per_100g} className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Fat (g)</label>
            <input id="fat_g" name="fat_g" type="number" step="any" defaultValue={ingredient.fat_g} className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Protein (g)</label>
            <input id="protein_g" name="protein_g" type="number" step="any" defaultValue={ingredient.protein_g} className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Carbohydrates (g)</label>
            <input id="carbohydrates_g" name="carbohydrates_g" type="number" step="any" defaultValue={ingredient.carbohydrates_g} className="border rounded px-2 py-1 w-full" required />
          </div>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save Changes</button>
        </form>
      </div>
      <EdamamCard
        defaultQuery={`100g ${ingredient.ingredient_name}`}
        onCopy={(values) => {
          if (typeof document !== "undefined") {
            (document.getElementById("calories_per_100g") as HTMLInputElement).value = String(values.calories);
            (document.getElementById("fat_g") as HTMLInputElement).value = String(values.fat);
            (document.getElementById("protein_g") as HTMLInputElement).value = String(values.protein);
            (document.getElementById("carbohydrates_g") as HTMLInputElement).value = String(values.carbs);
          }
        }}
      />
    </div>
  );
} 