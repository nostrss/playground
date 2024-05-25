---
title: [NEXT] Middleware와 Edge Functions
description : 새로운 걸 사용하기 전에는 사전학습을 충분히 하자. Next.js Middleware를 사용하면서 발생한 문제점과 해결방법
date: 2023-08-31
tags: nestjs edge vercel runtime middleware
---

얼마 전 팀프로젝트에 `Next.js`의 `Middleware` 파일을 사용하여 github 로그인 관련 기능을 구현하려고 했었다.

> [🔗 Next.js Middleware 공식문서 🔗](https://nextjs.org/docs/pages/building-your-application/routing/middleware)

기능 설명

- 로그인 버튼 클릭
- 깃헙에서 리다이렉트 url로 페이지를 다시 보내준다.
- 리다이렉트 url 쿼리스트링 중에서 code값을 받아온다.
- 받아온 code값을 이용하여 api 통신을 하여 토큰 값을 받아온다.
- 토큰 값으로 쿠키를 생성한다.

## 구현코드

`root` 위치에 `middleware.ts` 파일을 생성하고 아래와 같이 작성해주었다.

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  BLOGRASS_API_BASE_URL,
  BLOGRASS_AUTH_GET_TOKEN,
} from './constants/api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants/common';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const code = new URLSearchParams(url.search).get('code') || '';
  let accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  let refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

  const getAuthToken = async () => {
    const data = await fetch(
      `${BLOGRASS_API_BASE_URL}${BLOGRASS_AUTH_GET_TOKEN}${code}`
    );
    const jsonData = await data.json();
    return jsonData.result[0];
  };

  if (code && !accessToken && !refreshToken) {
    const data = await getAuthToken();
    accessToken = data.accessToken;
    refreshToken = data.refreshToken;
    const response = NextResponse.next();
    if (accessToken && refreshToken) {
      response.cookies.set(ACCESS_TOKEN, accessToken);
      response.cookies.set(REFRESH_TOKEN, refreshToken);
    }
    return response;
  }
}

export const config = {
  matcher: '/',
};
```

## 문제 발생

개발모드에서는 상관없었는데, 배포 후에 문제가 발생했다.

`vercel`을 프론트 서버로 사용하고 있는데, 배포 후에 `edge runtime` 에러가 발생해서 롤백을 한 적이 있다.

그래서 `edge runtime`에 대해서 알아보았다.

## Edge runtime이란?

`Next`에서 런타임은 2가지가 존재한다.

- `Node.js Runtime`(우리가 일반적으로 사용하는 런타임)
- `Edge Runtime`

Next.js에서 `Edge` 런타임은 경량화된 `Node.js` `API`의 *하위 집합*이라 `Node.js` `API`의 일부 기능만 사용할 수 있다.

사용가능한 `API`는 아래 링크에서 확인할 수 있다.

> [🔗 edgeruntime api 바로가기 🔗](https://nextjs.org/docs/pages/api-reference/edge)

링크에서 보듯 사용할 수 있는 API가 한정되어 있으며 _npm 패키지를 사용할 수 없다_.

> 그래서 `edge runtime`에서는 `axios`를 사용할 수 없었다.

또한 vercel에서도 사용할 때 여러가지 제약이 있다.

> [🔗 vercel edge function 제한 바로가기 🔗](https://vercel.com/docs/functions/edge-functions/limitations)

그래서 개발모드에서는 작동을 했으나 vercel에 배포 후에는 에러가 발생한 것으로 추측이 된다.

## 결론

> - next.js middleware는 edge runtime에서 작동한다.
> - edge runtime은 경량화된 node.js API의 하위 집합이다.
> - edge runtime에서는 npm 패키지를 사용할 수 없다.
> - 그리고 vercel에서도 사용할 때 여러가지 제약이 있다.
> - middleware에서는 간단한 로직만 사용하는 것이 좋을 것 같다.
