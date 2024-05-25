---
title: 나만의 Boilerplate를 github template로 만들기
description: 한번 잘 만들어두면 계속 사용할 수 있는 boilerplate를 github template로 만들어보자.
tags: github template boilerplate
date: 2023-03-12
---

매번 새로운 프로젝트를 시작할 때 마다 똑같이 반복해서 작업하는 일이 있다.

```bash
// 설치하기..
npx create-react-app
npx create-next-app
npx eslint init
(등등등)

// 설정하기
package.json
tsconfig.json
.eslintrc.js
.gitignore
next.config.js
(등등등)
```

이렇게 setting 하는 것도 사실 한 번에 잘 되지 않으면 상당히 시간을 소모하는 작업이 되는 경우가 있다. (바로 오늘 내가 그랬다..)

그래서 나만의 boilerplate를 만들어서 git-hub에 템플릿으로 만들어두고 사용해보려고 한다.

## Boilerplate 준비하기

> boilerplate는 다른 프로젝트에서 재사용할 수 있는 코드와 파일들의 집합입니다. 예를 들어, React 프로젝트를 시작할 때마다 같은 파일들을 만들어야 한다면, 이 파일들을 boilerplate에 추가하여 다음에 프로젝트를 시작할 때 boilerplate를 사용하면 됩니다. 이렇게 boilerplate를 사용하면 새로운 프로젝트를 시작할 때 시간을 절약할 수 있습니다.

내가 만들 Boilerplate 내용은 아래와 같다

- Next.js
- typescript
- eslint : airbnb
- prettier

최소한의 세팅 내용이다.

css, 상태관리 라이브러리 등등은 상황을 보면서 추가할 예정이다.

준비가 된 코드는 github에 푸쉬해 두자.

[Boilerplate 소스코드 보러가기](https://github.com/nostrss/next-lint-airbnb)

## Github Template Repository 설정하기

- Repository > setting

<img width="896" alt="스크린샷 2023-03-12 오후 3 29 52" src="https://user-images.githubusercontent.com/56717167/224528416-52760c3d-5bbc-48b7-a621-5895b33d5645.png">

- Template Repository 체크박스 On

<img width="896" alt="스크린샷 2023-03-12 오후 3 31 51" src="https://user-images.githubusercontent.com/56717167/224528454-ee44b6d9-6130-4c74-b9a5-c00e8bf42405.png">

이게 끝이다. 앞으로 이 Repository를 Template로 바로 사용할 수 있다.

## Template 사용하기

새로운 Repository를 생성해보자.

그때 select box를 클릭 해보면, 방금 설정한 Template Repository가 옵션으로 나오게 된다.

<img width="896" alt="스크린샷 2023-03-12 오후 3 34 34" src="https://user-images.githubusercontent.com/56717167/224528579-56d922bb-ecbe-489e-bf96-05adf896b723.png">

옵션을 선택하고 Repository를 만들게 되면 똑같은 Repository가 생성이 되고 바로 이어서 추가 설정 및 작업을 시작 하면 된다.

## fork와의 차이점

Repolistory를 fork해서 그냥 사용하는 것과 차이가 없게 느껴질 수 있는데, 몇가지 다른 점이 있다.

- 새 포크에는 부모 리포지토리의 전체 커밋 기록이 포함되며 템플릿에서 만든 리포지토리는 단일 커밋으로 시작합니다.
- 포크에 대한 커밋은 기여 그래프에 표시되지 않지만 템플릿에서 만든 리포지토리에 대한 커밋은 기여 그래프에 표시됩니다.
- 포크는 템플릿에서 리포지토리를 만들면 새 프로젝트를 빠르게 시작하는 동시에 기존 프로젝트에 코드를 기여하는 임시 방법이 될 수 있습니다.

[자세한 내용보러가기](https://docs.github.com/ko/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
