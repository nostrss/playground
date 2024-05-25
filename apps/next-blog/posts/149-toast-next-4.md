---
title: [NEXT] TOAST Editor Viewer 사용하기
description: 보여주기만 할 땐 Viewer를 사용하면 된다.
tags: nextjs react javascript typescript toast editor
date: 2023-08-25
---

> - [1.TOAST Editor에 사용하기](https://nostrss.github.io/2023-08-25/146-toast-next-1)
> - [2.TOAST Editor에 작성한 글정보 불러오기(useRef)](https://nostrss.github.io/2023-08-25/147-toast-next-2)
> - [3.TOAST Editor에서 이미지 업로드하기(hooks)](https://nostrss.github.io/2023-08-25/148-toast-next-3)
> - [4.TOAST Editor Viewer 사용하기](https://nostrss.github.io/2023-08-25/149-toast-next-4)
> - [5.TOAST Editor customHTMLSanitizer 사용하기](https://nostrss.github.io/2023-08-25/150-toast-next-5)

## TOAST Editor Viewer 사용하기

예전에 `React Quill`의 경우에는 `Viewer`를 따로 제공하지 않고, `readOnly` 속성을 통해 편집기와 뷰어를 구분하여 사용할 수 있었다.

하지만 `TOAST Editor`의 경우에는 아예 `Viewer`를 따로 제공하고 있었다.

문서에서는 찾지 못했는데, 타입에 아래와 같이 정의가 되어 있어서 사용해봤다.

```ts
export class Viewer extends Component<ViewerProps> {
  getInstance(): ToastuiEditorViewer;

  getRootElement(): HTMLElement;
}
```

이제 상세 페이지에 Viewer를 적용해보자.

```tsx
import { Viewer } from '@toast-ui/react-editor';

export default function EditorViewer({
  initialValue,
}: {
  initialValue: string;
}) {
  return <Viewer initialValue={initialValue} />;
}
```

상위 컴포넌트에서 `Props`로 `initialValue`에 컨텐츠 정보를 받아오고, 이것을 단순히 `Viewer`에 전달해주기만 하면 된다.

`Viewer`의 경우에도 `import`시 아래와 같이 `dynamic import`를 사용해야한다.

```tsx
const EditorViewer = dynamic(() => import('@/components/post/EditorViewer'), {
  ssr: false,
});
```

적용한 결과는 아래와 같다.

<img width="772" alt="스크린샷 2023-08-26 오후 6 28 23" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/bbef8fa5-73cf-492a-a01e-df5d5c3e8d46">
