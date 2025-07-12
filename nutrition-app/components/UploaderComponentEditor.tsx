"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { XCircle, Zap, Loader2 } from "lucide-react";
import { IngredientRow, IngredientInput } from "./IngredientRow";
import { useToast } from "./ui/use-toast";

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

  const handleIngredientChange = (idx: number, field: keyof IngredientInput, value: string) => {
    const updatedIngredients = component.ingredients.map((ing: IngredientInput, i: number) =>
      i === idx ? { ...ing, [field]: value } : ing
    );
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
    const updatedPortion = { ...((component.portions && component.portions[0]) || { label: "1P", total_weight_g: "" }), [field]: value };
    onChange(componentIndex, { ...component, portions: [updatedPortion] });
  };

  // Nutrition API fetch (with fallback and error handling)
  const fetchNutrition = async (idx: number) => {
    const ingredient = component.ingredients[idx];
    if (!ingredient.name || !ingredient.quantity) return;
    setLoadingIdx(idx);
    try {
      // 1. Try main nutrition API
      let res = await fetch("/api/nutrition-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredientName: ingredient.name,
          quantity: ingredient.quantity,
          unit: "g",
        }),
      });
      if (res.status === 429) {
        toast({
          title: "Nutrition API Rate Limit",
          description: "You have reached the nutrition API rate limit. Please try again later or update your API token.",
          variant: "destructive"
        });
        return;
      }
      let data = await res.json();
      if (res.status === 404 || (data.nutrition && data.nutrition.status === 404)) {
        // 2. Try Edamam fallback
        let edamamRes = await fetch("/api/edamam-proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ingredient: ingredient.name,
            quantity: ingredient.quantity,
            unit: "g",
          }),
        });
        let edamamData = await edamamRes.json();
        if (
          edamamRes.status === 429 ||
          (edamamData.status === "error" && edamamData.message && edamamData.message.toLowerCase().includes("usage limits"))
        ) {
          toast({
            title: "Edamam API Rate Limit",
            description: "You have reached the Edamam API rate limit. Please try again later or update your Edamam API token.",
            variant: "destructive"
          });
          return;
        }
        if (edamamRes.ok && edamamData.macros) {
          // Update with Edamam macros
          const macros = edamamData.macros;
          const qty = Number(ingredient.quantity) || 100;
          const factor = qty / 100;
          const updatedIngredients = component.ingredients.map((ing: IngredientInput, i: number) =>
            i === idx
              ? {
                  ...ing,
                  calories: macros.calories ? (Number(macros.calories) * factor).toFixed(2) : "",
                  fat: macros.fat ? (Number(macros.fat) * factor).toFixed(2) : "",
                  protein: macros.protein ? (Number(macros.protein) * factor).toFixed(2) : "",
                  carbohydrates: macros.carbohydrates ? (Number(macros.carbohydrates) * factor).toFixed(2) : "",
                  caloriesPer100g: macros.calories?.toString() ?? "",
                  fatPer100g: macros.fat?.toString() ?? "",
                  proteinPer100g: macros.protein?.toString() ?? "",
                  carbohydratesPer100g: macros.carbohydrates?.toString() ?? "",
                }
              : ing
          );
          onChange(componentIndex, { ...component, ingredients: updatedIngredients });
          return;
        } else {
          // 3. Try ChatGPT fallback
          let gptRes = await fetch("/api/gpt-nutrition", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredient: ingredient.name }),
          });
          let gptMacros = await gptRes.json();
          if (gptRes.ok && gptMacros) {
            const qty = Number(ingredient.quantity) || 100;
            const factor = qty / 100;
            const updatedIngredients = component.ingredients.map((ing: IngredientInput, i: number) =>
              i === idx
                ? {
                    ...ing,
                    calories: gptMacros.calories ? (Number(gptMacros.calories) * factor).toFixed(2) : "",
                    fat: gptMacros.fat ? (Number(gptMacros.fat) * factor).toFixed(2) : "",
                    protein: gptMacros.protein ? (Number(gptMacros.protein) * factor).toFixed(2) : "",
                    carbohydrates: gptMacros.carbs ? (Number(gptMacros.carbs) * factor).toFixed(2) : "",
                    caloriesPer100g: gptMacros.calories?.toString() ?? "",
                    fatPer100g: gptMacros.fat?.toString() ?? "",
                    proteinPer100g: gptMacros.protein?.toString() ?? "",
                    carbohydratesPer100g: gptMacros.carbs?.toString() ?? "",
                  }
                : ing
            );
            onChange(componentIndex, { ...component, ingredients: updatedIngredients });
            return;
          } else {
            toast({
              title: "Nutrition Not Found",
              description: "Could not find nutrition data for this ingredient in any source.",
              variant: "destructive"
            });
            return;
          }
        }
      }
      // If main API returns macros, update as normal
      if (res.ok && data.nutrition && data.nutrition.macros) {
        const macros = data.nutrition.macros;
        const qty = Number(ingredient.quantity) || 100;
        const factor = qty / 100;
        const updatedIngredients = component.ingredients.map((ing: IngredientInput, i: number) =>
          i === idx
            ? {
                ...ing,
                calories: macros.calories ? (Number(macros.calories) * factor).toFixed(2) : "",
                fat: macros.fat ? (Number(macros.fat) * factor).toFixed(2) : "",
                protein: macros.protein ? (Number(macros.protein) * factor).toFixed(2) : "",
                carbohydrates: macros.carbohydrates ? (Number(macros.carbohydrates) * factor).toFixed(2) : "",
                caloriesPer100g: macros.calories?.toString() ?? "",
                fatPer100g: macros.fat?.toString() ?? "",
                proteinPer100g: macros.protein?.toString() ?? "",
                carbohydratesPer100g: macros.carbohydrates?.toString() ?? "",
              }
            : ing
        );
        onChange(componentIndex, { ...component, ingredients: updatedIngredients });
      } else {
        toast({
          title: "Nutrition Lookup Error",
          description: data.error || "Unknown error occurred during nutrition lookup.",
          variant: "destructive"
        });
      }
    } catch (e) {
      toast({
        title: "Nutrition Lookup Error",
        description: e instanceof Error ? e.message : "Unknown error occurred during nutrition lookup.",
        variant: "destructive"
      });
    } finally {
      setLoadingIdx(null);
    }
  };

  // Fetch ingredient suggestions as user types
  const fetchIngredientSuggestions = async (idx: number, value: string) => {
    if (!value) {
      setIngredientSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const res = await fetch(`/api/ingredients?search=${encodeURIComponent(value)}`);
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
    const ing = component.ingredients[idx];
    const qty = Number(value) || 0;
    const factor = qty / 100;
    const updatedIngredients = component.ingredients.map((ingr: IngredientInput, i: number) =>
      i === idx
        ? {
            ...ingr,
            quantity: value,
            calories: ing.caloriesPer100g && qty > 0 ? (Number(ing.caloriesPer100g) * factor).toFixed(2) : ing.caloriesPer100g || "",
            fat: ing.fatPer100g && qty > 0 ? (Number(ing.fatPer100g) * factor).toFixed(2) : ing.fatPer100g || "",
            protein: ing.proteinPer100g && qty > 0 ? (Number(ing.proteinPer100g) * factor).toFixed(2) : ing.proteinPer100g || "",
            carbohydrates: ing.carbohydratesPer100g && qty > 0 ? (Number(ing.carbohydratesPer100g) * factor).toFixed(2) : ing.carbohydratesPer100g || "",
          }
        : ingr
    );
    onChange(componentIndex, { ...component, ingredients: updatedIngredients });
  };

  return (
    <div className="border-dashed border rounded-lg p-4 mb-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2 items-center">
          <Input
            value={component.name}
            onChange={e => handleFieldChange("name", e.target.value)}
            placeholder="Component Name"
            required
            className="font-semibold"
          />
          <select
            className="w-48 border rounded px-3 py-2"
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
            className="text-red-500 hover:text-red-700"
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex gap-4 mb-2">
        <Input
          type="number"
          value={component.before_cook_weight_g || ""}
          onChange={e => handleFieldChange("before_cook_weight_g", e.target.value)}
          placeholder="Before Cook Weight (g)"
          required
        />
        <Input
          type="number"
          value={component.after_cook_weight_g || ""}
          onChange={e => handleFieldChange("after_cook_weight_g", e.target.value)}
          placeholder="After Cook Weight (g)"
          required
        />
      </div>
      <div className="mb-2">
        <Label>Ingredients</Label>
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
              fetchNutrition={fetchNutrition}
              fetchSuggestions={fetchIngredientSuggestions}
              suggestions={ingredientSuggestions}
              showSuggestions={showSuggestions}
              onSuggestionClick={handleSuggestionClick}
              inputRef={el => { ingredientInputRefs.current[idx] = el; }}
            />
          ))}
          <Button type="button" variant="secondary" onClick={addIngredient}>
            + Add Ingredient
          </Button>
        </div>
      </div>
      <div className="mb-2">
        <Label>Portion Size</Label>
        <div className="flex gap-2 items-center">
          <select
            value={(component.portions && component.portions[0]?.label) || '1P'}
            onChange={e => handleSinglePortionChange("label", e.target.value)}
            required
            className="border rounded px-2 py-1"
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
          />
        </div>
      </div>
    </div>
  );
} 