"use client";

import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Zap, Loader2 } from "lucide-react";
import { GetNutritionButton } from "./ui/get-nutrition-button";
import { IngredientInput as UnifiedIngredientInput } from "@/lib/nutrition-utils";

export interface IngredientInput {
  name: string;
  quantity: string;
  calories?: string;
  fat?: string;
  protein?: string;
  carbohydrates?: string;
  caloriesPer100g?: string;
  fatPer100g?: string;
  proteinPer100g?: string;
  carbohydratesPer100g?: string;
}

interface IngredientRowProps {
  ingredient: IngredientInput;
  idx: number;
  loading: boolean;
  showRemove: boolean;
  onChange: (idx: number, fieldOrObject: keyof IngredientInput | Partial<IngredientInput>, value?: string) => void;
  onRemove: (idx: number) => void;
  fetchNutrition: (idx: number) => void;
  inputRef?: (el: HTMLInputElement | null) => void;
  useUnifiedButton?: boolean;
  onNutritionUpdate?: (updatedIngredient: UnifiedIngredientInput) => void;
}

export function IngredientRow({
  ingredient,
  idx,
  loading,
  showRemove,
  onChange,
  onRemove,
  fetchNutrition,
  inputRef,
  useUnifiedButton = false,
  onNutritionUpdate,
}: IngredientRowProps) {
  const [ingredientSuggestions, setIngredientSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchIngredientSuggestions = async (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setIngredientSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const res = await fetch(`/api/ingredients?search=${encodeURIComponent(trimmedValue)}`);
    if (res.ok) {
      const data = await res.json();
      setIngredientSuggestions(data);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    onChange(idx, {
      name: suggestion.ingredient_name,
      calories: suggestion.calories_per_100g?.toString() ?? "",
      fat: suggestion.fat_g?.toString() ?? "",
      protein: suggestion.protein_g?.toString() ?? "",
      carbohydrates: suggestion.carbohydrates_g?.toString() ?? "",
      caloriesPer100g: suggestion.calories_per_100g?.toString() ?? "",
      fatPer100g: suggestion.fat_g?.toString() ?? "",
      proteinPer100g: suggestion.protein_g?.toString() ?? "",
      carbohydratesPer100g: suggestion.carbohydrates_g?.toString() ?? "",
      quantity: ingredient.quantity || "100"
    });
    setShowSuggestions(false);
    setIngredientSuggestions([]);
  };

  const handleNutritionUpdate = (updatedIngredient: UnifiedIngredientInput) => {
    if (onNutritionUpdate) {
      onNutritionUpdate(updatedIngredient);
    } else {
      // Fallback to old method
      onChange(idx, {
        calories: updatedIngredient.calories || "",
        fat: updatedIngredient.fat || "",
        protein: updatedIngredient.protein || "",
        carbohydrates: updatedIngredient.carbohydrates || "",
        caloriesPer100g: updatedIngredient.caloriesPer100g || "",
        fatPer100g: updatedIngredient.fatPer100g || "",
        proteinPer100g: updatedIngredient.proteinPer100g || "",
        carbohydratesPer100g: updatedIngredient.carbohydratesPer100g || "",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 border p-2 rounded-md bg-gray-50">
      <div className="flex gap-2 items-center relative">
        <Input
          placeholder="Ingredient Name"
          value={ingredient.name}
          onChange={e => {
            onChange(idx, "name", e.target.value);
            fetchIngredientSuggestions(e.target.value);
          }}
          onFocus={() => ingredientSuggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          required
          ref={inputRef}
        />
        {showSuggestions && ingredientSuggestions.length > 0 && (
          <div className="absolute z-10 bg-white border rounded shadow w-full top-12 left-0 max-h-40 overflow-y-auto">
            {ingredientSuggestions.map((suggestion, sidx) => (
              <div
                key={suggestion.ingredient_id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.ingredient_name}
              </div>
            ))}
          </div>
        )}
        <Input
          placeholder="Quantity (g)"
          type="number"
          value={ingredient.quantity}
          onChange={e => onChange(idx, "quantity", e.target.value)}
          required
        />
        {useUnifiedButton ? (
          <GetNutritionButton
            ingredient={{
              ...ingredient,
              unit: "g" // Ensure unit is always "g" for consistency
            } as UnifiedIngredientInput}
            onNutritionUpdate={handleNutritionUpdate}
            disabled={loading}
          />
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!ingredient.name || loading}
            onClick={() => fetchNutrition(idx)}
          >
            {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Zap className="h-3 w-3" />}
            Get Nutrition
          </Button>
        )}
        {showRemove && (
          <Button type="button" variant="destructive" size="icon" onClick={() => onRemove(idx)}>
            -
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Input
          placeholder="Calories (per 100g)"
          type="number"
          value={ingredient.calories ?? ""}
          onChange={e => onChange(idx, "calories", e.target.value)}
          required
        />
        <Input
          placeholder="Fat (g)"
          type="number"
          value={ingredient.fat ?? ""}
          onChange={e => onChange(idx, "fat", e.target.value)}
          required
        />
        <Input
          placeholder="Protein (g)"
          type="number"
          value={ingredient.protein ?? ""}
          onChange={e => onChange(idx, "protein", e.target.value)}
          required
        />
        <Input
          placeholder="Carbohydrates (g)"
          type="number"
          value={ingredient.carbohydrates ?? ""}
          onChange={e => onChange(idx, "carbohydrates", e.target.value)}
          required
        />
      </div>
    </div>
  );
} 