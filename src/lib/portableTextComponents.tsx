import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/image';

export const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlForImage(value);
      
      if (!imageUrl) {
        return null;
      }

      return (
        <figure className="my-8">
          <div className="relative flex justify-center">
            <div className="relative w-full aspect-[16/9] max-w-3xl">
              <Image
                src={imageUrl}
                alt={value.alt || ''}
                fill
                className="object-contain rounded-lg"
                sizes="(min-width: 1280px) 1200px, 100vw"
              />
            </div>
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    table: ({ value }: any) => {
      return (
        <div className="my-8 w-full overflow-hidden rounded-lg border shadow-sm">
          <table className="w-full">
            {value.caption && (
              <caption className="px-6 py-4 bg-muted/50 border-t">
                {value.caption}
              </caption>
            )}
            {value.rows[0]?.cells?.length > 0 && (
              <thead className="bg-muted/50">
                <tr>
                  {value.rows[0].cells.map((cell: string, index: number) => (
                    <th key={index} className="px-6 py-4 text-left font-semibold">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {value.rows.slice(1).map((row: any, rowIndex: number) => (
                <tr key={rowIndex} className="border-t border-border/50">
                  {row.cells.map((cell: string, cellIndex: number) => (
                    <td key={cellIndex} className="px-6 py-4">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          className="text-primary hover:text-primary/80 transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="scroll-m-20 text-2xl font-bold tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="scroll-m-20 text-xl font-bold tracking-tight">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="mt-6 border-l-2 border-border pl-6 italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-6 ml-6 list-none space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-6 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="relative pl-8 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/60">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="relative pl-2">
        {children}
      </li>
    ),
  },
};