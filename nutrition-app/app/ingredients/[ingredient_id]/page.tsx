import { getIngredients } from "@/lib/data";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import BackButton from "@/components/layout/BackButton";
import { IngredientUsageAlert } from "@/components/IngredientUsageAlert";

export default async function IngredientViewPage({ params }: { params: { ingredient_id: string } }) {
  const ingredientId = Number(params.ingredient_id);
  const ingredients = await getIngredients();
  const ingredient = ingredients.find(i => i.ingredient_id === ingredientId);
  if (!ingredient) return <div>Ingredient not found.</div>;

  // Format dates for display
  const createdAt = ingredient.created_at instanceof Date ? ingredient.created_at.toLocaleString() : String(ingredient.created_at);
  const updatedAt = ingredient.updated_at instanceof Date ? ingredient.updated_at.toLocaleString() : String(ingredient.updated_at);

  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="mb-2"><BackButton href="/ingredients" /></div>
      <Header title="Ingredient Details" description={`View details for ingredient: ${ingredient.ingredient_name}`} />
      
      {/* Usage Alert */}
      <div className="mb-6">
        <IngredientUsageAlert 
          ingredientId={ingredient.ingredient_id} 
          ingredientName={ingredient.ingredient_name}
        />
      </div>
      
      <div className="max-w-xl bg-blue-50 rounded shadow p-6 mt-6 flex flex-row items-start">
        <div className="w-2 h-full rounded-l bg-blue-600 mr-4" />
        <div className="flex-1">
          <div className="mb-2"><strong>Name:</strong> {ingredient.ingredient_name}</div>
          <div className="mb-2"><strong>Default Unit:</strong> {ingredient.default_unit}</div>
          <div className="mb-2"><strong>Calories (per 100g):</strong> {ingredient.calories_per_100g}</div>
          <div className="mb-2"><strong>Fat (g):</strong> {ingredient.fat_g}</div>
          <div className="mb-2"><strong>Protein (g):</strong> {ingredient.protein_g}</div>
          <div className="mb-2"><strong>Carbohydrates (g):</strong> {ingredient.carbohydrates_g}</div>
          <div className="mb-2 text-xs text-gray-500"><strong>Created:</strong> {createdAt}</div>
          <div className="mb-4 text-xs text-gray-500"><strong>Updated:</strong> {updatedAt}</div>
          <Link href={`/ingredients/${ingredient.ingredient_id}/edit`} className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Edit Ingredient</Link>
        </div>
      </div>
    </div>
  );
} 