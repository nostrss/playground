---
title: [NEXT] TOAST Editor customHTMLSanitizer 사용하기
description: dangeroulySetInnerHTML을 사용하지 않고 dompurify를 Toast Editor에 적용해보자.
tags: nextjs react javascript typescript toast dompurify
date: 2023-08-25
---

> - [1.TOAST Editor에 사용하기](https://nostrss.github.io/2023-08-25/146-toast-next-1)
> - [2.TOAST Editor에 작성한 글정보 불러오기(useRef)](https://nostrss.github.io/2023-08-25/147-toast-next-2)
> - [3.TOAST Editor에서 이미지 업로드하기(hooks)](https://nostrss.github.io/2023-08-25/148-toast-next-3)
> - [4.TOAST Editor Viewer 사용하기](https://nostrss.github.io/2023-08-25/149-toast-next-4)
> - [5.TOAST Editor customHTMLSanitizer 사용하기](https://nostrss.github.io/2023-08-25/150-toast-next-5)

## TOAST Editor customHTMLSanitizer 사용하기

에디터의 경우 유저가 악의적인 용도로 스크립트를 삽입하여 공격할 위험이 있다.

이를 방지하기 위해서는 HTML 요소에 공격을 하는 스크립트등을 삭제해야 한다.

이런 기능을 하는 npm 패키지가 있는데, `Dompurify`이다.

> [🔗 dompurify npm 페이지 바로가기 🔗](https://www.npmjs.com/package/dompurify?activeTab=readme)

## TOAST Editor 자체적인 Sanitizer

앞서 EditorOptions을 살펴봤을때 `customHTMLSanitizer`라는 Props가 존재하는 것을 확인할 수 있었다.

> [🔗 EditorOptions 문서 바로가기 🔗](https://nhn.github.io/tui.editor/latest/ToastUIEditorCore)

> [🔗 customHTMLSanitizer 옵션 기능 추가 🔗](https://ui.toast.com/weekly-pick/ko_monthly_202004)

```ts
// node_modules/@toast-ui/editor/types/editor.d.ts
export interface EditorOptions {
  (...)
  customHTMLSanitizer?: Sanitizer;
  (...)
}
```

`customHTMLSanitizer`라는 표현이 있는 것으로 보아 이런 생각이 들었다.

> 혹시 Toast Editor에는 이미 Sanitizer가 적용되어 있는게 아닐까

테스트를 해봐야겠다.

`dompurify` 페이지에 샘플코드가 있어서 이를 가져와서 테스트를 해봤다.
`Markdown`, `wysiwyg` 모드 둘다 테스트를 해봤다.

```tsx
const onSubmitNewPost = (e: FormEvent) => {
  e.preventDefault();
  const markDownContent = editorRef.current?.getInstance().getMarkdown();
  const htmlContent = editorRef.current?.getInstance().getHTML();
  console.log('1️⃣', markDownContent);
  console.log('2️⃣', htmlContent);
};
```

에디터에 샘플코드를 입력하고 어떻게 값이 반환되는지 확인해보았다.

```javascript
DOMPurify.sanitize('<img src=x onerror=alert(1)//>');
// dompurify : <img src="x">
// Markdown :  <img src=x onerror=alert(1)//>
// wysiwyg : <p><img src="x" contenteditable="false"><br></p>

DOMPurify.sanitize('<svg><g/onload=alert(2)//<p>');
// dompurify : <svg><g></g></svg>
// Markdown : <svg><g/onload=alert(2)//<p>
// wysiwyg : <p>&lt;g/onload=alert(2)//</p>

DOMPurify.sanitize('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>');
// dompurify : <p>abc</p>
// Markdown : <p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>
// wysiwyg : <p>abc</p>

DOMPurify.sanitize('<math><mi//xlink:href="data:x,<script>alert(4)</script>">');
// dompurify : <math><mi></mi></math>
// Markdown : <math><mi//xlink:href="data:x,<script>alert(4)</script>">
// wysiwyg : <p>&lt;mi//xlink:href="data:x,alert(4)"&gt;</p>

DOMPurify.sanitize('<TABLE><tr><td>HELLO</tr></TABL>');
// dompurify : <table><tbody><tr><td>HELLO</td></tr></tbody></table>
// Markdown : <TABLE><tr><td>HELLO</tr></TABL>
// wysiwyg : <table><thead><tr><td><p>HELLO</p></td></tr></thead><tbody><tr></tr></tbody></table>

DOMPurify.sanitize('<UL><li><A HREF=//google.com>click</UL>');
// dompurify : <ul><li><a href="//google.com">click</a></li></ul>
// Markdown : <UL><li><A HREF=//google.com>click</UL>
// wysiwyg : <ul><li><p><a href="//google.com">click</a></p></li></ul>
```

`dompurify`와 방식은 다르지만 `wysiwyg` 모드에서는 Toast 에디터 자체적으로 `Sanitizer`가 적용되어 있는 것을 확인할 수 있었다.

## Custom Sanitizer 사용하기

이제는 customHTMLSanitizer를 사용해보려고 한다.

```ts
export type Sanitizer = (content: string) => string;
```

`customHtmlSanitizer`는 `Sanitizer`라는 타입을 가지고 있고, `Sanitizer`는 `content`라는 `string`을 받아서 `string`을 반환하는 함수이다.

일단 간단히 테스트를 해보기 위해서 아래와 같이 함수를 하나 작성하여 `customHTMLSanitizer`와 연결해보았다.

```tsx
export default function PostEditor({
  editorRef,
}: {
  editorRef: RefObject<Editor>;
}) {
  // 테스트용 Sanitizer 함수
  const testSanitizer = (text: string) => {
    console.log(text);
    return text;
  };

  return (
    <Editor
      ref={editorRef}
      previewStyle='vertical'
      height='800px'
      initialEditType='markdown'
      placeholder='Write Something'
      hideModeSwitch={true}
      language='ko-KR'
      customHTMLSanitizer={testSanitizer}
    />
  );
}
```

`testSanitizer` 함수가 잘 연결되어 작동을 한다면, `console.log(text)`가 실행되어 콘솔에 `text`가 출력될 것이다.

<img width="1277" alt="스크린샷 2023-08-27 오후 2 33 05" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/b5a15924-3b87-4089-9cad-92dcd7daba24">

텍스트를 입력할때 마다 직접 생성한 `testSanitizer` 함수를 실행하는 것을 확인할 수 있었다.

> 즉, Toast Editor에는 이미 Sanitizer가 적용되어 있다. 그리고 별도의 Sanitizer를 적용하려면 customHTMLSanitizer에 string을 매개변수로 받아서 string을 반환하는 함수를 넣어주면 된다.

## dompurify 적용하기

Toast Editor 자체적으로 Sanitizer가 적용되어 있지만, `dompurify`를 적용해보기로 했다.

일단 글을 작성하는 에디터에 적용을 해주었다. 방법은 간단했다.

```tsx
// dompurify Import
import * as DOMPurify from 'dompurify';

export default function PostEditor({
  editorRef,
}: {
  editorRef: RefObject<Editor>;
}) {
  const customSanitizer = DOMPurify.sanitize;

  return (
    <Editor
      ref={editorRef}
      previewStyle='vertical'
      height='800px'
      initialEditType='markdown'
      placeholder='Write Something'
      hideModeSwitch={true}
      language='ko-KR'
      // customHTMLSanitizer에 dompurify 적용
      customHTMLSanitizer={customSanitizer}
    />
  );
}
```

그리고 `Viewer`에도 동일하게 적용을 해주었다.

작성할때 이미 dompurify가 적용되어 있긴 하지만, `Viewer`에서도 `dompurify`를 적용해주는 것이 보안에 좋을 것 같아서 적용해주었다.

```tsx
import { Viewer } from '@toast-ui/react-editor';
import * as DOMPurify from 'dompurify';

export default function EditorViewer({
  initialValue,
}: {
  initialValue: string;
}) {
  const customSanitizer = DOMPurify.sanitize;

  return (
    <Viewer initialValue={initialValue} customHTMLSanitizer={customSanitizer} />
  );
}
```
