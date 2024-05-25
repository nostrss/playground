---
title: Next.js 13 프로젝트 yarn berry로 전환하기
description: Next 프로젝트 인스톨 없이 클론받아 바로 써보기
date: 2023-09-04
tags: nextjs yarnberry migration
---

## 설치 환경 버전 정보

> node : 18.13.0

> yarn : 3.6.3

> next : 13.4.19

## next.js 프로젝트 생성

먼저 `next.js` 프로젝트를 생성하자.

일반적으로 가장 많이 설치하는 `npx create-next-app`을 사용하여 설치했다.

```bash
npx create-next-app@latest yarnberry-next13
```

<img width="727" alt="스크린샷 2023-09-04 오전 11 38 16" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/7ef88b1c-161d-4b6d-87e8-33e4d670c6fe">

## node_modules 삭제

설치가 완료되면 next.js 프로젝트를 `vscode`로 열어보자.

`yarnberry`를 사용하면 앞으로 `node_modules`를 사용하지 않게 되기 때문에, 기존에 설치된 `node_modules`를 삭제해줬다.

<img width="1392" alt="스크린샷 2023-09-04 오전 11 40 56" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/d9ddd389-4f1e-4030-952b-6f63f074bd49">

## yarnberry 버전으로 전환

이제 `yarn berry` 버전으로 전환해보자. 아래의 명령어를 실행해줬다.

```bash
yarn set version berry
```

위 커맨드를 실행하면 아래와 같이 실행되면서 `yarnberry` 버전으로 전환된다.

조금은 생소한 실행화면과 함께 아래와 같이 진행된다.

<img width="771" alt="스크린샷 2023-09-04 오전 11 45 30" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/7415fb32-01e7-4830-98c5-18304098c1b4">

## yarnberry 모드에서 패키지 재설치

자 이제 삭제한 패키지를 `yarnberry` 모드에서 재설치 해보자. 설치 명령어는 기존과 동일하다.

```bash
yarn install
```

<img width="771" alt="스크린샷 2023-09-04 오전 11 49 26" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/90370a8b-cddc-4633-8262-e562837313be">

설치가 완료되어 `vscode`를 다시 확인해봤다.

이제는 패키지를 설치하여도 `node_modules`가 생성되지 않는 것을 확인할 수 있었다.

그리고 생성된 `.yarn/cache` 폴더를 살펴봤다.

<img width="1392" alt="스크린샷 2023-09-04 오후 12 12 40" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/9058cfb3-e1be-49c7-a443-c85c89a07ab0">

패키지들이 압축파일로 저장되어 있는 것을 확인할 수 있었다.

기존에는 `node_modules` 폴더 용량이 커서 `github`에 푸쉬하지 않는것이 일반적이었다.

그렇기 때문에 공동작업자가 있을 경우, 소스코드를 받아서 실행하기 위해서는 패키지를 npm에서 재설치 해야했다.

그리고 만약 이 과정에서 npm 패키지에서 사라진 것이 있다면, 소스코드를 실행할 수 없는 상황이 발생할 수도 있었다.

_**하지만 `yarnberry` 모드에서 패키지들은 압축되어 용량이 작기 때문에, github에 설치된 패키지들을 함께 푸쉬한다고 한다. 이로서 공동작업자는 소스코드를 받아서 바로 실행할 수 있는 것이다.**_

## gitignore에 코드 추가

`yarnberry` 모드에 맞게 `gitignore`에 코드를 추가해줬다.

```
# yarn berry

.yarn/\*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
```

## typescript 설정

> 이 부분은 링크의 도움을 받아 진행했다.

> [🔗 리멤버 웹 서비스 좌충우돌 Yarn Berry 도입기 바로가기 🔗](https://blog.dramancompany.com/2023/02/%EB%A6%AC%EB%A9%A4%EB%B2%84-%EC%9B%B9-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%A2%8C%EC%B6%A9%EC%9A%B0%EB%8F%8C-yarn-berry-%EB%8F%84%EC%9E%85%EA%B8%B0/)

현재 상태에서 작성되어 있는 코드를 보면 `typescript` 에러가 발생하고 있었다.

<img width="1392" alt="스크린샷 2023-09-04 오전 11 53 27" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/a7fdb8fb-116f-4b11-ab08-97ea6b7403d6">

기존에 node_modules에서 모듈을 가져오던 방식이 아닌, yarnberry에서 모듈을 가져오는 방식으로 변경되었기 때문에 발생하는 에러이다.

```bash
yarn dlx @yarnpkg/sdks vscode
```

위의 커맨드를 실행하면 아래와 같이 vscode 오른쪽 하단에 얼럿이 뜬다.

<img width="1392" alt="스크린샷 2023-09-04 오전 11 56 06" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/e1a2ceda-30cc-4bca-8fb0-b2ccb63186db">

여기서 허용을 해줘도 되고 아래처럼 별도로 `타입스크립트 버전`을 설정해줘도 된다.

> 타입스크립트 버전 검색

<img width="1270" alt="스크린샷 2023-09-04 오전 11 57 59" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/89563e54-fb93-452e-8cec-77e071afb374">

> 타입스크립트 버전 선택

<img width="1295" alt="스크린샷 2023-09-04 오전 11 58 07" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/fd654e17-37ef-4ca1-9de9-e5e047c0e008">

## 테스트

### 개발모드 테스트 (yarn dev) : 성공

<img width="771" alt="스크린샷 2023-09-04 오후 12 24 16" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/9786c876-1c0b-40f1-8de0-1a5cf6bbd61b">

### 빌드 테스트 (yarn build) : 성공

<img width="771" alt="스크린샷 2023-09-04 오후 12 24 43" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/9322c76c-239c-488d-b20d-741c9fe67a4a">

### 공동 작업자 시점에서 테스트

먼저 생성한 프로젝트를 github에 푸쉬해 두었다.

> [🔗 yarnberry-next13 레파지토리 바로가기 🔗](https://github.com/nostrss/yarnberry-next13)

이제 공동작업자 입장에서 소스코드를 받아서 실행해보자.

위 레파지토리를 `git clone` 받고, `yarn dev`를 실행해봤다.

<img width="727" alt="스크린샷 2023-09-04 오후 12 34 31" src="https://github.com/nostrss/yarnberry-next13/assets/56717167/89cbf714-6fce-46cc-9eca-419c7019fd29">

터미널에서 정상적으로 실행이 되고 local:3000에서도 정상적으로 실행이 되는 것을 확인할 수 있었다.
