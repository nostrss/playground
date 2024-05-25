import { POSTS_FILE_PATH } from '@/constant';
import { UTIL } from '@/util';
import { readFile, readdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export async function GET() {
  const filePath = path.join(process.cwd(), POSTS_FILE_PATH);
  const fileList = await readdir(filePath);

  const markdowmMetaData = await Promise.all(
    fileList.map(async (file) => {
      const fileData = await readFile(`${filePath}/${file}`, 'utf-8');
      const currentPostId = {
        currentPostId: file.replace('.md', ''),
      };

      const markdownMetaData = UTIL.getMarkDownMetaData(
        fileData,
        currentPostId
      );
      const markDownContent = UTIL.removeMetaData(fileData);
      const htmlContent = unified()
        // @ts-ignore
        .use(remarkParse)
        // @ts-ignore
        .use(remarkRehype)
        .use(rehypeStringify)
        .processSync(markDownContent).value;
      return {
        ...markdownMetaData,
        content: htmlContent,
      };
    })
  );

  const sortDataByTitle = UTIL.sortByTitle(markdowmMetaData);
  const sortDataByDate = UTIL.sortByDate(sortDataByTitle);

  return NextResponse.json({
    data: sortDataByDate,
  });
}
