"use client";

import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Zap, Loader2 } from "lucide-react";

export interface IngredientInput {
  name: string;
  quantity: string;
  calories: string;
  fat: string;
  protein: string;
  carbohydrates: string;
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
  onChange: (idx: number, field: keyof IngredientInput, value: string) => void;
  onRemove: (idx: number) => void;
  fetchNutrition: (idx: number) => void;
  fetchSuggestions: (idx: number, value: string) => void;
  suggestions: any[];
  showSuggestions: boolean;
  onSuggestionClick: (idx: number, suggestion: any) => void;
  inputRef?: (el: HTMLInputElement | null) => void;
}

export function IngredientRow({
  ingredient,
  idx,
  loading,
  showRemove,
  onChange,
  onRemove,
  fetchNutrition,
  fetchSuggestions,
  suggestions,
  showSuggestions,
  onSuggestionClick,
  inputRef,
}: IngredientRowProps) {
  return (
    <div className="flex flex-col gap-2 border p-2 rounded-md bg-gray-50">
      <div className="flex gap-2 items-center relative">
        <Input
          placeholder="Ingredient Name"
          value={ingredient.name}
          onChange={e => {
            onChange(idx, "name", e.target.value);
            fetchSuggestions(idx, e.target.value);
          }}
          onFocus={() => suggestions.length > 0 && showSuggestions}
          onBlur={() => setTimeout(() => showSuggestions, 150)}
          required
          ref={inputRef}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 bg-white border rounded shadow w-full top-12 left-0 max-h-40 overflow-y-auto">
            {suggestions.map((suggestion, sidx) => (
              <div
                key={suggestion.ingredient_id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => onSuggestionClick(idx, suggestion)}
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