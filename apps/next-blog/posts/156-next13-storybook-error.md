---
title: [Error] Storybook, Cannot find module
description: 스토리북에서 Cannot find module 에러가 발생했을 때 해결 방법
date: 2023-09-06
tags: nextjs app storybook error tsconfig
---

외부에서 `상수`나 `컴포넌트`를 import 해왔을때 갑자기 `스토리북`에서 아래와 같은 에러가 발생했다.

<img width="1085" alt="스크린샷 2023-09-14 오후 6 26 27" src="https://github.com/nostrss/next13-blog/assets/56717167/039cad35-e10e-49b4-b158-b054bd2857de">

`Next`의 `Alias` 설정과 `스토리북`의 `웹팩` 경로 설정상의 문제로 보인다.

```json
// tsconfig.json
"paths": {
      "@/*": ["./src/*"]
    },
```

## 해결

검색을 해보니 관련한 이슈가 생각보다 많아 보였다.

그중에서 내가 지금 쓰고 있는 7버전의 스토리북과 관련된 이슈를 발견했다.
[🔗 스토리북 깃허브 이슈 바로가기 🔗](https://github.com/storybookjs/storybook/issues/21901)

next.js 최초 프로젝트 생성 시 `tsconfig`에 `baseurl`이 생성되지 않아서 밣생하는 것이 문제였던 것 같다.
아래와 같이 `baseurl`을 `tsconfig`에 추가해주니 해결되었다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    },
    // 추가
    "baseUrl": "."
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```
