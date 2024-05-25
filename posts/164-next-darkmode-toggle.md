---
title: Next.js 다크모드 적용하기
description: 요새 많이 사용하는 다크모드를 적용해보자.
date: 2023-09-11
tags: next darkmode toggle
---

네이버도 그렇고 요새 많은 사이트들이 `다크모드`를 지원하고 있다.

나도 웹페이지를 볼때 다크모드를 선호하는 편인지라 다크모드를 적용하려고 한다.

내가 원하는 다크모드의 기능은 다음과 같다.

- 최초 접속 시에는 유저의 OS 다크모드 설정을 따른다.
- 유저가 버튼을 클릭시 모드가 변경이 된다.
- 변경된 모드가 다음에 접속시에도 유지가 된다.

## 유저의 OS 다크모드 설정을 따르기

유저의 OS 다크모드 설정을 따르기 위해서는 `window.matchMedia`를 사용하면 된다.

코드를 살펴보자.

```tsx
export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const path = usePathname();

  useEffect(() => {
    initializeDarkMode();
  }, [path]);

  const initializeDarkMode = () => {
    const savedMode = COOKIE.getCookie(MODE_COOKIE_NAME);
    const prefersDarkMode = window.matchMedia(
      `(prefers-color-scheme: ${DARK_MODE})`
    ).matches;
    const initialMode = savedMode || (prefersDarkMode ? DARK_MODE : LIGHT_MODE);

    setIsDark(initialMode === DARK_MODE);
    changeColorScheme(initialMode);
    COOKIE.setCookie(MODE_COOKIE_NAME, initialMode, 720);
  };

  return (
    <>
      <button title={isDark ? '일반모드로 변경' : '다크모드로 변경'}>
        {isDark ? <SunnyIcon color='white' /> : <NightIcon />}
      </button>
    </>
  );
}

const changeColorScheme = (mode: string) => {
  const colorScheme = document.querySelector('meta[name="color-scheme"]');
  colorScheme?.setAttribute('content', mode);

  if (mode === DARK_MODE) {
    document.documentElement.classList.add(DARK_MODE);
    document.documentElement.classList.remove(LIGHT_MODE);
  } else {
    document.documentElement.classList.add(LIGHT_MODE);
    document.documentElement.classList.remove(DARK_MODE);
  }
};
```

> 브라우저에서 작동해야 하기 때문에 최상단에 'use client'를 선언해주어야 한다.

> 모드 초기화를 위해 initializeDarkMode라는 함수를 만들고 useEffect를 통해 최초 실행시켜줬다.

> initializeDarkMode 함수에서는 쿠키에 저장된 모드가 있는지 확인하고 없다면 유저의 OS 다크모드 설정을 확인한다.

> 초기화 된 모드를 쿠키에 저장한다.

> 초기화 된 모드에 따라 Icon을 변경해준다.

> 초기화 된 모드에 따라 documentElement에 클래스를 추가해준다.

## 버튼 클릭시 모드 변경처리

```tsx
const chageModeInvert = () => {
  const currentMode = document
    .querySelector('meta[name="color-scheme"]')
    ?.getAttribute('content');
  const newMode = currentMode === DARK_MODE ? LIGHT_MODE : DARK_MODE;

  setIsDark(newMode === DARK_MODE);
  changeColorScheme(newMode);
  COOKIE.setCookie(MODE_COOKIE_NAME, newMode, 720);
};
```

위의 함수는 버튼 클릭시 모드를 변경해주는 함수이다.이걸 버튼의 `onClick`에 넣어주면 된다.

![화면-기록-2023-09-15-오후-7 24 06](https://github.com/nostrss/next13-blog/assets/56717167/3044f7e6-6bfb-409e-9831-bff5baed05f2)
