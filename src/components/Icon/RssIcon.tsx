import { BASE_URL } from '@/constant';
import { IconProps } from '@/type/common';
import Link from 'next/link';
import { BsRss } from 'react-icons/bs';

export default function RssIcon({
  size = 20,
  color = 'text-black',
  url = `${BASE_URL}/rss.xml`,
}: IconProps) {
  return (
    <a href={url} target='_blank' title='rss.xml'>
      <BsRss size={size} className={`${color} dark:text-white`} />
    </a>
  );
}
