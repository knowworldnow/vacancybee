import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { urlForImage } from '@/sanity/lib/image';
import type { BasePost } from '@/lib/types';

interface PostCardProps {
  post: BasePost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link 
      href={`/${post.slug.current}`}
      className="group block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-card"
    >
      {post.mainImage && (
        <div className="relative aspect-[3/2]">
          <Image
            src={urlForImage(post.mainImage)
              .width(800)
              .height(533)
              .quality(90)
              .url()}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105 duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
          {post.excerpt}
        </p>
        <time className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(post.publishedAt), {
            addSuffix: true
          })}
        </time>
      </div>
    </Link>
  );
}