import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { urlForImage } from '@/sanity/lib/image';
import { Badge } from '@/components/ui/badge';
import type { BasePost } from '@/lib/types';

interface PostCardProps {
  post: BasePost;
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = post.mainImage ? urlForImage(post.mainImage) : undefined;

  return (
    <Link href={`/${post.slug.current}`}>
      <article className="group relative flex flex-col h-full overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow">
        {imageUrl && (
          <div className="relative aspect-[3/2] bg-muted">
            <Image
              src={imageUrl.toString()}
              alt={post.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        )}
        
        <div className="flex-1 p-6">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Badge
                  key={category._id}
                  variant="secondary"
                  className="hover:bg-secondary/60"
                >
                  {category.title}
                </Badge>
              ))}
            </div>
          )}
          
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          
          <time className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.publishedAt), {
              addSuffix: true,
            })}
          </time>
        </div>
      </article>
    </Link>
  );
}