'use client';

import { Post } from '@/type/common';
import Link from 'next/link';
import { useEffect } from 'react';
import TagLabel from './TagLabel';

export default function PostCard({
  title,
  description,
  date,
  currentPostId,
  tags,
  images,
}: Post) {
  const tagList = tags.split(' ');

  useEffect(() => {
    const giscusIframe = document.querySelector('.giscus');
    giscusIframe?.remove();
  }, []);

  return (
    <div className='w-full min-w-[360px] max-w-2xl border rounded-xl border-gray-500'>
      <div className='flex flex-row justify-start items-center px-4'>
        <article className='w-full h-full p-4 md:p-8'>
          <div className='flex items-center justify-between gap-2'>
            <div className='w-full text-s'>{date}</div>
          </div>
          <Link
            href={`/blog/${currentPostId}`}
            className='hover:underline py-1'
          >
            <h2 className='mt-4 text-3xl font-bold'>{title}</h2>
          </Link>
          <p className='mt-4 '>{description}</p>
          <div className='flex flex-row gap-2 mt-4 overflow-hidden flex-wrap'>
            {tagList.map((tag, index) => (
              <TagLabel key={index} tagName={tag} />
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
