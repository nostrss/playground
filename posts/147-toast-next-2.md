---
title: [NEXT] TOAST Editor에서 작성한 글정보 불러오기(useRef)
tags: nextjs react javascript typescript toast editor
description: 에디터에 적어놓은 글을 어떻게 불러올까? useState or useRef?
date: 2023-08-25
---

> - [1.TOAST Editor에 사용하기](https://nostrss.github.io/2023-08-25/146-toast-next-1)
> - [2.TOAST Editor에 작성한 글정보 불러오기(useRef)](https://nostrss.github.io/2023-08-25/147-toast-next-2)
> - [3.TOAST Editor에서 이미지 업로드하기(hooks)](https://nostrss.github.io/2023-08-25/148-toast-next-3)
> - [4.TOAST Editor Viewer 사용하기](https://nostrss.github.io/2023-08-25/149-toast-next-4)
> - [5.TOAST Editor customHTMLSanitizer 사용하기](https://nostrss.github.io/2023-08-25/150-toast-next-5)

## Toast Editor에 작성한 글 내용을 불러오기

```
src
 ┣ components
 ┃ ┣ newpost
 ┃ ┃ ┗ PostEditor.tsx // 에디터 컴포넌트
 ┣ pages
 ┃ ┣ newpost
 ┃ ┃ ┗ index.tsx // 에디터의 내용을 api 요청으로 서버에 전송
 ┃ ┗ index.tsx
```

에디터에 글을 작성하고, 서버에 저장하기 위해서는 먼저 에디터에 작성된 글 내용을 불러와야 한다.

```tsx
// src/pages/newpost/index.tsx
const editorRef = useRef<Editor>(null);

const onSubmitNewPost = (e: FormEvent) => {
  e.preventDefault();
  // 마크다운 형식으로 작성한 글 내용을 불러온다.
  const markDownContent = editorRef.current?.getInstance().getMarkdown();
  console.log(markDownContent);
};

return (
  <section>
    <form onSubmit={onSubmitNewPost}>
      <PostEditor editorRef={editorRef} />
    </form>
  </section>
);
```

`useRef`를 사용하여 `editorRef`를 선언하였고, `editorRef`를 `PostEditor`에 `Props`로 전달하게 되면 유저가 작성한 글정보가 `editorRef`에 담기게 될 것이다.

> `useState`가 아닌 `useRef`를 사용한 이유는, `useState`를 사용하면 `onChange` 이벤트가 발생할 때마다 렌더링이 일어나기 때문에, 글자를 입력하는 동안에도 렌더링이 일어나게 될 것이다. 이를 방지하고자 `useRef`를 사용하였다.

`editorRef`에서 작성된 글 내용을 뽑아내기 위해서는 `getInstance()`를 사용하였다.

여기서 `Toast Editor`는 2가지 모드를 제공하는데, `markdown`과 `wysiwyg`이다.

- `markdown` : README.md 파일처럼 작성하는 에디터이다. 이런 형식으로 불러오기 위해서는 getMarkdown()을 사용하면된다.
- `wysiwyg` : 일반적인 글쓰기 편집기 형식의 에디터이다. 이런 형식으로 불러오기 위해서는 getHtml()을 사용하면 된다.

나는 마크다운 형식만 사용할 것이기 때문에 `getMarkdown()`을 사용하였다.

이제는 `Props`를 받는 `PostEditor` 컴포넌트를 수정해야겠다.

```tsx
//src/components/newpost/PostEditor.tsx
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { RefObject } from 'react';

export default function PostEditor({
  editorRef,
}: {
  editorRef: RefObject<Editor>;
}) {
  return (
    <Editor
      ref={editorRef}
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

`Props`로 전달받은 `editorRef`를 `Editor` 컴포넌트의 `ref`로 전달해주었다.

이제 테스트를 해보자.

<img width="1273" alt="스크린샷 2023-08-26 오전 11 22 41" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/ff50c414-eaf8-4a00-b67f-d6088b870c04">

콘솔에 정상적으로 글 내용이 출력되는 것을 확인할 수 있었다.
