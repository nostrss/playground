'use client';

import TagLabel from '@/components/TagLabel';
import { useParams } from 'next/navigation';

export default function TaglistItem({
  tagName,
  count,
}: {
  tagName: string;
  count?: number;
}) {
  const param = useParams();

  const isActive = param.tag === tagName;
  return (
    <div className='flex flex-row justify-between items-center '>
      <TagLabel tagName={tagName} count={count} isActive={isActive} />
    </div>
  );
}
