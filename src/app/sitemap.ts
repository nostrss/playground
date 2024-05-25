import { BASE_URL } from '@/constant';
import { API } from '@/util/API';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await API.fetchPostListAll();
  const tags = await API.fetchTagsDataAll();

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/rss.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    ...data.data.map((post: any) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    })),
    ...tags.map((tag: any) => ({
      url: `${BASE_URL}/tag/${tag.tagName}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    })),
  ];
}
