import Image from 'next/image';
import Link from 'next/link';
import { getPosts, urlForFeaturedImage } from '@/lib/sanity';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const currentPage = Number(searchParams.page) || 1;
  const { posts, totalPages } = await getPosts(currentPage);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-r from-primary/90 to-primary dark:from-primary/70 dark:to-primary/60">
        <div className="container px-4 mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Source for Celebrity News
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Get the latest updates, exclusive interviews, and behind-the-scenes content
            from your favorite celebrities.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/posts">Explore Stories</Link>
          </Button>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8">Latest Stories</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pathPrefix="/"
              />
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest celebrity news and updates.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border bg-background"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {['Movies', 'Music', 'Television'].map((category) => (
              <Card key={category} className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <p className="text-muted-foreground mb-4">
                  Latest updates from the world of {category.toLowerCase()}
                </p>
                <Button variant="outline" asChild>
                  <Link href={`/category/${category.toLowerCase()}`}>
                    Explore {category}
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
