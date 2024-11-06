'use client';

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
        <div className="relative w-full aspect-[3/2] overflow-hidden">
          <Image
            src={urlForImage(post.mainImage)
              .width(1200)
              .height(800)
              .quality(90)
              .url()}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority={false}
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
          {post.excerpt}
        </p>
        <time className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
        </time>
      </div>
    </Link>
  );
}