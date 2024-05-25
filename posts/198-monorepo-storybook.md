---
title: [Turborepo] 모노레포에 스토리북 추가하기
description: 모노레포에 내가 원하는 디자인 시스템을 세팅해보자
date: 2024-01-10
tags: turborepo monorepo storybook vercel deploy
---

이제 모노레포에 내가 원하는 디자인 시스템, Storybook을 추가해보자.

## Storybook 설치하기

아래의 공식문서를 참고해 진행했다.

<img width="270" alt="스크린샷 2024-01-11 오후 2 21 34" src="https://github.com/nostrss/next13-blog/assets/56717167/60c5fd37-45d7-426a-96a4-b33343ed3a2e">

[📌 Using Storybook with Turborepo 📌](https://turbo.build/repo/docs/handbook/tools/storybook)

크게 어려움은 없었으나, 나 같은 경우 yarn 으로 설치시 오류가 발생하여 npm으로 설치를 진행했던 기억이 난다.

공식문서에서 vite를 사용하도록 되어 있어서 한번 살펴보았다.

## Vite란?

<img width="1186" alt="스크린샷 2024-01-11 오후 2 20 02" src="https://github.com/nostrss/next13-blog/assets/56717167/fd19ecc6-e54e-48ed-a29b-c8045dea8c3f">

[📌 Vite 공식문서 📌](https://ko.vitejs.dev/guide/why.html)

공식문서를 읽어보니 vite는 Webpack과 같은 번들링을 하는 도구인 것 같다.

기존의 번들러보다 서버구동이 빠르고 여러가지 이점이 있다고 한다.

일단 현재는 스토리북을 설치하기 위함이니 가볍고 읽고 넘어갔다.

> 참고로 Vite는 node.js 18 또는 20 이상의 버전을 요구한다.
> 나 같은 경우 현재 18+ 버전을 사용하고 있어서 문제는 없었다.

### package.json 수정하기

이번에도 turbo repo 환경에 맞게 package.json 을 일부 수정해주었다.

- turbo build 명령어 실행 시 스토리북도 빌드가 되게 하기 위해 build 명령어에 스토리북 빌드 명령어를 추가해줬다.
- React 컴포넌트를 공통으로 사용하기 위해 `의존성`을 추가해줬다.

```json
//apps/storybook/package.json
{
  "scripts": {
    "build": "storybook build" // 스토리북 빌드 명령어 수정
    // ...
  },
  "dependencies": {
    "@repo/ui": "*" // packages/ui를 추가
    // ...
  }
}
```

### turbo.json 수정

`turbo.json`의 pipeline에 스토리북의 빌드 경로를 추가해줬다.

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [
        ".next/**",
        "!.next/cache/**",
        "dist/**",
        "storybook-static/**" // 스토리북 빌드 경로 추가
      ]
    }
    // ...
  }
}
```

## 스토리북 테스트 해보기

이제 잘 작동하는지 아래와 같이 코드를 작성해 보았다.

```ts
//apps/storybook/src/stories/Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@repo/ui/button';

const meta = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
  args: {
    children: 'Button',
    appName: 'Default',
  },
};
```

<img width="1267" alt="스크린샷 2024-01-11 오후 2 30 01" src="https://github.com/nostrss/next13-blog/assets/56717167/b8ab979f-0618-454a-8ea7-2d0c0b6a7e2f">

정상적으로 스토리북이 작동하는 것을 확인할 수 있었다.

컴포넌트를 만들때마다 스토리북을 통해 확인하면서 개발하면 좋을 것 같다.
