---
title: Next.js SSR, SSG를 Vercel에 배포하기(1)
description: 오랜만에 사용해 보는 Next.js, 보고 싶었다 Next.js
tags: Next ssr ssg vercel deploy
date: 2023-03-05
---

[전체 소스코드](https://github.com/nostrss/next-render)

[DEMO](https://next-render-hjuyogs9h-nostrss.vercel.app/)

최근 공부의 목적에 대해 갈팡질팡하다가 rendering에 대해 부쩍 관심이 생겼다.

그래서 공부할 겸 Next.js의 SSR(server siede rendering)과 SSG 렌더링을 간단히 구현해서 배포를 해봤다.

## 프로젝트 준비하기

### API

먼저 렌더링할 데이터를 fetch할 api가 필요했다.

최대한 간단히 구현하고 싶어서 auth,cors를 신경 쓸 필요 없는 api를 하나 찾았다.

> 사용할 API : [Art Institute of Chicago API](https://api.artic.edu/docs/)

### 구현할 페이지

- 작품 리스트 페이지 : SSR
- 작품 상세 페이지 : SSG

이렇게 2개의 페이지만 있으면 될 듯 하다.

페이지 1개는 SSR, 다른 나머지 페이지는 SSG로 구현해볼 생각이다.

## 작품 리스트 페이지 SSR 구현

> [SSR로 구현된 전체 소스코드](https://github.com/>nostrss/next-render/blob/main/src/pages/index.js)

### SSR 구현 전 코드

```javascript
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetch(`https://api.artic.edu/api/v1/artworks?limit=20`)
      .then((res) => res.json())
      .then((data) => {
        setDataList([...data.data]);
      });
  }, []);

  const onClickItem = (id) => () => {
    router.push(`/${id}`);
  };

  return (
    <>
      {dataList === undefined ? (
        <div>loading...</div>
      ) : (
        <>
          <Head>
            <title>Next.js Rendering Test</title>
            <meta
              name='description'
              content='Next Server Sider Rendering Page'
            />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <main>
            <h1>This page is implemented with SSR</h1>
            {dataList?.map((item) => (
              <fieldset
                key={item.id}
                onClick={onClickItem(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <legend>Artwork {item.id}</legend>
                <ul>
                  <li>title : {item.title}</li>
                </ul>
              </fieldset>
            ))}
          </main>
        </>
      )}
    </>
  );
}
```

위 코드의 과정을 간단히 설명하면 아래와 같다

> - useEffect로 페이지가 최초 로딩 될 때 작품 리스트 api를 호출 한다.
> - 응답값을 useState로 dataList에 저장한다.
> - dataList의 작품 리스트를 보여준다

이 코드를 SSR로 렌더링하기 위해 아래와 같이 변경 했다.

- useEffect로 페이지가 최초 로딩 될 때 작품 리스트 api를 호출 한다.

  > getServerSideProps로 서버에서 api를 호출한다.

- 응답값을 useState로 dataList에 저장한다.
  > 응답값을 props로 전달한다.

```javascript
export async function getServerSideProps() {
  // useEffect가 아니라 서버에서 api를 호출한다.
  const res = await fetch(`https://api.artic.edu/api/v1/artworks?limit=20`);
  const data = await res.json();

  // Props로 응답값을 전달한다.
  return {
    props: {
      dataList: data.data,
    },
  };
}
```

```javascript
// 서버에서 props로 api 응답값을 전달 받는다.
export default function Home({ dataList }) {
(...생략)
```

## SSR 확인하기

페이지의 외관만 보면 SSR을 적용하기 전과 동일하게 보이기 때문에 제대로 적용이 된건지 알 수가 없다.

이럴 땐 브라우저에서 cmd + opt + u(윈도우 ctrl + u)를 눌러보자.

(또는 마우스 우클릭 > 페이지 소스 보기)

SSR을 적용하기 전과 후의 차이점이 보이는가?

> SSR 적용 전

<img width="956" alt="스크린샷 2023-03-06 시간: 22 57 20" src="https://user-images.githubusercontent.com/56717167/223130866-9d953e25-3e92-4ae9-af2d-534dcc16495e.png">

SSR을 적용하기 전에는 api 응답으로 받은 작품 리스트의 내용이 보이지 않는다.

> SSR 적용 후

<img width="983" alt="스크린샷 2023-03-06 시간: 22 58 25" src="https://user-images.githubusercontent.com/56717167/223130879-35552121-0fcb-4631-9b36-2a7565e90e7f.png">

SSR을 적용 한 뒤에는 api 응답값으로 받은 작품 타이틀명이 페이지 소스에 보이는 것을 확인 할 수 있다.
