---
title: Nextjs 13에서 스토리북 사용하기(with tailwindcss)
description: 스토리북으로 UI 단위 컴포넌트를 문서화해보자
date: 2023-09-05
tags: nextjs app storybook tailwindcss
---

이번에 `nextjs 13`으로 개인 블로그를 만드려는데 때마침 `스토리북`이 생각나서 사용해보려고 했다.

## 스토리북(Storybook)이란?

내가 `스토리북`을 적용해보려고 한 건 아래와 같은 이유에서 였다.

> - UI 컴포넌트를 독립적인 환경에서 개발 및 확인 할 수 있다.
> - UI 컴포넌트를 쉽게 테스트 할 수 있다.
> - 자연스럽게 컴포넌트를 독립적으로 쪼개서 개발하게 된다.
> - UI 컴포넌트를 쉽게 문서화 할 수 있다.
> - 문서를 기획자,디자이너에게 쉽게 공유할 수 있다.

특히 예전에 기획을 할때 현재 운영중인 서비스의 UI를 한눈에 볼 수 있는 문서가 있으면 참 좋겠다는 생각을 했었다.

기획문서를 보면 되지만, 문서들이 관리가 되지 않는 경우가 많아 이를 파악하는데 시간이 많이 소요되는 경우가 많았다.

그리고 이제는 개발을 하다보니 컴포넌트의 단위에 대해 많은 고민을 하게 되었다.

그래서 `스토리북`을 사용해보려고 한다.

## 스토리북 설치

설치를 하기 전에 공식 문서를 살펴봤다. 그런데 스토리북에서 next에 대해 `zero-config support`를 제공한다고 한다는 문서를 보았다.

> [🔗 Integrate Next.js and Storybook automatically 바로가기 🔗](https://storybook.js.org/blog/integrate-nextjs-and-storybook-automatically/)

위의 문서를 참고로 하여 설치를 진행했다.

먼저 `app router`와 `tailwind`를 사용하는 next 프로젝트를 하나 생성해줬다.

그리고 아래 명령어로 스토리북을 설치해줬다.

```bash
npx storybook@next init
```

설치가 완료되자 마자 스토리북이 실행되면서 아래와 같은 화면을 볼 수 있었다.

<img width="1392" alt="스크린샷 2023-09-06 오후 12 23 43" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/640a469e-bf71-4e85-99a4-0fe0a47dac47">

## 스토리북 살펴보기

설치 후 vscode로 프로젝트를 살펴봤다.

<img width="1093" alt="스크린샷 2023-09-06 오후 12 36 50" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/ba4ddc9b-b6ca-42ce-8614-2cfa95d5457c">

- `.storybook` 이라는 폴더가 생기고, 그 안에 `main.js`와 `preview.js`가 생성되었다.
- `package.json`을 살펴보니 스크립트 명령어가 2개 생겼다.

```json
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
```

- `src/stories` 라는 폴더가 생기고 그안에 각 컴포넌트에 대한 스토리 파일이 생성되어 있었다.

### 스토리북 실행, 빌드하기

```bash
yarn storybook
// or npm run storybook
```

next 프로젝트를 실행할 때 처럼 스토리북도 위의 명령어로 실행을 해줘야 작성된 스토리북 페이지를 볼 수 있다. 기본 포트는 `6006`으로 되어 있다.

```bash
yarn build-storybook
// or npm run build-storybook
```

위의 빌드 명령어를 실행하면 `storybook-static`` 이라는 폴더가 생기면서 정적 파일이 생기는 것을 볼 수 있었다.

<img width="1392" alt="스크린샷 2023-09-06 오후 12 34 24" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/ce79cc31-d5df-44d8-b28a-40598617eed7">

## tailwindcss 적용하기

테스트로 아래와 같이 간단한 Textbox 컴포넌트를 생성해보았다.

```tsx
export default function Textbox() {
  return (
    <div className='w-full border border-red-700 '>
      <p className='text-lg font-bold'>Textbox 입니다.</p>
    </div>
  );
}
```

그런데 문제가 있었다. `tailwindcss`가 적용되지 않는 것 같았다.

<img width="1060" alt="스크린샷 2023-09-06 오후 12 46 11" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/acffa97b-98f9-4ea5-b70c-d4f0a7a50ba1">

### tailwindcss.config.js 파일 수정

`tailwind`가 적용될 경로에 `stories` 폴더가 없었다. 그래서 아래와 같이 수정해주었다.

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    // 수정 전
    // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/app/**/*.{js,ts,jsx,tsx,mdx}',

    // 수정 후
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
```

### preview.ts 파일 수정

그리고 `preview.ts` 파일에 `global css`를 `import` 해주었다.

```ts
import type { Preview } from '@storybook/react';

// css 파일을 import 해준다.
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
```

수정 후 아래와 같이 잘 적용된 것을 볼 수 있었다.

<img width="1060" alt="스크린샷 2023-09-06 오후 12 53 36" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/0a720adf-4343-49a4-8e8a-aa0423d1cd03">
