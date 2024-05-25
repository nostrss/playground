import PostList from '@/components/PostList';

export default async function Home() {
  return (
    <main className='w-full flex flex-row justify-center'>
      <section className='w-full flex flex-col gap-4 items-center px-4 pt-4'>
        <PostList />
      </section>
    </main>
  );
}
