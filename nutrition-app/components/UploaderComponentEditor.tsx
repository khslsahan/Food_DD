"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { XCircle, Zap, Loader2 } from "lucide-react";
import { IngredientRow, IngredientInput } from "./IngredientRow";
import { useToast } from "./ui/use-toast";
import { GetNutritionButton } from "./ui/get-nutrition-button";
import { updateIngredientWithNutrition } from "@/lib/nutrition-utils";

interface PortionInput {
  label: string;
  total_weight_g: string;
}

interface UploaderComponentEditorProps {
  component: any;
  componentIndex: number;
  onChange: (componentIndex: number, updatedComponent: any) => void;
  onRemove: (componentIndex: number) => void;
}

export function UploaderComponentEditor({
  component,
  componentIndex,
  onChange,
  onRemove,
}: UploaderComponentEditorProps) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loadingIdx, setLoadingIdx] = useState<number | null>(null);
  const [ingredientSuggestions, setIngredientSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ingredientInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showGptPrompt, setShowGptPrompt] = useState(false);
  const [showGptResult, setShowGptResult] = useState(false);
  const [gptMacros, setGptMacros] = useState<any>(null);
  const [gptIdx, setGptIdx] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/component-categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    }
    fetchCategories();
  }, []);

  // Handlers for fields
  const handleFieldChange = (field: string, value: any) => {
    onChange(componentIndex, { ...component, [field]: value });
  };

  const handleIngredientChange = (idx: number, fieldOrObject: keyof IngredientInput | Partial<IngredientInput>, value?: string) => {
    const updatedIngredients = component.ingredients.map((ing: IngredientInput, i: number) => {
      if (i !== idx) return ing;
      if (typeof fieldOrObject === "object") {
        // If per-100g values are present, always recalculate macros for the current or new quantity
        const hasPer100g =
          "caloriesPer100g" in fieldOrObject ||
          "fatPer100g" in fieldOrObject ||
          "proteinPer100g" in fieldOrObject ||
          "carbohydratesPer100g" in fieldOrObject;
        if (hasPer100g) {
          const qty = Number((fieldOrObject as any).quantity ?? ing.quantity) || 0;
          const factor = qty / 100;
          return {
            ...ing,
            ...fieldOrObject,
            calories: (fieldOrObject as any).caloriesPer100g && qty > 0 ? (Number((fieldOrObject as any).caloriesPer100g) * factor).toFixed(2) : (fieldOrObject as any).caloriesPer100g || ing.caloriesPer100g || "",
            fat: (fieldOrObject as any).fatPer100g && qty > 0 ? (Number((fieldOrObject as any).fatPer100g) * factor).toFixed(2) : (fieldOrObject as any).fatPer100g || ing.fatPer100g || "",
            protein: (fieldOrObject as any).proteinPer100g && qty > 0 ? (Number((fieldOrObject as any).proteinPer100g) * factor).toFixed(2) : (fieldOrObject as any).proteinPer100g || ing.proteinPer100g || "",
            carbohydrates: (fieldOrObject as any).carbohydratesPer100g && qty > 0 ? (Number((fieldOrObject as any).carbohydratesPer100g) * factor).toFixed(2) : (fieldOrObject as any).carbohydratesPer100g || ing.carbohydratesPer100g || "",
          };
        }
        // If quantity is being updated in the object, recalculate nutrition
        if (Object.prototype.hasOwnProperty.call(fieldOrObject, "quantity")) {
          const qty = Number((fieldOrObject as any).quantity) || 0;
          const factor = qty / 100;
          return {
            ...ing,
            ...fieldOrObject,
            calories: ing.caloriesPer100g && qty > 0 ? (Number(ing.caloriesPer100g) * factor).toFixed(2) : ing.caloriesPer100g || "",
            fat: ing.fatPer100g && qty > 0 ? (Number(ing.fatPer100g) * factor).toFixed(2) : ing.fatPer100g || "",
            protein: ing.proteinPer100g && qty > 0 ? (Number(ing.proteinPer100g) * factor).toFixed(2) : ing.proteinPer100g || "",
            carbohydrates: ing.carbohydratesPer100g && qty > 0 ? (Number(ing.carbohydratesPer100g) * factor).toFixed(2) : ing.carbohydratesPer100g || "",
          };
        }
        return { ...ing, ...fieldOrObject };
      } else if (fieldOrObject === "quantity") {
        const qty = Number(value) || 0;
        const factor = qty / 100;
        return {
          ...ing,
          quantity: value,
          calories: ing.caloriesPer100g && qty > 0 ? (Number(ing.caloriesPer100g) * factor).toFixed(2) : ing.caloriesPer100g || "",
          fat: ing.fatPer100g && qty > 0 ? (Number(ing.fatPer100g) * factor).toFixed(2) : ing.fatPer100g || "",
          protein: ing.proteinPer100g && qty > 0 ? (Number(ing.proteinPer100g) * factor).toFixed(2) : ing.proteinPer100g || "",
          carbohydrates: ing.carbohydratesPer100g && qty > 0 ? (Number(ing.carbohydratesPer100g) * factor).toFixed(2) : ing.carbohydratesPer100g || "",
        };
      } else {
        return { ...ing, [fieldOrObject]: value };
      }
    });
    onChange(componentIndex, { ...component, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    const updatedIngredients = [
      ...component.ingredients,
      { name: "", quantity: "", calories: "", fat: "", protein: "", carbohydrates: "" },
    ];
    onChange(componentIndex, { ...component, ingredients: updatedIngredients });
  };

  const removeIngredient = (idx: number) => {
    const updatedIngredients = component.ingredients.filter((_: any, i: number) => i !== idx);
    onChange(componentIndex, { ...component, ingredients: updatedIngredients });
  };

  // Only allow a single portion
  const handleSinglePortionChange = (field: "label" | "total_weight_g", value: string) => {
    const updatedPortion = { ...((component.portions && component.portions[0]) || { label: "2P", total_weight_g: "" }), [field]: value };
    onChange(componentIndex, { ...component, portions: [updatedPortion] });
  };

  // Unified nutrition fetch handler
  const handleNutritionUpdate = (idx: number, updatedIngredient: any) => {
    const updatedIngredients = component.ingredients.map((ing: IngredientInput, i: number) =>
      i === idx ? {
        ...updatedIngredient,
        quantity: updatedIngredient.quantity?.toString() || "100"
      } : ing
    );
    onChange(componentIndex, { ...component, ingredients: updatedIngredients });
  };

  // Wrapper function to match expected signature
  const fetchNutritionWrapper = (idx: number) => {
    // This will be handled by the unified button system
  };

  // Fetch ingredient suggestions as user types
  const fetchIngredientSuggestions = async (idx: number, value: string) => {
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

  const handleSuggestionClick = (idx: number, suggestion: any) => {
    const updatedIngredients = component.ingredients.map((ing: IngredientInput, i: number) =>
      i === idx
        ? {
            ...ing,
            name: suggestion.ingredient_name,
            calories: suggestion.calories_per_100g?.toString() ?? "",
            fat: suggestion.fat_g?.toString() ?? "",
            protein: suggestion.protein_g?.toString() ?? "",
            carbohydrates: suggestion.carbohydrates_g?.toString() ?? "",
            caloriesPer100g: suggestion.calories_per_100g?.toString() ?? "",
            fatPer100g: suggestion.fat_g?.toString() ?? "",
            proteinPer100g: suggestion.protein_g?.toString() ?? "",
            carbohydratesPer100g: suggestion.carbohydrates_g?.toString() ?? "",
          }
        : ing
    );
    onChange(componentIndex, { ...component, ingredients: updatedIngredients });
    setShowSuggestions(false);
    setIngredientSuggestions([]);
    setTimeout(() => {
      ingredientInputRefs.current[idx + 1]?.focus();
    }, 0);
  };

  const handleQuantityChange = (idx: number, value: string) => {
    const updatedIngredients = component.ingredients.map((ing: IngredientInput, i: number) => {
      if (i !== idx) return ing;
      const qty = Number(value) || 0;
      const factor = qty / 100;
      return {
        ...ing,
        quantity: value,
        calories: ing.caloriesPer100g && qty > 0 ? (Number(ing.caloriesPer100g) * factor).toFixed(2) : ing.caloriesPer100g || "",
        fat: ing.fatPer100g && qty > 0 ? (Number(ing.fatPer100g) * factor).toFixed(2) : ing.fatPer100g || "",
        protein: ing.proteinPer100g && qty > 0 ? (Number(ing.proteinPer100g) * factor).toFixed(2) : ing.proteinPer100g || "",
        carbohydrates: ing.carbohydratesPer100g && qty > 0 ? (Number(ing.carbohydratesPer100g) * factor).toFixed(2) : ing.carbohydratesPer100g || "",
      };
    });
    onChange(componentIndex, { ...component, ingredients: updatedIngredients });
  };

  return (
    <div className="border-dashed border rounded-lg p-3 sm:p-4 mb-4 bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full">
          <Input
            value={component.name}
            onChange={e => handleFieldChange("name", e.target.value)}
            placeholder="Component Name"
            required
            className="font-semibold flex-1"
          />
          <select
            className="w-full sm:w-48 border rounded px-3 py-2"
            value={component.category_id || ""}
            onChange={e => handleFieldChange("category_id", Number(e.target.value))}
            required
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(componentIndex)}
            className="text-red-500 hover:text-red-700 self-start sm:self-auto"
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3">
        <Input
          type="number"
          value={component.before_cook_weight_g || ""}
          onChange={e => handleFieldChange("before_cook_weight_g", e.target.value)}
          placeholder="Before Cook Weight (g)"
          required
          className="flex-1"
        />
        <Input
          type="number"
          value={component.after_cook_weight_g || ""}
          onChange={e => handleFieldChange("after_cook_weight_g", e.target.value)}
          placeholder="After Cook Weight (g)"
          required
          className="flex-1"
        />
      </div>
      
      <div className="mb-3">
        <Label className="text-sm font-medium">Ingredients</Label>
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {component.ingredients.map((ingredient: IngredientInput, idx: number) => (
            <IngredientRow
              key={idx}
              ingredient={ingredient}
              idx={idx}
              loading={loadingIdx === idx}
              showRemove={component.ingredients.length > 1}
              onChange={handleIngredientChange}
              onRemove={removeIngredient}
              fetchNutrition={fetchNutritionWrapper}
              useUnifiedButton={true}
              onNutritionUpdate={(updatedIngredient) => handleNutritionUpdate(idx, updatedIngredient)}
              inputRef={el => { ingredientInputRefs.current[idx] = el; }}
            />
          ))}
          <Button type="button" variant="secondary" onClick={addIngredient} className="w-full sm:w-auto">
            + Add Ingredient
          </Button>
        </div>
      </div>
      
      <div className="mb-2">
        <Label className="text-sm font-medium">Portion Size</Label>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 items-start sm:items-center">
          <select
            value={(component.portions && component.portions[0]?.label) || '2P'}
            onChange={e => handleSinglePortionChange("label", e.target.value)}
            required
            className="border rounded px-2 py-1 w-full sm:w-auto"
          >
            <option value="1P">1P</option>
            <option value="2P">2P</option>
            <option value="3P">3P</option>
          </select>
          <Input
            placeholder="Total Weight (g)"
            type="number"
            value={(component.portions && component.portions[0]?.total_weight_g) || ""}
            onChange={e => handleSinglePortionChange("total_weight_g", e.target.value)}
            required
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
} 