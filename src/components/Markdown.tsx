"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { HTMLAttributes } from 'react';

interface MarkdownProps {
  content: string;
}

interface ComponentBaseProps {
  children?: React.ReactNode;
}

interface CodeProps extends ComponentBaseProps {
  inline?: boolean;
  className?: string;
}

interface LinkProps extends ComponentBaseProps {
  href?: string;
}

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
}

const style = vscDarkPlus;

export function Markdown({ content }: MarkdownProps) {
  const components = {
    code({ inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          style={style}
          language={match[1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={`${className} bg-[#2d2d2d] px-1 py-0.5 rounded`} {...props}>
          {children}
        </code>
      );
    },
    p({ children, ...props }: ComponentBaseProps) {
      return <p className="mb-4 last:mb-0" {...props}>{children}</p>;
    },
    h1({ children, ...props }: ComponentBaseProps) {
      return <h1 className="text-xl font-bold mb-4" {...props}>{children}</h1>;
    },
    h2({ children, ...props }: ComponentBaseProps) {
      return <h2 className="text-lg font-bold mb-3" {...props}>{children}</h2>;
    },
    h3({ children, ...props }: ComponentBaseProps) {
      return <h3 className="text-base font-bold mb-2" {...props}>{children}</h3>;
    },
    ul({ children, ...props }: ComponentBaseProps) {
      return <ul className="list-disc pl-6 mb-4 space-y-1" {...props}>{children}</ul>;
    },
    ol({ children, ...props }: ComponentBaseProps) {
      return <ol className="list-decimal pl-6 mb-4 space-y-1" {...props}>{children}</ol>;
    },
    li({ children, ...props }: ComponentBaseProps) {
      return <li className="mb-1" {...props}>{children}</li>;
    },
    blockquote({ children, ...props }: ComponentBaseProps) {
      return (
        <blockquote className="border-l-4 border-gray-600 pl-4 italic mb-4" {...props}>
          {children}
        </blockquote>
      );
    },
    a({ children, href, ...props }: LinkProps) {
      return (
        <a 
          href={href} 
          className="text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    },
    table({ children, ...props }: ComponentBaseProps) {
      return (
        <div className="overflow-auto mb-4">
          <table className="min-w-full border-collapse" {...props}>
            {children}
          </table>
        </div>
      );
    },
    thead({ children, ...props }: ComponentBaseProps) {
      return (
        <thead className="bg-[#2d2d2d]" {...props}>
          {children}
        </thead>
      );
    },
    tbody({ children, ...props }: ComponentBaseProps) {
      return (
        <tbody className="divide-y divide-[#2d2d2d]" {...props}>
          {children}
        </tbody>
      );
    },
    tr({ children, ...props }: ComponentBaseProps) {
      return (
        <tr className="hover:bg-[#2d2d2d]" {...props}>
          {children}
        </tr>
      );
    },
    th({ children, ...props }: ComponentBaseProps) {
      return (
        <th className="px-4 py-2 text-left font-medium" {...props}>
          {children}
        </th>
      );
    },
    td({ children, ...props }: ComponentBaseProps) {
      return (
        <td className="px-4 py-2" {...props}>
          {children}
        </td>
      );
    },
    hr(props: HTMLAttributes<HTMLHRElement>) {
      return <hr className="border-t border-[#2d2d2d] my-4" {...props} />;
    },
    img(props: ImageProps) {
      return (
        <img 
          {...props}
          className="max-w-full h-auto rounded my-4"
        />
      );
    },
  } as const;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}
