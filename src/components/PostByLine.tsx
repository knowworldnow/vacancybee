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
  const imageUrl = author.image ? urlForImage(author.image) : undefined;

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <Link
        href={`/author/${author.slug.current}`}
        className="flex items-center gap-2 hover:text-foreground"
      >
        {imageUrl && (
          <div className="relative w-8 h-8 bg-muted rounded-full">
            <Image
              src={imageUrl.toString()}
              alt={author.name}
              fill
              className="object-cover rounded-full"
              sizes="32px"
            />
          </div>
        )}
        <span>{author.name}</span>
      </Link>
      <time dateTime={date} className="text-muted-foreground">
        {formatDistanceToNow(new Date(date), { addSuffix: true })}
      </time>
    </div>
  );
}