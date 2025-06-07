"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/header";
import { X } from "lucide-react";

export default function SettingsPage() {
  const [useEdamam, setUseEdamam] = useState(false);
  const [foodItemInput, setFoodItemInput] = useState("");
  const [foodItems, setFoodItems] = useState<string[]>([]);
  const [objectiveType, setObjectiveType] = useState("");
  const [packageType, setPackageType] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [replacement, setReplacement] = useState("");
  const [comments, setComments] = useState("");
  const [allergen, setAllergen] = useState("");
  const [edamamIngr, setEdamamIngr] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleApiToggle(edamam: boolean) {
    setUseEdamam(edamam);
    setResponse(null);
    setError(null);
  }

  function handleAddFoodItem(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const trimmed = foodItemInput.trim();
    if (trimmed && !foodItems.includes(trimmed)) {
      setFoodItems([...foodItems, trimmed]);
    }
    setFoodItemInput("");
  }

  function handleRemoveFoodItem(item: string) {
    setFoodItems(foodItems.filter(f => f !== item));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      let res;
      if (useEdamam) {
        res = await fetch("/api/edamam-proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingr: edamamIngr }),
        });
      } else {
        const reqBody: any = {
          food_items: foodItems.map(f => f.trim()).filter(f => f),
        };
        if (objectiveType) reqBody.objective_type = objectiveType;
        if (packageType) reqBody.package_type = packageType;
        if (dislikes) reqBody.dislikes = dislikes;
        if (replacement) reqBody.replacement = replacement;
        if (comments) reqBody.comments = comments;
        if (allergen) reqBody.allergen = allergen;
        res = await fetch("/api/nutrition-proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reqBody),
        });
      }
      if (!res.ok) {
        throw new Error("API request failed");
      }
      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Settings" description="Try the Nutrition API or Edamam API" />
      <main className="flex-1 p-6">
        <div className="flex justify-center items-center gap-4 mb-6">
          <button
            type="button"
            className={`px-4 py-2 rounded font-medium border ${!useEdamam ? "bg-green-600 text-white" : "bg-white text-black border-gray-300"}`}
            onClick={() => handleApiToggle(false)}
          >
            Local Nutrition API
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded font-medium border ${useEdamam ? "bg-green-600 text-white" : "bg-white text-black border-gray-300"}`}
            onClick={() => handleApiToggle(true)}
          >
            Edamam API
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8 text-left w-full max-w-md ml-4">
          {useEdamam ? (
            <div>
              <label className="block mb-1 font-medium">Ingredient String</label>
              <Input
                value={edamamIngr}
                onChange={e => setEdamamIngr(e.target.value)}
                placeholder="e.g., Chicken breast 200g"
                required
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block mb-1 font-medium">Food Items</label>
                <div className="flex gap-2">
                  <Input
                    value={foodItemInput}
                    onChange={e => setFoodItemInput(e.target.value)}
                    placeholder="e.g., Shrimp kabse"
                  />
                  <Button type="button" onClick={handleAddFoodItem} disabled={!foodItemInput.trim()}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {foodItems.map(item => (
                    <span key={item} className="inline-flex items-center bg-gray-200 rounded px-2 py-1 text-sm">
                      {item}
                      <button
                        type="button"
                        className="ml-1 text-gray-600 hover:text-red-600"
                        onClick={() => handleRemoveFoodItem(item)}
                        aria-label={`Remove ${item}`}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Objective Type (optional)</label>
                <Input
                  value={objectiveType}
                  onChange={e => setObjectiveType(e.target.value)}
                  placeholder="e.g., fat loss"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Package Type (optional)</label>
                <Input
                  value={packageType}
                  onChange={e => setPackageType(e.target.value)}
                  placeholder="e.g., Balanced"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Dislikes (optional)</label>
                <Input
                  value={dislikes}
                  onChange={e => setDislikes(e.target.value)}
                  placeholder="e.g., corn"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Replacement (optional)</label>
                <Input
                  value={replacement}
                  onChange={e => setReplacement(e.target.value)}
                  placeholder="e.g., peas"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Comments (optional)</label>
                <Input
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                  placeholder="e.g., no sugar; no salt"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Allergen (optional)</label>
                <Input
                  value={allergen}
                  onChange={e => setAllergen(e.target.value)}
                  placeholder="e.g., Dairy"
                />
              </div>
            </>
          )}
          <Button type="submit" disabled={loading || (!useEdamam && foodItems.length === 0)} className="w-fit">
            {loading ? "Requesting..." : useEdamam ? "Try Edamam API" : "Try Nutrition API"}
          </Button>
        </form>
        {error && <div className="text-red-600 mb-4 text-left ml-4">Error: {error}</div>}
        {response && (
          <div className="text-left ml-4">
            <h3 className="font-bold mb-2">API Response</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
} 