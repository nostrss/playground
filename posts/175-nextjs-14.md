---
title: 아니 벌써 Next.js 14가 나왔다고?
description: Vercel님들 너무 열심히 하시는 거 아니오? 천천히 좀 합시다.
date: 2023-10-27
tags: nextjs react vercel
---

![twitter-card](https://github.com/nostrss/next13-blog/assets/56717167/1574a313-a414-4cba-a34e-469ce0044319)

Vercel에서 Next.js 14가 나왔다고 한다.

[📌 Next.js 14 공식 블로그 📌](https://nextjs.org/blog/next-14)
[📌 Next.js 14 Conf 보러가기 📌](https://nextjs.org/conf)

정말 너무 빠른 속도로 새로운 버전들이 쏟아 지는 것 같다. 이제 13버전이 나온지 얼마 안된 것 같은데 벌써 14버전이 나왔다니...

어쨌든 `Next.js 14`는 무엇이 달라졌는지 알아보자.

위의 블로그를 살펴보면 `4가지` 주요 업데이트가 있다고 한다.

- Turbopack
- Server Actions
- Partial Prerendering(preview)
- Next.js Learn

## Turbopack

[📌 Next.js 14 Turbopack 공식 문서 보러가기 📌](https://nextjs.org/blog/next-14#nextjs-compiler-turbocharged)

공식문서를 번역기로 돌려서 확인해봤다.

> Next.js 13부터 우리는 페이지와 앱 라우터 모두에서 Next.js의 로컬 개발 성능을 개선하기 위해 노력해 왔습니다.

> next dev이전에는 이러한 노력을 지원하기 위해 Next.js의 다른 부분을 다시 작성했습니다 . 이후 우리는 접근 방식을 좀 더 점진적으로 변경했습니다. 이는 우리가 먼저 모든 Next.js 기능을 지원하는 데 다시 집중했기 때문에 Rust 기반 컴파일러가 곧 안정성에 도달할 것임을 의미합니다.

> next dev이제 Turbopack을 통해 5,000개의 통합 테스트를 통과했습니다., 우리의 기본 Rust 엔진입니다. 이 테스트에는 7년간의 버그 수정 및 재현이 포함됩니다.

> vercel.com대규모 Next.js 애플리케이션을 테스트하는 동안 우리는 다음을 확인했습니다.

> - 최대 53.3% 더 빠른 로컬 서버 시작
> - 빠른 새로 고침으로 최대 94.7% 더 빠른 코드 업데이트

> 이 벤치마크는 대규모 애플리케이션(및 대규모 모듈 그래프)에서 기대할 수 있는 성능 향상의 실제 결과입니다. 현재 테스트의 90%가 next dev통과되었으므로 next dev --turbo.

> 테스트를 100% 통과하면 향후 마이너 릴리스에서 Turbopack을 안정 버전으로 이동할 예정입니다. 또한 사용자 정의 구성 및 생태계 플러그인을 위해 webpack 사용을 계속 지원할 예정입니다.

## Server Actions

Next.js 13 에서 소개 된 `Server Actions` 의 안정화 단계에 들어갔다.

그리고 14 버전에서는 아래과 같은 변화가 있다.

- 통합된 캐싱 및 재검증
- 간단한 함수 호출 또는 기본적으로 form에서 작동

2번째 기능은 새로 추가된 것 같은데 `form` 태그를 사용할 떄 처리방식에서 변화가 있는 것으로 예상된다.

## Partial Prerendering(preview)

[📌 Next.js 14 Partial Prerendering 공식 문서 보러가기 📌](https://nextjs.org/blog/next-14#partial-prerendering-preview)

이번에도 번역기로 간단히 살펴보았다.

> 우리는 Next.js를 위해 작업 중인 부분 사전 렌더링(빠른 초기 정적 응답을 갖춘 동적 콘텐츠에 대한 컴파일러 최적화)의 미리 보기를 공유하고 싶습니다.

> 부분 사전 렌더링은 서버 측 렌더링(SSR), 정적 사이트 생성(SSG) 및 증분 정적 재검증(ISR)에 대한 10년 간의 연구 개발을 기반으로 구축되었습니다.

> 동기 부여
> 우리는 귀하의 의견을 들었습니다. 현재 고려해야 할 런타임, 구성 옵션 및 렌더링 방법이 너무 많습니다. 귀하는 정적 속도와 안정성을 원하면서도 완전히 동적이고 개인화된 응답을 지원하기를 원합니다.

> 전 세계적으로 뛰어난 성능 과 개인화 기능을 갖추려면 복잡성이 희생되어서는 안 됩니다.

> 우리의 과제는 개발자가 배울 수 있는 새로운 API를 도입하지 않고 기존 모델을 단순화하여 더 나은 개발자 환경을 만드는 것이었습니다. 서버 측 콘텐츠의 부분 캐싱이 존재했지만 이러한 접근 방식은 여전히 ​​우리가 목표로 하는 개발자 경험과 구성 가능성 목표를 충족해야 합니다.

> 부분 사전 렌더링에는 학습하는 데 새로운 API가 필요하지 않습니다.

`Partial Prerendering`의 경우 `React` `Suspend`를 기반으로 구현된 것 같은데 아직은 개발중인 것으로 보여서, 실제로 사용하려면 조금 더 기다려야 할 것 같다.

## Next.js Learn

[📌 Next.js learn 페이지 바로가기 📌](https://nextjs.org/learn)

공식 홈페이지에 Next.js를 배울 수 있는 페이지가 생겼다.

> 내가 보기엔 Next 12에서 13으로 넘어갈 때 만큼의 큰 변화는 없는 것 같다. 이번 업데이트는 Next.js를 사용하고 있는 개발자에게 더 좋은 성능과 개발경험을 제공하려는 업데이트 인 것 같다.
