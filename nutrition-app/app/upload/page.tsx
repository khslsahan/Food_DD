import { RecipeUploader } from "@/components/RecipeUploader";

export default function UploadPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Recipe Upload</h1>
          <p className="text-muted-foreground mt-2">
            Upload recipe documents and automatically extract meals, components, and ingredients.
          </p>
        </div>
        <RecipeUploader />
      </div>
    </div>
  );
} 