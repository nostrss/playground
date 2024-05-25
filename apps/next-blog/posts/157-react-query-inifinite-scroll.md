---
title: [React-Query] 무한 스크롤 구현하기
description: 별도의 무한스크롤 라이브러리 없이 useInfiniteQuery와 IntersectionObserver를 통해 무한 스크롤을 구현해보자
date: 2023-09-06
tags: nextjs app storybook error tsconfig

---

그동안 `무한스크롤`을 구현하기 위해 몇가지 라이브러리를 사용해봤다.

그런데 이번에 `React-Query` 문서를 보던 중 `useInfiniteQuery`를 제공하는 것을 알았고 이를 통해 무한스크롤을 구현해보기로 했다.

## 무한스크롤의 구현원리

무한 스크롤을 구현하기 위해서는 2가지가 준비되어야 한다.

1. 일정 단위(개수)별로 컨텐츠를 불어올수 있는 API가 필요하다. (ex. 10개씩)

2. 페이지 스크롤이 끝에 도달했을 때, 추가적인 데이터를 불러오기 위한 트리거를 만들어야 한다.

예를 들어 설명하면 이렇다.

- 10개의 컨텐츠를 불러온다.
- 스크롤을 내리다 끝에 도달하면 트리거를 발동한다.
- 트리거가 발동되면 10개의 컨텐츠를 추가로 불러온다.

위 과정을 더이상의 컨텐츠가 없을때까지 반복하면 무한스크롤이 완성된다.

## Next.js Api Route를 이용한 무한스크롤 API 만들기

별도 데이터베이스를 사용하지 않고 프로젝트에 있는 마크다운 파일을 읽어와서 무한스크롤 API를 만들었다.

그래서 마크다운 파일을 읽어와서 가공하는 과정이 있기 때문에 코드가 다소 길다.

그리고 api 응답값에서 `중요`한 건 `다음페이지`가 있는지 여부를 나타내는 값이다.

나중에 `react-query`의 `useInfiniteQuery`를 사용할 때 이 값을 이용해 다음 페이지가 있는지 여부를 판단할 것이다.

```ts
import { UTIL } from '@/util';
import { readFile, readdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import parse from 'node-html-parser';
import { ImgesArrayItem } from '@/type/common';

// 예시 : /api/posts?page=1&limit=10
export async function GET(req: NextRequest) {
  // 파싱할 req.url을 이용해 URL 객체 생성
  const url = new URL(req.url);

  // page, limit 쿼리스트링 파라미터가 없을 경우 기본값 1, 10으로 설정
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = Number(url.searchParams.get('limit')) || 10;

  // 파일경로를 생성하고 파일리스트를 읽어온다.
  const filePath = path.join(process.cwd(), 'posts');
  const fileList = await readdir(filePath);

  // 파일리스트를 순회하며 각 파일의 정보를 읽고 가공한다.
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

  // 가공된 컨텐츠 배열을 타이틀, 날짜 순으로 정렬하고 페이지와 limit을 이용해 데이터를 자른다.
  const sortDataByTitle = UTIL.sortByTitle(markdowmMetaData);
  const sortDataByDate = UTIL.sortByDate(sortDataByTitle);
  const sliceData = UTIL.slicePerPage(sortDataByDate, page, limit);

  return NextResponse.json({
    data: sliceData,
    total: markdowmMetaData.length,
    // 중요! 다음 페이지가 있는지 여부를 나타내는 값
    // 다음 페이지가 있으면 페이지 number, 없ㅇ면 null
    nextPage: UTIL.getNextpage(page, limit, markdowmMetaData.length),
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
```

### API 응답 예시

```json
{
  "data": [
    {
      "currentPostId": "2023-08-23-144-nestjs",
      "layout": "post",
      "title": "'[Nest.js] - 소개'",
      "author": "'Nostrss'",
      "comments": "true",
      "tags": "nestjs node express javascript typescript",
      "excerpt_separator": "",
      "sticky": "",
      "hidden": "",
      "date": "2023-08-23",
      "images": []
    }
    // (... 생략)
  ],
  "total": 25,
  "nextPage": 2 // 중요!
}
```

## useInfiniteQuery 적용하기

[🔗 Tanstack Infinite Queries 문서보기 🔗](https://tanstack.com/query/latest/docs/react/guides/infinite-queries)

아래는 공식문서의 일부를 발췌한 것이다.  
`Query`와 사용법이 비슷하지만 다소 다르게 생겼다. 하나씩 살펴보자.

```tsx
const {
  data, // api 응답 객체
  error,
  fetchNextPage, // 다음 페이지(컨텐츠)를 불러오는 함수
  hasNextPage, // Boolean 값, 다음 페이지가 있는지 여부를 나타낸다.
  isFetching, // 로드가 진행중인지 여부를 나타낸다.
  isFetchingNextPage // 추가로드가 진행중인지 여부를 나타낸다.,
  status,
} = useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
});
```

위 코드의 작동방식을 보면 다음과 같다.

- `queryKey` : 쿼리의 키값을 나타낸다. 이 키값을 이용해 캐시를 관리한다.
- `queryFn` : 쿼리를 실행하는 함수를 나타낸다. 이 함수는 `queryKey`를 인자로 받는다.
- `getNextPageParam` : 다음 페이지를 불러오는 함수를 나타낸다. 이 함수는 `queryFn`의 결과값을 인자로 받으며, 다음 페이지가 있는 경우 실행된다.

## 실제 적용된 코드

```tsx
const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['post'],
  queryFn: ({ pageParam = 1 }) => fetchPostList(pageParam, limit),
  getNextPageParam: (lastPage) => {
    console.log(lastPage);
    return lastPage.nextPage;
  },
});
```

위에서 찍힌 `console.log`를 살펴볼 필요가 있다.

```json
{
  "data": [
    //생략
  ],
  "total": 25,
  "nextPage": 2
}
```

getNextPageParam 함수의 인자로 들어온 lastPage는 위와 같은 형태이다.

그리고 이 함수의 반환값은 다음 페이지의 `number`이며, 이 값은 `queryFn`의 `pageParam`으로 들어간다.

그래서 만약 백엔드 개발자가 따로 있다면 응답값에 다음페이지의 number를 반환하도록 요청해야한다.

## IntersectionObserver를 이용한 무한스크롤 구현하기

[🔗 참고 블로그 🔗](https://simian114.gitbook.io/blog/undefined/react/intersectionobserverapi)

이제는 다음페이지를 불러오도록 하기 위해서 트리거를 구현해야한다.

- 빈 `div`를 만들고 이 `div`를 `IntersectionObserver`의 `targe`t으로 지정해야한다.
- 그래서 `useRef`를 이용해 위의 빈 div의 ref에 바인딩 해주었다.
- 그리고 빈 div가 화면에 보이면 `fetchNextPage`를 실행한다.
  > 주의사항 : IntersectionObserver는 Web API이기 때문에 SSR에서는 사용할 수 없다. 그러므로 useEffect를 이용해 빈 div가 화면에 보일때만 IntersectionObserver를 실행하도록 해야한다.

```tsx
const ref = useRef<HTMLDivElement | null>(null);

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
  <section className='flex flex-col gap-4 items-center px-4 pt-4'>
    {renderData &&
      renderData.map((post: Post, index: number) => (
        <PostCard key={index} {...post} />
      ))}
    {isFetching && <div>loading...</div>}

    <div ref={ref}></div>
  </section>
);
```

위의 같이 코드를 작성하고 실행해보면 무한스크롤이 작동을 하지 않는다.

그 이유는 `useInfiniteQuery`가 반환하는 data의 구조 때문이다.

<img width="705" alt="스크린샷 2023-09-10 오후 11 34 47" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/be9be825-5c66-414c-80fe-841df347db13">

위의 이미지는 useInfiniteQuery가 반환하는 data의 구조이다.
중첩된 구조로 되어있기 때문에 map을 두번 사용해야 렌더링이 가능한 형태이다.

그래서 이를 한번에 렌더링할 수 있도록 데이터를 가공해주는 코드를 추가해주었다.

```tsx
const renderData = data?.pages.map(({ data }) => data).flat();
```

## 결과

<img width="705" alt="스크린샷 2023-09-10 오후 11 34 47" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/6a9f6804-65de-4ca5-b426-efe4c3cc87e6">

10개마다 추가로 불러오도록 설정했는데 잘 작동하는 것을 확인할 수 있다.

## 최종 코드

```tsx
'use client';

import PostCard from '@/stories/PostCard';
import { Post } from '@/type/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

const fetchPostList = async (page: number, limit: number) => {
  const data = await fetch(`/api/post?page=${page}&limit=${limit}`, {
    method: 'GET',
  });
  return data.json();
};

export default function PostList() {
  const ref = useRef<HTMLDivElement | null>(null);
  const limit = 10;
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['post'],
    queryFn: ({ pageParam = 1 }) => fetchPostList(pageParam, limit),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
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
    <section className='flex flex-col gap-4 items-center px-4 pt-4'>
      {renderData &&
        renderData.map((post: Post, index: number) => (
          <PostCard key={index} {...post} />
        ))}
      {isFetching && <div>loading...</div>}
      <div ref={ref}></div>
    </section>
  );
}
```
