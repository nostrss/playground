---
title: [Turborepo] 모노레포에 Next.js에 테스트 환경 추가하기
description: 모노레포에 Jest를 이용한 테스팅 환경을 만들어보자
date: 2024-01-11
tags: turborepo monorepo  next jest testing 
---

이제 모노레포에 testing 환경을 구축해보려고 한다.

## 구축 실패 사례

처음에는 packages에 jest를 비롯한 테스트 환경을 구축하고, 각 프로젝트에서 의존성을 추가하여 진행하려고 했다.

그러나 테스트를 실행하면 test 파일을 찾지 못한다는 오류가 발생했다.

tsconfig와 설정을 여러가지 변경해보았지만 해결되지 않았다.

환경 구축에 너무 시간이 오래 걸리는 것 같아서 일단 각 Next.js 프로젝트 별로 테스트 환경을 구축하기로 했다.

## jest 설치하기

아래의 문서를 참고하여 진행하였다.

[📌 Setting up Jest with Next.js 📌](https://nextjs.org/docs/app/building-your-application/testing/jest)

```bash
cd front-admin
yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom

```

위의 명령어로 필요한 패키지를 설치해줬다. 뒤에 테스트 과정에서 몇몇 패키지가 추가로 필요할 수 있다.

### jest.config.ts 생성하기

```ts
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
```

### package.json 수정하기

```json
// apps/front-admin/package.json
{
  "scripts": {
    "test": "jest", // 추가
    "test:watch": "jest --watch" // 추가
    // ...
  }
}
```

### root package.json 수정하기

```json
//package.json
{
  "scripts": {
    "test": "turbo test", // 추가
    "test:watch": "turbo test:watch" // 추가
    // ...
  }
}
```

### turbo.json 수정하기

```json
{
  "pipeline": {
    // 추가
    "test": {
      "cache": false
    },
    "test:watch": {
      "cache": false
    }
    // ...
  }
}
```

## test 해보기

```js
// apps/front-admin/src/__test__/Text.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

describe('HomePage 컴포넌트', () => {
  it('"환영합니다!" 텍스트가 포함되어 있는지 확인한다', () => {
    render(<Home />);
    const linkElement = screen.getByText(/테스트/i);
    expect(linkElement).toBeInTheDocument();
  });
});
```

<img width="892" alt="스크린샷 2024-01-11 오후 2 54 33" src="https://github.com/nostrss/next13-blog/assets/56717167/19196e1d-74ec-409e-b783-1da351357aab">

테스트가 정상적으로 실행되는 것을 확인할 수 있다.
