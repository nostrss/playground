---
title: [NEXT] page.js (with App Router)
description: NEXT.JS에서 page.js에 기본적으로 제공되는 Props를 알아보자.
tags: nextjs react app-router pagejs
date: 2023-07-11
---

## Props

NEXT.JS에서는 기본적으로 컴포넌트에 Props로 params와 searchParams를 전달해준다.

상위 컴포넌트에서 아무런 Props를 전달하지 않아도 params와 searchParams를 사용할 수 있다.

```js
export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <h1>My Page</h1>
}
```

## params

`params`: URL의 path에 있는 동적 경로 파라미터를 담고 있는 객체이다.

예를 들면 아래와 같다.

| Example                            | URL       | params                       |
| :--------------------------------- | :-------- | :--------------------------- |
| app/shop/[slug]/page.js            | /shop/1   | { slug: '1' }                |
| app/shop/[category]/[item]/page.js | /shop/1/2 | { category: '1', item: '2' } |
| app/shop/[...slug]/page.js         | /shop/1/2 | { slug: ['1', '2'] }         |

예전에 나는 useRouter를 사용해서 params를 가져왔었는데, 이제는 이렇게 간단하게 가져올 수 있다.

## searchParams

`searchParams`: URL의 query string에 있는 파라미터를 담고 있는 객체

| URL           | searchParams       |
| :------------ | :----------------- |
| /shop?a=1     | { a: '1' }         |
| /shop?a=1&b=2 | { a: '1', b: '2' } |
| /shop?a=1&a=2 | { a: ['1', '2'] }  |

## useRouter 변경사항

그리고 이와 관련하여 몇가지 달라진 점이 있다. 특히 내가 많이 사용하던 것들 중에 달라진 사항이 있어 정리해봤다.

> 새로운 useRouter는 import시 next/navigation에서 가져와야한다.(기존 next/router)

> 문자열 pathname은 usePathname()으로 대체되었다.

> 문자열 query는 useQuery()로 대체되었다.
