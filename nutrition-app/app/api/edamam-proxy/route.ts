import { NextRequest, NextResponse } from 'next/server';

const APP_ID = '8819bf57';
const APP_KEY = '32598bc8d7cdce26bd5c682d0fda24fb';

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