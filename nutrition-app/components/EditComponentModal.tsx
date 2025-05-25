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

interface IngredientInput {
  name: string;
  quantity: string;
  calories: string;
  fat: string;
  protein: string;
  carbohydrates: string;
}

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
}: EditComponentModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [componentName, setComponentName] = useState(initialName);
  const [beforeCookWeight, setBeforeCookWeight] = useState(initialBeforeCookWeight);
  const [afterCookWeight, setAfterCookWeight] = useState(initialAfterCookWeight);
  const [ingredients, setIngredients] = useState<IngredientInput[]>(initialIngredients);
  const [loadingIdx, setLoadingIdx] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [portions, setPortions] = useState<PortionInput[]>(initialPortions);

  useEffect(() => {
    setComponentName(initialName);
    setBeforeCookWeight(initialBeforeCookWeight);
    setAfterCookWeight(initialAfterCookWeight);
    setIngredients(initialIngredients);
    setPortions(initialPortions);
  }, [initialName, initialBeforeCookWeight, initialAfterCookWeight, initialIngredients, initialPortions, open]);

  const handleIngredientChange = (idx: number, field: keyof IngredientInput, value: string) => {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === idx ? { ...ing, [field]: value } : ing))
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
      <DialogContent className="max-h-[95vh] overflow-y-auto">
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
                <div key={idx} className="flex flex-col gap-2 border p-2 rounded-md bg-gray-50">
                  <div className="flex gap-2 items-center">
                    <Input
                      placeholder="Ingredient Name"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(idx, "name", e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Quantity (g)"
                      type="number"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(idx, "quantity", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={!ingredient.name || loadingIdx === idx}
                      onClick={() => fetchNutrition(idx)}
                    >
                      {loadingIdx === idx ? "Loading..." : "Get Nutrition"}
                    </Button>
                    {ingredients.length > 1 && (
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeIngredient(idx)}>
                        -
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Input
                      placeholder="Calories (per 100g)"
                      type="number"
                      value={ingredient.calories ?? 0}
                      onChange={(e) => handleIngredientChange(idx, "calories", e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Fat (g)"
                      type="number"
                      value={ingredient.fat ?? 0}
                      onChange={(e) => handleIngredientChange(idx, "fat", e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Protein (g)"
                      type="number"
                      value={ingredient.protein ?? 0}
                      onChange={(e) => handleIngredientChange(idx, "protein", e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Carbohydrates (g)"
                      type="number"
                      value={ingredient.carbohydrates ?? 0}
                      onChange={(e) => handleIngredientChange(idx, "carbohydrates", e.target.value)}
                      required
                    />
                  </div>
                </div>
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