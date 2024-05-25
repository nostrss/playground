import Link from 'next/link';

export default function SkeletonCard() {
  return (
    <div className='border border-gray-200 shadow rounded-md py-4 w-full max-w-2xl min-w-[360px]'>
      <div className='flex flex-row justify-start items-center px-4'>
        <article className='w-full h-full p-4 md:p-8'>
          <div className='flex justify-start gap-2'>
            <div className='w-[120px] h-[16px] animate-pulse bg-gray-200 rounded'></div>
          </div>
          <div className='w-full h-[30px] animate-pulse bg-gray-200 rounded mt-4'></div>
          <div className='w-full h-[16px] mt-4 animate-pulse bg-gray-200 rounded'></div>
          <div className='flex flex-row gap-2 mt-4 overflow-hidden flex-wrap'>
            <div className='w-[48px] h-[24px] animate-pulse bg-gray-200 rounded-xl'></div>
            <div className='w-[120px] h-[24px] animate-pulse bg-gray-200 rounded-xl'></div>
            <div className='w-[72px] h-[24px] animate-pulse bg-gray-200 rounded-xl'></div>
          </div>
        </article>
      </div>
    </div>
  );
}
