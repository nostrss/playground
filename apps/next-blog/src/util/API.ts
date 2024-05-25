import { BASE_URL } from '@/constant';

export const API = {
  fetchPostListPerPage: async (page: number, limit: number, tag = '') => {
    const data = await fetch(
      `/api/post?page=${page}&limit=${limit}&tag=${tag}`,
      {
        method: 'GET',
      }
    );
    return data.json();
  },
  fetchPostListAll: async () => {
    const data = await fetch(`${BASE_URL}/api/post/postlist`, {
      method: 'GET',
      cache: 'no-store',
    });

    return data.json();
  },
  fetchTagsDataAll: async () => {
    const data = await fetch(`${BASE_URL}/api/tags`, {
      method: 'GET',
      cache: 'no-store',
    });

    return data.json();
  },
  fetchBlogDetail: async (slug: string) => {
    const data = await fetch(`${BASE_URL}/api/blog?blogid=${slug}`, {
      method: 'GET',
      cache: 'no-store',
    });
    return data.json();
  },
};
