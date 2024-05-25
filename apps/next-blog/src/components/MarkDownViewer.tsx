'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';
import rehypeRaw from 'rehype-raw';

const blurDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMCwurBwADrwGLBfLO1QAAAABJRU5ErkJggg==';

export default function MarkDownViewer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      className='prose w-full max-w-[880px] dark:text-white '
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={materialDark}
              language={match[1]}
              PreTag='div'
              showLineNumbers={true}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        img: (image) => (
          <Image
            className='w-full h-auto object-cover shadow-md rounded-md'
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={500}
            placeholder='blur'
            blurDataURL={blurDataUrl}
          />
        ),
        h1: ({ children, ...props }) => (
          <h1
            className='prose text-2xl dark:text-white w-full max-w-[880px]'
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2
            className='prose text-xl dark:text-white w-full max-w-[880px]'
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3
            className='prose text-lg dark:text-white w-full max-w-[880px]'
            {...props}
          >
            {children}
          </h3>
        ),
        p: ({ children, ...props }) => (
          <p className='prose dark:text-white w-full max-w-[880px]' {...props}>
            {children}
          </p>
        ),
        li: ({ children, ...props }) => {
          const liProps = { ...props, ordered: 'false' };
          return (
            <li
              className='prose dark:text-white w-full max-w-[880px]'
              {...liProps}
            >
              {children}
            </li>
          );
        },
        strong: ({ children, ...props }) => (
          <strong
            className='prose dark:text-white w-full max-w-[880px]'
            {...props}
          >
            {children}
          </strong>
        ),
        a: ({ children, ...props }) => (
          <a
            className='prose dark:text-blue-300 w-full max-w-[880px]'
            {...props}
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
