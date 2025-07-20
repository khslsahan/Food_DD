"use client";

import React, { useRef, useState, useCallback, useMemo, forwardRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Zap, Loader2, Save } from "lucide-react";
import { GetNutritionButton } from "./ui/get-nutrition-button";
import { IngredientInput as UnifiedIngredientInput } from "@/lib/nutrition-utils";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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

// Custom input component that preserves cursor position
const CursorPreservingInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, onChange, value, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const cursorPositionRef = useRef<number>(0);
    const isFocusedRef = useRef<boolean>(false);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      // Store cursor position before the change
      cursorPositionRef.current = e.target.selectionStart || 0;
      
      // Call the original onChange
      if (onChange) {
        onChange(e);
      }
    }, [onChange]);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      isFocusedRef.current = true;
      cursorPositionRef.current = e.target.selectionStart || 0;
    }, []);

    const handleBlur = useCallback(() => {
      isFocusedRef.current = false;
    }, []);

    // Restore cursor position after render
    React.useEffect(() => {
      if (inputRef.current && isFocusedRef.current && cursorPositionRef.current > 0) {
        const input = inputRef.current;
        const position = Math.min(cursorPositionRef.current, input.value.length);
        
        // Use a small delay to ensure DOM is updated
        setTimeout(() => {
          if (input && document.activeElement === input) {
            input.setSelectionRange(position, position);
          }
        }, 0);
      }
    });

    return (
      <input
        ref={(el) => {
          // Handle both refs
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
          inputRef.current = el;
        }}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

CursorPreservingInput.displayName = "CursorPreservingInput";

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
  const [savingMacros, setSavingMacros] = useState(false);
  const [suggestionTimeout, setSuggestionTimeout] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Memoize the fetchIngredientSuggestions function to prevent unnecessary re-renders
  const fetchIngredientSuggestions = useCallback(async (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setIngredientSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    try {
      const res = await fetch(`/api/ingredients?search=${encodeURIComponent(trimmedValue)}`);
      if (res.ok) {
        const data = await res.json();
        setIngredientSuggestions(data);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Error fetching ingredient suggestions:", error);
    }
  }, []);

  // Debounced version of fetchIngredientSuggestions
  const debouncedFetchSuggestions = useCallback((value: string) => {
    if (suggestionTimeout) {
      clearTimeout(suggestionTimeout);
    }
    
    const timeout = setTimeout(() => {
      fetchIngredientSuggestions(value);
    }, 300); // 300ms delay
    
    setSuggestionTimeout(timeout);
  }, [fetchIngredientSuggestions, suggestionTimeout]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (suggestionTimeout) {
        clearTimeout(suggestionTimeout);
      }
    };
  }, [suggestionTimeout]);

  const handleSuggestionClick = useCallback((suggestion: any) => {
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
  }, [onChange, idx, ingredient.quantity]);

  const handleNutritionUpdate = useCallback((updatedIngredient: UnifiedIngredientInput) => {
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
  }, [onNutritionUpdate, onChange, idx]);

  const handleSaveMacros = useCallback(async () => {
    if (!ingredient.name || !ingredient.calories || !ingredient.fat || !ingredient.protein || !ingredient.carbohydrates) {
      toast({
        title: "Missing Data",
        description: "Please ensure all nutrition fields are filled before saving.",
        variant: "destructive"
      });
      return;
    }

    setSavingMacros(true);
    try {
      // Check if ingredient already exists
      const searchResponse = await fetch(`/api/ingredients?search=${encodeURIComponent(ingredient.name)}`);
      let existingIngredient = null;
      
      if (searchResponse.ok) {
        const ingredients = await searchResponse.json();
        existingIngredient = ingredients.find((ing: any) => 
          ing.ingredient_name.toLowerCase().trim() === ingredient.name.toLowerCase().trim()
        );
      }

      if (existingIngredient) {
        // Update existing ingredient
        const updateResponse = await fetch(`/api/ingredients/${existingIngredient.ingredient_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ingredient_name: ingredient.name,
            default_unit: "g",
            calories_per_100g: Number(ingredient.caloriesPer100g || ingredient.calories),
            fat_g: Number(ingredient.fatPer100g || ingredient.fat),
            protein_g: Number(ingredient.proteinPer100g || ingredient.protein),
            carbohydrates_g: Number(ingredient.carbohydratesPer100g || ingredient.carbohydrates),
          }),
        });

        if (!updateResponse.ok) {
          throw new Error("Failed to update ingredient");
        }

        toast({
          title: "Macros Updated",
          description: `Nutritional information for ${ingredient.name} has been updated in the database.`,
        });
      } else {
        // Create new ingredient
        const createResponse = await fetch("/api/ingredients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ingredient_name: ingredient.name,
            default_unit: "g",
            calories_per_100g: Number(ingredient.caloriesPer100g || ingredient.calories),
            fat_g: Number(ingredient.fatPer100g || ingredient.fat),
            protein_g: Number(ingredient.proteinPer100g || ingredient.protein),
            carbohydrates_g: Number(ingredient.carbohydratesPer100g || ingredient.carbohydrates),
          }),
        });

        if (!createResponse.ok) {
          throw new Error("Failed to create ingredient");
        }

        toast({
          title: "Macros Saved",
          description: `Nutritional information for ${ingredient.name} has been saved to the database.`,
        });
      }
    } catch (error) {
      console.error("Error saving macros:", error);
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save macros to database.",
        variant: "destructive"
      });
    } finally {
      setSavingMacros(false);
    }
  }, [ingredient, toast]);

  // Memoize the ingredient name change handler to prevent unnecessary re-renders
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(idx, "name", value);
    debouncedFetchSuggestions(value);
  }, [onChange, idx, debouncedFetchSuggestions]);

  // Memoize other change handlers
  const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(idx, "quantity", e.target.value);
  }, [onChange, idx]);

  const handleCaloriesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(idx, "calories", e.target.value);
  }, [onChange, idx]);

  const handleFatChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(idx, "fat", e.target.value);
  }, [onChange, idx]);

  const handleProteinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(idx, "protein", e.target.value);
  }, [onChange, idx]);

  const handleCarbohydratesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(idx, "carbohydrates", e.target.value);
  }, [onChange, idx]);

  const handleRemove = useCallback(() => {
    onRemove(idx);
  }, [onRemove, idx]);

  const handleFocus = useCallback(() => {
    if (ingredientSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  }, [ingredientSuggestions.length]);

  const handleBlur = useCallback(() => {
    setTimeout(() => setShowSuggestions(false), 150);
  }, []);

  // Memoize the unified ingredient object to prevent unnecessary re-renders
  const unifiedIngredient = useMemo(() => ({
    ...ingredient,
    unit: "g" // Ensure unit is always "g" for consistency
  } as UnifiedIngredientInput), [ingredient]);

  return (
    <div className="flex flex-col gap-3 border p-3 rounded-md bg-gray-50">
      {/* Main ingredient row - responsive layout */}
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center relative">
        {/* Ingredient name input with suggestions */}
        <div className="relative flex-1 w-full sm:w-auto">
          <CursorPreservingInput
            placeholder="Ingredient Name"
            value={ingredient.name}
            onChange={handleNameChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            ref={inputRef}
            className="w-full"
          />
          {showSuggestions && ingredientSuggestions.length > 0 && (
            <div className="absolute z-10 bg-white border rounded shadow w-full top-12 left-0 max-h-40 overflow-y-auto">
              {ingredientSuggestions.map((suggestion) => (
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
        </div>
        
        {/* Quantity input */}
        <CursorPreservingInput
          placeholder="Quantity (g)"
          type="number"
          value={ingredient.quantity}
          onChange={handleQuantityChange}
          required
          className="w-full sm:w-24"
        />
        
        {/* Action buttons - responsive layout */}
        <div className="flex gap-2 w-full sm:w-auto">
          {useUnifiedButton ? (
            <GetNutritionButton
              ingredient={unifiedIngredient}
              onNutritionUpdate={handleNutritionUpdate}
              disabled={loading}
              className="flex-1 sm:flex-none"
            />
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!ingredient.name || loading}
              onClick={() => fetchNutrition(idx)}
              className="flex-1 sm:flex-none"
            >
              {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Zap className="h-3 w-3" />}
              <span className="hidden sm:inline ml-1">Get Nutrition</span>
            </Button>
          )}
          
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={!ingredient.name || !ingredient.calories || savingMacros}
            onClick={handleSaveMacros}
            title="Save macros to database"
            className="flex-1 sm:flex-none"
          >
            {savingMacros ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
            <span className="hidden sm:inline ml-1">Save Macros</span>
          </Button>
          
          {showRemove && (
            <Button 
              type="button" 
              variant="destructive" 
              size="icon" 
              onClick={handleRemove}
              className="flex-shrink-0"
            >
              -
            </Button>
          )}
        </div>
      </div>
      
      {/* Nutrition inputs - responsive grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <CursorPreservingInput
          placeholder="Calories (per 100g)"
          type="number"
          value={ingredient.calories ?? ""}
          onChange={handleCaloriesChange}
          required
          className="text-sm"
        />
        <CursorPreservingInput
          placeholder="Fat (g)"
          type="number"
          value={ingredient.fat ?? ""}
          onChange={handleFatChange}
          required
          className="text-sm"
        />
        <CursorPreservingInput
          placeholder="Protein (g)"
          type="number"
          value={ingredient.protein ?? ""}
          onChange={handleProteinChange}
          required
          className="text-sm"
        />
        <CursorPreservingInput
          placeholder="Carbohydrates (g)"
          type="number"
          value={ingredient.carbohydrates ?? ""}
          onChange={handleCarbohydratesChange}
          required
          className="text-sm"
        />
      </div>
    </div>
  );
} 