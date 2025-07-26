"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CheckCircle, XCircle, Edit, Save, Loader2, Eye, Search, Zap, Check, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams, useRouter as useNextRouter } from "next/navigation";
import { DocumentPreview } from "./DocumentPreview";
import { UploaderComponentEditor } from "./UploaderComponentEditor";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetNutritionButton } from "./ui/get-nutrition-button";
import { updateIngredientWithNutrition } from "@/lib/nutrition-utils";
import { Header } from "@/components/layout/header";

interface ExtractedIngredient {
  name: string;
  quantity: number;
  unit: string;
  calories?: number;
  fat?: number;
  protein?: number;
  carbohydrates?: number;
  raw_quantity?: number;
  cooked_quantity?: number;
}

interface ExtractedComponent {
  name: string;
  base_quantity?: number;
  ingredients: ExtractedIngredient[];
  portions?: {
    label: string;
    total_weight_g: string;
  }[];
  before_cook_weight_g?: string;
  after_cook_weight_g?: string;
}

interface ExtractedRecipe {
  name: string;
  description?: string;
  packaging?: string;
  objective?: string;
  itemCode?: string;
  isBalancedMeal?: boolean;
  isGourmetMeal?: boolean;
  isWeightLossMeal?: boolean;
  components: ExtractedComponent[];
  notes?: string[];
}

interface RecipeWithStatus extends ExtractedRecipe {
  saved?: boolean;
  saving?: boolean;
  error?: string;
  validationErrors?: ValidationErrors;
}

interface ValidationErrors {
  mealName?: string;
  components?: { [key: number]: ComponentValidationErrors };
  general?: string[];
}

interface ComponentValidationErrors {
  name?: string;
  weights?: string;
  cookWeights?: string;
  portions?: string;
  ingredients?: { [key: number]: string };
}

export function RecipeUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [extractedRecipes, setExtractedRecipes] = useState<RecipeWithStatus[]>([]);
  const [editingRecipes, setEditingRecipes] = useState<RecipeWithStatus[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [loadingNutrition, setLoadingNutrition] = useState<{[key: string]: boolean}>({});
  const [documentContent, setDocumentContent] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextRouter = useNextRouter();
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);

  // On mount, set selectedRecipeIndex from query param
  useEffect(() => {
    const recipeParam = searchParams.get("recipe");
    if (recipeParam && !isNaN(Number(recipeParam))) {
      setSelectedRecipeIndex(Number(recipeParam) - 1);
    }
  }, [searchParams]);

  // When selectedRecipeIndex changes, update the URL
  useEffect(() => {
    if (editingRecipes.length > 0) {
      const newParam = `?recipe=${selectedRecipeIndex + 1}`;
      nextRouter.replace(newParam, { scroll: false });
    }
  }, [selectedRecipeIndex, editingRecipes.length, nextRouter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (editingRecipes.length === 0) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          setSelectedRecipeIndex(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowRight':
          event.preventDefault();
          setSelectedRecipeIndex(prev => Math.min(editingRecipes.length - 1, prev + 1));
          break;
        case 'Home':
          event.preventDefault();
          setSelectedRecipeIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setSelectedRecipeIndex(editingRecipes.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingRecipes.length]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.docx')) {
        toast({
          title: "Invalid file type",
          description: "Please select a .docx file",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
    }
  }, [toast]);

  const handleUpload = useCallback(async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-recipe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const recipesWithStatus = data.recipes.map((recipe: ExtractedRecipe) => ({
          ...recipe,
          saved: false,
          saving: false,
          error: undefined
        }));
        
        setExtractedRecipes(recipesWithStatus);
        setEditingRecipes(recipesWithStatus);
        setFileName(data.fileName);
        setDocumentContent(data.documentContent || "");
        
        toast({
          title: "File uploaded successfully",
          description: `${data.recipes.length} recipe(s) extracted. Please verify and save each recipe individually.`,
        });
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [file, toast]);

  // Validation function to check if meal name already exists
  const validateMealName = useCallback(async (mealName: string, currentRecipeIndex?: number): Promise<string | null> => {
    console.log(`Validating meal name: "${mealName}" for recipe ${currentRecipeIndex}`);
    
    if (!mealName.trim()) {
      console.log("Meal name is empty");
      return "Meal name is required";
    }
    
    if (mealName.trim().length < 2) {
      console.log(`Meal name is too short: "${mealName}"`);
      return "Meal name must be at least 2 characters long";
    }

    try {
      const response = await fetch(`/api/meals/check-name?name=${encodeURIComponent(mealName.trim())}`);
      const data = await response.json();
      
      if (response.ok && data.exists) {
        // If this is an update of the same recipe, it's okay
        if (currentRecipeIndex !== undefined && editingRecipes[currentRecipeIndex]?.saved) {
          console.log("Meal name exists but this is an update of existing recipe - allowing");
          return null; // Allow update of existing recipe
        }
        console.log(`Meal name already exists: "${mealName}"`);
        return "A meal with this name already exists. Please choose a different name.";
      }
      
      console.log(`Meal name validation passed: "${mealName}"`);
      return null;
    } catch (error) {
      console.error("Error checking meal name:", error);
      return "Error checking meal name availability";
    }
  }, [editingRecipes]);

  // Validation function for component names
  const validateComponentName = useCallback((componentName: string, componentIndex: number, recipeIndex: number): string | null => {
    console.log(`Validating component name: "${componentName}" for component ${componentIndex}`);
    
    if (!componentName.trim()) {
      console.log(`Component ${componentIndex} name is empty`);
      return "Component name is required";
    }
    
    if (componentName.trim().length < 2) {
      console.log(`Component ${componentIndex} name is too short: "${componentName}"`);
      return "Component name must be at least 2 characters long";
    }

    // Check for duplicate component names within the same recipe
    const recipe = editingRecipes[recipeIndex];
    if (recipe) {
      const duplicateIndex = recipe.components.findIndex((comp, idx) => 
        idx !== componentIndex && 
        comp.name.trim().toLowerCase() === componentName.trim().toLowerCase()
      );
      
      if (duplicateIndex !== -1) {
        console.log(`Component ${componentIndex} name is duplicate of component ${duplicateIndex}: "${componentName}"`);
        return "Component name must be unique within the recipe";
      }
    }
    
    console.log(`Component ${componentIndex} name validation passed: "${componentName}"`);
    return null;
  }, [editingRecipes]);

  // Validation function for weights
  const validateWeights = useCallback((component: ExtractedComponent, componentIndex: number): string | null => {
    const errors: string[] = [];
    
    // Debug: Log component ingredients data
    console.log(`=== VALIDATE WEIGHTS FOR COMPONENT ${componentIndex} ===`);
    console.log(`Component ${componentIndex} ingredients:`, component.ingredients);
    
    // Check if component has ingredients
    if (!component.ingredients || component.ingredients.length === 0) {
      console.log(`Component ${componentIndex} has no ingredients`);
      errors.push("Component must have at least one ingredient");
    }
    
    // Check ingredient weights
    if (component.ingredients) {
      component.ingredients.forEach((ingredient, ingredientIndex) => {
        console.log(`=== INGREDIENT ${ingredientIndex} VALIDATION ===`);
        console.log(`Component ${componentIndex} ingredient ${ingredientIndex}:`, ingredient);
        
        if (!ingredient.name.trim()) {
          console.log(`Component ${componentIndex} ingredient ${ingredientIndex} has no name`);
          errors.push(`Ingredient ${ingredientIndex + 1} name is required`);
        }
        
        // Check all possible quantity fields and handle string parsing
        let quantity = 0;
        if (ingredient.raw_quantity) {
          quantity = Number(ingredient.raw_quantity) || 0;
        } else if (ingredient.quantity) {
          quantity = Number(ingredient.quantity) || 0;
        } else if (ingredient.cooked_quantity) {
          quantity = Number(ingredient.cooked_quantity) || 0;
        }
        
        console.log(`Component ${componentIndex} ingredient ${ingredientIndex} quantity:`, {
          raw_quantity: ingredient.raw_quantity,
          quantity: ingredient.quantity,
          cooked_quantity: ingredient.cooked_quantity,
          final_quantity: quantity,
          isNaN: isNaN(quantity)
        });
        
        if (isNaN(quantity) || quantity <= 0) {
          console.log(`Component ${componentIndex} ingredient ${ingredientIndex} has invalid quantity: ${quantity}`);
          errors.push(`Ingredient "${ingredient.name}" must have a valid weight greater than 0`);
        }
        
        if (quantity > 10000) {
          console.log(`Component ${componentIndex} ingredient ${ingredientIndex} has excessive quantity: ${quantity}`);
          errors.push(`Ingredient "${ingredient.name}" weight seems too high (${quantity}g). Please verify.`);
        }
        
        console.log(`=== END INGREDIENT ${ingredientIndex} VALIDATION ===`);
      });
    }
    
    console.log(`=== END VALIDATE WEIGHTS FOR COMPONENT ${componentIndex} ===`);
    console.log(`Component ${componentIndex} weight validation errors:`, errors);
    return errors.length > 0 ? errors.join("; ") : null;
  }, []);

  // Validation function for cook weights
  const validateCookWeights = useCallback((component: ExtractedComponent, componentIndex: number): string | null => {
    const errors: string[] = [];
    
    // Debug: Log component data
    console.log(`=== VALIDATE COOK WEIGHTS FOR COMPONENT ${componentIndex} ===`);
    console.log(`Component ${componentIndex} cook weights:`, {
      before: component.before_cook_weight_g,
      after: component.after_cook_weight_g,
      component: component
    });
    
    // Check before cook weight - required
    const beforeCookWeight = Number(component.before_cook_weight_g) || 0;
    console.log(`Component ${componentIndex} before cook weight:`, beforeCookWeight);
    if (beforeCookWeight <= 0) {
      console.log(`Component ${componentIndex} before cook weight is invalid: ${beforeCookWeight}`);
      errors.push("Before cook weight must be greater than 0");
    }
    
    // Check after cook weight - required
    const afterCookWeight = Number(component.after_cook_weight_g) || 0;
    console.log(`Component ${componentIndex} after cook weight:`, afterCookWeight);
    if (afterCookWeight <= 0) {
      console.log(`Component ${componentIndex} after cook weight is invalid: ${afterCookWeight}`);
      errors.push("After cook weight must be greater than 0");
    }
    
    // Check if after cook weight is reasonable compared to before cook weight
    if (beforeCookWeight > 0 && afterCookWeight > 0) {
      const weightLossPercentage = ((beforeCookWeight - afterCookWeight) / beforeCookWeight) * 100;
      console.log(`Component ${componentIndex} weight loss percentage:`, weightLossPercentage);
      
      // More flexible weight difference validation
      if (weightLossPercentage > 80) {
        console.log(`Component ${componentIndex} weight loss too high: ${weightLossPercentage}%`);
        errors.push("After cook weight seems too low compared to before cook weight. Please verify.");
      }
      if (weightLossPercentage < -50) {
        console.log(`Component ${componentIndex} weight gain too high: ${weightLossPercentage}%`);
        errors.push("After cook weight seems too high compared to before cook weight. Please verify.");
      }
    }
    
    console.log(`=== END VALIDATE COOK WEIGHTS FOR COMPONENT ${componentIndex} ===`);
    console.log(`Component ${componentIndex} cook weights validation errors:`, errors);
    return errors.length > 0 ? errors.join("; ") : null;
  }, []);

  // Validation function for portion sizes
  const validatePortions = useCallback((component: ExtractedComponent, componentIndex: number): string | null => {
    // Debug: Log component portions data
    console.log(`=== VALIDATE PORTIONS FOR COMPONENT ${componentIndex} ===`);
    console.log(`Component ${componentIndex} portions:`, component.portions);
    
    // Check if component has portions - required
    if (!component.portions || component.portions.length === 0) {
      console.log(`Component ${componentIndex} has no portions`);
      return "At least one portion size must be entered";
    }
    
    // Check if at least one portion has a valid weight
    const hasValidPortion = component.portions.some(portion => {
      const weight = Number(portion.total_weight_g) || 0;
      console.log(`Component ${componentIndex} portion weight:`, weight);
      return weight > 0;
    });
    
    console.log(`Component ${componentIndex} has valid portion:`, hasValidPortion);
    
    if (!hasValidPortion) {
      console.log(`Component ${componentIndex} has no valid portions`);
      return "At least one portion size must have a valid weight greater than 0";
    }
    
    console.log(`=== END VALIDATE PORTIONS FOR COMPONENT ${componentIndex} ===`);
    console.log(`Component ${componentIndex} portions validation passed`);
    return null;
  }, []);

  // Main validation function
  const validateRecipe = useCallback(async (recipe: ExtractedRecipe, recipeIndex: number): Promise<ValidationErrors> => {
    const errors: ValidationErrors = {
      components: {},
      general: []
    };

    // Validate meal name
    const mealNameError = await validateMealName(recipe.name, recipeIndex);
    if (mealNameError) {
      errors.mealName = mealNameError;
    }

    // Validate components
    if (!recipe.components || recipe.components.length === 0) {
      errors.general?.push("Recipe must have at least one component");
    } else {
      recipe.components.forEach((component, componentIndex) => {
        const componentErrors: ComponentValidationErrors = {};
        
        console.log(`Validating component ${componentIndex}:`, component);
        
        // Validate component name
        const componentNameError = validateComponentName(component.name, componentIndex, recipeIndex);
        if (componentNameError) {
          componentErrors.name = componentNameError;
          console.log(`Component ${componentIndex} name error:`, componentNameError);
        }
        
        // Validate weights
        const weightsError = validateWeights(component, componentIndex);
        if (weightsError) {
          componentErrors.weights = weightsError;
          console.log(`Component ${componentIndex} weights error:`, weightsError);
        }

        // Validate cook weights
        const cookWeightsError = validateCookWeights(component, componentIndex);
        if (cookWeightsError) {
          componentErrors.cookWeights = cookWeightsError;
          console.log(`Component ${componentIndex} cook weights error:`, cookWeightsError);
        }

        // Validate portions
        const portionsError = validatePortions(component, componentIndex);
        if (portionsError) {
          componentErrors.portions = portionsError;
          console.log(`Component ${componentIndex} portions error:`, portionsError);
        }
        
        // Validate individual ingredients
        if (component.ingredients) {
          componentErrors.ingredients = {};
          component.ingredients.forEach((ingredient, ingredientIndex) => {
            console.log(`Component ${componentIndex} ingredient ${ingredientIndex}:`, ingredient);
            
            if (!ingredient.name.trim()) {
              componentErrors.ingredients![ingredientIndex] = "Ingredient name is required";
              console.log(`Component ${componentIndex} ingredient ${ingredientIndex} name error`);
            }
            
            // Use the same improved quantity parsing logic
            let quantity = 0;
            if (ingredient.raw_quantity) {
              quantity = Number(ingredient.raw_quantity) || 0;
            } else if (ingredient.quantity) {
              quantity = Number(ingredient.quantity) || 0;
            } else if (ingredient.cooked_quantity) {
              quantity = Number(ingredient.cooked_quantity) || 0;
            }
            
            if (isNaN(quantity) || quantity <= 0) {
              componentErrors.ingredients![ingredientIndex] = "Weight must be greater than 0";
              console.log(`Component ${componentIndex} ingredient ${ingredientIndex} weight error: quantity = ${quantity}`);
            }
          });
          
          // Only add ingredient errors if there are significant issues
          if (Object.keys(componentErrors.ingredients).length === component.ingredients.length) {
            // All ingredients have errors, this might be a data issue
            console.log(`Component ${componentIndex} has errors for all ingredients, this might be a data issue`);
          }
        }
        
        if (Object.keys(componentErrors).length > 0) {
          errors.components![componentIndex] = componentErrors;
          console.log(`Component ${componentIndex} has validation errors:`, componentErrors);
        } else {
          console.log(`Component ${componentIndex} passed validation`);
        }
      });
    }

    return errors;
  }, [validateMealName, validateComponentName, validateWeights, validatePortions, validateCookWeights]);

  // Helper function to suggest a unique meal name
  const suggestUniqueMealName = useCallback((originalName: string): string => {
    const timestamp = new Date().getTime();
    const randomSuffix = Math.floor(Math.random() * 1000);
    return `${originalName} (${timestamp}-${randomSuffix})`;
  }, []);

  // Helper function to check if there are actual validation errors
  const hasValidationErrors = useCallback((validationErrors: ValidationErrors | undefined): boolean => {
    if (!validationErrors) return false;
    
    // Check meal name error
    if (validationErrors.mealName) return true;
    
    // Check general errors
    if (validationErrors.general && validationErrors.general.length > 0) return true;
    
    // Check component errors
    if (validationErrors.components) {
      for (const componentIndex in validationErrors.components) {
        const componentErrors = validationErrors.components[componentIndex];
        if (componentErrors.name || componentErrors.weights || componentErrors.cookWeights || 
            componentErrors.portions || (componentErrors.ingredients && Object.keys(componentErrors.ingredients).length > 0)) {
          return true;
        }
      }
    }
    
    return false;
  }, []);

  // Clear validation errors for a recipe
  const clearValidationErrors = useCallback((recipeIndex: number) => {
    setEditingRecipes(prev => prev.map((recipe, idx) => 
      idx === recipeIndex 
        ? { ...recipe, validationErrors: undefined }
        : recipe
    ));
  }, []);

  // Clear specific validation error when user makes changes
  const clearValidationError = useCallback((recipeIndex: number, errorType: 'mealName' | 'general' | 'components') => {
    setEditingRecipes(prev => prev.map((recipe, idx) => {
      if (idx !== recipeIndex) return recipe;
      
      if (!recipe.validationErrors) return recipe;
      
      const updatedErrors = { ...recipe.validationErrors };
      
      if (errorType === 'mealName') {
        delete updatedErrors.mealName;
      } else if (errorType === 'general') {
        updatedErrors.general = [];
      } else if (errorType === 'components') {
        updatedErrors.components = {};
      }
      
      // If no more errors, remove validationErrors entirely
      if (!updatedErrors.mealName && 
          (!updatedErrors.general || updatedErrors.general.length === 0) &&
          (!updatedErrors.components || Object.keys(updatedErrors.components).length === 0)) {
        return { ...recipe, validationErrors: undefined };
      }
      
      return { ...recipe, validationErrors: updatedErrors };
    }));
  }, []);

  // Clear component validation error
  const clearComponentValidationError = useCallback((recipeIndex: number, componentIndex: number, errorType: 'name' | 'weights' | 'cookWeights' | 'portions' | 'ingredients') => {
    setEditingRecipes(prev => prev.map((recipe, idx) => {
      if (idx !== recipeIndex) return recipe;
      
      if (!recipe.validationErrors?.components?.[componentIndex]) return recipe;
      
      const updatedErrors = { ...recipe.validationErrors };
      const updatedComponents = { ...updatedErrors.components };
      const updatedComponentErrors = { ...updatedComponents[componentIndex] };
      
      delete updatedComponentErrors[errorType];
      
      if (Object.keys(updatedComponentErrors).length === 0) {
        delete updatedComponents[componentIndex];
      } else {
        updatedComponents[componentIndex] = updatedComponentErrors;
      }
      
      updatedErrors.components = updatedComponents;
      
      // If no more errors, remove validationErrors entirely
      if (!updatedErrors.mealName && 
          (!updatedErrors.general || updatedErrors.general.length === 0) &&
          Object.keys(updatedErrors.components).length === 0) {
        return { ...recipe, validationErrors: undefined };
      }
      
      return { ...recipe, validationErrors: updatedErrors };
    }));
  }, []);

  const handleSaveRecipe = useCallback(async (recipeIndex: number) => {
    if (!editingRecipes[recipeIndex] || !fileName) return;

    // Clear previous validation errors
    clearValidationErrors(recipeIndex);

    // Validate recipe before saving
    const validationErrors = await validateRecipe(editingRecipes[recipeIndex], recipeIndex);
    
    // Debug: Log validation errors to console
    console.log("=== VALIDATION DEBUG ===");
    console.log("Recipe being validated:", editingRecipes[recipeIndex]);
    console.log("Validation errors detected:", validationErrors);
    console.log("Meal name error:", validationErrors.mealName);
    console.log("General errors:", validationErrors.general);
    console.log("Component errors:", validationErrors.components);
    console.log("Has validation errors:", hasValidationErrors(validationErrors));
    console.log("=== END VALIDATION DEBUG ===");
    
    if (validationErrors.mealName || validationErrors.general?.length || Object.keys(validationErrors.components || {}).length > 0) {
      console.log("=== SAVE BLOCKED ===");
      console.log("Save blocked due to validation errors");
      console.log("Meal name error exists:", !!validationErrors.mealName);
      console.log("General errors count:", validationErrors.general?.length || 0);
      console.log("Component errors count:", Object.keys(validationErrors.components || {}).length);
      console.log("=== END SAVE BLOCKED ===");
      
      // Check if there are actual component errors (not just empty objects)
      const hasActualComponentErrors = Object.values(validationErrors.components || {}).some(compErrors => 
        compErrors.name || compErrors.weights || compErrors.cookWeights || compErrors.portions || 
        (compErrors.ingredients && Object.keys(compErrors.ingredients).length > 0)
      );
      
      console.log("Has actual component errors:", hasActualComponentErrors);
      
      // Only block save if there are actual errors
      if (validationErrors.mealName || validationErrors.general?.length || hasActualComponentErrors) {
        console.log("=== ACTUAL ERRORS DETECTED ===");
        console.log("Meal name error:", validationErrors.mealName);
        console.log("General errors:", validationErrors.general);
        console.log("Component errors:", validationErrors.components);
        console.log("=== END ACTUAL ERRORS ===");
        
        // Update recipe with validation errors
        setEditingRecipes(prev => prev.map((recipe, idx) => 
          idx === recipeIndex 
            ? { ...recipe, validationErrors }
            : recipe
        ));
        
        // Show validation error toast
        const errorMessages = [
          validationErrors.mealName,
          ...(validationErrors.general || []),
          ...Object.values(validationErrors.components || {}).map(comp => 
            [comp.name, comp.weights, comp.cookWeights, comp.portions, ...Object.values(comp.ingredients || {})].filter(Boolean)
          ).flat()
        ].filter(Boolean);
        
        console.log("Error messages for toast:", errorMessages);
        
        toast({
          title: "Validation Failed",
          description: `Please fix the following errors: ${errorMessages.slice(0, 3).join(", ")}${errorMessages.length > 3 ? "..." : ""}`,
          variant: "destructive",
        });
        
        return;
      }
    }
    
    console.log("=== SAVE PROCEEDING ===");
    console.log("No validation errors detected, proceeding with save");
    console.log("=== END SAVE PROCEEDING ===");

    // Update the recipe status to saving
    setEditingRecipes(prev => prev.map((recipe, idx) => 
      idx === recipeIndex 
        ? { ...recipe, saving: true, error: undefined, validationErrors: undefined }
        : recipe
    ));

    try {
      const response = await fetch("/api/upload-recipe", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe: editingRecipes[recipeIndex],
          fileName,
          recipeIndex,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setEditingRecipes(prev => prev.map((recipe, idx) => 
          idx === recipeIndex 
            ? { ...recipe, saved: true, saving: false, error: undefined, validationErrors: undefined }
            : recipe
        ));
        
        toast({
          title: "Recipe saved successfully",
          description: `${editingRecipes[recipeIndex].name} has been saved to the database.`,
        });
      } else {
        throw new Error(data.error || "Save failed");
      }
    } catch (error) {
      setEditingRecipes(prev => prev.map((recipe, idx) => 
        idx === recipeIndex 
          ? { ...recipe, saving: false, error: error instanceof Error ? error.message : "Save failed", validationErrors: undefined }
          : recipe
      ));
      
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "An error occurred while saving",
        variant: "destructive",
      });
    }
  }, [editingRecipes, fileName, toast, clearValidationErrors, validateRecipe]);

  const handleNutritionUpdate = useCallback((
    recipeIndex: number, 
    componentIndex: number, 
    ingredientIndex: number, 
    updatedIngredient: any
  ) => {
    if (!editingRecipes[recipeIndex]) return;
    
    const updatedRecipes = [...editingRecipes];
    const updatedComponents = [...updatedRecipes[recipeIndex].components];
    const updatedIngredients = [...updatedComponents[componentIndex].ingredients];
    
    updatedIngredients[ingredientIndex] = {
      ...updatedIngredients[ingredientIndex],
      ...updatedIngredient,
      calories: updatedIngredient.calories,
      fat: updatedIngredient.fat,
      protein: updatedIngredient.protein,
      carbohydrates: updatedIngredient.carbohydrates,
    };
    
    updatedComponents[componentIndex] = {
      ...updatedComponents[componentIndex],
      ingredients: updatedIngredients,
    };
    
    updatedRecipes[recipeIndex] = { 
      ...updatedRecipes[recipeIndex], 
      components: updatedComponents 
    };
    
    setEditingRecipes(updatedRecipes);
  }, [editingRecipes]);

  const updateRecipeField = useCallback((recipeIndex: number, field: keyof ExtractedRecipe, value: any) => {
    if (!editingRecipes[recipeIndex]) return;
    const updatedRecipes = [...editingRecipes];
    updatedRecipes[recipeIndex] = { ...updatedRecipes[recipeIndex], [field]: value };
    setEditingRecipes(updatedRecipes);
    
    // Clear validation errors when user makes changes
    if (field === 'name') {
      clearValidationError(recipeIndex, 'mealName');
    }
  }, [editingRecipes, clearValidationError]);

  const updateComponentField = useCallback((recipeIndex: number, componentIndex: number, field: keyof ExtractedComponent, value: any) => {
    if (!editingRecipes[recipeIndex]) return;
    const updatedRecipes = [...editingRecipes];
    const updatedComponents = [...updatedRecipes[recipeIndex].components];
    updatedComponents[componentIndex] = { ...updatedComponents[componentIndex], [field]: value };
    updatedRecipes[recipeIndex] = { ...updatedRecipes[recipeIndex], components: updatedComponents };
    setEditingRecipes(updatedRecipes);
    
    // Clear validation errors when user makes changes
    if (field === 'name') {
      clearComponentValidationError(recipeIndex, componentIndex, 'name');
    } else if (field === 'before_cook_weight_g' || field === 'after_cook_weight_g') {
      clearComponentValidationError(recipeIndex, componentIndex, 'cookWeights');
    }
  }, [editingRecipes, clearComponentValidationError]);

  const updateIngredientField = useCallback((
    recipeIndex: number,
    componentIndex: number,
    ingredientIndex: number,
    field: keyof ExtractedIngredient,
    value: any
  ) => {
    if (!editingRecipes[recipeIndex]) return;
    const updatedRecipes = [...editingRecipes];
    const updatedComponents = [...updatedRecipes[recipeIndex].components];
    const updatedIngredients = [...updatedComponents[componentIndex].ingredients];
    updatedIngredients[ingredientIndex] = { ...updatedIngredients[ingredientIndex], [field]: value };
    updatedComponents[componentIndex] = {
      ...updatedComponents[componentIndex],
      ingredients: updatedIngredients,
    };
    updatedRecipes[recipeIndex] = { ...updatedRecipes[recipeIndex], components: updatedComponents };
    setEditingRecipes(updatedRecipes);
  }, [editingRecipes]);

  const addComponent = useCallback((recipeIndex: number) => {
    if (!editingRecipes[recipeIndex]) return;
    const newComponent: ExtractedComponent = {
      name: "New Component",
      ingredients: [],
    };
    const updatedRecipes = [...editingRecipes];
    updatedRecipes[recipeIndex] = {
      ...updatedRecipes[recipeIndex],
      components: [...updatedRecipes[recipeIndex].components, newComponent],
    };
    setEditingRecipes(updatedRecipes);
  }, [editingRecipes]);

  const addIngredient = useCallback((recipeIndex: number, componentIndex: number) => {
    if (!editingRecipes[recipeIndex]) return;
    const newIngredient: ExtractedIngredient = {
      name: "",
      quantity: 0,
      unit: "g",
    };
    const updatedRecipes = [...editingRecipes];
    const updatedComponents = [...updatedRecipes[recipeIndex].components];
    updatedComponents[componentIndex].ingredients.push(newIngredient);
    updatedRecipes[recipeIndex] = { ...updatedRecipes[recipeIndex], components: updatedComponents };
    setEditingRecipes(updatedRecipes);
  }, [editingRecipes]);

  // Function to completely reset validation errors for a recipe
  const resetValidationErrors = useCallback((recipeIndex: number) => {
    console.log(`=== RESETTING VALIDATION ERRORS FOR RECIPE ${recipeIndex} ===`);
    
    setEditingRecipes(prev => prev.map((recipe, idx) => {
      if (idx !== recipeIndex) return recipe;
      
      const resetRecipe = {
        ...recipe,
        validationErrors: undefined,
        error: undefined,
        saving: false,
        saved: false
      };
      
      console.log("Recipe after validation reset:", {
        componentsCount: resetRecipe.components.length,
        validationErrors: resetRecipe.validationErrors,
        hasValidationErrors: resetRecipe.validationErrors ? 'YES' : 'NO'
      });
      
      return resetRecipe;
    }));
  }, []);

  const removeComponent = useCallback((recipeIndex: number, componentIndex: number) => {
    if (!editingRecipes[recipeIndex]) return;
    
    console.log(`=== REMOVING COMPONENT ${componentIndex} ===`);
    console.log("Before removal - validation errors:", editingRecipes[recipeIndex].validationErrors);
    console.log("Before removal - components count:", editingRecipes[recipeIndex].components.length);
    console.log("Before removal - component names:", editingRecipes[recipeIndex].components.map((comp, idx) => `${idx}: ${comp.name}`));
    
    // AGGRESSIVE APPROACH: Clear ALL validation errors immediately
    setEditingRecipes(prev => prev.map((recipe, idx) => {
      if (idx !== recipeIndex) return recipe;
      
      // Remove the component
      const updatedComponents = recipe.components.filter((_, index) => index !== componentIndex);
      
      console.log("After filtering - components:", updatedComponents.map((comp, idx) => `${idx}: ${comp.name}`));
      
      // Create completely new recipe with NO validation errors
      const newRecipe = {
        ...recipe,
        components: updatedComponents,
        validationErrors: undefined, // AGGRESSIVE: Clear ALL validation errors
        error: undefined,
        saving: false,
        saved: false
      };
      
      console.log("New recipe created:", {
        componentsCount: newRecipe.components.length,
        validationErrors: newRecipe.validationErrors,
        hasValidationErrors: newRecipe.validationErrors ? 'YES' : 'NO',
        componentNames: newRecipe.components.map((comp, idx) => `${idx}: ${comp.name}`)
      });
      
      return newRecipe;
    }));
    
    console.log("=== END REMOVING COMPONENT ===");
  }, [editingRecipes]);

  const removeIngredient = useCallback((recipeIndex: number, componentIndex: number, ingredientIndex: number) => {
    if (!editingRecipes[recipeIndex]) return;
    const updatedRecipes = [...editingRecipes];
    const updatedComponents = [...updatedRecipes[recipeIndex].components];
    updatedComponents[componentIndex].ingredients.splice(ingredientIndex, 1);
    updatedRecipes[recipeIndex] = { ...updatedRecipes[recipeIndex], components: updatedComponents };
    setEditingRecipes(updatedRecipes);
  }, [editingRecipes]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Recipe Upload" 
        description="Upload recipe documents and automatically extract meals, components, and ingredients." 
      />

      <main className="flex-1 p-2 sm:p-4 md:p-6">
        {/* Upload Recipe Document - narrower, more focused */}
        <div className="max-w-xl space-y-4 sm:space-y-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Recipe Document
              </CardTitle>
              <CardDescription>
                Upload a .docx file containing recipe information. The system will extract meals, components, and ingredients automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select Recipe Document (.docx)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".docx"
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                />
              </div>
              {file && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="flex-1"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading and Extracting...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload and Extract Recipe
                    </>
                  )}
                </Button>
                {fileName && (
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(true)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {showPreview && fileName && (
            <DocumentPreview
              fileName={fileName}
              extractedRecipe={extractedRecipes[0] || undefined}
              documentContent={documentContent}
              onClose={() => setShowPreview(false)}
            />
          )}
        </div>

        {/* Extracted Recipes navigation - full width */}
        {editingRecipes.length > 0 && (
          <div className="w-full space-y-4 sm:space-y-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-bold">Extracted Recipes ({editingRecipes.length})</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {editingRecipes.filter(r => r.saved).length} saved
                </Badge>
                <Badge variant="outline">
                  {editingRecipes.filter(r => !r.saved).length} pending
                </Badge>
              </div>
            </div>

            {/* Enhanced Tabs for recipe navigation */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <h3 className="text-base sm:text-lg font-semibold">Select Recipe to Edit:</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="text-sm text-muted-foreground">
                    {editingRecipes.filter(r => r.saved).length} saved • {editingRecipes.filter(r => !r.saved).length} pending
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Use ← → keys to navigate
                  </div>
                </div>
              </div>
              
              {/* Recipe tabs with improved styling */}
              <div className="relative">
                {/* Navigation buttons */}
                <div className="flex items-center gap-2 mb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRecipeIndex(Math.max(0, selectedRecipeIndex - 1))}
                    disabled={selectedRecipeIndex === 0}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                  
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium">
                      Recipe {selectedRecipeIndex + 1} of {editingRecipes.length}
                    </span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRecipeIndex(Math.min(editingRecipes.length - 1, selectedRecipeIndex + 1))}
                    disabled={selectedRecipeIndex === editingRecipes.length - 1}
                    className="flex items-center gap-1"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {editingRecipes.map((recipe, idx) => (
                    <button
                      key={`recipe-tab-${idx}-${recipe.name}`}
                      onClick={() => setSelectedRecipeIndex(idx)}
                      className={`
                        flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all duration-200
                        ${selectedRecipeIndex === idx 
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-sm' 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }
                        ${recipe.saved ? 'ring-2 ring-green-200' : ''}
                        ${recipe.error ? 'border-red-300 bg-red-50 text-red-700' : ''}
                        ${recipe.validationErrors && hasValidationErrors(recipe.validationErrors) ? 'border-orange-300 bg-orange-50 text-orange-700' : ''}
                      `}
                    >
                      <div className="flex items-center gap-1 sm:gap-2">
                        {recipe.saved ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : recipe.error ? (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        ) : recipe.validationErrors && hasValidationErrors(recipe.validationErrors) ? (
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        ) : (
                          <Edit className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="hidden sm:inline">Recipe {idx + 1}</span>
                        <span className="sm:hidden">{idx + 1}</span>
                        {recipe.saved && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 hidden sm:inline">
                            Saved
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-[80px] sm:max-w-[120px]">
                        {recipe.name.length > 15 ? `${recipe.name.substring(0, 15)}...` : recipe.name}
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Scroll indicators */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
              </div>
              
              {/* Quick navigation dots */}
              {editingRecipes.length > 6 && (
                <div className="flex justify-center mt-3">
                  <div className="flex gap-1">
                    {editingRecipes.map((recipe, idx) => (
                      <button
                        key={`recipe-dot-${idx}-${recipe.name}`}
                        onClick={() => setSelectedRecipeIndex(idx)}
                        className={`
                          w-2 h-2 rounded-full transition-all duration-200
                          ${selectedRecipeIndex === idx 
                            ? 'bg-green-500' 
                            : 'bg-gray-300 hover:bg-gray-400'
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recipe editing card - full width */}
        {editingRecipes.length > 0 && editingRecipes[selectedRecipeIndex] && (
          <div className="w-full">
                <Card 
                  key={selectedRecipeIndex} 
                  className={`
                    transition-all duration-300
                    ${editingRecipes[selectedRecipeIndex].saved 
                      ? "border-green-300 bg-green-50/50 shadow-lg" 
                      : editingRecipes[selectedRecipeIndex].error
                      ? "border-red-300 bg-red-50/50"
                      : editingRecipes[selectedRecipeIndex].validationErrors && hasValidationErrors(editingRecipes[selectedRecipeIndex].validationErrors)
                      ? "border-orange-300 bg-orange-50/50"
                      : "border-gray-200 bg-white"
                    }
                  `}
                >
                  <CardHeader className={editingRecipes[selectedRecipeIndex].saved ? "bg-green-100/50" : ""}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {editingRecipes[selectedRecipeIndex].saved ? (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-green-800 text-base sm:text-lg">
                                <span>Recipe {selectedRecipeIndex + 1}:</span>
                                <span className="break-words">{editingRecipes[selectedRecipeIndex].name}</span>
                              </CardTitle>
                              <Badge variant="secondary" className="bg-green-200 text-green-800 border-green-300 w-fit">
                                ✓ Saved
                              </Badge>
                            </div>
                          </div>
                        ) : editingRecipes[selectedRecipeIndex].error ? (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-red-700 text-base sm:text-lg">
                              <span>Recipe {selectedRecipeIndex + 1}:</span>
                              <span className="break-words">{editingRecipes[selectedRecipeIndex].name}</span>
                            </CardTitle>
                          </div>
                        ) : editingRecipes[selectedRecipeIndex].validationErrors && hasValidationErrors(editingRecipes[selectedRecipeIndex].validationErrors) ? (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-orange-500" />
                            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-orange-700 text-base sm:text-lg">
                              <span>Recipe {selectedRecipeIndex + 1}:</span>
                              <span className="break-words">{editingRecipes[selectedRecipeIndex].name}</span>
                            </CardTitle>
                          </div>
                        ) : (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <Edit className="h-5 w-5 text-blue-500" />
                            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-base sm:text-lg">
                              <span>Recipe {selectedRecipeIndex + 1}:</span>
                              <span className="break-words">{editingRecipes[selectedRecipeIndex].name}</span>
                            </CardTitle>
                          </div>
                        )}
                      </div>
                      {!editingRecipes[selectedRecipeIndex].saved && (
                        <Button 
                          onClick={() => handleSaveRecipe(selectedRecipeIndex)}
                          disabled={editingRecipes[selectedRecipeIndex].saving}
                          className="flex items-center gap-2 w-full sm:w-auto"
                        >
                          {editingRecipes[selectedRecipeIndex].saving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Recipe
                            </>
                          )}
                        </Button>
                      )}
                      {editingRecipes[selectedRecipeIndex].saved && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Successfully Saved
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardDescription className={editingRecipes[selectedRecipeIndex].saved ? "text-green-700" : ""}>
                      {editingRecipes[selectedRecipeIndex].saved 
                        ? "✅ This recipe has been successfully saved to the database and is ready for use."
                        : editingRecipes[selectedRecipeIndex].error
                        ? editingRecipes[selectedRecipeIndex].error
                        : editingRecipes[selectedRecipeIndex].validationErrors && hasValidationErrors(editingRecipes[selectedRecipeIndex].validationErrors)
                        ? "⚠️ Please fix the validation errors below before saving."
                        : "Review and edit the recipe data before saving."
                      }
                    </CardDescription>
                  </CardHeader>
                  
                  {!editingRecipes[selectedRecipeIndex].saved && (
                    <CardContent className="space-y-4 sm:space-y-6">
                      {/* Recipe Name and Description */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`recipe-name-${selectedRecipeIndex}`}>Recipe Name</Label>
                          <Input
                            id={`recipe-name-${selectedRecipeIndex}`}
                            value={editingRecipes[selectedRecipeIndex].name}
                            onChange={(e) => updateRecipeField(selectedRecipeIndex, "name", e.target.value)}
                            className={editingRecipes[selectedRecipeIndex].validationErrors?.mealName ? "border-red-500 focus:border-red-500" : ""}
                          />
                          {editingRecipes[selectedRecipeIndex].validationErrors?.mealName && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" />
                              {editingRecipes[selectedRecipeIndex].validationErrors.mealName}
                              {editingRecipes[selectedRecipeIndex].validationErrors.mealName.includes("already exists") && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newName = suggestUniqueMealName(editingRecipes[selectedRecipeIndex].name);
                                    updateRecipeField(selectedRecipeIndex, "name", newName);
                                  }}
                                  className="ml-2 text-xs"
                                >
                                  Fix Name
                                </Button>
                              )}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`recipe-description-${selectedRecipeIndex}`}>Description</Label>
                          <Textarea
                            id={`recipe-description-${selectedRecipeIndex}`}
                            value={editingRecipes[selectedRecipeIndex].description || ""}
                            onChange={(e) => updateRecipeField(selectedRecipeIndex, "description", e.target.value)}
                            placeholder="Optional description..."
                            className="min-h-[80px]"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`recipe-packaging-${selectedRecipeIndex}`}>Packaging</Label>
                            <Input
                              id={`recipe-packaging-${selectedRecipeIndex}`}
                              value={editingRecipes[selectedRecipeIndex].packaging || ""}
                              onChange={(e) => updateRecipeField(selectedRecipeIndex, "packaging", e.target.value)}
                              placeholder="Enter packaging details..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`recipe-objective-${selectedRecipeIndex}`}>Objective</Label>
                            <Input
                              id={`recipe-objective-${selectedRecipeIndex}`}
                              value={editingRecipes[selectedRecipeIndex].objective || ""}
                              onChange={(e) => updateRecipeField(selectedRecipeIndex, "objective", e.target.value)}
                              placeholder="Objective details for this meal..."
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`recipe-item-code-${selectedRecipeIndex}`}>Item Code</Label>
                          <Input
                            id={`recipe-item-code-${selectedRecipeIndex}`}
                            value={editingRecipes[selectedRecipeIndex].itemCode || ""}
                            onChange={(e) => updateRecipeField(selectedRecipeIndex, "itemCode", e.target.value)}
                            placeholder="Item code for this meal..."
                          />
                        </div>
                        
                        {/* Meal Type Checkboxes */}
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Meal Types</Label>
                          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`balanced-meal-${selectedRecipeIndex}`}
                                checked={editingRecipes[selectedRecipeIndex].isBalancedMeal || false}
                                onChange={(e) => updateRecipeField(selectedRecipeIndex, "isBalancedMeal", e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <Label htmlFor={`balanced-meal-${selectedRecipeIndex}`} className="text-sm">
                                Balanced Meal
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`gourmet-meal-${selectedRecipeIndex}`}
                                checked={editingRecipes[selectedRecipeIndex].isGourmetMeal || false}
                                onChange={(e) => updateRecipeField(selectedRecipeIndex, "isGourmetMeal", e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <Label htmlFor={`gourmet-meal-${selectedRecipeIndex}`} className="text-sm">
                                Gourmet Meal
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`weight-loss-meal-${selectedRecipeIndex}`}
                                checked={editingRecipes[selectedRecipeIndex].isWeightLossMeal || false}
                                onChange={(e) => updateRecipeField(selectedRecipeIndex, "isWeightLossMeal", e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <Label htmlFor={`weight-loss-meal-${selectedRecipeIndex}`} className="text-sm">
                                Weight Loss Meal
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Components */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <Label className="text-base sm:text-lg font-semibold">Components</Label>
                          <Button variant="outline" size="sm" onClick={() => addComponent(selectedRecipeIndex)}>
                            Add Component
                          </Button>
                        </div>

                        {editingRecipes[selectedRecipeIndex].components.map((component, componentIndex) => (
                          <UploaderComponentEditor
                            key={componentIndex}
                            component={component}
                            componentIndex={componentIndex}
                            validationErrors={editingRecipes[selectedRecipeIndex].validationErrors?.components?.[componentIndex]}
                            onClearValidationError={(errorType) => clearComponentValidationError(selectedRecipeIndex, componentIndex, errorType)}
                            onChange={(idx, updatedComponent) => {
                              const updatedRecipes = [...editingRecipes];
                              const updatedComponents = [...updatedRecipes[selectedRecipeIndex].components];
                              updatedComponents[idx] = updatedComponent;
                              updatedRecipes[selectedRecipeIndex] = { ...updatedRecipes[selectedRecipeIndex], components: updatedComponents };
                              setEditingRecipes(updatedRecipes);
                            }}
                            onRemove={(idx) => {
                              const updatedRecipes = [...editingRecipes];
                              const updatedComponents = updatedRecipes[selectedRecipeIndex].components.filter((_, i) => i !== idx);
                              updatedRecipes[selectedRecipeIndex] = { ...updatedRecipes[selectedRecipeIndex], components: updatedComponents };
                              setEditingRecipes(updatedRecipes);
                            }}
                          />
                        ))}
                      </div>
                    </CardContent>
                  )}

                  {/* Show saved recipe summary */}
                  {editingRecipes[selectedRecipeIndex].saved && (
                    <CardContent className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <h3 className="font-semibold text-green-800">Recipe Successfully Saved</h3>
                        </div>
                        <div className="space-y-2 text-sm text-green-700">
                          <p><strong>Recipe Name:</strong> {editingRecipes[selectedRecipeIndex].name}</p>
                          <p><strong>Components:</strong> {editingRecipes[selectedRecipeIndex].components.length} component(s)</p>
                          <p><strong>Total Ingredients:</strong> {editingRecipes[selectedRecipeIndex].components.reduce((total, comp) => total + comp.ingredients.length, 0)} ingredient(s)</p>
                          {editingRecipes[selectedRecipeIndex].description && (
                            <p><strong>Description:</strong> {editingRecipes[selectedRecipeIndex].description}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Show components in read-only mode */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold text-green-800">Recipe Components</Label>
                        {editingRecipes[selectedRecipeIndex].components.map((component, componentIndex) => (
                          <div key={componentIndex} className="border border-green-200 rounded-lg p-4 bg-green-50/30">
                            <h4 className="font-medium text-green-800 mb-3">{component.name}</h4>
                            <div className="space-y-2">
                              {component.ingredients.map((ingredient, ingredientIndex) => (
                                <div key={ingredientIndex} className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-1">
                                  <span className="text-green-700 break-words">{ingredient.name}</span>
                                  <span className="text-green-600">
                                    {ingredient.quantity} {ingredient.unit}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            )}
        </main>
    </div>
  );
}