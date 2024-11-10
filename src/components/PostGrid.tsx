import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { urlForImage } from '@/sanity/lib/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BasePost } from '@/lib/types';

interface PostGridProps {
  posts: BasePost[];
  columns?: 2 | 3 | 4;
}

export default function PostGrid({ posts, columns = 3 }: PostGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
      {posts.map((post) => {
        const imageUrl = post.mainImage ? urlForImage(post.mainImage) : undefined;

        return (
          <Link key={post._id} href={`/${post.slug.current}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              {imageUrl && (
                <div className="aspect-video relative bg-muted">
                  <Image
                    src={imageUrl.toString()}
                    alt={post.title}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
              )}
              <CardContent className="p-6">
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
                <p className="text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="px-6 py-4 border-t">
                <time className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(post.publishedAt), {
                    addSuffix: true,
                  })}
                </time>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}