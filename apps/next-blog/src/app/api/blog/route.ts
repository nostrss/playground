import { ImgesArrayItem } from '@/type/common';
import { UTIL } from '@/util';
import { readFile, readdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import parse from 'node-html-parser';
import path from 'path';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const postId = url.searchParams.get('blogid');
  const filePath = path.join(process.cwd(), 'posts');
  const fileData = await readFile(`${filePath}/${postId}.md`, 'utf-8');

  const markdowmMetaData = UTIL.getMarkDownMetaData(fileData, {});
  const markDownContent = UTIL.removeMetaData(fileData);

  const imgArr = getImageSrc(markDownContent);

  return NextResponse.json({
    data: {
      ...markdowmMetaData,
      content: markDownContent,
      images: imgArr,
    },
  });
}

const getImageSrc = (htmlElement: string | undefined) => {
  if (!htmlElement) return [];

  const imgHtml = parse(htmlElement).getElementsByTagName('img');
  const imgUrl: Array<ImgesArrayItem> = [];
  imgHtml.forEach((img) => {
    const imgParse = img.getAttribute('src')?.trim();
    imgUrl.push({ url: imgParse });
  });

  const result = imageUrlValidate([...imgUrl]);

  return [...result];
};

const imageUrlValidate = (images: ImgesArrayItem[]) => {
  const validateImages = images.filter((image) => {
    if (image.url?.includes('http')) {
      return image.url;
    }
  });
  return [...validateImages];
};
