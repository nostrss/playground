---
title: React PWA 만들기(1)
description: 대표님은 PWA가 하고 싶다고 하셨어.
tags: react pwa
date: 2023-03-04
---

## PWA란?

- Progressive Web Apps의 약자이다.
- html,css,javascript와 같은 웹기술로 만드는 App이라고 생각하면 된다. 마치 Web과 App의 경계사이에 있는 느낌이다.
- 바탕화면에 웹페이지를 즐겨찾기 해둔 것처럼 간단해 보이기도 하고, Web을 패키징한 하이브리드 앱처럼 보이기도 한다.
- 구글,MS에서는 PWA 사용과 보급에 적극적이지만 Apple은 이에 소극적이라고 한다.

### Register Store(?)

- 직접 해보지는 않았지만 이렇게 생성한 App을 이론적(?)으로 구글플레이 스토어와 애플 앱 스토어에 등록 할 수 있다고 한다.
- 검색을 해보니 구글은 사례가 많이 보였는데, 애플의 앱 스토어의 경우에는 찾을 수가 없었다. 애플은 심사통과가 되지 않을 수도 있을 것 같다.

### reference

[PWA-builder](https://www.pwabuilder.com/)

[Getting started with Progressive Web Apps](https://developer.chrome.com/blog/getting-started-pwa/)

### PWA 예시

스타벅스 홈페이지가 PWA가 적용이 되어있다.

[Starbucks 바로가기](https://app.starbucks.com/)

위의 링크를 타고 접속하면 주소창 우측에 다운로드 버튼이 있는데, 클릭하면 PWA가 다운로드 된다.
다운로드 된 PWA를 실행시키면 브라우저에서 실행되는 것이 아니라 마치 APP을 실행시킨듯한 화면이 나타난다.

<img width="1392" alt="스타벅스-pwa" src="https://user-images.githubusercontent.com/56717167/222894533-c992be4a-8da3-45a0-be71-aa91e5c142d7.png">

## REACT에 PWA 적용하기

### 1.React Set up

> npx create-react-app pwa

### 2.Install gh-pages and package.json setting

- git-hub pages에 배포해서 보기 위하여 gh-pages를 설치하여 간단히 배포를 위한 세팅을 했다.

> npm i gh-pages

- package.json에 배포 script 추가

```json
//package.json
...
"homepage": "http://nostrss.github.io/pwa", //추가
...
"predeploy": "npm run build", //추가
"deploy": "cp build/index.html build/404.html && gh-pages -d build" //추가
```

### 3.Add service-worker

아래 2개의 파일을 root 위치에 작성하여 추가해줬다.

- service-worker.js[(소스코드)](https://github.com/nostrss/pwa/blob/main/src/service-worker.js)
- serviceWorkerRegistration.js[(소스코드)](https://github.com/nostrss/pwa/blob/main/src/serviceWorkerRegistration.js)

그리고 index.js파일에 service-worker를 등록해주는 코드를 추가해줬다.

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 아래 코드 추가
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 아래 코드 추가
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

### 4.Deploy

> npm run deploy

- 배포 후 페이지에 접속해보면 아래와 같이 주소창 옆에 다운로드 버튼이 생기게 된다.

<img width="289" alt="pwa download" src="https://user-images.githubusercontent.com/56717167/222895638-511b912b-c209-493e-92e1-4d53d2cf4e99.png">

- 다운로드 후 실행 해보면 아까 본 스타벅스 PWA처럼 내가 만든 PWA가 실행되는 것을 볼 수 있다.

<img width="1066" alt="starbucks pwa" src="https://user-images.githubusercontent.com/56717167/222895749-75632375-a731-41fd-8fd6-7dff04e58b2a.png">

### 5. PWA Analyze

- 안드로이드, iOS앱에 배포 시 심사를 받듯이, PWA도 조건을 충분이 충족하는지 검사하는 방법이 몇가지 존재한다.

#### Lighthouse

- Chrome 개발자 도구 > Lighthouse 에서 직접 검사를 해볼 수 있다.
- 검사 후 어떤 점이 부족한지 결과와 어떻게 수정해야하는지 가이드도 볼 수 있다.

<img width="1274" alt="lighthouse" src="https://user-images.githubusercontent.com/56717167/222896054-0529dfc0-a03b-4d96-8867-951447b21cb9.png">

#### Pwa-builder

[PWA-builder](https://www.pwabuilder.com/)

- 링크에 접속하여, URL을 입력하면 아래와 같이 결과를 볼 수 있다.

<img width="1323" alt="pwa builder" src="https://user-images.githubusercontent.com/56717167/222896320-d0a2ca70-ebb5-4063-a405-7b32fba60390.png">

- 그리고 여기서 OS별(안드로이드,애플 등) 패키지를 다운로드 받을 수가 있다.
- 이 패키지를 어떤 추가적인 과정을 거쳐서 스토어에 등록할 수 있다고 한다.
- 실제 가능하다면, 어떤 서비스를 만들 때 초기에 Native App을 따로 만들지 않고 활용할 수 있을 듯하다.

<img width="674" alt="패키지 다운로드" src="https://user-images.githubusercontent.com/56717167/222896680-de633d40-341a-49e2-9c2c-aebed3a18722.png">

### ETC

- 나는 직접 service-worker를 생성했었는데, 알고보니 더 쉬운 방법이 있었다.
- 아래의 커맨드로 react template를 설치하면 더 쉽게 PWA를 적용할 수 있다.

JavaScript

> npx create-react-app my-app --template cra-template-pwa

TypeScript

> npx create-react-app my-app --template cra-template-pwa-typescript
