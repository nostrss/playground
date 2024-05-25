---
title: [NEXT] TOAST Editor에서 이미지 업로드하기(hooks)
description : 블로그에 이미지가 없으면 섭섭하니깐, Toast에서 제공하는 hooks에 이미지 업로드 함수를 연결해보자.
tags: nextjs react javascript typescript toast editor
date: 2023-08-25
---

> - [1.TOAST Editor에 사용하기](https://nostrss.github.io/2023-08-25/146-toast-next-1)
> - [2.TOAST Editor에 작성한 글정보 불러오기(useRef)](https://nostrss.github.io/2023-08-25/147-toast-next-2)
> - [3.TOAST Editor에서 이미지 업로드하기(hooks)](https://nostrss.github.io/2023-08-25/148-toast-next-3)
> - [4.TOAST Editor Viewer 사용하기](https://nostrss.github.io/2023-08-25/149-toast-next-4)
> - [5.TOAST Editor customHTMLSanitizer 사용하기](https://nostrss.github.io/2023-08-25/150-toast-next-5)

## Toast Editor에서 이미지 업로드 하기

`Toast Editor`는 이미지 업로드를 위한 UI를 아래와 같이 제공하고 있다.

<img width="1091" alt="스크린샷 2023-08-26 오전 11 35 09" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/bc66b175-a33f-4a8c-bff4-344824869395">

그리고 이미지를 선택하고 OK 버튼을 누르면 이미지가 아래와 같이 노출되게 된다.

<img width="1091" alt="스크린샷 2023-08-26 오전 11 34 58" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/9b394896-a3ca-4efc-a933-74dbe0700f57">

좌측에 노출된 복잡한 코드는 base64로 인코딩된 이미지 코드인데,유저가 이렇게 실사용하기는 어려울 것 같다.

그래서 아래와 같이 수정을 해보려고 한다.

> 1.  업로드할 이미지를 선택한다.
> 2.  OK버튼을 누르면 선택한 이미지를 서버에 업로드한다.
> 3.  업로드가 완료되면, 업로드된 이미지의 주소를 받는다.
> 4.  업로드 된 이미지의 주소를 에디터에 노출한다.

1번은 이미 구현되어 있다. 2번부터 직접 구현해보도록 하자.

## OK버튼을 누르면 이미지 업로드 함수를 실행하기

그런데 OK 버튼을 눌렀을 때 내가 작성한 이미지 업로드 함수가 바로 실행되도록 어떻게 해야할까?

이전에 `EditorOptions`의 문서에서 `hooks`라는 `Props`를 본적이 있었다.

> [🔗 EditorOptions 문서 바로가기 🔗](https://nhn.github.io/tui.editor/latest/ToastUIEditorCore)

<img width="965" alt="스크린샷 2023-08-26 오전 11 53 49" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/1c29dcf3-73ca-48e5-a615-1b6b45336392">

설명에 이미지 업로드를 위한 `hooks`라고 당당히 기재되어 있는 것을 볼 수 있다. 역시 문서는 잘 써놓은 것 같다.

`hooks`를 사용하면 되지 않을까 예상은 되는데 사용하는 방법은 어떻게 될까?

조금 더 알아봐야겠다.

```ts
// node_modules/@toast-ui/editor/types/editor.d.ts
export interface EditorOptions {
 (...)
  hooks?: HookMap;
  (...)
}

export type HookMap = {
  addImageBlobHook?: (blob: Blob | File, callback: HookCallback) => void;
};

type HookCallback = (url: string, text?: string) => void;
```

`hooks`에 대한 타입을 확인해보니, `addImageBlobHook`이라는 함수가 있고, 이 함수는 `blob`과 `callback`을 인자로 받는다.

그리고 `callback`은 `url`과 `text`를 인자로 받는다.

이제 `blob`과 `callback`을 인자로 받는 이미지 업로드 함수를 만들어서 연결 해주면 될 것 같다.

### 이미지 업로드 함수

```ts
export const imageAPI = {
  postUploadImage: async (image: File | Blob, callback: HookCallback) => {
    // 이미지 업로드를 위한 formData 생성
    const formData = new FormData();
    formData.append('file', image);

    try {
      // 이미지 업로드 후 이미지 id 받기
      const result = await axios({
        method: 'post',
        url: BLOGRASS_IMAGE_UPLOAD,
        data: formData,
      });

      // 이미지 id를 이용하여 이미지 url 생성
      const imageUrl =
        await `${BLOGRASS_IMAGE_BUCKET_URL}/${result.data.result[0]}`;

      // callback에 이미지 url과 alt_text를 인자로 넣어준다.
      callback(imageUrl, 'alt_text');
    } catch (error) {
      console.error(error);
    }
  },
};
```

> 1. `image`와 `callback`을 인자로 받는다.
> 2. `image`를 서버에 업로드 한다.
> 3. 업로드가 완료되면, 업로드된 이미지의 `URL`을 받는다.
> 4. `callback`에 이미지의 `URL`과 텍스트를 인자로 넣어준다.

### hooks에 이미지 업로드 함수 연결하기

아래와 같이 `hooks`에 이미지 업로드 함수를 연결해주면 된다.

```tsx
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
      hooks={{ addImageBlobHook: imageAPI.postUploadImage }}
    />
  );
}
```

> 테스트를 해보니 아래와 같이 이미지가 업로드 되는 것을 확인 할 수 있었다.

<img width="1258" alt="스크린샷 2023-08-26 오후 12 13 27" src="https://github.com/nostrss/nostrss.github.io/assets/56717167/12e593d1-5e4c-47d1-b5a9-c5680eeff5cd">
