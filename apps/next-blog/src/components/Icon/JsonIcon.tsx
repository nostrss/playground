import { BASE_URL } from '@/constant';
import { IconProps } from '@/type/common';
import Link from 'next/link';
import { BsFiletypeJson } from 'react-icons/bs';

export default function JsonIcon({
  size = 20,
  color = 'text-black',
  url = `${BASE_URL}/feed.json`,
}: IconProps) {
  return (
    <Link href={url} target='_blank' title='feed.json'>
      <BsFiletypeJson size={size} className={`${color} dark:text-white`} />
    </Link>
  );
}
