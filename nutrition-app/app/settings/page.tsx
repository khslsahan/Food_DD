"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/header";

export default function SettingsPage() {
  const [useEdamam, setUseEdamam] = useState(false);
  const [foodItem, setFoodItem] = useState("");
  const [portion, setPortion] = useState(1);
  const [edamamIngr, setEdamamIngr] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleApiToggle(edamam: boolean) {
    setUseEdamam(edamam);
    setResponse(null);
    setError(null);
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
        res = await fetch("/api/nutrition-proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ food_item: foodItem, portion }),
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
                <label className="block mb-1 font-medium">Food Item</label>
                <Input
                  value={foodItem}
                  onChange={e => setFoodItem(e.target.value)}
                  placeholder="e.g., Beef Stroganoff"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Portion</label>
                <Input
                  type="number"
                  value={portion}
                  onChange={e => setPortion(Number(e.target.value))}
                  min={1}
                  required
                />
              </div>
            </>
          )}
          <Button type="submit" disabled={loading} className="w-fit">
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