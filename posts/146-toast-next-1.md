---
title: [NEXT] TOAST Editor 사용하기
description: 국산을 애용하자. 한국 에디더 Toast Editor를 사용해보자.
tags: nextjs react javascript typescript toast editor
date: 2023-08-25
---

> - [1.TOAST Editor에 사용하기](https://nostrss.github.io/2023-08-25/146-toast-next-1)
> - [2.TOAST Editor에 작성한 글정보 불러오기(useRef)](https://nostrss.github.io/2023-08-25/147-toast-next-2)
> - [3.TOAST Editor에서 이미지 업로드하기(hooks)](https://nostrss.github.io/2023-08-25/148-toast-next-3)
> - [4.TOAST Editor Viewer 사용하기](https://nostrss.github.io/2023-08-25/149-toast-next-4)
> - [5.TOAST Editor customHTMLSanitizer 사용하기](https://nostrss.github.io/2023-08-25/150-toast-next-5)

## 버전 정리

- `Next.js` : 13.4.10
  - `pages Router`를 사용하였다.
- `@toast-ui/editor` - 3.2.2
- `@toast-ui/react-editor` - 3.2.3

## 대략적인 폴더 구조

```
src
 ┣ components
 ┃ ┣ newpost
 ┃ ┃ ┗ PostEditor.tsx
 ┣ pages
 ┃ ┣ newpost
 ┃ ┃ ┗ index.tsx
 ┃ ┗ index.tsx
```

## 사용법 익히기

> [🔗 Toast Editor 소개 바로가기 🔗](https://ui.toast.com/tui-editor)

`Toast Editor`는 `NHN`이 만든 오픈소스 에디터이다.

그래서 한국에서 많이 사용하고, 검색 시에도 한국어 결과가 많이 나오는 편이었다.

나는 Next.js를 사용하고 있기 때문에 React 버전의 사용법을 찾아보았다.

> [🔗 @toast-ui/react-editor 깃허브 바로가기 🔗](https://github.com/nhn/tui.editor/tree/master/apps/react-editor#-usage)

위의 링크에서 소개한 사용법은 아래와 같았다.

```tsx
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

const MyComponent = () => (
  <Editor
    initialValue='hello react editor world!'
    previewStyle='vertical'
    height='600px'
    initialEditType='markdown'
    useCommandShortcut={true}
  />
);
```

위와 같이 `Editor`를 `import`하고 컴포넌트에 필요한 props를 전달해 주면 된다.

그렇다면 `Editor`컴포넌트는 어떤 `props`를 가지고 있을까?

## Editor 컴포넌트 살펴보기

```ts
// node_modules/@toast-ui/react-editor/index.d.ts
export class Editor extends Component<EditorProps> {
  getInstance(): ToastuiEditor;

  getRootElement(): HTMLElement;
}
```

`Editor` 컴포넌트는 `Component<EditorProps>`타입을 상속받고 `getInstance`와 `getRootElement`라는 메서드를 가지고 있었다.

`props`를 알아보기 위해서 이번엔 상속받은 `EditorProps`를 살펴보았다.

```ts
// node_modules/@toast-ui/react-editor/index.d.ts
export type EditorProps = Omit<EditorOptions, 'el'> & Partial<EventMapping>;
```

1. `Omit<EditorOptions, 'el'>`는 `EditorOptions`에서 `el`을 제외한 나머지 속성들을 상속받는다는 뜻이다.

2. `Partial<EventMapping>`는 `EventMapping`의 속성들을 선택적으로 상속받는다는 뜻이다.

3. 그리고 위의 두 타입을 합쳐서 `EditorProps`를 만들었다.

이중에 `EditorOptions`를 먼저 살펴보았다.

### EditorOptions

```ts
// node_modules/@toast-ui/editor/types/editor.d.ts
export interface EditorOptions {
  el: HTMLElement; // 이건 제외하고 상속을 받는다.
  height?: string;
  minHeight?: string;
  initialValue?: string;
  previewStyle?: PreviewStyle;
  initialEditType?: EditorType;
  events?: EventMap;
  hooks?: HookMap;
  language?: string;
  useCommandShortcut?: boolean;
  usageStatistics?: boolean;
  toolbarItems?: (string | ToolbarItemOptions)[][];
  hideModeSwitch?: boolean;
  plugins?: EditorPlugin[];
  extendedAutolinks?: ExtendedAutolinks;
  placeholder?: string;
  linkAttributes?: LinkAttributes;
  customHTMLRenderer?: CustomHTMLRenderer;
  customMarkdownRenderer?: ToMdConvertorMap;
  referenceDefinition?: boolean;
  customHTMLSanitizer?: Sanitizer;
  previewHighlight?: boolean;
  frontMatter?: boolean;
  widgetRules?: WidgetRule[];
  theme?: string;
  autofocus?: boolean;
  viewer?: boolean;
}
```

엄청나게 많은 옵션들이 있다.

하지만 다행히 문서로 잘 정리가 되어 있어서 각 옵션들이 어떤 역할을 하는지 확인할 수 있었다.

> [🔗 EditorOptions 문서 바로가기 🔗](https://nhn.github.io/tui.editor/latest/ToastUIEditorCore)

위의 링크를 보면서 나에게 필요한 옵션들이 무엇인지 알 수 있었다.

### EventMapping

```ts
// node_modules/@toast-ui/react-editor/index.d.ts
export interface EventMapping {
  onLoad: EventMap['load'];
  onChange: EventMap['change'];
  onCaretChange: EventMap['caretChange'];
  onFocus: EventMap['focus'];
  onBlur: EventMap['blur'];
  onKeydown: EventMap['keydown'];
  onKeyup: EventMap['keyup'];
  onBeforePreviewRender: EventMap['beforePreviewRender'];
  onBeforeConvertWysiwygToMarkdown: EventMap['beforeConvertWysiwygToMarkdown'];
}

export interface EventMap {
  load?: (param: Editor) => void;
  change?: (editorType: EditorType) => void;
  caretChange?: (editorType: EditorType) => void;
  focus?: (editorType: EditorType) => void;
  blur?: (editorType: EditorType) => void;
  keydown?: (editorType: EditorType, ev: KeyboardEvent) => void;
  keyup?: (editorType: EditorType, ev: KeyboardEvent) => void;
  beforePreviewRender?: (html: string) => string;
  beforeConvertWysiwygToMarkdown?: (markdownText: string) => string;
}
```

`EventMapping`이라는 단어 그대로 사용 가능한 이벤트 함수와 이벤트 함수의 파라미터 타입을 정의하고 맵핑한 것 이었다.

## 컴포넌트 만들기

글작성 페이지는 `pages/newpost/index.tsx` 경로에 만들려고 한다.

하지만 `index.tsx` 파일이 너무 커질것 같아 `components/newpost/PostEditor.tsx`파일에 `PostEditor`라는 컴포넌트를 별도로 만들고, `index.tsx`에서 import 하여 사용하려고 한다.

`PostEditor` 컴포넌트는 아래와 같이 작성했다.

```tsx
// components/newpost/PostEditor.tsx
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

export default function PostEditor() {
  return (
    <Editor
      previewStyle='vertical'
      height='800px'
      initialEditType='markdown'
      placeholder='Write Something'
      hideModeSwitch={true}
      language='ko-KR'
    />
  );
}
```

그리고 `pages/newpost/index.tsx`에 import해서 사용하였다.

> 📌 Toast에디터는 ssr을 지원하지 않기 때문에 `next/dynamic`을 사용하여 ssr을 하지 않도록 설정해주었다. 아마 React로 작업하는 경우에는 사용할 필요가 없을 것 같다.

```tsx
import dynamic from 'next/dynamic';

const PostEditor = dynamic(() => import('@/components/newpost/PostEditor'), {
  ssr: false,
});
```

<img width="1273" alt="스크린샷 2023-08-26 오전 2 56 31" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/ea6f52f2-bf76-4cd6-9f25-d0f71ed0d9e6">

정상적으로 잘 나오는 것을 확인할 수 있었다.
