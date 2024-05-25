---
title: Next.js SSR, SSG를 Vercel에 배포하기(3)
description: 배포가 가장 쉬웠어요 라고 할 뻔 했다.
tags: Next ssr ssg vercel deploy
date: 2023-03-11
---

[전체 소스코드](https://github.com/nostrss/next-render)

[DEMO](https://next-render-hjuyogs9h-nostrss.vercel.app/)

이제 소스코드를 `vercel`에 배포해 볼 차례이다.

먼저 지금까지의 소스코드를 Git-hub에 `Push` 해두도록 하자.

## Vercel 회원가입

[Vercel 바로가기](https://vercel.com/)

## Git-hub 계정 연결, Repository 연결하기

먼저 자신의 Git-Hub 계정을 연결,선택 해준다.

그러면 아래와 같이 Git-hub에 있는 나의 Repository들이 쭉 나오게 된다.

<img width="719" alt="스크린샷 2023-03-11 시간: 17 01 41" src="https://user-images.githubusercontent.com/56717167/224472922-42ca6284-e54d-49aa-bc65-a4994734769c.png">

그 중에 배포하고자 하는 Repository를 선택, import 해보자.

### Repository가 보이지 않는 경우

깃허브에서 Vercel Application 설정을 확인해보자

- Github > setting > applications > Configure

<img width="1130" alt="스크린샷 2023-03-11 시간: 17 10 45" src="https://user-images.githubusercontent.com/56717167/224473134-2e92f816-a6a7-4c3a-a6fc-1cab6946d03d.png">

나 같은 경우에는 여기서 `All Repositories`에 접근 가능하도록 허용하니 해결이 되었다.

<img width="817" alt="스크린샷 2023-03-11 시간: 17 12 12" src="https://user-images.githubusercontent.com/56717167/224473168-2ba0fee4-e912-47b0-9252-ee2aa1a792ea.png">

## Build & Deploy

위와 같이 설정을 하면 화면이 바뀌면서 자동으로 배포가 진행되기 시작한다.

배포가 완료되면 아래 사진과 같이 결과를 볼 수 있다.

<img width="1259" alt="스크린샷 2023-03-11 시간: 16 56 34" src="https://user-images.githubusercontent.com/56717167/224473392-592499ba-d9a2-4c01-a2c3-9474b31db0fe.png">

배포 결과를 볼수 있는 url, 연결된 branch 등을 확인 할 수 있다.

나 같은 경우에는 현재 main 브랜치를 연결해 두었다.

## 후속 배포

Vercel에 연결되어 있는 branch에 소스코드가 푸쉬되는 순간 vercel에서 자동으로 빌드하여 배포가 진행된다.

별도로 사용자가 npm run build 와 같은 명령어를 사용할 필요가 없다.

터미널에서 빌드 오류가 나듯 vercel에서도 빌드 오류가 발생 하면 배포가 진행되지 않으니, 코드를 push 하고 build와 배포가 끝까지 완료 되었는지 확인 할 필요가 있다.
