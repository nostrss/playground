'use client';
import { useRouter } from 'next/navigation';

import React from 'react';

function TagLabel({
  tagName,
  count = 0,
  isActive = false,
}: {
  tagName: string;
  count?: number;
  isActive?: boolean;
}) {
  const router = useRouter();
  const handleActiveClassName = () => {
    if (isActive) {
      return 'bg-black text-white';
    } else {
      return 'bg-gray-200 text-gray-800';
    }
  };

  const onClickTag = () => {
    router.push(`/tag/${tagName}`);
  };
  return (
    <button
      // href={`/tag/${tagName}`}
      onClick={onClickTag}
      className={`px-3 py-1 text-xs ${handleActiveClassName()} rounded-xl cursor-pointer hover:bg-black hover:text-white`}
    >
      {`${tagName}`}
      {count > 0 && `(${count})`}
    </button>
  );
}

export default React.memo(TagLabel);
