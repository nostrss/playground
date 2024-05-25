import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='w-full min-w-360 h-16 px-4  flex justify-center'>
      <section>
        <div className='flex flex-row justify-center'>
          <Link href='https://nostrss.github.io/'>Previous Blog</Link>
          &nbsp;&nbsp; • &nbsp;&nbsp;
          <Link href='mailto: jintagi@gmail.com'>email</Link>
        </div>
        <span className='text-sm'>NOSTRSS © {year} https://nostrss.me</span>
      </section>
    </footer>
  );
}
