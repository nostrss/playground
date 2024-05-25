import { HeaderMenus } from '@/type/common';
import Link from 'next/link';
import { Fragment } from 'react';

export default function Header({ menus }: { menus: HeaderMenus }) {
  return (
    <header className='w-full min-w-360 h-16 px-4 border-b border-gray-300 flex justify-center'>
      <div className='w-full max-w-[1192px] flex flex-row justify-between items-center'>
        <Link href='/'>
          <span className='text-xl font-bold'>NOSTRSS</span>
        </Link>
        <nav className='flex flex-row gap-4 items-center'>
          {menus.map(({ menu }, index) => (
            <Fragment key={index}>{menu}</Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
}
