import { useEffect, useState } from 'react';

export default function useGetCookie() {
  const [cookieValue, setCookieValue] = useState('');

  useEffect(() => {
    const data = getCookie('mode');
    setCookieValue(data);
  }, []);

  return cookieValue;
}

const getCookie = (cookieName: string): string => {
  let result = '';
  document.cookie.split(';').map((item) => {
    const cookieItem = item.trim();
    if (item.includes(cookieName)) {
      result = cookieItem.split('=')[1];
    }
  });
  return result;
};
