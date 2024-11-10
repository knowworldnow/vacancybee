import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/image';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';

export const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlForImage(value);
      
      if (!imageUrl) {
        return null;
      }

      return (
        <figure className="my-8">
          <div className="relative flex justify-center items-center bg-muted rounded-lg overflow-hidden">
            <div className="relative w-full max-w-3xl">
              <div className="aspect-[16/9] relative">
                <Image
                  src={imageUrl}
                  alt={value.alt || ''}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1280px) 768px, (min-width: 1024px) 672px, 100vw"
                  priority={false}
                />
              </div>
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
          <Table>
            {value.caption && (
              <TableCaption className="px-6 py-4 bg-muted/50 border-t">
                {value.caption}
              </TableCaption>
            )}
            {value.rows[0]?.cells?.length > 0 && (
              <TableHeader>
                <TableRow>
                  {value.rows[0].cells.map((cell: string, index: number) => (
                    <TableHead key={index} className="font-semibold">
                      {cell}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {value.rows.slice(1).map((row: any, rowIndex: number) => (
                <TableRow key={rowIndex}>
                  {row.cells.map((cell: string, cellIndex: number) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
          className="inline-link relative text-primary no-underline transition-all duration-200 hover:text-primary"
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
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight transition-colors">
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
      <blockquote>{children}</blockquote>
    ),
    'pull-quote': ({ children }: any) => (
      <blockquote className="pull-quote">{children}</blockquote>
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
      <ol className="my-6 ml-6 list-none counter-reset-[item] space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="relative pl-8 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/60">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="relative pl-10 counter-increment-[item] before:absolute before:left-0 before:top-0 before:flex before:h-6 before:w-6 before:items-center before:justify-center before:rounded-full before:bg-muted before:text-xs before:font-medium before:text-primary before:content-[counter(item)]">
        {children}
      </li>
    ),
  },
};