import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.resolve('public/data', 'ad_campaigns.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return NextResponse.json(jsonData);
}