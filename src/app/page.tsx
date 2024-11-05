import Image from 'next/image';
import Link from 'next/link';
import { getPosts, urlForFeaturedImage } from '@/lib/sanity';
import type { BasePost } from '@/lib/types';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12 py-8 bg-gray-50 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Celebrity News & Updates</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your trusted source for the latest celebrity news and entertainment updates
        </p>
      </section>

      {/* Latest Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Stories</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post: BasePost) => (
            <article 
              key={post._id} 
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
            >
              {post.mainImage && (
                <div className="relative aspect-[3/2]">
                  <Image
                    src={urlForFeaturedImage(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  <Link 
                    href={`/${post.slug.current}`} 
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                  {post.excerpt}
                </p>
                <time className="text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mt-16 bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter for the latest celebrity news and updates
        </p>
        <form className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}