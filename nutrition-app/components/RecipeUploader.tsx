"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CheckCircle, XCircle, Edit, Save, Loader2, Eye, Search, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { DocumentPreview } from "./DocumentPreview";
import { UploaderComponentEditor } from "./UploaderComponentEditor";

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

export function RecipeUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [extractedRecipe, setExtractedRecipe] = useState<ExtractedRecipe | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<ExtractedRecipe | null>(null);
  const [saving, setSaving] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [loadingNutrition, setLoadingNutrition] = useState<{[key: string]: boolean}>({});
  const [documentContent, setDocumentContent] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();

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
        setExtractedRecipe(data.recipe);
        setEditingRecipe(data.recipe);
        setFileName(data.fileName);
        setDocumentContent(data.documentContent || "");
        toast({
          title: "File uploaded successfully",
          description: "Recipe data extracted. Please verify and edit if needed.",
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

  const handleSave = async () => {
    if (!editingRecipe || !fileName) return;

    setSaving(true);
    try {
      const response = await fetch("/api/upload-recipe", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe: editingRecipe,
          fileName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Recipe saved successfully",
          description: "The recipe has been added to the database.",
        });
        // Reset form
        setFile(null);
        setExtractedRecipe(null);
        setEditingRecipe(null);
        setFileName("");
        setShowPreview(false);
        setDocumentContent("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        // Refresh the page to show new data
        router.refresh();
      } else {
        throw new Error(data.error || "Save failed");
      }
    } catch (error) {
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleGetNutrition = async (componentIndex: number, ingredientIndex: number) => {
    if (!editingRecipe) return;

    const ingredient = editingRecipe.components[componentIndex].ingredients[ingredientIndex];
    const key = `${componentIndex}-${ingredientIndex}`;
    
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
        const updatedComponents = [...editingRecipe.components];
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

        setEditingRecipe({ ...editingRecipe, components: updatedComponents });
        
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

  const updateRecipeField = (field: keyof ExtractedRecipe, value: any) => {
    if (!editingRecipe) return;
    setEditingRecipe({ ...editingRecipe, [field]: value });
  };

  const updateComponentField = (componentIndex: number, field: keyof ExtractedComponent, value: any) => {
    if (!editingRecipe) return;
    const updatedComponents = [...editingRecipe.components];
    updatedComponents[componentIndex] = { ...updatedComponents[componentIndex], [field]: value };
    setEditingRecipe({ ...editingRecipe, components: updatedComponents });
  };

  const updateIngredientField = (
    componentIndex: number,
    ingredientIndex: number,
    field: keyof ExtractedIngredient,
    value: any
  ) => {
    if (!editingRecipe) return;
    const updatedComponents = [...editingRecipe.components];
    const updatedIngredients = [...updatedComponents[componentIndex].ingredients];
    updatedIngredients[ingredientIndex] = { ...updatedIngredients[ingredientIndex], [field]: value };
    updatedComponents[componentIndex] = {
      ...updatedComponents[componentIndex],
      ingredients: updatedIngredients,
    };
    setEditingRecipe({ ...editingRecipe, components: updatedComponents });
  };

  const addComponent = () => {
    if (!editingRecipe) return;
    const newComponent: ExtractedComponent = {
      name: "New Component",
      ingredients: [],
    };
    setEditingRecipe({
      ...editingRecipe,
      components: [...editingRecipe.components, newComponent],
    });
  };

  const addIngredient = (componentIndex: number) => {
    if (!editingRecipe) return;
    const newIngredient: ExtractedIngredient = {
      name: "",
      quantity: 0,
      unit: "g",
    };
    const updatedComponents = [...editingRecipe.components];
    updatedComponents[componentIndex].ingredients.push(newIngredient);
    setEditingRecipe({ ...editingRecipe, components: updatedComponents });
  };

  const removeComponent = (componentIndex: number) => {
    if (!editingRecipe) return;
    const updatedComponents = editingRecipe.components.filter((_, index) => index !== componentIndex);
    setEditingRecipe({ ...editingRecipe, components: updatedComponents });
  };

  const removeIngredient = (componentIndex: number, ingredientIndex: number) => {
    if (!editingRecipe) return;
    const updatedComponents = [...editingRecipe.components];
    updatedComponents[componentIndex].ingredients.splice(ingredientIndex, 1);
    setEditingRecipe({ ...editingRecipe, components: updatedComponents });
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
          extractedRecipe={extractedRecipe || undefined}
          documentContent={documentContent}
          onClose={() => setShowPreview(false)}
        />
      )}

      {extractedRecipe && editingRecipe && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Verify and Edit Recipe
            </CardTitle>
            <CardDescription>
              Review the extracted recipe data and make any necessary corrections before saving.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recipe Name and Description */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipe-name">Recipe Name</Label>
                <Input
                  id="recipe-name"
                  value={editingRecipe.name}
                  onChange={(e) => updateRecipeField("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipe-description">Description</Label>
                <Textarea
                  id="recipe-description"
                  value={editingRecipe.description || ""}
                  onChange={(e) => updateRecipeField("description", e.target.value)}
                  placeholder="Optional description..."
                />
              </div>
            </div>

            <Separator />

            {/* Components */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Components</Label>
                <Button variant="outline" size="sm" onClick={addComponent}>
                  Add Component
                </Button>
              </div>

              {editingRecipe.components.map((component, componentIndex) => (
                <UploaderComponentEditor
                  key={componentIndex}
                  component={component}
                  componentIndex={componentIndex}
                  onChange={(idx, updatedComponent) => {
                    const updatedComponents = [...editingRecipe.components];
                    updatedComponents[idx] = updatedComponent;
                    setEditingRecipe({ ...editingRecipe, components: updatedComponents });
                  }}
                  onRemove={(idx) => {
                    const updatedComponents = editingRecipe.components.filter((_, i) => i !== idx);
                    setEditingRecipe({ ...editingRecipe, components: updatedComponents });
                  }}
                />
              ))}
            </div>

            <Separator />

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Recipe...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Recipe to Database
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 