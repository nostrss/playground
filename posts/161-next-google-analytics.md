---
title: Next.js 13 App router에 Google Analytics 적용하기
description: 아직 Next13에 Google Analytics를 적용한 경우가 없는지 자료가 부실했다. 그래서 직접 정리한 내용
date: 2023-09-08
tags: next google-analytics app-router layout
---

개인 블로그 작업이 거의 마무리 단계가 되어가고 있다. 그리고 오늘은 `Google Analytics`를 적용해보려고 한다.

적용 방법은 링크를 따라 가면 자세하게 설명이 되어 있어서 따라하면 된다.

[📌 사이트에 애널리틱스 사용하기 📌](https://support.google.com/sites/answer/97459?hl=ko)

다만 `Next`에 직접 적용하는데 살짝 어려움이 있었다.

일단, 위의 링크를 따라하면 아래와 같은 `script`를 구글에서 알려준다.

```html
<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-xxxxxxxxx"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', 'G-xxxxxxxxx');
</script>
```

위의 코드를 이제 `Next` `head`에 적용하기만 하면 끝이다.

모든 페이지에서 위의 스크립트가 호출되어야 하므로 일단 나는 `RootLayout`에 적용하기로 마음 먹었다.

아래는 내가 작성 및 적용한 코드이다.

먼저 위의 코드를 포함한 `Client` 컴포넌트를 하나 만들었다.

```tsx
// Analytics.tsx
'use client';

import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`window.dataLayer = window.dataLayer || []; 
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
      </Script>
    </>
  );
}
```

그리고 `RootLayout`에는 아래와 같이 적용했다.

```tsx
//layout.tsx
export default function RootLayout({ children }: IPropsChildren) {
  return (
    <html lang='kr'>
      <Analytics />
      <QueryProviders>
        <body className={sans.className}>
          <Header menus={menus} />
          <div className='w-full flex flex-col items-center'>
            <section className='w-full max-w-[1192px] flex flex-row justify-center'>
              {children}
              <TagBox />
            </section>
          </div>
        </body>
      </QueryProviders>
    </html>
  );
}
```

그리고 `head`에 정상적으로 스크립트가 심어졌는지 확인해보자

<img width="614" alt="스크린샷 2023-09-13 오후 10 33 44" src="https://github.com/nostrss/next13-blog/assets/56717167/c3d3f794-6489-4aee-b51a-5625aa65c6a0">

> 정상!!

이제 배포 후 구글애널리틱스와 통신이 되면 끝나게 된다.

<img width="614" alt="스크린샷 2023-09-13 오후 10 36 31" src="https://github.com/nostrss/next13-blog/assets/56717167/61f28805-b367-4beb-9e9f-1a4b3e1ca8a6">

모든게 정상적으로 작동하는 것을 확인할 수 있다.

이제 구글애널리틱스가 내 블로그로 접속하는 유저들의 통계를 수집해 줄 것이다.
