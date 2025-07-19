import { NextResponse } from "next/server";
import { getSystemConfig } from '../../../lib/system-config';

export async function POST(request: Request) {
  console.log("=== GPT Nutrition API called ===");
  
  try {
    const body = await request.json();
    console.log("Request body:", body);
    
    const { ingredient } = body;

    if (!ingredient) {
      console.error("Missing ingredient in request");
      return NextResponse.json({ error: "Ingredient name is required" }, { status: 400 });
    }

    console.log(`Processing ingredient: "${ingredient}"`);

    // Fetch the API key from the database
    console.log("Fetching OpenAI API key from system config...");
    const openaiApiKey = await getSystemConfig('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.error("OpenAI API key not found in system config");
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }
    console.log("OpenAI API key retrieved successfully");

    // Compose the prompt for ChatGPT
    const prompt = `Give me the nutrition facts (calories, protein, fat, carbs per 100g) for ${ingredient}. Respond as JSON with keys: calories, protein, fat, carbs.`;
    console.log("Generated prompt:", prompt);

    console.log(`Calling OpenAI API for ingredient: "${ingredient}"`);

    // Call OpenAI API
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.2,
    };
    console.log("OpenAI request body:", JSON.stringify(requestBody, null, 2));

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log("OpenAI API response status:", openaiRes.status);
    console.log("OpenAI API response headers:", Object.fromEntries(openaiRes.headers.entries()));

    if (!openaiRes.ok) {
      const errorData = await openaiRes.json().catch(() => ({}));
      console.error("OpenAI API error details:", {
        status: openaiRes.status,
        statusText: openaiRes.statusText,
        errorData: errorData
      });
      return NextResponse.json({ 
        error: `OpenAI API error: ${openaiRes.status} - ${errorData.error?.message || 'Unknown error'}` 
      }, { status: 500 });
    }

    const data = await openaiRes.json();
    console.log("OpenAI API response data:", JSON.stringify(data, null, 2));
    
    const text = data.choices?.[0]?.message?.content || "";
    console.log("Raw ChatGPT response text:", text);

    // Try to extract JSON from the response, even if it's inside a code block or surrounded by text
    function extractJson(str: string) {
      console.log("Attempting to extract JSON from:", str);
      
      // Try to match code block first
      const codeBlockMatch = str.match(/```(?:json)?([\s\S]*?)```/i);
      if (codeBlockMatch) {
        console.log("Found code block match:", codeBlockMatch[1]);
        try {
          const parsed = JSON.parse(codeBlockMatch[1]);
          console.log("Successfully parsed code block JSON:", parsed);
          return parsed;
        } catch (e) {
          console.error("Failed to parse code block JSON:", e);
        }
      }
      
      // Try to match first JSON object in the string
      const jsonMatch = str.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        console.log("Found JSON object match:", jsonMatch[0]);
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          console.log("Successfully parsed JSON object:", parsed);
          return parsed;
        } catch (e) {
          console.error("Failed to parse JSON object:", e);
        }
      }
      
      console.warn("No JSON pattern found in response");
      return null;
    }

    let macros = extractJson(text);
    console.log("Final extracted macros:", macros);
    
    if (!macros) {
      console.warn(`Could not extract JSON from ChatGPT response for "${ingredient}"`);
      console.warn("Using fallback values");
      macros = { calories: 0, protein: 0, fat: 0, carbs: 0 };
    }

    // Validate the extracted data
    const requiredKeys = ['calories', 'protein', 'fat', 'carbs'];
    const missingKeys = requiredKeys.filter(key => !(key in macros));
    if (missingKeys.length > 0) {
      console.warn(`Missing required keys in macros: ${missingKeys.join(', ')}`);
      // Add missing keys with default values
      missingKeys.forEach(key => {
        macros[key] = 0;
      });
    }

    console.log("Final response macros:", macros);
    console.log("=== GPT Nutrition API completed successfully ===");
    
    return NextResponse.json(macros);
  } catch (error) {
    console.error("=== GPT Nutrition API error ===");
    console.error("Error details:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    console.error("=== End GPT Nutrition API error ===");
    
    return NextResponse.json({ 
      error: "Internal server error while processing nutrition request" 
    }, { status: 500 });
  }
} 