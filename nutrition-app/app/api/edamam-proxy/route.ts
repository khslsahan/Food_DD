import { NextRequest, NextResponse } from 'next/server';
import { getMultipleSystemConfigs } from '../../../lib/system-config';

export async function POST(req: NextRequest) {
  const { ingr } = await req.json();
  
  // Get Edamam API credentials from system config
  const configs = await getMultipleSystemConfigs(['EDAMAM_APP_ID', 'EDAMAM_APP_KEY']);
  const APP_ID = configs.EDAMAM_APP_ID;
  const APP_KEY = configs.EDAMAM_APP_KEY;
  
  if (!APP_ID || !APP_KEY) {
    return NextResponse.json(
      { error: 'Edamam API credentials not configured in system config' },
      { status: 500 }
    );
  }
  
  const url = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&nutrition-type=cooking&ingr=${encodeURIComponent(ingr)}`;
  const apiRes = await fetch(url, {
    method: 'GET',
    headers: { 'accept': 'application/json' },
  });
  const data = await apiRes.json();
  return NextResponse.json(data, { status: apiRes.status });
} 