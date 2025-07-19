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
          <div className="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-2 gap-2">
            <div className="font-semibold text-lg sm:text-xl text-blue-700 break-words">{component.component_name}</div>
            {component.category && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold w-fit">
                {component.category.name}
              </span>
            )}
            <button
              className="hover:text-green-600 self-start sm:self-auto"
              title="Edit Component"
              onClick={() => handleEditClick(component)}
            >
              <EditIcon />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Before Cook:</span>
              <span className="ml-2">{component.before_cook_weight_g}g</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">After Cook:</span>
              <span className="ml-2">{component.after_cook_weight_g}g</span>
            </div>
          </div>
          
          <div className="mb-3 sm:mb-4">
            <h4 className="font-medium text-gray-800 mb-2 sm:mb-3">Ingredients:</h4>
            <div className="space-y-2 sm:space-y-3">
              {component.recipeIngredients.map((recipeIngredient) => {
                const ingredient = ingredientMap.get(recipeIngredient.ingredient_id);
                return (
                  <div key={recipeIngredient.recipe_ingredient_id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 break-words">
                        {ingredient?.ingredient_name || 'Unknown Ingredient'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {recipeIngredient.quantity}g
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-sm">
                      <div className="flex gap-2 sm:gap-4">
                        <span className="text-gray-600">Cal:</span>
                        <span className="font-medium">{ingredient?.calories_per_100g || 0}</span>
                      </div>
                      <div className="flex gap-2 sm:gap-4">
                        <span className="text-gray-600">Fat:</span>
                        <span className="font-medium">{ingredient?.fat_g || 0}g</span>
                      </div>
                      <div className="flex gap-2 sm:gap-4">
                        <span className="text-gray-600">Prot:</span>
                        <span className="font-medium">{ingredient?.protein_g || 0}g</span>
                      </div>
                      <div className="flex gap-2 sm:gap-4">
                        <span className="text-gray-600">Carb:</span>
                        <span className="font-medium">{ingredient?.carbohydrates_g || 0}g</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {(component.portions || component.component_portions) && ((component.portions?.length || 0) > 0 || (component.component_portions?.length || 0) > 0) && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2 sm:mb-3">Portion Sizes:</h4>
              <div className="space-y-2">
                {(component.portions || component.component_portions || []).map((portion, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-800">{portion.label}</span>
                    <span className="text-blue-600">{portion.total_weight_g}g</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-3 sm:mt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEditClick(component)}
              className="flex-1 sm:flex-none"
            >
              Edit Component
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(component.component_id)}
              className="flex-1 sm:flex-none"
            >
              Delete
            </Button>
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