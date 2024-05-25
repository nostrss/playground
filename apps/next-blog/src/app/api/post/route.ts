import { UTIL } from '@/util';
import { readFile, readdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import parse from 'node-html-parser';
import { ImgesArrayItem } from '@/type/common';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const page = Number(url.searchParams.get('page')) || 1;
  const limit = Number(url.searchParams.get('limit')) || 10;
  const tag = url.searchParams.get('tag') || '';
  const filePath = path.join(process.cwd(), 'posts');
  const fileList = await readdir(filePath);

  const markdowmMetaData = await Promise.all(
    fileList.map(async (file) => {
      const fileData = await readFile(`${filePath}/${file}`, 'utf-8');
      const currentPostId = {
        currentPostId: file.replace('.md', ''),
      };
      const markDownContent = UTIL.removeMetaData(fileData);

      const imgArr = getImageSrc(markDownContent);

      return {
        ...UTIL.getMarkDownMetaData(fileData, currentPostId),
        images: imgArr,
      };
    })
  );

  const sortDataByTitle = UTIL.sortByTitle(markdowmMetaData);
  const sortDataByDate = UTIL.sortByDate(sortDataByTitle);
  const filterDataByTag = tag
    ? UTIL.filterByTag(sortDataByDate, tag)
    : sortDataByDate;
  const sliceData = UTIL.slicePerPage(filterDataByTag, page, limit);

  return NextResponse.json({
    data: sliceData,
    total: markdowmMetaData.length,
    nextPage: UTIL.getNextpage(page, limit, filterDataByTag.length),
  });
}

const getImageSrc = (htmlElement: string | undefined) => {
  if (!htmlElement) return [];
  const imgHtml = parse(htmlElement).getElementsByTagName('img');
  const imgUrl: Array<ImgesArrayItem> = [];
  imgHtml.forEach((img) => {
    const imgParse = img.getAttribute('src');
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
