import { IPropsNav } from '@/type/common';
import Link from 'next/link';

export default function NavLink({ children, href = '' }: IPropsNav) {
  return (
    <Link href={href} className='text-slate-500 hover:text-slate-900'>
      {children}
    </Link>
  );
}
