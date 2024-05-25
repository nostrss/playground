---
title: [Turborepo] 모노레포에 있는 2개의 Next.js 프로젝트를 Vercel에 각각 배포하기
description: Turborepo를 이용해 Monorepo를 생성하고 Vercel로 배포해보자
date: 2024-01-05
tags: nextjs turborepo monorepo vercel deploy
---

최근 프론트엔드에서 monorepo 구조를 많이 도입하는 것 같다.

예전에 멀티레포 형태로 서비스를 유지/보수 했던 경험이 있었는데,

그때 여러가지 문제점을 겪었었다. 그때 느낀 점은 아래와 같다.

- 공통으로 사용하는 컴포넌트를 공유하기 어려웠다. 그래서 각 프로젝트마다 중복되는 컴포넌트를 만들어야 했다.
- 패키지 버전 관리가 어려웠다. 각 프로젝트마다 패키지 버전이 달라지면서 다양한 오류가 발생하고, 버전에 따라 달라진 문법을 사용해야 하는 경우가 생겼다. 특히 react의 버전이 달라지면서 발생하는 문제가 많았다.
- 서비스의 기능이 추가 될 경우 Repo의 개수가 많아지게 된다. 그러다 보니 어느 순간 repo의 개수가 16개가 넘어가는 경우가 생겼고 이를 관리하기가 어려웠다.

최근 포트폴리오용 서비스가 하나 생각나서 개발 환경을 구축중 이었다.

예전에는 로컬 터미널에서 내가 직접 빌드하고 배포하는 명령어를 실행해줘야 했었는데,

이런 멀티레포의 단점을 극복하기 위해 최근에 사용하는 아키텍쳐가 `monorepo`이다.

## 모노레포란?

모노레포에 대한 개념은 인터넷에 좋은 글들이 있어서 링크로 대신하였다.

[📌 Naver D2 : 모던 프론트엔드 프로젝트 구성 기법 - 모노레포 개념 편 📌](https://d2.naver.com/helloworld/0923884)

[📌 화해 : 모노레포 적용부터 yarn berry까지 📌](https://blog.hwahae.co.kr/all/tech/11962)

[📌 그린랩스 : 모노레포 - 마이크로 아키텍처를 지향하며 📌](https://green-labs.github.io/monorepo-microfrontend)

## Turborepo

모노레포를 구축하기 위해 여러가지 방법이 있었는데, 나는 `turborepo`를 사용했다.

[📌 Turborepo 홈페이지 바로가기📌](https://turbo.build/repo)

터보레포를 선택한 이유는 Vercel에서 인수하고 직접 개발 중인 서비스라 Next.js와 Vercel과 잘 호환될 것 같아서 선택했다.

## 새로운 프로젝트 생성

[📌 Turborepo를 이용해 모노레포 생성하기📌](https://turbo.build/repo/docs/getting-started/create-new)

```bash
npx create-turbo@latest
```

위의 명령어를 실행하고 원하는 설정을 선택하면 모노레포가 생성된다.

생성된 모노레포의 구조를 살펴보면 아래와 같다.

- `apps`와 `packages`라는 2개의 워크스페이스를 가지고 있다.
- `apps` 워크스페이스에는 `web`,`docs`라는 이름의 2개의 `nextjs` 프로젝트가 생성되어 있다

<img width="284" alt="스크린샷 2024-01-06 오전 11 28 42" src="https://github.com/nostrss/next13-blog/assets/56717167/2124b874-9640-408f-be29-82c862813d0d">

## Vercel로 배포하기

이제 생성된 모노레포를 `Vercel`로 배포해보자.

그냥 무작정 배포하기 보다는 회사를 다닌다면 모노레포를 어떻게 사용하고 배포할지 생각해봤다.

예를 들면 docs는 회사의 기술 문서를 작성하는 곳이고, web은 회사의 서비스 프로젝트라고 생각을 해보자.

그렇다면 아마 docs는 `docs.도메인.com`, web은 `web.도메인.com`으로 배포를 할 것이다.

이렇게 배포를 하고 싶었다.

그래서 Vercel에 깃허브 repo를 등록하였다.

<img width="632" alt="스크린샷 2024-01-06 오전 11 35 37" src="https://github.com/nostrss/next13-blog/assets/56717167/30a9c2bf-74f2-4889-b008-3631400733b6">

Vercel을 사용해본 사람은 알겠지만 위의 사진처럼 등록하면 나머지 과정은 거의 자동으로 진행되어 배포가 진행된다.

### 문제점 발견

배포가 완료되고 확인을 해봤는데, 문제가 발견되었다.

<img width="1246" alt="스크린샷 2024-01-06 오전 11 38 35" src="https://github.com/nostrss/next13-blog/assets/56717167/e4cb11f1-7339-4dc3-ad94-2e3c9bebdb2e">

`docs`는 정상적으로 배포가 되었지만, `web`은 배포가 되지 않았다.

Vercel에서 모노레포를 인식하고 2개의 Next.js 프로젝트를 인식하지 못한 것 같다.

그래서 setting에서 추가 설정을 해줘야 하는지 찾아보았다.

그런데 Root Directory가 `apps/docs`로 설정되어 있었다.

<img width="1330" alt="스크린샷 2024-01-06 오전 11 41 55" src="https://github.com/nostrss/next13-blog/assets/56717167/b4bccd51-cdf4-49b7-852a-91e1b4a2e0a9">

그렇다면 Vercel에 Root Directory가 `apps/web`로 설정된 배포단을 하나 더 만들면 되지 않을까? 라는 생각이 들었다.

## Vercel에 배포단 추가하기(Web)

새로운 프로젝트를 추가하여 위에서 등록한 동일한 github repo를 등록하였다.

그리고 그 과정에서 Root Directory를 `apps/web`로 설정하였다.

<img width="1242" alt="스크린샷 2024-01-06 오전 11 46 24" src="https://github.com/nostrss/next13-blog/assets/56717167/8e257a56-c3a2-41b5-820c-51384eb472ba">

그리고 배포가 완료하니 아래와 같이 2개의 배포단이 생성되었다.

<img width="817" alt="스크린샷 2024-01-06 오전 11 48 32" src="https://github.com/nostrss/next13-blog/assets/56717167/d5b194f7-40bb-4fe4-8130-7b2484ba39ad">

이제 각각의 배포단위에 도메인 설정을 해준다면

최초에 의도한대로 `docs.도메인.com`, `web.도메인.com`으로 배포가 가능할 것이다.
