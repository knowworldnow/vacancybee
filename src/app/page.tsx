import Image from 'next/image';
import Link from 'next/link';
import { getPosts, urlForFeaturedImage } from '@/lib/sanity';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';
import Pagination from '@/components/Pagination';

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const currentPage = Number(searchParams.page) || 1;
  const { posts, totalPages } = await getPosts(currentPage);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-background border-b">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Celebrity News & Updates
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your trusted source for the latest celebrity news and entertainment updates
          </p>
          <Button asChild size="lg">
            <Link href="#latest-stories">Read Latest Stories</Link>
          </Button>
        </div>
      </section>

      {/* Latest Posts */}
      <section id="latest-stories" className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8">Latest Stories</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link 
                key={post._id} 
                href={`/${post.slug.current}/`}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                  {post.mainImage && (
                    <div className="relative aspect-[3/2]">
                      <Image
                        src={urlForFeaturedImage(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <time className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(post.publishedAt), {
                        addSuffix: true
                      })}
                    </time>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest celebrity news and updates
          </p>
          <form className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
              required
            />
            <Button type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
