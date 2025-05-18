import { getIngredients } from "@/lib/data";
import { Header } from "@/components/layout/header";
import EditIngredientClient from "./EditIngredientClient";
import BackButton from "@/components/layout/BackButton";

export default async function IngredientEditPage(props: { params: { ingredient_id: string } }) {
  const { params } = props;
  const ingredientId = Number(params.ingredient_id);
  const ingredients = await getIngredients();
  const ingredient = ingredients.find(i => i.ingredient_id === ingredientId);
  if (!ingredient) return <div>Ingredient not found.</div>;

  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="mb-2"><BackButton href="/ingredients" /></div>
      <Header title="Edit Ingredient" description={`Edit details for ingredient: ${ingredient.ingredient_name}`} />
      <EditIngredientClient ingredient={ingredient} />
    </div>
  );
} 