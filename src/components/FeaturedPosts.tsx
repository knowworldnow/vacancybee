import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BasePost, Category } from '@/lib/types';

interface FeaturedPostsProps {
  posts: BasePost[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link key={post._id} href={`/${post.slug.current}`}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              {post.mainImage && (
                <Image
                  src={urlForImage(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              )}
            </div>
            <CardContent className="p-6">
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {post.categories.map((category: Category) => (
                    <Badge 
                      key={category.slug.current} 
                      variant="secondary"
                    >
                      {category.title}
                    </Badge>
                  ))}
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="px-6 py-4 border-t">
              <time className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
              </time>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}