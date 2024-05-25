---
title: [Turborepo] 모노레포에 새로운 Next.js 프로젝트 추가하기
description: 모노레포에 내가 원하는 환경을 세팅해보자
date: 2024-01-10
tags: nextjs turborepo monorepo vercel deploy
---

## Monorepo 생성하기

이전 글과 동일하게 Turborepo를 사용해서 모노레포를 생성해주었다.

```bash
npx create-turbo@latest
```

위와 같이 모노레포를 생성하면 `apps` 워크스페이스에 `web`과 `docs`라는 next.js 프로젝트가 생성된다.

## Apps 워크스페이스에 Next.js 프로젝트 추가하기

신규 프로젝트를 추가한다고 가정하고 새로운 next.js 프로젝트를 `apps`워크스페이스에 추가해보자.

```bash
cd apps
npx create-next-app@latest front-admin
```

정상적으로 프로젝트가 생성되었다면 `apps` 워크스페이스에 `front-admin`이라는 디렉토리가 생성되었을 것이다.

그리고 몇가지 설정을 수정해주어야 한다.

### package.json 수정하기

- `turbo dev` 명령어 실행 시 `port`가 겹치지 않도록 `dev` 명령어에 포트를 추가해줬다.
- `packages/ui`에 공통으로 사용할 React 컴포넌트가 있다. 이를 사용하기 위해 `의존성`을 추가해줬다.
- `eslint`와 `typescript` 설정을 공통으로 사용하기 위해 `dev 의존성`을 추가해줬다.

```json
// apps/front-admin/package.json

{
  "scripts": {
    "dev": "next dev --port 3004" // 포트 추가
    // ...
  },
  "dependencies": {
    "@repo/ui": "*" // packages/ui를 추가
    // ...
  },
  "devDependencies": {
    "@repo/eslint-config": "*", // packages/eslint-config를 추가
    "@repo/typescript-config": "*" // packages/typescript-config를 추가
    // ...
  }
}
```

### tsconfig.json 수정하기

typescript 설정을 공통으로 사용하기 위해 `tsconfig.json`을 아래와 같이 수정해줬다.

```json
//apps/backend/tsconfig.json

{
  "extends": "@repo/typescript-config/nextjs.json", // 공통 설정 추가
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx",
    ".next/types/**/*.ts",
    ".env"
  ],
  "exclude": ["node_modules"]
}
```

### .eslintrc.js 수정하기

eslint 설정을 공통으로 사용하기 위해 `.eslintrc.js`를 아래와 같이 수정해줬다.

```js
//apps/front-admin/.eslintrc.js

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  ignorePatterns: ['**/*.test.js', '**/__tests__/**'],
};
```

## 실행하기

root 경로에서 `turbo dev` 명령어를 실행했을 때, 기존에 있던 web과 docs 프로젝트와 함께 front-admin 프로젝트도 정상적으로 실행되는 것을 확인할 수 있었다.
