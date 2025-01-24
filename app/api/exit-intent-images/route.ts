import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public', 'exit-intent');
    const files = await fs.readdir(publicDir);
    const imagePaths = files.map(file => `/exit-intent/${file}`);
    return NextResponse.json(imagePaths);
  } catch (error) {
    console.error('Error reading exit-intent directory:', error);
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
}