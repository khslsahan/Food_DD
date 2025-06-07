import { NextRequest, NextResponse } from 'next/server';

const APP_ID = 'cc351e2a';
const APP_KEY = 'ffeac0f43a1ac9cbe8446013cf7cee94';

export async function POST(req: NextRequest) {
  const { ingr } = await req.json();
  const url = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&nutrition-type=cooking&ingr=${encodeURIComponent(ingr)}`;
  const apiRes = await fetch(url, {
    method: 'GET',
    headers: { 'accept': 'application/json' },
  });
  const data = await apiRes.json();
  return NextResponse.json(data, { status: apiRes.status });
} 