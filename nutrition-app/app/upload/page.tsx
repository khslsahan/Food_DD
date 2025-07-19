import { RecipeUploader } from "@/components/RecipeUploader";
import { Suspense } from "react";

export default function UploadPage() {
  return (
    <div className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <RecipeUploader />
      </Suspense>
    </div>
  );
} 