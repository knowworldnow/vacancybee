import { client } from '@/sanity/lib/client';
import FeaturedPosts from '@/components/FeaturedPosts';
import CategoryList from '@/components/CategoryList';
import type { BasePost, Category } from '@/lib/types';

async function getLatestPosts(): Promise<BasePost[]> {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0...6] {
      _id,
      _type,
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
    }
  `);
}

async function getCategories(): Promise<Category[]> {
  return await client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      slug,
      icon
    }
  `);
}

export default async function Home() {
  const [latestPosts, categories] = await Promise.all([
    getLatestPosts(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-r from-primary/90 to-primary">
        <div className="container px-4 mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Source for Celebrity News
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Get the latest updates, exclusive interviews, and behind-the-scenes content
            from your favorite celebrities.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse Categories</h2>
          <CategoryList categories={categories} />
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
          <FeaturedPosts posts={latestPosts} />
        </div>
      </section>
    </main>
  );
}