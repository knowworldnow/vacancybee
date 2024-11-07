import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { urlForImage } from '@/sanity/lib/image';

interface PostBylineProps {
  author: {
    name: string;
    slug: { current: string };
    image?: any;
  };
  date: string;
}

export function PostByline({ author, date }: PostBylineProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <Link
        href={`/author/${author.slug.current}`}
        className="flex items-center gap-2 hover:text-foreground"
      >
        {author.image && (
          <Image
            src={urlForImage(author.image).width(32).height(32).url()}
            alt={author.name}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span>{author.name}</span>
      </Link>
      <time dateTime={date} className="text-muted-foreground">
        {formatDistanceToNow(new Date(date), { addSuffix: true })}
      </time>
    </div>
  );
}