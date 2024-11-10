import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { urlForImage } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';
import type { BasePost } from '@/lib/types';

interface RecentPostsProps {
  limit?: number;
  currentPostId?: string;
}

async function getRecentPosts(limit: number = 5, currentPostId?: string) {
  const query = currentPostId 
    ? `*[_type == "post" && _id != $currentPostId] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        slug,
        mainImage,
        excerpt,
        publishedAt,
        categories[]->{
          _id,
          title,
          slug
        }
      }`
    : `*[_type == "post"] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        slug,
        mainImage,
        excerpt,
        publishedAt,
        categories[]->{
          _id,
          title,
          slug
        }
      }`;

  return client.fetch<BasePost[]>(query, { limit: limit - 1, currentPostId });
}

export default async function RecentPosts({ limit = 5, currentPostId }: RecentPostsProps) {
  const posts = await getRecentPosts(limit, currentPostId);

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold">Recent Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => {
          const imageUrl = post.mainImage ? urlForImage(post.mainImage)?.url() : undefined;

          return (
            <Link
              key={post._id}
              href={`/${post.slug.current}`}
              className="flex gap-4 group items-start"
            >
              {imageUrl && (
                <div className="relative w-20 aspect-[3/2] flex-shrink-0 bg-muted rounded">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-contain rounded"
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
          );
        })}
      </div>
    </div>
  );
}