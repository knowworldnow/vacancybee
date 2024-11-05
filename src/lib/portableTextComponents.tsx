import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from './sanity';

export const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      // For body images, maintain original aspect ratio
      return (
        <figure className="my-8">
          <div className="relative w-full">
            <Image
              src={urlForImage(value)
                .format('webp')
                .quality(90)
                .url()}
              alt={value.alt || ' '}
              width={1200}
              height={value.hotspot ? Math.floor(1200 / value.hotspot.aspect) : 800}
              className="rounded-lg"
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }: any) => {
      return (
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <code>{value.code}</code>
        </pre>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <Link 
          href={value.href} 
          rel={rel} 
          target={target}
          className="text-blue-600 hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-6 mb-4">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mt-6 mb-4">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>
    ),
  },
};