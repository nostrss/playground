---
title: 프론트엔드가 로딩을 최적화 하는 방법
description: 압축, 캐싱 등을 이용해 최적화를 하는 방법에 대해서 알아보자
date: 2024-03-16
tags: loading optimization
---

어떤 웹페이지의 로딩 속도를 빠르게 하는 방법엔 어떤 것들이 있을까?

프론트 입장에서 고려해 볼 수 있는 방법들에 대해서 정리해봤다.

## 압축

### Gzip

- 서버에서 html, javascript, css 등을 압축해서 리소스를 받는 방법
- 단, 압축효과가 적은 이미지 컨텐츠나, 크기가 작은 컨덴츠는 encoding/decoding 부하가 더 걸리수 있으므로 주의가 필요하다.

### 이미지, 동영상 압축

- 리소스의 용량을 줄여 로딩시간을 단축
- WebP 또는 프로그레시브 JPEG과 같이 더 작은 파일의 크기로 더 높은 품질을 제공하는 형식 사용

## 캐싱

### CDN

- 정적파일을 여러 위치에 분산하여 둠으로서, 물리적으로 사용자에게 가까운 거리에서 빠른 속도로 컨텐츠를 전송할 수 있다.

### 브라우저 캐싱

- 자주 액세스하는 리소스를 사용자 브라우저 로컬에 만료날짜를 지정하여 저장
- 만료날짜 이전에 재접속하는 경우, 브라우저 캐쉬에 남아있는 리소스를 사용

### Preload

- tab, Carousel 메뉴 등의 경우 리소스를 미리 pre-load하여 브라우저 캐쉬에 저장

## 최적화

### 이미지 최적화

- 화면 size에 적절한 크기의 이미지 사용
  - srcset과 size 속성을 함께 사용
- CSS Image Sprites
  - 여러개의 이미지를 하나의 이미지로 합쳐서 관리하는 방법
  - 서버에 대한 이미지 요청 회수를 줄일 수 있다.
- 이미지 품질(quality) 조정하기

### Minify

- Javascript와 CSS의 불필요한 공백과 줄바꿈(white space)을 제거
- 변수와 함수명 압축

### HTTP 요청 최소화

- 여러 CSS파일을 병합
- Overfetching과 Underfetching 되지 않도록 backend와 협의

### ATF(Above-The-Fold)와 lazyloading

- 스크롤 없이 볼수 있는 영역을 먼저 렌더링 되도록 우선순위 설정

### 과도한 애니메이션 자제

- CSS 애니메이션이 Javascript 애니메이션 보다 빠른 경우가 많다
- reflow가 발생하는 애니메이션이 repaint 보다 부하가 많이 발생

### Font 최적화

- font 렌더링 최적화
  - font의 렌더링 과정
    - 브라우저가 HTML을 요청, 응답받은 HTML로 DOM 생성
    - 브라우저가 CSS를 요청, 응답받은 CSS로 CSSOM 생성
    - 브라우저는 CSS 응답 이후 Font요청
    - 브라우저는 Font의 응답을 기다리지 않고 렌더링 시작
      - 이때 Font가 준비되지 않을 경우 대체 font로 렌더링하거나 렌더링하지 않음
      - FOIT(Flash Of Invisible Text), FOUT(Flash Of Unstyled Text)
  - html파일의 link태그에 Preload 속성을 부여하여 리소스 대기열 우선순위를 높인다.
    - css 파일 요청과 동시에 font 요청이 이루어진다.
- Font 용량 최적화
  - WOFF2 폰트 우선 사용
    - 기존 WOFF보다 용량이 적으나 호환성이 낮음
  - 사용하지 않은 폰트 삭제
  - 서브셋 폰트 사용

## 그외

- 불필요한 라이브러리 삭제, 외부 스크립트 최소화
- 정적페이지의 경우 빌드 시 SSG 또는 ISR 활용
