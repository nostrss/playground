---
title: Next.js 13 react-markdown 적용하기
description: 이쁘게 만드는게 이렇게 어려운지 몰랐지...
date: 2023-09-09
tags: next markdown view
---

이제 블로그 본문의 상세페이지를 꾸밀 차례다.

마크다운 파일 컨텐츠를 바로 렌더링 할 경우 마크다운 문법이 적용이 되어 보이질 않는다.

그렇기 때문에 다른 패키지를 사용하여 보여줄 생각이다.

## react-markdown 적용하기

[react-markdown 바로가기](https://www.npmjs.com/package/react-markdown)

위의 패키지를 설치하고, 아래와 같이 사용하면 된다.

```tsx
'use client';
import ReactMarkdown from 'react-markdown';

xport default function MarkDownViewer({ content }: { content: string }) {
  return (
    <ReactMarkdown>{content}</ReactMarkdown>
  );
}
```

설치 후 이렇게 마크다운 정보를 `children`으로 넘겨주기만 하면 끝이다.

`npm` 페이지에서 `react`로 예시로는 `Props`로 넘겨주도록 되어 있었는데, 에러가 발생해서 위와 같이 `children`으로 넘겨주었다.

<img width="748" alt="스크린샷 2023-09-14 오후 4 02 13" src="https://github.com/nostrss/next13-blog/assets/56717167/b3f7cde5-8264-4fa7-b7eb-71b50582364c">

## remarkGfm 적용하기

그런데 결과물이 조금은 부족해보인다.

기존에 `github`에서 보던 마크다운과는 다소 다르게 보인다.

왜냐하면 우리가 github에서 보던 마크다운은 표준이 아니기 때문이다. `github`에서 보는 마크다운은 `github`에서 자체적으로 추가한 문법들이 추가되어 있다.

그렇기 때문에 평소 깃허브와 동일하게 보이게 하려면 별도의 `plugin`을 이용해야 한다.

이때 사용할 수 있는 플러그인으로 `remarkGfm`이 있다.

여기서 `GFM`은 `Github Flavored Markdown`의 약자이며 이에 해당하는 문법은 아래와 같다.

- autolink literals
- footnotes
- strikethrough
- tables
- tasklists.

[remarkGfm 바로가기](https://www.npmjs.com/package/remark-gfm)

`remarkGfm`을 `react-markdown`에 적용하는 방법은 아래와 같다.

```tsx
'use client';
import ReactMarkdown from 'react-markdown';

export default function MarkDownViewer({ content }: { content: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
}
```

위와 같이 추가하고 결과물을 확인해봤다.

<img width="748" alt="스크린샷 2023-09-14 오후 4 03 09" src="https://github.com/nostrss/next13-blog/assets/56717167/41348e67-7abc-4ce1-af38-6d8fbd103d1f">

약간의 변화가 있었지만, 여전히 부족해보인다.

## CSS 커스텀하기

조금 더 이쁘게 보이게 하기 위해 `syntax-highlighting`을 적용해서 코드블럭 CSS를 수정해볼 생각이다.

[react-syntax-highlighter 바로가기](https://www.npmjs.com/package/react-syntax-highlighter)

코드블럭은 `<code></code>` 태그이므로 아래와 같이 작성해줬다.

```tsx
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MarkDownViewer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={materialDark}
              language={match[1]}
              PreTag='article'
              showLineNumbers={true}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
```

`ReactMarkdown` 은 `components`라는 `props`를 받을 수 있는데, 이것을 통해 커스터마이징을 할 수 있다.

그리고 아래와 같이 코드블럭 부분이 이쁘게 변경된 것을 확인 할 수 있었다.

<img width="748" alt="스크린샷 2023-09-14 오후 4 16 13" src="https://github.com/nostrss/next13-blog/assets/56717167/ca8fa072-51e6-4158-9776-d1141d81da37">

이제 나머지 태그들도 커스터 마이징 해보자.

```tsx
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';

export default function MarkDownViewer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={materialDark}
              language={match[1]}
              PreTag='div'
              showLineNumbers={true}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        img: (image) => (
          <Image
            className='w-full h-auto object-cover'
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={500}
            placeholder='blur'
          />
        ),
        h1: ({ children, ...props }) => (
          <h1 className='prose text-2xl dark:text-white' {...props}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 className='prose text-xl dark:text-white' {...props}>
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 className='prose text-lg dark:text-white' {...props}>
            {children}
          </h3>
        ),
        p: ({ children, ...props }) => (
          <p className='prose dark:text-white' {...props}>
            {children}
          </p>
        ),
        li: ({ children, ...props }) => {
          const liProps = { ...props, ordered: 'false' };
          return (
            <li className='prose dark:text-white' {...liProps}>
              {children}
            </li>
          );
        },
        strong: ({ children, ...props }) => (
          <strong className='prose dark:text-white' {...props}>
            {children}
          </strong>
        ),
        a: ({ children, ...props }) => (
          <a className='prose dark:text-blue-300' {...props}>
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
```

<img width="748" alt="스크린샷 2023-09-14 오후 4 32 41" src="https://github.com/nostrss/next13-blog/assets/56717167/98f41453-e099-4c1b-baa4-83487b578348">

커스텀한 태그들이 수정되었다.

그런데 문제점이 있다. 내가 이미지 삽입을 위해 추가한 붉은 박스의 `html` 코드가 문자열로 그대로 노출되고 있다.

## rehypeRaw 적용하기

마크다운 컨텐츠에 담겨있는 `html`을 그대로 렌더링 하기 위해서는 또 다시 추가 작업을 해야한다.

여기서 정말 많은 검색과 시행착오를 겪었는데, 결론을 정리하면 `rehypeRaw` 이라는 플러그인을 설치하면 적용하면 된다.

> 그리고 7.0버전의 경우 오류가 발생했는데, 6.1.0 버전으로 다운그레이드 하니 정상적으로 작동했다.

[rehype-raw 바로가기](https://www.npmjs.com/package/rehype-raw/v/6.1.0)

적용방법은 아래와 같다.

```tsx
<ReactMarkdown
      className='prose max-w-none dark:text-white '
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
```

후.. 생각보다 어려웠다. 그래도 이제 마크다운 뷰어를 완성했다.

나머진 조금씩 수정해나가면 될 것 같다.
