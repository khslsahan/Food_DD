import { NextRequest, NextResponse } from 'next/server';
import { getSystemConfig } from '../../../lib/system-config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Get Nutrition API URL from system config, fallback to environment variable
    let nutritionApiUrl = await getSystemConfig('NUTRITION_API_URL');
    
    if (!nutritionApiUrl) {
      // Fallback to environment variable
      nutritionApiUrl = process.env.NUTRITION_API_URL || 'http://localhost:8080/api/nutrition';
      console.warn('NUTRITION_API_URL not found in system config, using fallback:', nutritionApiUrl);
    }
    
    const apiRes = await fetch(nutritionApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    if (!apiRes.ok) {
      console.error('Nutrition API responded with error:', apiRes.status, apiRes.statusText);
      return NextResponse.json(
        { error: `Nutrition API error: ${apiRes.status} ${apiRes.statusText}` },
        { status: apiRes.status }
      );
    }
    
    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch (error) {
    console.error('Error in nutrition-proxy:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 