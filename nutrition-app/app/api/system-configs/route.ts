import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: List all configs
export async function GET() {
  const configs = await prisma.systemConfig.findMany({
    orderBy: { config_key: 'asc' }
  });
  return NextResponse.json(configs);
}

// POST: Add new config
export async function POST(req: NextRequest) {
  const { config_key, config_value, description } = await req.json();
  if (!config_key || !config_value) {
    return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
  }
  const config = await prisma.systemConfig.upsert({
    where: { config_key },
    update: { config_value, description },
    create: { config_key, config_value, description }
  });
  return NextResponse.json(config);
}

// PUT: Update existing config
export async function PUT(req: NextRequest) {
  const { config_key, config_value, description } = await req.json();
  if (!config_key || !config_value) {
    return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
  }
  const config = await prisma.systemConfig.update({
    where: { config_key },
    data: { config_value, description }
  });
  return NextResponse.json(config);
} 