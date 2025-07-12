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
import { Upload, FileText, CheckCircle, XCircle, Edit, Save, Loader2, Eye, Search, Zap, Check, AlertCircle } from "lucide-react";
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

          {/* Tabs for recipe navigation */}
          <Tabs value={String(selectedRecipeIndex)} className="mb-4">
            <TabsList>
              {editingRecipes.map((recipe, idx) => (
                <TabsTrigger
                  key={idx}
                  value={String(idx)}
                  onClick={() => setSelectedRecipeIndex(idx)}
                  className={selectedRecipeIndex === idx ? "font-bold" : ""}
                >
                  Recipe {idx + 1}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Only show the selected recipe */}
          {editingRecipes[selectedRecipeIndex] && (
            <Card key={selectedRecipeIndex} className={editingRecipes[selectedRecipeIndex].saved ? "border-green-200 bg-green-50" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {editingRecipes[selectedRecipeIndex].saved ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : editingRecipes[selectedRecipeIndex].error ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <Edit className="h-5 w-5 text-blue-500" />
                    )}
                    <CardTitle className="flex items-center gap-2">
                      Recipe {selectedRecipeIndex + 1}: {editingRecipes[selectedRecipeIndex].name}
                      {editingRecipes[selectedRecipeIndex].saved && <Badge variant="secondary" className="bg-green-100 text-green-800">Saved</Badge>}
                    </CardTitle>
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
                </div>
                <CardDescription>
                  {editingRecipes[selectedRecipeIndex].saved 
                    ? "This recipe has been successfully saved to the database."
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
            </Card>
          )}
        </div>
      )}
    </div>
  );
} 