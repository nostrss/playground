---
title: Next.js meatadata 적용하기
description: SEO 최적화를 위한 메타데이터 생성하기
date: 2023-09-10
tags: next markdown view
---

작성된 블로그를 다른 개발자들이 볼 수 있도록 하려면 SEO 최적화라는 작업을 해야한다.

대단한 건 아니고 구글같은 검색엔진에서 검색시 노출이 잘 될 수 있도록 웹사이트의 정보를 제공하는 것이다.

## NEXT에서의 메타데이터 삽입

[Next.js metadata 공식문서 바로가기](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)를 참고하여 작성했다.

Next에서는 메타데이터 추가를 위해 2가지 방법을 제공한다.

- Static Metadata
- Dynamic Metadata

하나씩 살펴 보도록 하겠다.

## Static Metadata

Static Metadata는 아래와 같이 `layout.js` 파일에 생성할 메타데이터 객체를 생성하면 된다.

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '...',
  description: '...',
};

export default function Page() {}
```

대신 이렇게 생성된 메타데이터는 정적 데이터로 변하지 않는다.

그래서 `dynamic router`를 사용한 페이지에서 계속 변하는 `title, description`을 메타데이터에 적용할 수 는 없다. 만약 동적으로 변하는 메타데이터를 적용하고 싶다면 `Dynamic Metadata`를 사용해야 한다.

## Dynamic Metadata

위에서 말한 것처럼 metadata에 계속 변하는 정보가 있다면, 아래처럼 `generateMetadata`함수를 사용해야 한다.

```tsx
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  };
}

export default function Page({ params, searchParams }: Props) {}
```

각 페이지에 맞는 메타데이터 객체를 return 값으로 넘겨 주면된다.

이때 메타데이터 객체는 아래와 같은 형태로 구성되어 있다.

```ts
interface ResolvedMetadata extends DeprecatedMetadataFields {
  metadataBase: null | URL;
  title: null | AbsoluteTemplateString;
  description: null | string;
  applicationName: null | string;
  authors: null | Array<Author>;
  generator: null | string;
  keywords: null | Array<string>;
  referrer: null | ReferrerEnum;
  themeColor: null | ThemeColorDescriptor[];
  colorScheme: null | ColorSchemeEnum;
  viewport: null | string;
  creator: null | string;
  publisher: null | string;
  robots: null | ResolvedRobots;
  alternates: null | ResolvedAlternateURLs;
  icons: null | ResolvedIcons;
  openGraph: null | ResolvedOpenGraph;
  manifest: null | string | URL;
  twitter: null | ResolvedTwitterMetadata;
  verification: null | ResolvedVerification;
  appleWebApp: null | ResolvedAppleWebApp;
  formatDetection: null | FormatDetection;
  itunes: null | ItunesApp;
  abstract: null | string;
  appLinks: null | ResolvedAppLinks;
  archives: null | Array<string>;
  assets: null | Array<string>;
  bookmarks: null | Array<string>;
  category: null | string;
  classification: null | string;
  other:
    | null
    | ({
        [name: string]: string | number | Array<string | number>;
      } & DeprecatedMetadataFields);
}
```

상당히 많은 값을 지원하는데, 자세한 내용은 Next.js 공식문서를 참고하여 추가해주면 된다.

## 실제 적용 코드

### src/app/layout.tsx

```tsx
export const metadata: Metadata = {
  ...defaultMetaData,
};
```

### src/defaultMetaData.ts

```ts
import { Metadata } from 'next';
import {
  BASE_URL,
  DEFAULT_APP_NAME,
  DEFAULT_GENERATOR,
  DEFAULT_META_AUTHOR_NAME,
  DEFAULT_META_AUTHOR_URL,
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_KEYWORDS,
  DEFAULT_META_TITLE,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_REFERRER,
  LIGHT_MODE,
  RSS_ATOM_URL,
  RSS_JSON_URL,
  RSS_XML_URL,
} from './constant';

export const defaultMetaData: Metadata = {
  title: {
    template: `%s | ${DEFAULT_META_TITLE}`,
    default: DEFAULT_META_TITLE,
  },
  description: DEFAULT_META_DESCRIPTION,
  generator: DEFAULT_GENERATOR,
  applicationName: DEFAULT_APP_NAME,
  referrer: DEFAULT_REFERRER,
  keywords: DEFAULT_META_KEYWORDS,
  authors: {
    name: DEFAULT_META_AUTHOR_NAME,
    url: DEFAULT_META_AUTHOR_URL,
  },

  colorScheme: LIGHT_MODE,
  creator: DEFAULT_META_AUTHOR_NAME,
  publisher: DEFAULT_META_AUTHOR_NAME,
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    types: {
      'application/rss+xml': RSS_XML_URL,
      'application/atom+xml': RSS_ATOM_URL,
      'application/json': RSS_JSON_URL,
    },
  },
  openGraph: {
    title: `${DEFAULT_META_TITLE}`,
    description: `${DEFAULT_META_DESCRIPTION}`,
    url: BASE_URL,
    siteName: `${DEFAULT_APP_NAME}`,
    images: [
      {
        url: DEFAULT_OG_IMAGE_URL,
        width: 1500,
        height: 855,
      },
      {
        url: DEFAULT_OG_IMAGE_URL,
        width: 1500,
        height: 855,
        alt: DEFAULT_META_TITLE,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${DEFAULT_META_TITLE} | twitter`,
    description: `${DEFAULT_META_DESCRIPTION} | twitter`,
  },
};
```

### src/app/blog/[slug]/page.tsx

RootLayout과 다른 메타데이터가 필요한 정보만 객체로 return 해주면 된다.

```tsx
export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { data } = await API.fetchBlogDetail(slug);
  return {
    title: data.title,
    description: data.description || data.title,
    keywords: data.tags.split(' '),
    alternates: {
      canonical: `${BASE_URL}/${slug}`,
    },
    openGraph: {
      title: `${data.title}`,
      description: `${data.description || data.title}`,
      url: `${BASE_URL}/${slug}`,
      alternates: {
        canonical: `${BASE_URL}/${slug}`,
      },
      images: [
        {
          url:
            data.images?.length > 0 ? data.images[0].url : DEFAULT_OG_IMAGE_URL,
          width: 1550,
          height: 800,
        },
        {
          url:
            data.images?.length > 0 ? data.images[0].url : DEFAULT_OG_IMAGE_URL,
          width: 1550,
          height: 800,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title} | twitter_page`,
      description: `${data.description || data.title} | twitter_page`,
    },
  };
}
```

## 결과 확인

> 크롬 개발자 도구로 확인

<img width="383" alt="스크린샷 2023-09-15 오후 3 42 10" src="https://github.com/nostrss/next13-blog/assets/56717167/5365767d-3ac3-4a90-8b99-986fd33e8b7c">

> 카카오톡 og-image 확인

<img width="222" alt="스크린샷 2023-09-15 오후 3 40 43" src="https://github.com/nostrss/next13-blog/assets/56717167/e0c058e3-56b4-4f0c-9e2a-f1cb5135d166">

> 카카오톡 dynamic metadata og-image 확인

<img width="222" alt="스크린샷 2023-09-15 오후 3 41 01" src="https://github.com/nostrss/next13-blog/assets/56717167/b11035cc-f8be-4d0d-887b-b683ec5d8c7d">
