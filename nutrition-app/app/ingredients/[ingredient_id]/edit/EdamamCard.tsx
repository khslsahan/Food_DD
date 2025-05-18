"use client";
import { useState } from "react";

interface EdamamCardProps {
  onCopy: (values: { calories: number; fat: number; protein: number; carbs: number }) => void;
  defaultQuery: string;
}

export default function EdamamCard({ onCopy, defaultQuery }: EdamamCardProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [result, setResult] = useState<null | { calories: number; fat: number; protein: number; carbs: number }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchNutrition() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/edamam-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingr: query }),
      });
      const data = await res.json();
      let nutrients = null;
      if (data.totalNutrients) {
        nutrients = data.totalNutrients;
      } else if (
        data.ingredients &&
        data.ingredients[0] &&
        data.ingredients[0].parsed &&
        data.ingredients[0].parsed[0] &&
        data.ingredients[0].parsed[0].nutrients
      ) {
        nutrients = data.ingredients[0].parsed[0].nutrients;
      }
      if (nutrients) {
        setResult({
          calories: Math.round(nutrients.ENERC_KCAL?.quantity || 0),
          fat: Math.round(nutrients.FAT?.quantity || 0),
          protein: Math.round(nutrients.PROCNT?.quantity || 0),
          carbs: Math.round(nutrients.CHOCDF?.quantity || 0),
        });
      } else {
        setError("No nutrition data found.");
      }
    } catch (e) {
      setError("Failed to fetch nutrition info.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-blue-50 rounded shadow p-6 ml-6 w-80">
      <div className="font-bold mb-2">Try Edamam API</div>
      <input
        className="border rounded px-2 py-1 w-full mb-2"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="e.g. 100g onion"
      />
      <div className="text-xs text-gray-500 mb-2">Format: 100g onion, 200g chicken breast, etc.</div>
      <button
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 mb-4 w-full"
        onClick={fetchNutrition}
        disabled={loading}
        type="button"
      >
        {loading ? "Fetching..." : "Get Nutrition"}
      </button>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {result && (
        <div className="mb-2">
          <div><strong>Calories (per 100g):</strong> {result.calories}</div>
          <div><strong>Fat (g):</strong> {result.fat}</div>
          <div><strong>Protein (g):</strong> {result.protein}</div>
          <div><strong>Carbohydrates (g):</strong> {result.carbs}</div>
        </div>
      )}
      {result && (
        <button
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 w-full"
          onClick={() => onCopy(result)}
          type="button"
        >
          Copy to Form
        </button>
      )}
    </div>
  );
} 