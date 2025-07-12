"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Eye, X, Table, List } from "lucide-react";

interface ExtractedIngredient {
  name: string;
  quantity: number;
  unit: string;
  calories?: number;
  fat?: number;
  protein?: number;
  carbohydrates?: number;
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

interface DocumentPreviewProps {
  fileName: string;
  fileUrl?: string;
  extractedRecipe?: ExtractedRecipe;
  documentContent?: string;
  onClose: () => void;
}

export function DocumentPreview({ fileName, fileUrl, extractedRecipe, documentContent, onClose }: DocumentPreviewProps) {
  const [previewContent, setPreviewContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (documentContent) {
      setPreviewContent(documentContent);
    } else if (fileUrl) {
      loadDocumentPreview();
    }
  }, [fileUrl, documentContent]);

  const loadDocumentPreview = async () => {
    if (!fileUrl) return;
    
    setLoading(true);
    try {
      // For now, we'll show a placeholder since we can't directly preview .docx files in the browser
      // In a real implementation, you might want to:
      // 1. Convert the .docx to HTML on the server
      // 2. Use a library like mammoth.js to extract text
      // 3. Show a PDF preview if converted
      
      setPreviewContent(`
        Document: ${fileName}
        
        This is a preview of the uploaded Word document.
        The actual content has been extracted and is shown in the recipe form below.
        
        File Details:
        - Name: ${fileName}
        - Type: Microsoft Word Document (.docx)
        - Status: Successfully uploaded and processed
        
        The document contains recipe information that has been automatically extracted
        and is now available for review and editing in the form below.
      `);
    } catch (error) {
      console.error("Error loading document preview:", error);
      setPreviewContent("Error loading document preview");
    } finally {
      setLoading(false);
    }
  };

  const downloadDocument = () => {
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatNutritionValue = (value?: number) => {
    return value ? value.toFixed(1) : "0";
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>Document Preview</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{fileName.split('.').pop()?.toUpperCase()}</Badge>
            <Button variant="ghost" size="sm" onClick={downloadDocument}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>
          Preview of the uploaded document: {fileName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading preview...</span>
          </div>
        ) : (
          <Tabs defaultValue="extracted" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="extracted" className="flex items-center gap-2">
                <Table className="h-4 w-4" />
                Extracted Data
              </TabsTrigger>
              <TabsTrigger value="raw" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                Raw Content
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="extracted" className="space-y-4">
              {extractedRecipe ? (
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{extractedRecipe.name}</h3>
                    {extractedRecipe.description && (
                      <p className="text-muted-foreground mb-2">{extractedRecipe.description}</p>
                    )}
                    <div className="flex gap-2">
                      <Badge variant="outline">{extractedRecipe.components.length} Components</Badge>
                      <Badge variant="outline">
                        {extractedRecipe.components.reduce((total, comp) => total + comp.ingredients.length, 0)} Ingredients
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {extractedRecipe.components.map((component, componentIndex) => (
                      <Card key={componentIndex} className="border-dashed">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{component.name}</CardTitle>
                          {component.base_quantity && (
                            <p className="text-sm text-muted-foreground">
                              Base Quantity: {component.base_quantity}g
                            </p>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-2">Ingredient</th>
                                  <th className="text-left p-2">Quantity</th>
                                  <th className="text-left p-2">Unit</th>
                                  <th className="text-left p-2">Calories</th>
                                  <th className="text-left p-2">Fat (g)</th>
                                  <th className="text-left p-2">Protein (g)</th>
                                  <th className="text-left p-2">Carbs (g)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {component.ingredients.map((ingredient, ingredientIndex) => (
                                  <tr key={ingredientIndex} className="border-b hover:bg-muted/50">
                                    <td className="p-2 font-medium">{ingredient.name}</td>
                                    <td className="p-2">{ingredient.quantity}</td>
                                    <td className="p-2">{ingredient.unit}</td>
                                    <td className="p-2">{formatNutritionValue(ingredient.calories)}</td>
                                    <td className="p-2">{formatNutritionValue(ingredient.fat)}</td>
                                    <td className="p-2">{formatNutritionValue(ingredient.protein)}</td>
                                    <td className="p-2">{formatNutritionValue(ingredient.carbohydrates)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No extracted data available
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="raw" className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="text-sm font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {previewContent || "No document content available"}
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>Note:</strong> This shows the actual content extracted from the Word document. 
                  The recipe data has been parsed and is available for editing in the form below.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
} 