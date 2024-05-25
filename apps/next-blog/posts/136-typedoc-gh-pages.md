---
title: typedoc으로 프론트엔드 문서 만들기
description: AI가 문서를 만들어주는 세상이 빨리 왔으면 좋겠다.
tags: react nextjs typedoc
date: 2023-03-13
---

회사에서든, 개인적으로 집에서 코드를 볼 때마다

> 이 변수는 뭐지?

> 이 함수는 무슨 작동을 하는거지?

라는 생각을 하면서 코드를 살펴보곤 한다.

그래서 다음에 볼때는 좀 더 알아 보기 쉽게 하려고 주석을 열심히 달기도 한다.

그러다 API 명세처럼 프론트 소스코드들도 문서화 해주는 방법이 없을까 해서 알아보다가 typedoc을 통해서 문서화 할 수 있는 방법을 찾아서 적용해 봤다.

## typedoc이란?

[typedoc 공식 홈페이지 바로가기](https://typedoc.org/)

[typedoc 예제](https://typedoc.org/example/)

typedoc은 소스코드에 포함된 주석으로 html 문서를 만들어주는 패키지이다.

별도로 문서를 작성하는 시간을 들일 필요없이 소스코드에 작성하면 바로 빌드하여 문서화 할 수 있는 장점이 있다.

## typedoc 설치하기

```bash
// Install

npm install --save-dev typedoc
```

## typedoc 설정하기

tsconfig.json에 아래와 같이 entryPoints를 지정해줘야 한다.

entryPoints는 TypeDoc이 문서화할 TypeScript 파일의 진입점을 지정하는 데 사용되고, 진입점이 여러 곳일 경우에는 배열로 여러개 지정해줄 수 있다.

out은 빌드파일이 생성될 경로이다.

```json
 "typedocOptions": {
    "entryPoints": ["src/pages/index.tsx"],
    "out": "docs"
  }
```

## typedoc 문서 생성하기

문서를 생성하는 명령어는 아래와 같다.

```bash
npx typedoc src/index.ts
```

하지만, 위와 같이 작성하면 하위에 있는 소스코드 파일의 주석들은 문서로 만들어지지 않는 단점이 있었다.

그래서 찾은 방법이 아래의 명령어이다. 이렇게 입력하면, entrypoints부터 시작하여 하위 폴더의 파일들까지 전부 문서로 만들어 준다.

```bash
npx typedoc --entryPointStrategy expand ./src
```

## 결과물

나 같은 경우 빌드된 문서를 언제든지 웹에서 볼 수 있도록 gh-pages를 이용해 git-hub page에 배포를 해두었다.

[typedoc 으로 생성한 문서 보기](https://nostrss.github.io/nextjs-blog/)
