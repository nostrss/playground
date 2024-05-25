---
title: [Next] Image 컴포넌트를 이용한 반응형 이미지 만들기
description: layout props를 사용하지 않고 Image 컴포넌트를 이용하여 반응형 이미지를 만들어보자
date: 2024-01-18
tags: next react image responsive
---

Next.js에서는 Image 컴포넌트를 제공한다.

Image 컴포넌트는 일반적으로 쓰는 img 태그와 다르게 몇가지 장점이 있지만 사용하기에 어려움도 있다.

예전에는 layout props를 사용해 반응형 이미지 구현이 가능했었다.

그런데 얼마전에 변경된 내용을 모르고 layout props를 사용해 반응형 이미지를 구현하려고 하니 브라우저 콘솔에 경고가 떴다.

<img width="498" alt="스크린샷 2024-01-18 오전 11 59 02" src="https://github.com/nostrss/next13-blog/assets/56717167/d74d7f80-80af-4da3-907d-699f274d3d99">

경고의 링크를 확인해 보니 layout props가 13버전에서 deprecated 되었다고 한다.

[📌 next/image changed in version 13📌](https://nextjs.org/docs/messages/next-image-upgrade-to-13)

그래서 변경된 방법으로 이미지를 반응형으로 보여주는 방법을 알아보았다.

## 정적 이미지를 import 해서 사용하는 경우

public 폴더에 이미지를 넣고 import 해서 사용하는 경우가 되겠다.

이 경우에는 아래와 같이 이미지를 import 해서 사용하면 되는데 이때, Image 컴포넌트에 width와 height를 지정해주지 않아도 된다.

[📌 next/image response images 📌](https://nextjs.org/docs/app/api-reference/components/image#responsive-images)

```tsx
import Image from 'next/image';
import onerror from '../../../public/onerror.png'; // 정적 이미지를 import 해서 사용하는 경우

export default function Test() {
  return (
    <Image
      src={onerror}
      alt='Picture of the author'
      sizes='100vw'
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );
}
```

## 이미지가 동적이거나 외부에서 가져오는 경우

이런 경우가 대부분일 것 같다. 이 경우에는 위와는 조금 사용방법이 달라진다.

[📌 Responsive image with aspect ratio 📌](https://nextjs.org/docs/app/api-reference/components/image#responsive-image-with-aspect-ratio)

```tsx
import Image from 'next/image';

export default function Test() {
  return (
    <Image
      src='https://picsum.photos/id/28/4928/3264'
      alt='Picture of the author'
      sizes='100vw'
      style={{
        width: '100%',
        height: 'auto',
      }}
      width={500}
      height={300}
    />
  );
}
```

위와 같이 작성하게 되면 외부에서 가져온 이미지를 반응형으로 보여줄 수 있다.

다만 width와 height를 지정해주어야 한다.

### 만약 width와 height를 모른다면?

위와 같이 500, 300 으로 width와 height를 지정해주었는데 만약 이미지의 크기가 거꾸로 300, 500 이라면 어떻게 될까?

그래도 정상적으로 이미지를 보여지게 된다.

하지만 조금더 자세히 살펴보면

최초에 이미지 영역을 500, 300 으로 잡고 이미지를 로딩하고 나서 이미지의 크기에 맞게 이미지 영역을 조정하는 것을 볼 수 있다.

그래서 이미지의 용량이 크거나, Next 이미지의 placeholder에 blur를 지정해두었다면, 최초에는 설정한 width와 height에 맞게 placeholder가 보여지다가 이미지가 로딩되면서 이미지 영역이 조정되는 것을 볼 수 있다.

## 이미지의 크기를 모르는 경우 fill을 사용해보자

Next 공식문서에서는 이미지의 크기를 모르는 경우 fill을 사용하라고 한다.

[📌 next/image fill 📌](https://nextjs.org/docs/app/api-reference/components/image#responsive-image-with-fill)

fill을 사용한 경우의 코드는 아래와 같다.

```tsx
import Image from 'next/image';

export default function Test() {
  return (
    <div style={{ position: 'relative', width: '500px', height: '300px' }}>
      <Image
        src='https://picsum.photos/id/28/2000/3264'
        alt='Picture of the author'
        sizes='100px'
        fill
        style={{
          objectFit: 'contain', // 또는 objectFit: 'cover'
        }}
      />
    </div>
  );
}
```

주의 할 점은 fill을 사용할 경우 Image 태그에 position : absolute 속성이 자동으로 추가된다는 것이다.

<img width="612" alt="스크린샷 2024-01-18 오후 6 46 34" src="https://github.com/nostrss/next13-blog/assets/56717167/c0bd3d86-d060-4dd7-8397-b4f1a54bc698">

그래서 Image 태그를 감싸고 있는 부모 태그에 relative 속성을 추가해주어야 한다.
