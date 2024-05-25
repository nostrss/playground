import DarkModeToggle from '@/components/DarkModeToggle';
import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import QueryProviders from '@/context/queryProvider';
import { IPropsChildren } from '@/type/common';
import { defaultMetaData } from '../defaulMetaData';
import RssIcon from '@/components/Icon/RssIcon';
import StorybookIcon from '@/components/Icon/StorybookIcon';
import GithubIcon from '@/components/Icon/GithubIcon';
import Header from '@/components/Header';
import TagBox from '@/components/TagBox';
import Analytics from '@/components/Analytics';
import Footer from '@/components/Footer';

const sans = Open_Sans({ subsets: ['latin'] });
export const menus = [
  { menu: <DarkModeToggle /> },
  { menu: <StorybookIcon /> },
  { menu: <GithubIcon /> },
  { menu: <RssIcon /> },
];

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
export const metadata: Metadata = {
  ...defaultMetaData,
};

export default function RootLayout({ children }: IPropsChildren) {
  return (
    <html lang='kr'>
      <Analytics />
      <script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4551649509417014'
        crossOrigin='anonymous'
      ></script>
      <meta
        name='naver-site-verification'
        content='40eb1acd72283d4af68831e5fe08661b57a10c72'
      />
      <QueryProviders>
        <body className={`${sans.className} dark:bg-black`}>
          <Header menus={menus} />
          <div className='w-full flex flex-col items-center'>
            <section className='w-full max-w-[1192px] flex flex-row justify-center'>
              {children}
              <TagBox />
            </section>
          </div>
          <Footer />
        </body>
      </QueryProviders>
    </html>
  );
}
