import { BASE_URL } from '@/constant';
import { TagCounts } from '@/type/common';
import React from 'react';
import TaglistItem from './TagListItem';

export default async function TagBox() {
  const tags: TagCounts[] = await fetchTagsData();
  tags.sort((a, b) => b.count - a.count);

  return (
    <aside className='hidden xl:flex flex-col items-center w-[320px] h-[100vh] top-0 my-4 ml-6'>
      <h2 className='mb-4 font-bold'>TAG</h2>
      <div className='w-full flex flex-row gap-4 flex-wrap items-center justify-center content-start '>
        {tags.map(({ tagName, count }, index) => (
          <TaglistItem key={index} tagName={tagName} count={count} />
        ))}
      </div>
    </aside>
  );
}

const fetchTagsData = async () => {
  const data = await fetch(`${BASE_URL}/api/tags`, {
    method: 'GET',
  });

  return data.json();
};
