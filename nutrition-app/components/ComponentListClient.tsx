"use client";

import { useState } from "react";
import { EditComponentModal } from "./EditComponentModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface Ingredient {
  ingredient_id: number;
  ingredient_name: string;
  calories_per_100g: number;
  fat_g: number;
  protein_g: number;
  carbohydrates_g: number;
}

interface RecipeIngredient {
  recipe_ingredient_id: number;
  ingredient_id: number;
  quantity: number;
  raw_quantity_g: number;
}

interface ComponentPortion {
  label: string;
  total_weight_g: number;
}

interface Component {
  component_id: number;
  component_name: string;
  before_cook_weight_g: number;
  after_cook_weight_g: number;
  category?: {
    id: number;
    name: string;
  };
  category_id?: number;
  recipeIngredients: RecipeIngredient[];
  component_portions?: ComponentPortion[];
  portions?: ComponentPortion[];
}

interface ComponentListClientProps {
  components: Component[];
  ingredientMap: Map<number, Ingredient>;
  mealId: number;
}

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

function NutritionInfo({ ingredient, rawQuantity }: { ingredient: Ingredient; rawQuantity: number }) {
  const factor = rawQuantity / 100;
  const calc = {
    calories: (ingredient.calories_per_100g * factor).toFixed(2),
    fat: (ingredient.fat_g * factor).toFixed(2),
    protein: (ingredient.protein_g * factor).toFixed(2),
    carbs: (ingredient.carbohydrates_g * factor).toFixed(2),
  };
  return (
    <div className="ml-4 sm:ml-8 mt-2 text-xs sm:text-sm text-gray-700 bg-gray-100 rounded p-2 sm:p-3">
      <div>Raw: {rawQuantity}g</div>
      <div className="mb-1">
        <span className="font-semibold">Per 100g:</span> 
        <span className="font-mono text-xs sm:text-sm">
          Calories: {ingredient.calories_per_100g ?? 0}, 
          Fat: {ingredient.fat_g ?? 0}g, 
          Protein: {ingredient.protein_g ?? 0}g, 
          Carbs: {ingredient.carbohydrates_g ?? 0}g
        </span>
      </div>
      <div>
        <span className="font-semibold">For {rawQuantity}g:</span> 
        <span className="font-mono text-xs sm:text-sm">
          Calories: {calc.calories}, 
          Fat: {calc.fat}g, 
          Protein: {calc.protein}g, 
          Carbs: {calc.carbs}g
        </span>
      </div>
    </div>
  );
}

export default function ComponentListClient({ components, ingredientMap, mealId }: ComponentListClientProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editComponentData, setEditComponentData] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<number | null>(null);
  const router = useRouter();

  const handleEditClick = (component: Component) => {
    setEditComponentData({
      componentId: component.component_id,
      mealId: mealId,
      initialName: component.component_name,
      initialBeforeCookWeight: String(component.before_cook_weight_g),
      initialAfterCookWeight: String(component.after_cook_weight_g),
      initialIngredients: component.recipeIngredients.map((ri: RecipeIngredient) => {
        const ingredient = ingredientMap.get(ri.ingredient_id);
        const quantity = Number(ri.raw_quantity_g) || 0;
        const factor = quantity / 100;
        
        return {
          name: ingredient?.ingredient_name || '',
          quantity: String(ri.raw_quantity_g ?? '0'),
          calories: String((ingredient?.calories_per_100g ?? 0) * factor),
          fat: String((ingredient?.fat_g ?? 0) * factor),
          protein: String((ingredient?.protein_g ?? 0) * factor),
          carbohydrates: String((ingredient?.carbohydrates_g ?? 0) * factor),
        };
      }),
      initialPortions: (component.component_portions || []).map((p: ComponentPortion) => ({
        label: p.label,
        total_weight_g: String(p.total_weight_g),
      })),
      initialCategoryId: component.category?.id || component.category_id || "",
    });
    setEditModalOpen(true);
  };

  const handleDelete = async (componentId: number, componentName: string) => {
    try {
      const res = await fetch(`/api/components/${componentId}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Component deleted", description: `Component '${componentName}' was deleted.` });
        router.refresh();
      } else {
        toast({ title: "Error", description: "Failed to delete component.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to delete component.", variant: "destructive" });
    }
    setDeleteDialogOpen(null);
  };

  return (
    <>
      {components.map((component) => (
        <div key={component.component_id} className="mb-6 sm:mb-8 border rounded-lg p-3 sm:p-6 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center mb-2 gap-2 sm:gap-0">
            <div className="font-semibold text-lg sm:text-xl text-blue-700 break-words">{component.component_name}</div>
            {component.category && (
              <span className="sm:ml-4 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold w-fit">
                {component.category.name}
              </span>
            )}
            <div className="flex gap-2 sm:gap-0">
              <button
                className="hover:text-green-600"
                title="Edit Component"
                onClick={() => handleEditClick(component)}
              >
                <EditIcon />
              </button>
              <AlertDialog open={deleteDialogOpen === component.component_id} onOpenChange={open => setDeleteDialogOpen(open ? component.component_id : null)}>
                <AlertDialogTrigger asChild>
                  <button className="text-red-600 hover:text-red-800" title="Delete Component" onClick={e => { e.preventDefault(); setDeleteDialogOpen(component.component_id); }}>
                    🗑️
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Component?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete <b>{component.component_name}</b>? This will also delete all related data. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(component.component_id, component.component_name)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
            Before Cook Weight: {component.before_cook_weight_g ? Number(component.before_cook_weight_g) : ""}g<br />
            After Cook Weight: {component.after_cook_weight_g ? Number(component.after_cook_weight_g) : ""}g
          </div>
          {(component.portions || component.component_portions) && ((component.portions?.length || 0) > 0 || (component.component_portions?.length || 0) > 0) && (
            <div className="mb-2 text-xs sm:text-sm text-gray-700">
              <strong>Portion Sizes:</strong>
              <ul>
                {(component.portions || component.component_portions || []).map((portion, idx) => (
                  <li key={`${component.component_id}-portion-${idx}-${portion.label}-${portion.total_weight_g}`}>
                    {portion.label}: {Number(portion.total_weight_g)}g
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-base sm:text-lg">Ingredients:</h3>
            {component.recipeIngredients && component.recipeIngredients.length === 0 ? (
              <div className="text-gray-500 italic ml-2">No ingredients found.</div>
            ) : (
              <ul className="space-y-3 sm:space-y-4">
                {component.recipeIngredients && component.recipeIngredients.map((ri) => {
                  const ingredient = ingredientMap.get(ri.ingredient_id);
                  return (
                    <li key={ri.ingredient_id}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 rounded-lg shadow-sm border-l-4 border-blue-400 p-3 sm:px-6 sm:py-4 gap-2 sm:gap-0">
                        <div className="flex items-center min-w-0">
                          <span className="font-semibold text-base sm:text-lg truncate">
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
      ))}

      <AlertDialog open={deleteDialogOpen !== null} onOpenChange={() => setDeleteDialogOpen(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the component.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteDialogOpen && handleDelete(deleteDialogOpen, "Component")}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {editModalOpen && editComponentData && (
        <EditComponentModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          componentId={editComponentData.componentId}
          mealId={editComponentData.mealId}
          initialName={editComponentData.initialName}
          initialBeforeCookWeight={editComponentData.initialBeforeCookWeight}
          initialAfterCookWeight={editComponentData.initialAfterCookWeight}
          initialIngredients={editComponentData.initialIngredients}
          initialPortions={editComponentData.initialPortions}
          initialCategoryId={editComponentData.initialCategoryId}
        />
      )}
    </>
  );
} 