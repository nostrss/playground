---
title: Storybook 빌드 파일 Github Actions으로 자동 배포하기
description: github에 push만 하면 storybook이 자동으로 똭!!
date: 2023-11-30
tags: nextjs storybook github-actions build deploy
---

최근 포트폴리오용 서비스가 하나 생각나서 개발 환경을 구축중 이었다.

예전에는 로컬 터미널에서 내가 직접 빌드하고 배포하는 명령어를 실행해줘야 했었는데,

이번에는 `github actions`을 이용해서 자동으로 빌드하고 배포되는 환경을 구축해보았다.

## 준비

### storybook-deployer 설치

먼저 아래 패키지를 설치해준다.

[📌 npm @storybook/storybook-deployer 보러가기 📌](https://www.npmjs.com/package/@storybook/storybook-deployer)

### package.json 스크립트 추가

그리고 package.json에 아래와 같이 스크립트를 추가해준다.

```json
{
  "scripts": {
    "deploy-storybook": "storybook-to-ghpages"
  }
}
```

### github personal access token 발급

[📌 github personal access token 발급 보러가기 📌](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

github actions에서 github에 접근하기 위해서는 `token`이 필요하다.

<img width="1136" alt="스크린샷 2023-11-30 오후 5 05 59" src="https://github.com/nostrss/next13-blog/assets/56717167/0f7fac51-4339-4885-97e9-3ddb3a991ce8">

`github developer setting`에서 발급 받을 수 있다.

### Secrets and variables에 token 추가

그리고 해당 프로젝트 `repository`의 `Settings` -> `Secrets and variables` 에서 발급 받은 token을 추가해준다.

<img width="1136" alt="스크린샷 2023-11-30 오후 5 08 12" src="https://github.com/nostrss/fetchapi/assets/56717167/b2b8b92e-809f-48d6-8d92-ddf05de6896b">

### github actions workflow 파일 추가

나는 아래와 같이 작성을 했다.

처음에는 몇번 build, deploy에서 실패했었으나

log를 확인해보면서 진행하니 성공적으로 빌드, 배포가 되었다.

```yml
name: Build and Deploy Storybook

on:
  push:
    branches:
      - main

jobs:
  storybook-build-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build-deploy Storybook
        run: npm run deploy-storybook -- --ci
        env:
          GH_TOKEN: ${{ github.actor }}:${{ secrets.ACCESS_TOKEN }}
```
