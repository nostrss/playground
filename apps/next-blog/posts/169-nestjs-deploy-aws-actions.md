---
title: Nest.js + docker + AWS + Github Actions를 이용한 배포 자동화
description: 이제 백엔드도 배포를 해보자
date: 2023-10-03
tags: nestjs docker aws github-actions
---

최근 Nest.js를 공부하면서 AWS에 배포를 하면서 Docker를 다룰 수 있는 기회가 있었고, Github Actions를 이용한 배포 자동화도 해보았다.

강의를 따라서 진행했었지만, 나혼자 직접 배포를 하는 연습도 해볼겸 정리해보려고 한다.

[📌 깃허브 레파지토리 바로가기 📌](https://github.com/nostrss/nestjs-study)

## Nest.js 프로젝트 생성하기

배포할 Nest.js 프로젝트를 하나 생성해서 준비하자.

[📌 Nest.js 공식문서 바로가기 📌](https://docs.nestjs.com/first-steps)

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

이번엔 배포에 중점을 둘 것이기 때문에 일단 간단히 프로젝트만 생성하고 별도의 추가 코드는 작성하지 않았다.

프로젝트를 생성하면 github 레파지토리와 연결하여 push 해두자.

## Dockerfile 작성하기

위에서 생성한 프로젝트의 root위치에 아래와 같이 Dockerfile을 작성했다.

```Dockerfile
FROM node:18.14.2 AS builder
RUN mkdir -p /app
WORKDIR /app
ADD . .

RUN npm install
RUN npm run build

CMD npm run start:prod
```

각 명령어에 대해서도 설명을 하고 싶지만 오늘은 배포 자동화를 기록으로 남기기 위함이니 간단히만 설명하고 넘어가야 할 것 같다.

그리고 추가로 .dockerignore 파일도 작성해줬다.

```
node_module/
dist/
```

## github 토큰 생성하기(Classic)

github에 접속해서 Personal access tokens를 생성한다.

[📌 github token 발행하기 바로가기 📌](https://github.com/settings/tokens)

<img width="1141" alt="스크린샷 2023-10-04 오전 12 39 14" src="https://github.com/nostrss/next13-blog/assets/56717167/40cf2720-f0c8-4e63-b439-f1d07d79a8f9">

- Note는 개인이 식별할 수 있도록 작성하면 될 듯하고, 하단의 권한은 이미지와 같이 repo, workflow, write:packages, read:packages를 선택해줬다.

  > 그리고 생성된 토큰은 별도로 복사해두자.

### github token을 Secrets에 등록하기

이제 위에서 생성한 github token을 Nest.js 프로젝트의 Secrets에 등록해줘야 한다.

Nest.js 깃허브 레파지토리로 이동하자.

그리고 settings -> Secrets and variables --> Actions로 이동한다.

<img width="1141" alt="스크린샷 2023-10-04 오전 12 45 18" src="https://github.com/nostrss/next13-blog/assets/56717167/eb0bb9ba-2fc8-4a23-9290-165b6bac8189">

그리고 New repository secret을 클릭해서 등록을 진행하자.

나 같은 경우 Name은 GHCR_TOKEN로 작성했고, Secret에는 위에서 생성한 github token을 넣어줬다.

## AWS EC2 인스턴스 생성하기

비용은 최대한 아끼는 것이 좋으니 무료 free-tier 계정으로 생성하였다.

인스턴스 생성은 아래와 같이 진행하였다.

<img width="758" alt="스크린샷 2023-10-04 오전 8 50 11" src="https://github.com/nostrss/next13-blog/assets/56717167/98e2f2ec-cede-480d-89c8-46aabbf52a6d">

> 키-페어 생성

키-페어를 생성하면 마치 공인인증서와 같이 생긴 .pem 파일이 자동으로 다운로드 된다. 이 파일은 나중에 ssh 접속할 때 필요하니 잘 보관해두자.

<img width="623" alt="스크린샷 2023-10-04 오전 8 54 16" src="https://github.com/nostrss/next13-blog/assets/56717167/405d278c-b277-4d6b-9fcc-7280ac11c77b">

> 네트워크 설정, 스토리지(볼륨)

free-tier 계정으로 생성하면 30GB까지 무료로 사용할 수 있다. 이왕 쓰는거 최대한 다 쓰도록 설정해봤다.

<img width="738" alt="스크린샷 2023-10-04 오전 8 57 08" src="https://github.com/nostrss/next13-blog/assets/56717167/73d7979d-71e2-4ec1-90cd-346d575bbb5c">

인스턴스 시작 버튼을 누르고 잠시 기다리면 인스턴스가 생성된다.

### AWS 인스턴스에 ssh 접속하기

이제 내가 만든 인스턴스 우분투 서버에 접속을 해보자.

터미널을 열고 아래와 같이 명령어를 입력한다.

```bash
$ ssh -i {키-페어 파일 경로.pem} ubuntu@{인스턴스 퍼블릭 IP}
```

<img width="771" alt="스크린샷 2023-10-04 오전 9 03 11" src="https://github.com/nostrss/next13-blog/assets/56717167/65ea1f54-76a5-40ec-aefb-89feb786cc24">

이때 만약 bad permissions 에러가 발생한다면 아래와 같이 명령어를 입력해주고 위의 명령어를 다시 입력해주면 된다.

```bash
$ chmod 400 {키-페어 파일 경로.pem}
```

아래와 같이 접속이 성공하면 성공이다.

<img width="771" alt="스크린샷 2023-10-04 오전 9 06 29" src="https://github.com/nostrss/next13-blog/assets/56717167/73ec5e98-ab48-47b1-9d32-c8758772aa0f">

### AWS 인스턴스에 docker 설치하기

이제 Ubuntu 인스턴스에 docker를 설치해줄 차례이다.

[📌 우분투에 도커 설치하기 공식 문서 바로가기 📌](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

위 문서를 참고하여 아래와 같이 명령어를 입력해준다.

<img width="917" alt="스크린샷 2023-10-04 오전 9 13 55" src="https://github.com/nostrss/next13-blog/assets/56717167/ed6c8576-11c3-44ad-bb99-08a05db532b0">

### AWS 인스턴스에 github runner 설치하기

이제는 인스턴스에 github runner를 설치해줘야 한다.

이를 위해 잠시 아까 생성한 nest.js 깃허브 레파지토리로 다시 이동하자.

<img width="1145" alt="스크린샷 2023-10-04 오전 9 17 12" src="https://github.com/nostrss/next13-blog/assets/56717167/c2c02a3f-011f-4990-83da-cb538a4ad113">

> settings -> Actions -> Runners -> New self-hosted runner 버튼 클릭

그러면 아래와 같이 우분투에 github runner를 설치 할 수 있도록 아래와 같이 명령어들을 설명해준다.

<img width="1145" alt="스크린샷 2023-10-04 오전 9 17 55" src="https://github.com/nostrss/next13-blog/assets/56717167/0780c70e-7823-4fe9-99c0-9585cbf51ff6">

- 인스턴스에 OS로 우분투를 설치했으니 Linus를 선택해주자.
- 그리고 인스턴스 생성시 x64 아키텍쳐로 진행했으니 x64를 선택해주자.
- 설치 명령어는 붉은색 박스의 명령어 까지만 복사해서 터미널에 입력해주었다.
- 그리고 ./run.sh 명령어 대신 나는 백그라운드에서도 계속 실행되도록 아래와 같은 명령어를 입력해줬다.

```bash
 nohup ./run.sh &
```

## github Actions 작성하기

이제 github Actions를 작성해보자.

소스코드에 .github/workflows 폴더를 생성하고 아래와 같이 main.yml 파일을 생성해준다.

그리고 링크와 같이 yml 파일을 작성해 주었다.

[📌 build & deploy yml 파일 바로가기 📌](https://github.com/nostrss/nestjs-study/blob/main/.github/workflows/main.yml)

> 자 이제 모든 준비가 끝났다!

## 배포하기

이제 Nest.js 소스코드가 github에 푸쉬 되기만 하면 알아서 빌드, 배포가 되어야 한다. 테스트를 해보자.

Nest,js 소스코드를 깃허브에 푸쉬를 해보자.

그리고 프로젝트 레파지토릭에서 Actions 탭으로 이동하면 아래와 같이 빌드가 진행되는 것을 확인 할 수 있다.

<img width="1237" alt="스크린샷 2023-10-04 오전 9 33 21" src="https://github.com/nostrss/next13-blog/assets/56717167/d4350371-a5f5-44ab-abf1-cc2ea0f5f596">

나의 경우 최초에 테스트할 때 실패를 했고 2번째에는 성공을 했다. workflow를 클릭해서 확인해보자.

단계별로 workflow가 어떻게 실행되고 있는지 확인 할 수 있다.

<img width="1237" alt="스크린샷 2023-10-04 오전 9 33 35" src="https://github.com/nostrss/next13-blog/assets/56717167/fef9b67c-2e05-48b5-996c-25fbe3f60e61">

약 2분정도 시간이 걸렸다. 이제는 브라우저에서 배포 결과물을 확인해보자.

<img width="455" alt="스크린샷 2023-10-04 오전 9 37 18" src="https://github.com/nostrss/next13-blog/assets/56717167/77b49520-ed29-4c85-ad4d-465a4d3db0c1">

> 성공이다!!

좀 전에 인스턴스에 연결해둔 ssh 접속을 통해서도 확인해보자.

<img width="971" alt="스크린샷 2023-10-04 오전 9 39 04" src="https://github.com/nostrss/next13-blog/assets/56717167/67e9d534-8968-4344-853c-8eddd7477d59">

도커가 정상적으로 실행되고 있음을 확인 할 수 있었다. 앞으로는 이제 Nest.js 소스코드를 푸쉬만 하면 자동으로 빌드, 배포가 될 것이다!!.
