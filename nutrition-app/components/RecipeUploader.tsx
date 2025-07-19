"use client";

import React, { useState, useRef, useEffect } from "react";
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleUpload = async () => {
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
  };

  const handleSaveRecipe = async (recipeIndex: number) => {
    if (!editingRecipes[recipeIndex] || !fileName) return;

    // Update the recipe status to saving
    setEditingRecipes(prev => prev.map((recipe, idx) => 
      idx === recipeIndex 
        ? { ...recipe, saving: true, error: undefined }
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
        // Mark recipe as saved
        setEditingRecipes(prev => prev.map((recipe, idx) => 
          idx === recipeIndex 
            ? { ...recipe, saved: true, saving: false, error: undefined }
            : recipe
        ));
        
        toast({
          title: "Recipe saved successfully",
          description: `"${editingRecipes[recipeIndex].name}" has been added to the database.`,
        });
        
        // Check if all recipes are saved
        const allSaved = editingRecipes.every((recipe, idx) => 
          idx === recipeIndex ? true : recipe.saved
        );
        
        if (allSaved) {
          // Reset form after a delay
          setTimeout(() => {
            setFile(null);
            setExtractedRecipes([]);
            setEditingRecipes([]);
            setFileName("");
            setShowPreview(false);
            setDocumentContent("");
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            router.refresh();
          }, 2000);
        }
      } else {
        // Handle specific error types
        if (response.status === 409 && data.code === "DUPLICATE_MEAL_NAME") {
          setEditingRecipes(prev => prev.map((recipe, idx) => 
            idx === recipeIndex 
              ? { ...recipe, saving: false, error: data.error }
              : recipe
          ));
          
          toast({
            title: "Duplicate Recipe Name",
            description: data.error,
            variant: "destructive",
          });
        } else {
          throw new Error(data.error || "Save failed");
        }
      }
    } catch (error) {
      setEditingRecipes(prev => prev.map((recipe, idx) => 
        idx === recipeIndex 
          ? { ...recipe, saving: false, error: error instanceof Error ? error.message : "An error occurred" }
          : recipe
      ));
      
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleGetNutrition = async (recipeIndex: number, componentIndex: number, ingredientIndex: number) => {
    if (!editingRecipes[recipeIndex]) return;

    const ingredient = editingRecipes[recipeIndex].components[componentIndex].ingredients[ingredientIndex];
    const key = `${recipeIndex}-${componentIndex}-${ingredientIndex}`;
    
    setLoadingNutrition(prev => ({ ...prev, [key]: true }));

    try {
      const response = await fetch("/api/nutrition-lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredientName: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        }),
      });

      const data = await response.json();

      if (response.ok && data.nutrition) {
        // Update the ingredient with nutrition data
        const updatedRecipes = [...editingRecipes];
        const updatedComponents = [...updatedRecipes[recipeIndex].components];
        const updatedIngredients = [...updatedComponents[componentIndex].ingredients];
        
        // Extract nutrition data from the response
        const nutrition = data.nutrition;
        if (nutrition.macros) {
          updatedIngredients[ingredientIndex] = {
            ...updatedIngredients[ingredientIndex],
            calories: nutrition.macros.calories || ingredient.calories,
            fat: nutrition.macros.fat || ingredient.fat,
            protein: nutrition.macros.protein || ingredient.protein,
            carbohydrates: nutrition.macros.carbohydrates || ingredient.carbohydrates,
          };
        }

        updatedComponents[componentIndex] = {
          ...updatedComponents[componentIndex],
          ingredients: updatedIngredients,
        };

        updatedRecipes[recipeIndex] = {
          ...updatedRecipes[recipeIndex],
          components: updatedComponents,
        };

        setEditingRecipes(updatedRecipes);
        
        toast({
          title: "Nutrition data updated",
          description: `Nutritional information for ${ingredient.name} has been fetched and updated.`,
        });
      } else {
        throw new Error(data.error || "Failed to fetch nutrition data");
      }
    } catch (error) {
      toast({
        title: "Nutrition lookup failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoadingNutrition(prev => ({ ...prev, [key]: false }));
    }
  };

  const updateRecipeField = (recipeIndex: number, field: keyof ExtractedRecipe, value: any) => {
    if (!editingRecipes[recipeIndex]) return;
    setEditingRecipes(prev => prev.map((recipe, idx) => 
      idx === recipeIndex 
        ? { ...recipe, [field]: value }
        : recipe
    ));
  };

  const updateComponentField = (recipeIndex: number, componentIndex: number, field: keyof ExtractedComponent, value: any) => {
    if (!editingRecipes[recipeIndex]) return;
    const updatedRecipes = [...editingRecipes];
    const updatedComponents = [...updatedRecipes[recipeIndex].components];
    updatedComponents[componentIndex] = { ...updatedComponents[componentIndex], [field]: value };
    updatedRecipes[recipeIndex] = { ...updatedRecipes[recipeIndex], components: updatedComponents };
    setEditingRecipes(updatedRecipes);
  };

  const updateIngredientField = (
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
  };

  const addComponent = (recipeIndex: number) => {
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
  };

  const addIngredient = (recipeIndex: number, componentIndex: number) => {
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
  };

  const removeComponent = (recipeIndex: number, componentIndex: number) => {
    if (!editingRecipes[recipeIndex]) return;
    const updatedRecipes = [...editingRecipes];
    const updatedComponents = updatedRecipes[recipeIndex].components.filter((_, index) => index !== componentIndex);
    updatedRecipes[recipeIndex] = { ...updatedRecipes[recipeIndex], components: updatedComponents };
    setEditingRecipes(updatedRecipes);
  };

  const removeIngredient = (recipeIndex: number, componentIndex: number, ingredientIndex: number) => {
    if (!editingRecipes[recipeIndex]) return;
    const updatedRecipes = [...editingRecipes];
    const updatedComponents = [...updatedRecipes[recipeIndex].components];
    updatedComponents[componentIndex].ingredients.splice(ingredientIndex, 1);
    updatedRecipes[recipeIndex] = { ...updatedRecipes[recipeIndex], components: updatedComponents };
    setEditingRecipes(updatedRecipes);
  };

  return (
    <div className="space-y-6">
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
          <div className="flex gap-2">
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

      {editingRecipes.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Extracted Recipes ({editingRecipes.length})</h2>
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
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Recipe to Edit:</h3>
              <div className="flex items-center gap-4">
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
                  Previous
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
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {editingRecipes.map((recipe, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRecipeIndex(idx)}
                    className={`
                      flex-shrink-0 px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all duration-200
                      ${selectedRecipeIndex === idx 
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-sm' 
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }
                      ${recipe.saved ? 'ring-2 ring-green-200' : ''}
                      ${recipe.error ? 'border-red-300 bg-red-50 text-red-700' : ''}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {recipe.saved ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : recipe.error ? (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      ) : (
                        <Edit className="h-4 w-4 text-gray-500" />
                      )}
                      <span>Recipe {idx + 1}</span>
                      {recipe.saved && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          Saved
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate max-w-[120px]">
                      {recipe.name.length > 20 ? `${recipe.name.substring(0, 20)}...` : recipe.name}
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
                  {editingRecipes.map((_, idx) => (
                    <button
                      key={idx}
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

          {/* Only show the selected recipe */}
          {editingRecipes[selectedRecipeIndex] && (
            <Card 
              key={selectedRecipeIndex} 
              className={`
                transition-all duration-300
                ${editingRecipes[selectedRecipeIndex].saved 
                  ? "border-green-300 bg-green-50/50 shadow-lg" 
                  : editingRecipes[selectedRecipeIndex].error
                  ? "border-red-300 bg-red-50/50"
                  : "border-gray-200 bg-white"
                }
              `}
            >
              <CardHeader className={editingRecipes[selectedRecipeIndex].saved ? "bg-green-100/50" : ""}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {editingRecipes[selectedRecipeIndex].saved ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <div className="flex items-center gap-2">
                          <CardTitle className="flex items-center gap-2 text-green-800">
                            Recipe {selectedRecipeIndex + 1}: {editingRecipes[selectedRecipeIndex].name}
                          </CardTitle>
                          <Badge variant="secondary" className="bg-green-200 text-green-800 border-green-300">
                            ✓ Saved
                          </Badge>
                        </div>
                      </div>
                    ) : editingRecipes[selectedRecipeIndex].error ? (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <CardTitle className="flex items-center gap-2 text-red-700">
                          Recipe {selectedRecipeIndex + 1}: {editingRecipes[selectedRecipeIndex].name}
                        </CardTitle>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Edit className="h-5 w-5 text-blue-500" />
                        <CardTitle className="flex items-center gap-2">
                          Recipe {selectedRecipeIndex + 1}: {editingRecipes[selectedRecipeIndex].name}
                        </CardTitle>
                      </div>
                    )}
                  </div>
                  {!editingRecipes[selectedRecipeIndex].saved && (
                    <Button 
                      onClick={() => handleSaveRecipe(selectedRecipeIndex)}
                      disabled={editingRecipes[selectedRecipeIndex].saving}
                      className="flex items-center gap-2"
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
                    : "Review and edit the recipe data before saving."
                  }
                </CardDescription>
              </CardHeader>
              
              {!editingRecipes[selectedRecipeIndex].saved && (
                <CardContent className="space-y-6">
                  {/* Recipe Name and Description */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`recipe-name-${selectedRecipeIndex}`}>Recipe Name</Label>
                      <Input
                        id={`recipe-name-${selectedRecipeIndex}`}
                        value={editingRecipes[selectedRecipeIndex].name}
                        onChange={(e) => updateRecipeField(selectedRecipeIndex, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`recipe-description-${selectedRecipeIndex}`}>Description</Label>
                      <Textarea
                        id={`recipe-description-${selectedRecipeIndex}`}
                        value={editingRecipes[selectedRecipeIndex].description || ""}
                        onChange={(e) => updateRecipeField(selectedRecipeIndex, "description", e.target.value)}
                        placeholder="Optional description..."
                      />
                    </div>
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
                      <div className="flex flex-wrap gap-4">
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
                            className="text-sm"
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
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-semibold">Components</Label>
                      <Button variant="outline" size="sm" onClick={() => addComponent(selectedRecipeIndex)}>
                        Add Component
                      </Button>
                    </div>

                    {editingRecipes[selectedRecipeIndex].components.map((component, componentIndex) => (
                      <UploaderComponentEditor
                        key={componentIndex}
                        component={component}
                        componentIndex={componentIndex}
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
                            <div key={ingredientIndex} className="flex items-center justify-between text-sm">
                              <span className="text-green-700">{ingredient.name}</span>
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
          )}
        </div>
      )}
    </div>
  );
} 