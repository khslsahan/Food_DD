import { NextRequest, NextResponse } from 'next/server';

const APP_ID = 'fb6aca3d';
const APP_KEY = '77119808a8169486ed70f354cc38ed9c';

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