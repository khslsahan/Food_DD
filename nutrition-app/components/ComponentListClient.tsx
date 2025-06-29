"use client";

import { useState } from "react";
import { EditComponentModal } from "./EditComponentModal";
import Link from "next/link";

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

function NutritionInfo({ ingredient, rawQuantity }) {
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

export default function ComponentListClient({ components, ingredientMap, mealId }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editComponentData, setEditComponentData] = useState(null);

  const handleEditClick = (component) => {
    setEditComponentData({
      componentId: component.component_id,
      mealId: mealId,
      initialName: component.component_name,
      initialBeforeCookWeight: String(component.before_cook_weight_g),
      initialAfterCookWeight: String(component.after_cook_weight_g),
      initialIngredients: component.recipeIngredients.map(ri => ({
        name: ingredientMap.get(ri.ingredient_id)?.ingredient_name || '',
        quantity: String(ri.raw_quantity_g ?? '0'),
        calories: String(ingredientMap.get(ri.ingredient_id)?.calories_per_100g ?? '0'),
        fat: String(ingredientMap.get(ri.ingredient_id)?.fat_g ?? '0'),
        protein: String(ingredientMap.get(ri.ingredient_id)?.protein_g ?? '0'),
        carbohydrates: String(ingredientMap.get(ri.ingredient_id)?.carbohydrates_g ?? '0'),
      })),
      initialPortions: (component.component_portions || []).map(p => ({
        label: p.label,
        total_weight_g: String(p.total_weight_g),
      })),
      initialCategoryId: component.category?.id || component.category_id || "",
    });
    setEditModalOpen(true);
  };

  return (
    <>
      {components.map((component) => (
        <div key={component.component_id} className="mb-8 border rounded-lg p-6 bg-white shadow-sm">
          <div className="flex items-center mb-2">
            <div className="font-semibold text-xl text-blue-700">{component.component_name}</div>
            {component.category && (
              <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                {component.category.name}
              </span>
            )}
            <button
              className="ml-2 hover:text-green-600"
              title="Edit Component"
              onClick={() => handleEditClick(component)}
            >
              <EditIcon />
            </button>
          </div>
          <div className="mb-4 text-sm text-gray-600">
            Before Cook Weight: {component.before_cook_weight_g ? Number(component.before_cook_weight_g) : ""}g<br />
            After Cook Weight: {component.after_cook_weight_g ? Number(component.after_cook_weight_g) : ""}g
          </div>
          {component.component_portions && component.component_portions.length > 0 && (
            <div className="mb-2 text-sm text-gray-700">
              <strong>Portion Sizes:</strong>
              <ul>
                {component.component_portions.map((portion) => (
                  <li key={portion.label}>
                    {portion.label}: {Number(portion.total_weight_g)}g
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Ingredients:</h3>
            {component.recipeIngredients && component.recipeIngredients.length === 0 ? (
              <div className="text-gray-500 italic ml-2">No ingredients found.</div>
            ) : (
              <ul className="space-y-4">
                {component.recipeIngredients && component.recipeIngredients.map((ri) => {
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
      ))}
      {editComponentData && (
        <EditComponentModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          {...editComponentData}
        />
      )}
    </>
  );
} 