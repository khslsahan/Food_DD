"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { IngredientRow, IngredientInput } from "./IngredientRow";

interface AddComponentModalProps {
  mealId: number;
  onSubmit: (data: any) => void;
}

export function AddComponentModal({ mealId }: AddComponentModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [componentName, setComponentName] = useState("");
  const [beforeCookWeight, setBeforeCookWeight] = useState("");
  const [afterCookWeight, setAfterCookWeight] = useState("");
  const [ingredients, setIngredients] = useState<IngredientInput[]>([
    { name: "", quantity: "", calories: "", fat: "", protein: "", carbohydrates: "" },
  ]);
  const [loadingIdx, setLoadingIdx] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [portions, setPortions] = useState([{ label: "2P", total_weight_g: "" }]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const ingredientInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showGptPrompt, setShowGptPrompt] = useState(false);
  const [showGptResult, setShowGptResult] = useState(false);
  const [gptMacros, setGptMacros] = useState<any>(null);
  const [gptIdx, setGptIdx] = useState<number | null>(null);

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

  // Replace the old handleIngredientChange with the new one that supports both signatures
  const handleIngredientChange = (
    idx: number,
    fieldOrObject: keyof IngredientInput | Partial<IngredientInput>,
    value?: string
  ) => {
    setIngredients((prev) =>
      prev.map((ing, i) => {
        if (i !== idx) return ing;
        if (typeof fieldOrObject === "object") {
          // If per-100g values are present, always recalculate macros for the current or new quantity
          const hasPer100g =
            "caloriesPer100g" in fieldOrObject ||
            "fatPer100g" in fieldOrObject ||
            "proteinPer100g" in fieldOrObject ||
            "carbohydratesPer100g" in fieldOrObject;
          const safeQuantity = String((fieldOrObject as any).quantity ?? ing.quantity ?? "100");
          if (hasPer100g) {
            const qty = Number(safeQuantity) || 0;
            const factor = qty / 100;
            return {
              ...ing,
              ...fieldOrObject,
              quantity: safeQuantity,
              calories: (fieldOrObject as any).caloriesPer100g && qty > 0 ? (Number((fieldOrObject as any).caloriesPer100g) * factor).toFixed(2) : (fieldOrObject as any).caloriesPer100g || ing.caloriesPer100g || "",
              fat: (fieldOrObject as any).fatPer100g && qty > 0 ? (Number((fieldOrObject as any).fatPer100g) * factor).toFixed(2) : (fieldOrObject as any).fatPer100g || ing.fatPer100g || "",
              protein: (fieldOrObject as any).proteinPer100g && qty > 0 ? (Number((fieldOrObject as any).proteinPer100g) * factor).toFixed(2) : (fieldOrObject as any).proteinPer100g || ing.proteinPer100g || "",
              carbohydrates: (fieldOrObject as any).carbohydratesPer100g && qty > 0 ? (Number((fieldOrObject as any).carbohydratesPer100g) * factor).toFixed(2) : (fieldOrObject as any).carbohydratesPer100g || ing.carbohydratesPer100g || "",
            };
          }
          // If quantity is being updated in the object, recalculate nutrition
          if (Object.prototype.hasOwnProperty.call(fieldOrObject, "quantity")) {
            const qty = Number(safeQuantity) || 0;
            const factor = qty / 100;
            return {
              ...ing,
              ...fieldOrObject,
              quantity: safeQuantity,
              calories: ing.caloriesPer100g && qty > 0 ? (Number(ing.caloriesPer100g) * factor).toFixed(2) : ing.caloriesPer100g || "",
              fat: ing.fatPer100g && qty > 0 ? (Number(ing.fatPer100g) * factor).toFixed(2) : ing.fatPer100g || "",
              protein: ing.proteinPer100g && qty > 0 ? (Number(ing.proteinPer100g) * factor).toFixed(2) : ing.proteinPer100g || "",
              carbohydrates: ing.carbohydratesPer100g && qty > 0 ? (Number(ing.carbohydratesPer100g) * factor).toFixed(2) : ing.carbohydratesPer100g || "",
            };
          }
          return { ...ing, ...fieldOrObject, quantity: safeQuantity };
        } else if (fieldOrObject === "quantity") {
          const safeQuantity = String(value ?? ing.quantity ?? "100");
          const qty = Number(safeQuantity) || 0;
          const factor = qty / 100;
          return {
            ...ing,
            quantity: safeQuantity,
            calories: ing.caloriesPer100g && qty > 0 ? (Number(ing.caloriesPer100g) * factor).toFixed(2) : ing.caloriesPer100g || "",
            fat: ing.fatPer100g && qty > 0 ? (Number(ing.fatPer100g) * factor).toFixed(2) : ing.fatPer100g || "",
            protein: ing.proteinPer100g && qty > 0 ? (Number(ing.proteinPer100g) * factor).toFixed(2) : ing.proteinPer100g || "",
            carbohydrates: ing.carbohydratesPer100g && qty > 0 ? (Number(ing.carbohydratesPer100g) * factor).toFixed(2) : ing.carbohydratesPer100g || "",
          };
        } else {
          return { ...ing, [fieldOrObject]: value };
        }
      })
    );
  };

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { name: "", quantity: "", calories: "", fat: "", protein: "", carbohydrates: "" },
    ]);
  };

  const removeIngredient = (idx: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx));
  };

  const handlePortionChange = (idx: number, field: "label" | "total_weight_g", value: string) => {
    setPortions((prev) => prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)));
  };

  const addPortion = () => {
    setPortions((prev) => [...prev, { label: "2P", total_weight_g: "" }]);
  };

  const removePortion = (idx: number) => {
    setPortions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Convert all ingredient nutrition values to per 100g
    const normalizedIngredients = ingredients.map(ing => {
      const qty = Number(ing.quantity) || 100; // fallback to 100g if empty
      const factor = 100 / qty;
      return {
        ...ing,
        calories: (Number(ing.calories) * factor).toFixed(2),
        fat: (Number(ing.fat) * factor).toFixed(2),
        protein: (Number(ing.protein) * factor).toFixed(2),
        carbohydrates: (Number(ing.carbohydrates) * factor).toFixed(2),
      };
    });
    try {
      const res = await fetch("/api/components", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meal_id: mealId,
          component_name: componentName,
          before_cook_weight_g: beforeCookWeight,
          after_cook_weight_g: afterCookWeight,
          ingredients: normalizedIngredients,
          portions,
          category_id: selectedCategory || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to save component");
      setOpen(false);
      setComponentName("");
      setBeforeCookWeight("");
      setAfterCookWeight("");
      setIngredients([{ name: "", quantity: "", calories: "", fat: "", protein: "", carbohydrates: "" }]);
      setPortions([{ label: "2P", total_weight_g: "" }]);
      router.refresh();
      toast({ title: "Component saved!", description: "The component was added successfully." });
    } catch (err) {
      toast({ title: "Failed to save component", description: "Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  // Nutrition API fetch (with fallback and error handling)
  const fetchNutrition = async (idx: number) => {
    const ingredient = ingredients[idx];
    if (!ingredient.name) return;
    setLoadingIdx(idx);
    try {
      // 1. Try main nutrition API
      let res = await fetch("/api/nutrition-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredientName: ingredient.name,
          quantity: ingredient.quantity || 100,
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
          setIngredients((prev) => prev.map((ing, i) =>
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
          ));
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
            setIngredients((prev) => prev.map((ing, i) =>
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
            ));
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
        setIngredients((prev) => prev.map((ing, i) =>
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
        ));
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

  // Recalculate nutrition values when quantity changes
  const handleQuantityChange = (idx: number, value: string) => {
    setIngredients((prev) => {
      const ing = prev[idx];
      const qty = Number(value) || 0;
      const factor = qty / 100;
      return prev.map((ingr, i) =>
        i === idx
          ? {
              ...ingr,
              quantity: value,
              calories: ingr.caloriesPer100g && qty > 0 ? (Number(ingr.caloriesPer100g) * factor).toFixed(2) : ingr.caloriesPer100g || "",
              fat: ingr.fatPer100g && qty > 0 ? (Number(ingr.fatPer100g) * factor).toFixed(2) : ingr.fatPer100g || "",
              protein: ingr.proteinPer100g && qty > 0 ? (Number(ingr.proteinPer100g) * factor).toFixed(2) : ingr.proteinPer100g || "",
              carbohydrates: ingr.carbohydratesPer100g && qty > 0 ? (Number(ingr.carbohydratesPer100g) * factor).toFixed(2) : ingr.carbohydratesPer100g || "",
            }
          : ingr
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Component</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[98vh] min-h-[80vh] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle>Add Component</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Component Name</Label>
            <Input
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Category</Label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedCategory}
              onChange={e => setSelectedCategory(Number(e.target.value))}
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Before Cook Weight (g)</Label>
            <Input
              type="number"
              value={beforeCookWeight}
              onChange={(e) => setBeforeCookWeight(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>After Cook Weight (g)</Label>
            <Input
              type="number"
              value={afterCookWeight}
              onChange={(e) => setAfterCookWeight(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Ingredients</Label>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {ingredients.map((ingredient, idx) => (
                <IngredientRow
                  key={idx}
                  ingredient={ingredient}
                  idx={idx}
                  loading={loadingIdx === idx}
                  showRemove={ingredients.length > 1}
                  onChange={handleIngredientChange}
                  onRemove={removeIngredient}
                  fetchNutrition={fetchNutrition}
                  inputRef={el => { ingredientInputRefs.current[idx] = el; }}
                />
              ))}
              <Button type="button" variant="secondary" onClick={addIngredient}>
                + Add Ingredient
              </Button>
            </div>
          </div>
          <div>
            <Label>Portion Sizes</Label>
            <div className="space-y-2">
              {portions.map((portion, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <select
                    value={portion.label || '2P'}
                    onChange={e => handlePortionChange(idx, "label", e.target.value)}
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
                    value={portion.total_weight_g}
                    onChange={e => handlePortionChange(idx, "total_weight_g", e.target.value)}
                    required
                  />
                  {portions.length > 1 && (
                    <Button type="button" variant="destructive" size="icon" onClick={() => removePortion(idx)}>-</Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={addPortion}>+ Add Portion</Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
        {showGptPrompt && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded shadow">
              <div className="mb-4">No nutrition data found. Try ChatGPT?</div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={async () => {
                    setShowGptPrompt(false);
                    if (gptIdx !== null) {
                      const name = ingredients[gptIdx].name;
                      const res = await fetch("/api/gpt-nutrition", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ingredient: name }),
                      });
                      const macros = await res.json();
                      setGptMacros(macros);
                      setShowGptResult(true);
                    }
                  }}
                >
                  Yes
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowGptPrompt(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        {showGptResult && gptMacros && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded shadow">
              <div className="mb-4">
                ChatGPT suggests:<br />
                Calories: {gptMacros.calories}<br />
                Protein: {gptMacros.protein}<br />
                Fat: {gptMacros.fat}<br />
                Carbs: {gptMacros.carbs}<br />
                Use these values?
              </div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={() => {
                    if (gptIdx !== null) {
                      setIngredients((prev) =>
                        prev.map((ing, i) =>
                          i === gptIdx
                            ? {
                                ...ing,
                                calories: gptMacros.calories?.toString() ?? "",
                                protein: gptMacros.protein?.toString() ?? "",
                                fat: gptMacros.fat?.toString() ?? "",
                                carbohydrates: gptMacros.carbs?.toString() ?? "",
                                caloriesPer100g: gptMacros.calories?.toString() ?? "",
                                proteinPer100g: gptMacros.protein?.toString() ?? "",
                                fatPer100g: gptMacros.fat?.toString() ?? "",
                                carbohydratesPer100g: gptMacros.carbs?.toString() ?? "",
                              }
                            : ing
                        )
                      );
                    }
                    setShowGptResult(false);
                  }}
                >
                  Accept
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowGptResult(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 