import { BASE_URL, DEFAULT_META_AUTHOR_URL } from '@/constant';
import { IconProps } from '@/type/common';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';

export default function GithubIcon({
  size = 20,
  color = 'text-black',
  url = `${DEFAULT_META_AUTHOR_URL}`,
}: IconProps) {
  return (
    <Link href={url} target='_blank' title='깃허브 프로필 보기'>
      <BsGithub size={size} className={`${color} dark:text-white`} />
    </Link>
  );
}
