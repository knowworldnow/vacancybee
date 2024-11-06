import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { getPost, urlForImage } from '@/lib/sanity';
import { portableTextComponents } from '@/lib/portableTextComponents';
import { Card } from '@/components/ui/card';
import TableOfContents from '@/components/TableOfContents';
import RecentPosts from '@/components/RecentPosts';
import SocialShare from '@/components/SocialShare';
import FAQSection from '@/components/FAQSection';
import Comments from '@/components/Comments';
import RelatedPosts from '@/components/RelatedPosts';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://vacancybee.com'}/${params.slug}`;

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Social Share - Desktop/Tablet */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <SocialShare url={url} title={post.title} />
          </div>
        </div>

        {/* Main Content */}
        <article className="lg:col-span-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <p>By {post.author.name}</p>
              <time>
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            </div>
          </header>

          {post.mainImage && (
            <div className="relative aspect-[3/2] mb-8">
              <Image
                src={urlForImage(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
                priority
                sizes="(min-width: 1024px) 800px, 100vw"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <PortableText 
              value={post.body} 
              components={portableTextComponents}
            />
          </div>

          {/* FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mb-12">
              <FAQSection faqs={post.faqs} />
            </div>
          )}

          {/* Social Share - Mobile */}
          <div className="lg:hidden mb-12">
            <SocialShare url={url} title={post.title} orientation="horizontal" />
          </div>

          {/* Related Posts */}
          <div className="mb-12">
            <RelatedPosts 
              currentPostId={post._id}
              categories={post.categories.map(cat => cat._id)}
            />
          </div>

          {/* Comments Section */}
          <Comments postId={post._id} />
        </article>

        {/* Sidebar - Desktop/Tablet */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-8">
            <Card className="p-6">
              <TableOfContents />
            </Card>

            <Card className="p-6">
              <RecentPosts posts={post.recentPosts || []} />
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}