"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { XCircle, AlertCircle } from "lucide-react";
import { IngredientRow, IngredientInput } from "./IngredientRow";

interface PortionInput {
  label: string;
  total_weight_g: string;
}

interface ComponentValidationErrors {
  name?: string;
  weights?: string;
  cookWeights?: string;
  portions?: string;
  ingredients?: { [key: number]: string };
}

interface UploaderComponentEditorProps {
  component: any;
  componentIndex: number;
  onChange: (componentIndex: number, updatedComponent: any) => void;
  onRemove: (componentIndex: number) => void;
  validationErrors?: ComponentValidationErrors;
  onClearValidationError?: (errorType: 'name' | 'weights' | 'cookWeights' | 'portions' | 'ingredients') => void;
}

export function UploaderComponentEditor({
  component,
  componentIndex,
  onChange,
  onRemove,
  validationErrors,
  onClearValidationError,
}: UploaderComponentEditorProps) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [ingredientSuggestions, setIngredientSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingIdx, setLoadingIdx] = useState<number | null>(null);
  const ingredientInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleFieldChange = useCallback((field: string, value: any) => {
    onChange(componentIndex, { ...component, [field]: value });
  }, [onChange, componentIndex, component]);

  const handleIngredientChange = useCallback((idx: number, fieldOrObject: keyof IngredientInput | Partial<IngredientInput>, value?: string) => {
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
  }, [component, componentIndex, onChange]);

  const addIngredient = useCallback(() => {
    const updatedIngredients = [
      ...component.ingredients,
      { name: "", quantity: "", calories: "", fat: "", protein: "", carbohydrates: "" },
    ];
    onChange(componentIndex, { ...component, ingredients: updatedIngredients });
  }, [component, componentIndex, onChange]);

  const removeIngredient = useCallback((idx: number) => {
    const updatedIngredients = component.ingredients.filter((_: any, i: number) => i !== idx);
    onChange(componentIndex, { ...component, ingredients: updatedIngredients });
  }, [component, componentIndex, onChange]);

  // Handle portion change for specific index
  const handlePortionChange = useCallback((idx: number, field: "label" | "total_weight_g", value: string) => {
    // Ensure portions array exists
    const currentPortions = component.portions || [{ label: "2P", total_weight_g: "" }];
    const updatedPortions = currentPortions.map((portion: PortionInput, i: number) => 
      i === idx ? { ...portion, [field]: value } : portion
    );
    onChange(componentIndex, { ...component, portions: updatedPortions });
    
    // Clear validation errors when user makes changes to portions
    if (field === 'total_weight_g') {
      onClearValidationError?.('portions');
    }
  }, [component, componentIndex, onChange, onClearValidationError]);

  // Add portion
  const addPortion = useCallback(() => {
    const newPortion = { label: "2P", total_weight_g: "" };
    const currentPortions = component.portions || [{ label: "2P", total_weight_g: "" }];
    const updatedPortions = [...currentPortions, newPortion];
    onChange(componentIndex, { ...component, portions: updatedPortions });
    onClearValidationError?.('portions');
  }, [component, componentIndex, onChange, onClearValidationError]);

  // Remove portion
  const removePortion = useCallback((idx: number) => {
    const currentPortions = component.portions || [{ label: "2P", total_weight_g: "" }];
    const updatedPortions = currentPortions.filter((_: any, i: number) => i !== idx);
    onChange(componentIndex, { ...component, portions: updatedPortions });
  }, [component, componentIndex, onChange]);

  // Unified nutrition fetch handler
  const handleNutritionUpdate = useCallback((idx: number, updatedIngredient: any) => {
    const updatedIngredients = component.ingredients.map((ing: IngredientInput, i: number) =>
      i === idx ? {
        ...updatedIngredient,
        quantity: updatedIngredient.quantity?.toString() || "100"
      } : ing
    );
    onChange(componentIndex, { ...component, ingredients: updatedIngredients });
  }, [component, componentIndex, onChange]);

  // Wrapper function to match expected signature
  const fetchNutritionWrapper = useCallback((idx: number) => {
    // This will be handled by the unified button system
  }, []);

  // Fetch ingredient suggestions as user types
  const fetchIngredientSuggestions = useCallback(async (idx: number, value: string) => {
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
  }, []);

  const handleSuggestionClick = useCallback((idx: number, suggestion: any) => {
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
  }, [component, componentIndex, onChange]);

  const handleQuantityChange = useCallback((idx: number, value: string) => {
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
  }, [component, componentIndex, onChange]);

  const handleRemove = useCallback(() => {
    onRemove(componentIndex);
  }, [onRemove, componentIndex]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldChange("name", e.target.value);
    onClearValidationError?.('name');
  }, [handleFieldChange, onClearValidationError]);

  const handleBeforeCookWeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldChange("before_cook_weight_g", e.target.value);
    onClearValidationError?.('cookWeights');
  }, [handleFieldChange, onClearValidationError]);

  const handleAfterCookWeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldChange("after_cook_weight_g", e.target.value);
    onClearValidationError?.('cookWeights');
  }, [handleFieldChange, onClearValidationError]);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFieldChange("category_id", Number(e.target.value));
  }, [handleFieldChange]);

  const handlePortionLabelChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    handlePortionChange(0, "label", e.target.value);
  }, [handlePortionChange]);

  const handlePortionWeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handlePortionChange(0, "total_weight_g", e.target.value);
  }, [handlePortionChange]);

  return (
    <div className="border-dashed border rounded-lg p-3 sm:p-4 mb-4 bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full">
          <div className="flex-1">
            <Input
              value={component.name}
              onChange={handleNameChange}
              placeholder="Component Name"
              required
              className={`font-semibold ${validationErrors?.name ? "border-red-500 focus:border-red-500" : ""}`}
            />
            {validationErrors?.name && (
              <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="h-4 w-4" />
                {validationErrors.name}
              </p>
            )}
          </div>
          <select
            className="w-full sm:w-48 border rounded px-3 py-2"
            value={component.category_id || ""}
            onChange={handleCategoryChange}
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
            onClick={handleRemove}
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
          onChange={handleBeforeCookWeightChange}
          placeholder="Before Cook Weight (g)"
          required
          className={`flex-1 ${validationErrors?.cookWeights ? "border-red-500 focus:border-red-500" : ""}`}
        />
        <Input
          type="number"
          value={component.after_cook_weight_g || ""}
          onChange={handleAfterCookWeightChange}
          placeholder="After Cook Weight (g)"
          required
          className={`flex-1 ${validationErrors?.cookWeights ? "border-red-500 focus:border-red-500" : ""}`}
        />
      </div>
      
      {validationErrors?.weights && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {validationErrors.weights}
          </p>
        </div>
      )}
      {validationErrors?.cookWeights && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {validationErrors.cookWeights}
          </p>
        </div>
      )}
      
      <div className="mb-3">
        <Label className="text-sm font-medium">Ingredients</Label>
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {component.ingredients.map((ingredient: IngredientInput, idx: number) => (
            <div key={`component-${componentIndex}-ingredient-${idx}`}>
              <IngredientRow
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
              {validationErrors?.ingredients?.[idx] && (
                <p className="text-sm text-red-600 flex items-center gap-1 mt-1 ml-4">
                  <AlertCircle className="h-4 w-4" />
                  {validationErrors.ingredients[idx]}
                </p>
              )}
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={addIngredient} className="w-full sm:w-auto">
            + Add Ingredient
          </Button>
        </div>
      </div>
      
      <div className="mb-3">
        <Label className="text-sm font-medium">Portion Sizes</Label>
        <div className="space-y-2">
          {(component.portions || [{ label: "2P", total_weight_g: "" }]).map((portion: PortionInput, idx: number) => (
            <div key={`component-${componentIndex}-portion-${idx}`} className="flex gap-2 items-center">
              <select
                value={portion.label || '2P'}
                onChange={(e) => handlePortionChange(idx, "label", e.target.value)}
                required
                className="w-24 border rounded px-2 py-1"
              >
                <option value="1P">1P</option>
                <option value="2P">2P</option>
                <option value="3P">3P</option>
                <option value="4P">4P</option>
                <option value="5P">5P</option>
                <option value="6P">6P</option>
              </select>
              <Input
                type="number"
                value={portion.total_weight_g || ""}
                onChange={(e) => handlePortionChange(idx, "total_weight_g", e.target.value)}
                placeholder="Weight (g)"
                required
                className="flex-1"
              />
              {(component.portions && component.portions.length > 1) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removePortion(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={addPortion} className="w-full sm:w-auto">
            + Add Portion Size
          </Button>
        </div>
        {validationErrors?.portions && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {validationErrors.portions}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 