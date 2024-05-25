---
title: Next.js SSR, SSG를 Vercel에 배포하기(2)
description: 이래서 Next Next 하는구나..
tags: Next ssr ssg vercel deploy
date: 2023-03-05
---

[전체 소스코드](https://github.com/nostrss/next-render)

[DEMO](https://next-render-hjuyogs9h-nostrss.vercel.app/)

작품 리스트를 `SSR`로 구현해봤으니, 이번에는 `SSG`를 구현해보려고 한다.

리스트 중에 하나를 클릭 했을 때 상세 화면으로 넘어가고

상세화면은 `SSG`로 렌더링 되도록 할 예정이다.

## 작품 상세 페이지 SSG 구현

### API

> 사용할 API : [Art Institute of Chicago API](https://api.artic.edu/docs/)

### SSG 구현 코드

> [SSG로 구현된 전체 소스코드](https://github.com/nostrss/next-render/blob/main/src/pages/%5Bid%5D/index.jsx)

## 구현 내용

### getStaticProps

[getStaticProps 문서 보러가기](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)

- `getStaticProps`는 빌드 시 api 통신 응답값을 받아 미리 html 파일을 생성해둔다.
- 즉, 운영에 배포 되면 유저는 백엔드 서버와의 통신 결과물을 보는 것이 아니라, 이미 빌드되어 있는 `html` 정적파일을 브라우저로 다운 받아 보는 것이다
- 따라서 빌드시 api 통신이 성공하지 않으면 당연히 빌드 에러가 발생한다.
- 그리고 해당 페이지 접속 시 로딩이 엄청나게 빠르다.(당연히 이미 렌더링되어 있었으니깐..)
- 또 당연하지만 페이지 소스를 보면 api응답 값들이 이미 채워져 있다.

```javascript
export async function getStaticProps(context) {
  const id = context.params.id;
  const apiUrl = `https://api.artic.edu/api/v1/artworks/${id}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  return {
    props: {
      detailData: data.data,
    },
  };
}
```

위의 코드는 빌드 시 api 통신 응답값을 클라이언트 컴포넌트에 props로 전달하는 역할을 한다.

`SSR`과 다른 점은 이것이 `빌드(build)`시 이루어진다는 것이다.

`npm run build` 또는 `yarn build` 커맨드를 입력하는 순간 이미 페이지가 만들어지는 것이다.

하지만 내가 작성한 코드에서는 위와 같이 작성하면 에러가 발생하였다.

이유는 getStaticProps가 `dynamic routing`페이지는 렌더링 하지 못하기 때문이다.

이 때 필요한 것이 `getStaticPaths`이다.

### getStaticPaths

[getStaticPaths 문서 보러가기](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)

- `getStaticPaths`는 `dynamic routing`으로 동적으로 변하는 path 정보를 `getStaticProps`에 전달하는 역할을 한다.
- 이 path 정보로 `getStaticProps`는 빌드 시 api를 호출하고 응답값을 받아 정적인 페이지를 생성하는 것이다.

```javascript
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '14556' } },
      { params: { id: '11434' } },
      { params: { id: '16487' } },
    ],
    fallback: true,
  };
}
```

위의 코드를 보면 id 3개를(14556, 11434, 16487) path 정보로 `getStaticProps`에 전달하고 있다.
그렇다면 빌드 시 `getStaticProps`는 3개의 id로 api 통신을 하고 응답값을 받아 정적인 페이지를 생성할 것이다.

빌드를 해보자.

<img width="653" alt="빌드결과" src="https://user-images.githubusercontent.com/56717167/223434906-0b966c54-52b2-4203-8dce-d04545523d62.png">

정적 페이지 3개가 빌드 되었다고 빌드 결과에서 확인 할 수 있다.

실제 빌드 폴더에서 확인해보자.

<img width="311" alt="빌드결과" src="https://user-images.githubusercontent.com/56717167/223431594-d1ab3bdb-9b3d-4e44-b23f-e115ee450e5f.png">

빌드 폴더에 내가 지정한 14556, 11434, 16487 html 파일이 생성된 것을 볼 수 있었다.

그렇다면 여기서 또 다른 의문이 생기게 된다...

> 작품의 개수가 100개라면, getStaticPaths에 100개의 정보를 입력해야 하는건가?

#### fallback(Generating paths on-demand)

다시 한번 `getStaticPaths` 코드를 살펴보자.

```javascript
    fallback: true, // 이건 무엇을 하는 걸까??
```

`Next.js`에서는 우리의 이런 요구를 예상한듯 이미 준비를 해두었는데, 바로 `fallback`을 이용하는 것이다.

모든 페이지를 전부 빌드하는 것이 아니라 필요할 때 마다 정적 페이지를 생성하는 것이다.

위의 코드를 다시 풀어서 설명하면

> id 3개는 미리 페이지를 정적 생성하고

> 나머지 dynamic routing 페이지는 유저가 접속하면 그때 그때 페이지를 생성해줘

라는 의미로 이해하면 된다.

여기서 `fallback:true`는 필요할 때마다 정적 페이지를 생성한다라는 옵션인 것이다.

실제로 생성 되는 지 확인 해보자.

빌드 후 `Production` 모드로 실행을 하자

> yarn build

> yarn start

그리고 몇몇 페이지를 방문해봤다.

<img width="285" alt="falback설정후" src="https://user-images.githubusercontent.com/56717167/223436734-fc917c7d-0082-40a5-a5fb-40a0bb9ceba5.png">

내가 지정한 3개의 id외 2개의 페이지가 새롭게 생겨난 것을 볼 수 있었다.

신기한 기능이긴 한데 몇가지 의문점이 들었다.

> 서비스를 운영하다 보니 약 10,000개의 정적 페이지들이 생겼다.

> 용량적으로 문제는 없는 건가?

> 만약 새롭게 build를 하게 되는 경우 기존에 쌓여있던 정적 페이지들은 전부 사라지는 건가?

실무에서는 SSG를 어떻게 쓰고 있을까..
