export const COOKIE = {
  getCookie: (cookieName: string): string => {
    let result = '';
    document.cookie.split(';').map((item) => {
      const cookieItem = item.trim();
      if (item.includes(cookieName)) {
        result = cookieItem.split('=')[1];
      }
    });
    return result;
  },
  setCookie: (
    cookieName: string,
    cookieValue: string,
    expiresHour: number
  ): void => {
    const expired = new Date();
    expired.setTime(expired.getTime() + expiresHour * 24 * 60 * 60 * 1000);
    document.cookie = `${cookieName}=${cookieValue}; path=/; Expires=${expired}`;
  },
};
