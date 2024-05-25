---
title: Semantic Version(유의적 표현)이란?
description: 버저닝 관리와 package.json
date: 2024-03-10
tags: semantic-version 
---

## Semver란?

Semantic Version의 줄임말이다. 소프트웨어의 버전 형식에 의미를 부여하여, 체계적인 버저닝 관리가 되도록 하기 위한 제안이다.

package.json이나 App을 보다 보면, `1.0.1`, `2.8.2와` 같은 형식의 버전을 종종 볼 수가 있다.  

이렇게 버전을 표기할 때 보는 사람으로 하여금 버전의 변화만을 보고도 대략적으로 어떤 업데이트인지 알 수 있도록 규칙을 정리한 것이라고 할 수 있다.

> 즉, 버전이 변화할 때마다 올바른 의미를 버전에 부여하도록 하는 체계라고 볼 수 있다.

## Semver의 구조

Semver에서 버저닝 표기 형식은 아래와 같이 3개의 구조를 가지고 있다.

> [Major].[Minor].[Patch]

그리고 각 특징을 정리하면 아래와 같다.

### Major
-   0일 경우 초기 개발 중인 상태를 말한다.
-   1부터 공개 버전으로 정의합니다.
-   기존과 호환되지 않는 변화가 있을 때는 반드시 major 버전을 올려야 한다.
-   major 버전이 증가하면 `minor`, `patch`는 `0으로 초기화한다.`

### Minor
-   이전 버전과 호환되는 `기능`을 추가했을 때 올린다.
-   공개 API의 일부를 앞으로 `제거(deprecate)`로 표시한 경우에도 올린다
-   major 버전이 올라가는 경우 patch는 반드시 `0으로 초기화한다.`

### Patch
-   이전 버전과 호환되는 버그를 수정한 경우에만 올린다.

## Semver 구조의 확장
> [Major].[Minor].[Patch]-[Pre-release]+[Build Metadata]

위의 3개의 구조에 `Pre-release`,`Build Metadata`를 함께 표기 할 수 도 있다.

### Pre-release 버전

- patch 바로 뒤에 ‘-’를 붙이고 마침표(.)로 구분된 식별자를 더하여 표기 할 수 있다.
- 식별자는 반드시 아스키문자, 숫자, 붙임표로만 구성한다.

### Build Metadata

- patch 또는 pre-release 버전 뒤에 더하기(+) 기호를 붙여 표현할 수 있다.
- 식별자는 반드시 아스키문자, 숫자, 붙임표로만 구성한다.


여기까지 정리된 표기법을 예시로 정리하면 아래와 같다.

> 1.0.0-alpha+001
1.0.0+20130313144700
1.0.0-beta+exp.sha.5114f85

## 버전의 우선순위
Semver에서 우선 순위는 버전의 순서를 정렬할 때 서로를 어떻게 비교할 지를 나타낸다. 

- major > minor > patch 순으로 비교한다.
- 만약 major, minor, patch가 동일하고 pre-release 버전이 있는 경우와 없는 경우가 있다면  pre-release 버전이 있는 버전이 우선순위가 더 낮다.
- pre-relase간의 비교
    - 마침표(.)로 구분된 식별자를 차례로 비교한다.
    - 숫자로만 구성된 경우
        - 수의 크기로 비교한다.
    - 알파벳이나 붙임표가 포함된 경우
        - 아스키 문자열 정렬을 한다.
    - 숫자로만 구성된 경우는 알파벳이나 붙임표가 포함된 경우보다 무조건 우선순위가 낮다.
- build metadata는 우선순위에 영향을 주지 않는다.

위의 규칙대로 우선순위를 정리한 예시는 아래와 같다.
>1.0.0
1.0.0-rc.1
1.0.0-beta.11
1.0.0-beta.2
1.0.0-beta
1.0.0-alpha.beta
1.0.0-alpha.1
1.0.0-alpha

## package.json에서 Semver

그동안 package.json 파일을 보다 보면 버전 앞에 아래와 같이 `^`, `~` 표기가 되어 있던 것을 볼 수 있었다.
이 기호들의 의미는 무엇일까?

```json
	"react-icons": "^4.10.1",
    "react-markdown": "^8.0.7",
    "react-syntax-highlighter": "^15.5.0",
```

### 캐럿(^)

- x.y.z 중 x 이하 하위 호환성이 보장되는 범위내에서 버전 업데이트
- 같은 major 버전만 npm update 허용
- 단 공개버전이 아닌 경우(0.x)에는 patch만 증가

### 틸드(~)

- x.y.z 중  x.y 이하 버전만 하위 호환성 보장
- major, minor 버전은 고정되고 patch 버전이 달라진 경우 업데이트 허용

위의 규칙은 프로젝트의 패키지들을 관리하거나 업데이트할 때 중요하기 때문에 잘 알아둬야 할 것 같다.

모든 규칙을 다 외워둘 수는 없으니, 이러한 내용이 있다는 것을 알아두고 필요할 때 마다 챙겨 보면 좋을 듯 하다.

## Reference

[https://semver.org/lang/ko/](https://semver.org/lang/ko/)  
[https://semver.npmjs.com/](https://semver.npmjs.com/)