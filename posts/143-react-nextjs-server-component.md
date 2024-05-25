---
title: React server component와 Next.js
description: Server Component 참 신기한 컴포넌트네요
tags: react rsc next.js
date: 2023-07-11
---

React 18 버전에서 새로 추가된 기능 중 하나가 바로 server component이다.

아직 많이 쓰이는 것 같지는 않지만, Next.js에서도 app router가 정식 버전으로 나오면서 server component를 지원한다고 한다.

그래서 이에 대해 조금 공부해보았다.

## React server component는 왜 나왔을까?

### 번들 사이즈 최적화

React18 이전의 리액트 컴포넌트는 한마디로 '클라이언트' 컴포넌트였다.

그래서 모든 것이 브라우저에서 실행되었다.(CSR인 경우)

코드를 다운로드 하고, DOM에 렌더링하고, Data를 fetch하고, 이벤트를 처리하는 것까지 모두 브라우저에서 수행되었다.

이는 번들 사이즈가 커지는 원인이 되었다.

하지만 서버에서 렌더링을 할 수 있게 된다면, 브라우저에서 수행할 작업을 줄일 수 있고, 번들 사이즈를 줄일 수 있게 된다.

즉, 그동안 브라우저에서 하던 일을 서버와 브라우저가 나눠서 작업을 할 수 있게 되는 것이다.

### 서버 리소스 리소스 접근

서버는 데이터 베이스, GraphQL, 파일시스템 등 데이터 리소스에 빠르게 접근할 수 있고, 이를 클라이언트 컴포넌트에 Props로 전달할 수 있다.

### 서버 컴포넌트와 SSR

나도 착각 했던 것 중 하나인데 RSC는 SSR과는 다르다.

`server`라는 단어가 둘다 들어가서 딱 착각하기 좋은 듯하다.

좋은 내용이 있어서 아래에 인용해봤다.

> Does this(RSC) replace SSR?

> No, they’re complementary. SSR is primarily a technique to quickly display a non-interactive version of client components. You still need to pay the cost of downloading, parsing, and executing those Client Components after the initial HTML is loaded.
> You can combine Server Components and SSR, where Server Components render first, with Client Components rendering into HTML for fast non-interactive display while they are hydrated. When combined in this way you still get fast startup, but you also dramatically reduce the amount of JS that needs to be downloaded on the client.

## Next.js에서의 RSC

얼마전에 app router가 정식 버전으로 나왔다.

많은 변화가 있었지만 가장 큰 변화는 아마 app 폴더가 생긴 것이 아닐까 싶다.

기존 버전의 Next.js에서는 pages 폴더에 있는 컴포넌트를 전부 클라이언트 컴포넌트로 취급하였다.

그리고 이번 버전에 추가된 app 폴더는 디폴트로 모든 컴포넌트를 서버 컴포넌트 취급을 한다.

> 당분간은 pages폴더와 app폴더를 같이 사용할 수 있다고 한다.

### 무엇이 달라지는가?

서버 컴포넌트와 클라이언트 컴포넌트를 구분하여 사용할 줄 알아야 할 것 같다.

서버 컴포넌트는 Node.js 환경에서 실행되고, 클라이언트 컴포넌트는 브라우저 환경에서 실행된다.

그렇기 때문에 서버 컴포넌트에서는 기존에 우리가 사용했던 Browser APIs, 이벤트, React Lifecycle Effect, Hooks 등을 사용할 수 없다.

기존처럼 사용하기 위해서는 아래와 같이 최상단에 `use client`를 선언해주면 된다.

```js
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

## Reference

- [https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- [https://tech.kakaopay.com/post/react-server-components/](https://tech.kakaopay.com/post/react-server-components/)
- [https://yceffort.kr/2022/01/how-react-server-components-work](https://yceffort.kr/2022/01/how-react-server-components-work)
