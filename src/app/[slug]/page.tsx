import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { getPost, urlForImage } from '@/lib/sanity';
import { portableTextComponents } from '@/lib/portableTextComponents';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TableOfContents from '@/components/TableOfContents';
import RecentPosts from '@/components/RecentPosts';
import FAQSection from '@/components/FAQSection';
import Comments from '@/components/Comments';
import RelatedPosts from '@/components/RelatedPosts';
import { generateArticleSchema, generateFAQSchema } from '@/lib/schema';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  const ogImage = post.mainImage ? urlForImage(post.mainImage).url() : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://vacancybee.com'}/${params.slug}`;
  const ogImage = post.mainImage ? urlForImage(post.mainImage).url() : undefined;

  // Generate schema markup
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    image: ogImage || '',
    url,
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt, // Use published time if no modified time available
    authorName: post.author.name,
    authorUrl: `/author/${post.author.slug.current}`,
  });

  const faqSchema = post.faqs ? generateFAQSchema(
    post.faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
        .map(block => 
          block.children
            ?.map((child: any) => child.text)
            .join(' ') || ''
        )
        .join(' ')
    }))
  ) : null;

  return (
    <div className="container py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <article className="lg:col-span-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              {/* Author */}
              <Link 
                href={`/author/${post.author.slug.current}`}
                className="flex items-center gap-2 hover:text-foreground"
              >
                {post.author.image && (
                  <Image
                    src={urlForImage(post.author.image).url()}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span>{post.author.name}</span>
              </Link>

              {/* Date */}
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {post.categories.map(category => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug.current}`}
                  >
                    <Badge variant="secondary">{category.title}</Badge>
                  </Link>
                ))}
              </div>
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

          {/* FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mb-12">
              <FAQSection faqs={post.faqs} />
            </div>
          )}

          {/* Comments */}
          <Comments postId={post._id} />
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            {/* Author Card */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                {post.author.image && (
                  <Image
                    src={urlForImage(post.author.image).url()}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <Link
                    href={`/author/${post.author.slug.current}`}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
              {post.author.bio && (
                <div className="prose prose-sm dark:prose-invert">
                  <PortableText value={post.author.bio} />
                </div>
              )}
            </Card>

            {/* Table of Contents */}
            <Card className="p-6">
              <TableOfContents />
            </Card>

            {/* Recent Posts */}
            <Card className="p-6">
              <RecentPosts limit={5} currentPostId={post._id} />
            </Card>
          </div>
        </aside>
      </div>

      {/* Related Posts */}
      <section className="mt-16">
        <RelatedPosts 
          currentPostId={post._id}
          categories={post.categories.map(cat => cat._id)}
        />
      </section>
    </div>
  );
}