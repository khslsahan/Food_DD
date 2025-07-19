"use client";

import React, { useState } from "react";
import { Button } from "./button";
import { Zap, Loader2 } from "lucide-react";
import { handleNutritionFetch, updateIngredientWithNutrition, IngredientInput } from "@/lib/nutrition-utils";
import { useToast } from "./use-toast";

interface GetNutritionButtonProps {
  ingredient: IngredientInput;
  onNutritionUpdate: (updatedIngredient: IngredientInput) => void;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  variant?: "outline" | "default" | "secondary";
  className?: string;
}

export function GetNutritionButton({
  ingredient,
  onNutritionUpdate,
  disabled = false,
  size = "sm",
  variant = "outline",
  className = ""
}: GetNutritionButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    if (!ingredient.name || loading) return;

    setLoading(true);
    try {
      // Ensure we have the correct unit and quantity
      const safeQuantity = ingredient.quantity || "100";
      const safeUnit = ingredient.unit || "g";
      
      console.log("GetNutritionButton - ingredient data:", {
        name: ingredient.name,
        quantity: safeQuantity,
        unit: safeUnit,
        originalQuantity: ingredient.quantity,
        originalUnit: ingredient.unit
      });

      const nutritionData = await handleNutritionFetch(
        ingredient.name,
        safeQuantity,
        safeUnit
      );

      if (nutritionData && nutritionData.success && nutritionData.nutrition?.macros) {
        const updatedIngredient = updateIngredientWithNutrition(
          ingredient,
          nutritionData.nutrition.macros,
          Number(ingredient.quantity),
          nutritionData.nutrition.per100gData
        );
        
        onNutritionUpdate(updatedIngredient);
        
        // Show success notification based on source
        const sourceMessages = {
          database: `Nutritional information for ${ingredient.name} has been fetched from database.`,
          edamam: `Nutritional information for ${ingredient.name} has been fetched from Edamam API.`,
          gpt: `Nutritional information for ${ingredient.name} has been fetched from GPT analysis.`
        };
        
        toast({
          title: "Nutrition data fetched",
          description: sourceMessages[nutritionData.source as keyof typeof sourceMessages] || "Nutrition data updated successfully.",
        });
      } else if (nutritionData && !nutritionData.success) {
        // Show error notification
        toast({
          title: "Nutrition Not Found",
          description: nutritionData.error || `Could not find nutrition data for ${ingredient.name}.`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error fetching nutrition:", error);
      toast({
        title: "Nutrition Lookup Error",
        description: error instanceof Error ? error.message : "Unknown error occurred during nutrition lookup.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={!ingredient.name || disabled || loading}
      onClick={handleClick}
      className={className}
    >
      {loading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Zap className="h-3 w-3" />
      )}
      Get Nutrition
    </Button>
  );
} 