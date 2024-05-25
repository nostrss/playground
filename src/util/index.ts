import { Post, PostIdPrevNext } from '@/type/common';

export const UTIL = {
  removeMetaData: (markdown: string) => {
    const regex = /^---[\s\S]*?---/m;
    return markdown.replace(regex, '');
  },
  getNextpage: (page: number, limit: number, length: number) => {
    return page * limit < length ? page + 1 : null;
  },
  getMarkDownMetaData: (markdown: string, initObject: PostIdPrevNext) => {
    return markdown
      .split('---')[1]
      .split('\n')
      .filter(Boolean)
      .map((item) => {
        const [key, value] = item.split(':');
        return { [key.trim()]: value.trim() };
      })
      .reduce((acc, cur) => ({ ...acc, ...cur }), initObject ? initObject : {});
  },
  sortByTitle: (listArray: Record<any, any>) => {
    return listArray.sort((a: Post, b: Post) => {
      if (a.title > b.title) return -1;
      else if (a.title < b.title) return 1;
      else return 0;
    });
  },
  sortByDate: (listArray: Record<any, any>) => {
    return listArray.sort((a: Post, b: Post) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  },
  slicePerPage: (listArray: Record<any, any>, page: number, limit: number) => {
    return listArray.slice((page - 1) * limit, page * limit);
  },
  filterByTag: (listArray: Record<any, any>, tag: string) => {
    return listArray.filter((item: Post) => item.tags.includes(tag));
  },
};
