import { BASE_URL, DEFAULT_OG_IMAGE_URL } from '@/constant';
import CommentList from '@/components/CommentList';
import MarkDownViewer from '@/components/MarkDownViewer';
import { PostSlug } from '@/type/common';
import { API } from '@/util/API';

export default async function BlogDetail({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { data } = await API.fetchBlogDetail(slug);

  return (
    <section className='w-full flex flex-row justify-center'>
      <article className='w-full p-5'>
        <h1 className='text-[36px] font-bold dark:text-white border-b border-black pb-2 mb-4'>
          {data.title}
        </h1>
        <MarkDownViewer content={data.content} />
        <CommentList />
      </article>
    </section>
  );
}

/**
 * SSG 정적 페이지 생성을 위한 함수
 * @returns
 */
export async function generateStaticParams() {
  const { data } = await API.fetchPostListAll();

  return data.map((post: PostSlug) => ({
    slug: post.slug,
  }));
}

/**
 * 상세페이지 메타데이터 생성을 위한 함수
 * @param param0
 * @returns
 */
export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { data } = await API.fetchBlogDetail(slug);
  return {
    title: data.title,
    description: data.description || data.title,
    keywords: data.tags.split(' '),
    alternates: {
      canonical: `${BASE_URL}/${slug}`,
    },
    openGraph: {
      title: `${data.title}`,
      description: `${data.description || data.title}`,
      url: `${BASE_URL}/${slug}`,
      alternates: {
        canonical: `${BASE_URL}/${slug}`,
      },
      images: [
        {
          url:
            data.images?.length > 0 ? data.images[0].url : DEFAULT_OG_IMAGE_URL,
          width: 1550,
          height: 800,
        },
        {
          url:
            data.images?.length > 0 ? data.images[0].url : DEFAULT_OG_IMAGE_URL,
          width: 1550,
          height: 800,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title} | twitter_page`,
      description: `${data.description || data.title} | twitter_page`,
    },
  };
}
