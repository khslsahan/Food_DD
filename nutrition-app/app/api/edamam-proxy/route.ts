import { NextRequest, NextResponse } from 'next/server';

const APP_ID = '4548953d';
const APP_KEY = 'ab16d27b31057d0e62da083d52ccd57b';

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