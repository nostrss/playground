export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://nostrss.me';

export const POSTS_FILE_PATH = 'posts';
export const DARK_MODE = 'dark';
export const LIGHT_MODE = 'light';
export const MODE_COOKIE_NAME = 'mode';

export const DEFAULT_META_TITLE = "Nostrss's Dev Blog";
export const DEFAULT_META_DESCRIPTION = 'Nostrss Blog Post List';
export const DEFAULT_GENERATOR = 'Next.js';
export const DEFAULT_APP_NAME = 'Nostrss Dev Blog';
export const DEFAULT_REFERRER = 'origin-when-cross-origin';
export const DEFAULT_META_KEYWORDS = [
  'Next.js',
  'React',
  'JavaScript',
  'TypeScript',
  'Node.js',
];

export const DEFAULT_META_AUTHOR_NAME = 'Nostrss';
export const DEFAULT_META_AUTHOR_EMAIL = 'jintagi@gmail.com';
export const DEFAULT_META_AUTHOR_URL = 'https://github.com/nostrss';

export const RSS_XML_URL = `${BASE_URL}/rss.xml`;
export const RSS_ATOM_URL = `${BASE_URL}/rss-atom.xml`;
export const RSS_JSON_URL = `${BASE_URL}/feed.json`;

export const DEFAULT_OG_IMAGE_URL =
  'https://github.com/nostrss/next13-blog/assets/56717167/caf1c562-784b-4dde-8d5a-49d3c80f02bf';
