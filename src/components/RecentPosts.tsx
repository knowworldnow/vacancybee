import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { urlForImage } from '@/lib/sanity';
import type { BasePost } from '@/lib/types';

interface RecentPostsProps {
  posts: BasePost[];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold">Recent Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/${post.slug.current}`}
            className="flex gap-4 group"
          >
            {post.mainImage && (
              <div className="relative w-20 aspect-[3/2] flex-shrink-0">
                <Image
                  src={urlForImage(post.mainImage)
                    .width(80)
                    .height(53)
                    .url()}
                  alt={post.title}
                  fill
                  className="object-cover rounded"
                  sizes="80px"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <time className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.publishedAt), {
                  addSuffix: true,
                })}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}