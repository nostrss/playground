---
title: [정리] 렌더링의 종류와 용어 정리
description: 렌더링 사전이 필요해..
tags: rendering csr isr ssg ssr
date: 2023-07-10
---

# 렌더링의 종류와 용어 정리

현업에서 CSR만 사용해봐서 다른 렌더링 방식에 대해서 알아보다가 용어 정리가 좀 필요한 것 같아서 정리해봤다.

## CSR : client side rendering

- 렌더링의 주체 : Browser
- 렌더링의 과정
  - 빈 HTML 파일을 받아온다
  - JS 파일을 받아온다
  - JS 파일을 실행한다
  - 데이터를 받아온다
  - DOM Tree를 만든다
  - HTML을 렌더링한다

### 장점

- 한번만 로딩(HTML, JS)이 되면 이후에는 빠르게 렌더링이 가능하다
- 서버의 부하가 적다
- 변경되는 일부분만 렌더링이 가능하다

### 단점

- TTV, FCP 시간이 길다.

  > TTV : time to view, 유저가 화면을 볼때까지의 시간
  > FCP : first contentful paint, 유저가 화면에 처음으로 무언가를 볼 수 있는 시간

- SEO 최적화가 어렵다.

## SSG : static site generation

- 렌더링의 과정 : 빌드할 때 HTML 파일을 렌더링하여 정적 사이트를 생성한다.

### 장점

- 페이지 로딩이 빠르다.
- SEO 최적화가 가능하다.

### 단점

- 데이터가 정적이고 실시간 데이터가 아니다.

## ISR : incremental static regeneration

- 렌더링 과정 - SSG 처럼 빌드 시 HTML 파일을 렌더링하여 정적 사이트를 생성한다. 그리고 정해진 주기에 따라 정적 사이트를 재생성한다.

### 장점

- SSG + 데이터가 업데이트 된다.
- SEO 최적화가 가능하다.

### 단점

- 하지만 실시간 데이터가 아니다.

## SSR : server side rendering

- 렌더링의 주체 : Server
- 렌더링의 과정
  - 유저의 요청을 받는다.
  - Server가 요청을 받아서 데이터를 받아온다.
  - Server가 HTML을 렌더링한다.
  - Server가 렌더링된 HTML을 유저에게 전달한다.

### 장점

- TTV, FCP 시간이 짧다.
- SEO 최적화가 가능하다.
- 실시간 데이터를 사용한다.

### 단점

- SSG, ISR과 비교했을 때 비교적 느릴 수 있다
- 서버의 부하(Overhead)가 크다.
