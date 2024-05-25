'use client';

import PostCard from '@/components/PostCard';
import { Post } from '@/type/common';
import { API } from '@/util/API';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import SkeletonCardList from './SkeletonCardList';

export default function PostList({ tag = '' }: { tag?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const limit = 10;
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['post'],
    queryFn: ({ pageParam = 1 }) =>
      API.fetchPostListPerPage(pageParam, limit, tag),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const renderData = data?.pages.map(({ data }) => data).flat();

  useEffect(() => {
    if (!ref.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage]);

  return (
    <>
      {renderData &&
        renderData.map((post: Post, index: number) => (
          <PostCard key={index} {...post} />
        ))}
      {isFetching && <SkeletonCardList />}
      <div ref={ref}></div>
    </>
  );
}
