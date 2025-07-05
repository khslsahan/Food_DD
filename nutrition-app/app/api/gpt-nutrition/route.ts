import { NextResponse } from "next/server";
import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { ingredient } = await request.json();

  // Fetch the API key from the database
  const config = await prisma.systemConfig.findUnique({
    where: { config_key: 'OPENAI_API_KEY' }
  });
  const openaiApiKey = config?.config_value;
  if (!openaiApiKey) {
    return NextResponse.json({ error: "OpenAI API key not found" }, { status: 500 });
  }

  // Compose the prompt for ChatGPT
  const prompt = `Give me the nutrition facts (calories, protein, fat, carbs per 100g) for ${ingredient}. Respond as JSON with keys: calories, protein, fat, carbs.`;

  // Call OpenAI API
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.2,
    }),
  });

  const data = await openaiRes.json();
  if (data.error) {
    // If OpenAI returns an error, return it to the client
    return NextResponse.json({ error: data.error.message || 'OpenAI API error' }, { status: 500 });
  }
  const text = data.choices?.[0]?.message?.content || "";
  console.log("Raw ChatGPT response:", text);

  // Try to extract JSON from the response, even if it's inside a code block or surrounded by text
  function extractJson(str: string) {
    // Try to match code block first
    const codeBlockMatch = str.match(/```(?:json)?([\s\S]*?)```/i);
    if (codeBlockMatch) {
      try {
        return JSON.parse(codeBlockMatch[1]);
      } catch {}
    }
    // Try to match first JSON object in the string
    const jsonMatch = str.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {}
    }
    return null;
  }

  let macros = extractJson(text);
  console.log("Extracted macros:", macros);
  if (!macros) {
    macros = { calories: 0, protein: 0, fat: 0, carbs: 0 };
  }

  return NextResponse.json(macros);
} 