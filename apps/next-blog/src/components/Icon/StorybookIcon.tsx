import { BASE_URL } from '@/constant';
import { IconProps } from '@/type/common';
import Link from 'next/link';
import { SiStorybook } from 'react-icons/si';

export default function StorybookIcon({
  size = 20,
  color = 'text-black',
  url = `https://nostrss.github.io/next13-blog`,
}: IconProps) {
  return (
    <Link href={url} target='_blank' title='스토리북 보기'>
      <SiStorybook size={size} className={`${color}dark:text-white`} />
    </Link>
  );
}
