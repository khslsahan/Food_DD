"use client";

import React, { useState, useEffect } from "react";
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

interface PortionInput {
  label: string;
  total_weight_g: string;
}

interface EditComponentModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  componentId: number;
  mealId: number;
  initialName: string;
  initialBeforeCookWeight: string;
  initialAfterCookWeight: string;
  initialIngredients: IngredientInput[];
  initialPortions: PortionInput[];
}

export function EditComponentModal({
  open,
  setOpen,
  componentId,
  mealId,
  initialName,
  initialBeforeCookWeight,
  initialAfterCookWeight,
  initialIngredients,
  initialPortions,
  initialCategoryId,
}: EditComponentModalProps & { initialCategoryId?: number }) {
  const router = useRouter();
  const { toast } = useToast();
  const [componentName, setComponentName] = useState(initialName);
  const [beforeCookWeight, setBeforeCookWeight] = useState(initialBeforeCookWeight);
  const [afterCookWeight, setAfterCookWeight] = useState(initialAfterCookWeight);
  const [ingredients, setIngredients] = useState<IngredientInput[]>(initialIngredients);
  const [loadingIdx, setLoadingIdx] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [portions, setPortions] = useState<PortionInput[]>(initialPortions);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">(initialCategoryId || "");

  useEffect(() => {
    setComponentName(initialName);
    setBeforeCookWeight(initialBeforeCookWeight);
    setAfterCookWeight(initialAfterCookWeight);
    setIngredients(initialIngredients);
    setPortions(initialPortions);
  }, [initialName, initialBeforeCookWeight, initialAfterCookWeight, initialIngredients, initialPortions, open]);

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

  useEffect(() => {
    setSelectedCategory(initialCategoryId || "");
  }, [initialCategoryId, open]);

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
      const res = await fetch(`/api/components/${componentId}`, {
        method: "PUT",
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
      if (!res.ok) throw new Error("Failed to update component");
      setOpen(false);
      toast({ title: "Component updated!", description: "The component was updated successfully." });
      router.refresh();
    } catch (err) {
      toast({ title: "Failed to update component", description: "Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  // Edamam API fetch (frontend demo only)
  const fetchNutrition = async (idx: number) => {
    const ingredient = ingredients[idx];
    if (!ingredient.name) return;
    setLoadingIdx(idx);
    try {
      const ingr = `${ingredient.quantity || 100}g ${ingredient.name}`;
      const res = await fetch("/api/edamam-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingr }),
      });
      const data = await res.json();
      let nutrients = null;
      if (data.totalNutrients) {
        nutrients = data.totalNutrients;
      } else if (
        data.ingredients &&
        data.ingredients[0] &&
        data.ingredients[0].parsed &&
        data.ingredients[0].parsed[0] &&
        data.ingredients[0].parsed[0].nutrients
      ) {
        nutrients = data.ingredients[0].parsed[0].nutrients;
      }
      if (nutrients) {
        setIngredients((prev) => prev.map((ing, i) =>
          i === idx
            ? {
                ...ing,
                calories: Math.round(nutrients.ENERC_KCAL?.quantity || 0).toString(),
                fat: Math.round(nutrients.FAT?.quantity || 0).toString(),
                protein: Math.round(nutrients.PROCNT?.quantity || 0).toString(),
                carbohydrates: Math.round(nutrients.CHOCDF?.quantity || 0).toString(),
              }
            : ing
        ));
      } else {
        alert("No nutrition data found.");
      }
    } catch (e) {
      alert("Failed to fetch nutrition data");
    } finally {
      setLoadingIdx(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl max-h-[98vh] min-h-[80vh] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle>Edit Component</DialogTitle>
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
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 