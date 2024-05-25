import { readdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'posts');
  const fileList = await readdir(filePath);
  const params = fileList.map((file) => {
    return {
      slug: file.trim().replace('.md', ''),
    };
  });

  return NextResponse.json({
    data: [...params],
  });
}
