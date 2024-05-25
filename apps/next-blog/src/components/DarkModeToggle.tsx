'use client';

import { useEffect, useState } from 'react';
import SunnyIcon from './Icon/SunnyIcon';
import NightIcon from './Icon/NightIcon';
import { usePathname } from 'next/navigation';
import { DARK_MODE, LIGHT_MODE, MODE_COOKIE_NAME } from '@/constant';
import { COOKIE } from '@/util/cookie';

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

  const chageModeInvert = () => {
    const currentMode = document
      .querySelector('meta[name="color-scheme"]')
      ?.getAttribute('content');
    const newMode = currentMode === DARK_MODE ? LIGHT_MODE : DARK_MODE;

    setIsDark(newMode === DARK_MODE);
    changeColorScheme(newMode);
    COOKIE.setCookie(MODE_COOKIE_NAME, newMode, 720);
  };

  return (
    <>
      <button
        onClick={chageModeInvert}
        title={isDark ? '일반모드로 변경' : '다크모드로 변경'}
      >
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
