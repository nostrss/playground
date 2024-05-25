import { TagCounts, Tags } from '@/type/common';
import { UTIL } from '@/util';
import { readFile, readdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), 'posts');
  const fileList = await readdir(filePath);

  const tags = await Promise.all(
    fileList.map(async (file) => {
      const fileData = await readFile(`${filePath}/${file}`, 'utf-8');
      const metadata = UTIL.getMarkDownMetaData(fileData, {});
      return metadata.tags.split(' ');
    })
  );

  return NextResponse.json([...transformTagsData(tags)]);
}

const transformTagsData = (tags: Tags) => {
  const tagCounts = tags.reduce((accumulator, tags) => {
    tags.forEach((tag) => {
      accumulator[tag] = (accumulator[tag] || 0) + 1;
    });
    return accumulator;
  }, {} as TagCounts);

  const tagsArray = Object.keys(tagCounts).map((tagName) => ({
    tagName,
    count: tagCounts[tagName],
  }));

  return tagsArray;
};
