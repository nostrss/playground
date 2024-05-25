'use client';

import useGetCookie from '@/hook/useGetCookie';
import Script from 'next/script';

export default function CommentList() {
  const theme = useGetCookie();

  return (
    <div className='giscus'>
      <Script
        className='text-center'
        src='https://giscus.app/client.js'
        data-repo='nostrss/next13-blog'
        data-repo-id={process.env.NEXT_PUBLIC_REPO_ID}
        data-category='General'
        data-category-id={process.env.NEXT_PUBLIC_CATEGORY_ID}
        data-mapping='title'
        data-strict='0'
        data-reactions-enabled='1'
        data-emit-metadata='0'
        data-input-position='top'
        data-theme={theme}
        data-lang='ko'
        crossOrigin='anonymous'
        data-loading='lazy'
        async
      />
    </div>
  );
}
