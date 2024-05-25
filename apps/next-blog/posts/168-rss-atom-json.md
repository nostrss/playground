---
title: 블로그도 구독이 가능하다
description: Next.js 블로그에 RSS, Atom, JSON Feed를 추가하기
date: 2023-09-20
tags: next blog rss atom json-feed
---

블로그의 컨텐츠를 우리가 검색하거나 직접 방문하여 볼수도 있지만, 구독처럼 새로운 컨텐츠가 발행되면 받아서 볼 수 있는 기능이 존재한다. 이를 가능케 하는게 `RSS`, `Atom`, `JSON-Feed`이다.

위 3개를 직접 전부 구현하기엔 너무 어려울 것 같아서 외부 패키지를 사용해서 구현해보았다.

## 패키지 설치

`RSS`를 구현하기 위해 2가지 방법을 고민했다.

1. 동적으로 api를 호출해서 데이터를 가져오는 방법
2. 빌드시 정적 파일을 생성하는 방법

아무래도 이미 파일로 생성이 되어 있으면, 조금더 속도에서 빠르지 않을까 싶어서 2번의 방법으로 구현하기로 했다. 그리고 서버 리소스도 사용하지 않아도 되는 장점도 있을 것 같다.

구현에 사용할 패키지는 아래 2개이다.

[📌 Feed NPM 페이지 바로가기 📌](https://www.npmjs.com/package/feed)

[📌 ts-node 페이지 바로가기 📌](https://www.npmjs.com/package/ts-node)

## 구현 코드

```ts
import { Feed } from 'feed';
import { writeFileSync } from 'fs';
import {
  BASE_URL,
  DEFAULT_META_AUTHOR_EMAIL,
  DEFAULT_META_AUTHOR_NAME,
  DEFAULT_META_AUTHOR_URL,
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_TITLE,
} from './constant';

import fetch from 'node-fetch';

const master = {
  name: DEFAULT_META_AUTHOR_NAME,
  email: DEFAULT_META_AUTHOR_EMAIL,
  link: DEFAULT_META_AUTHOR_URL,
};

const feed = new Feed({
  title: DEFAULT_META_TITLE,
  description: DEFAULT_META_DESCRIPTION,
  id: DEFAULT_META_AUTHOR_URL,
  link: DEFAULT_META_AUTHOR_URL,
  language: 'ko',
  image: '',
  favicon: '',
  copyright: '',
  generator: 'generate-rss',
  feedLinks: {
    json: `${BASE_URL}/feed.json`,
    atom: `${BASE_URL}/rss-atom.xml`,
    rss: `${BASE_URL}/rss.xml`,
  },
  author: master,
});

const getAllPostData = async () => {
  const data = await fetch(`${BASE_URL}/api/post/all`, {
    method: 'GET',
  });

  const jsonData: any = await data.json();
  jsonData.data.forEach((json: JsonPost) => {
    feed.addItem({
      title: json.title,
      id: json.currentPostId,
      link: `${BASE_URL}/${json.currentPostId}`,
      description: json.description,
      content: json.content.toString(),
      author: [master],
      contributor: [master],
      date: new Date(json.date),
      // image: post.image,
      category: json.tags.split(' ').map((tag: string) => ({ name: tag })),
    });
  });

  // Output: RSS 2.0
  writeFileSync('public/rss.xml', feed.rss2(), 'utf-8');
  // Output: Atom 1.0
  writeFileSync('public/rss-atom.xml', feed.atom1(), 'utf-8');
  // Output: JSON Feed 1.0
  writeFileSync('public/feed.json', feed.json1(), 'utf-8');
};

getAllPostData();
feed.addCategory('Technologies');

type JsonPost = {
  currentPostId: string;
  title: string;
  description: string;
  date: string;
  tags: string;
  content: string;
};
```

> feed 변수는 변하지 rss,atom,json-feed를 생성하는데 공통으로 사용되는 상수이다.

> getAllPostData 함수는 모든 포스트 데이터를 가져와서 feed에 추가하는 함수이다.

> getAllPostData 함수 안에서 rss, atom, json-feed를 생성하는 각각 메서드를 실행하여 파일로 저장한다.

> 파일의 생성 경로는 public 폴더이며, public에 생성된 파일은 추후 {도메인}/rss.xml, {도메인}/rss-atom.xml, {도메인}/feed.json으로 접근이 가능하다.

## 빌드 및 파일 생성

packacge.json에 아래 스크립트를 추가한다.

```json
{
  "rss": "ts-node --project tsconfig.node.json ./src/generate-rss.ts",
  "build": "next build && yarn rss"
}
```

로컬에서 `yarn rss` 커맨드를 실행하면 `public` 폴더에 `rss.xml`, `rss-atom.xml`, `feed.json` 파일이 생성되는 것을 확인 할 수 있다.

로컬에서 생성하지 않아도 `vercel`에 배포시 자동으로 `rss`도 빌드가 되도록 스크립트를 추가해두었다.

## 결과확인

[📌 rss 확인하기 📌](https://www.nostrss.me/rss.xml)

[📌 rss-atom 확인하기 📌](https://www.nostrss.me/rss-atom.xml)

[📌 feed.json 확인하기 📌](https://www.nostrss.me/feed.json)

모두 정상적으로 생성되었음을 확인 할 수 있다.

실제 위의 feed를 구독할 때도 잘 보이는지 Rss 리더를 통해 확인해야겠다.

`feedly`라는 rss 리더를 사용해서 구독해보았다.

[📌 feedly 바로가기 📌](https://feedly.com/)

<img width="884" alt="스크린샷 2023-09-22 오후 3 18 08" src="https://github.com/nostrss/next13-blog/assets/56717167/51f1a860-b376-42c9-b389-7f4ba3b20fba">

> 된다!! 아주 잘나온다!!
