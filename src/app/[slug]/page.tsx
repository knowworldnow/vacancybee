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
import SocialShare from '@/components/SocialShare';
import { generateArticleSchema } from '@/lib/schema';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  const ogImage = post.mainImage ? urlForImage(post.mainImage).url() : undefined;
  const canonicalUrl = `https://vacancybee.com/${params.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: ogImage ? [ogImage] : [],
      url: canonicalUrl,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const url = `https://vacancybee.com/${params.slug}`;
  const ogImage = post.mainImage ? urlForImage(post.mainImage).url() : undefined;

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    image: ogImage || '',
    url,
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
    authorName: post.author.name,
    authorUrl: `https://vacancybee.com/author/${post.author.slug.current}`,
  });

  return (
    <div className="container py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>

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

          {post.faqs && post.faqs.length > 0 && (
            <div className="mb-12">
              <FAQSection faqs={post.faqs} />
            </div>
          )}

          {post.author && (
            <Card className="p-6 mb-12">
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
          )}

          <div className="lg:hidden mb-12">
            <SocialShare url={url} title={post.title} orientation="horizontal" />
          </div>

          <Comments postId={post._id} />
        </article>

        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            <Card className="p-6">
              <TableOfContents />
            </Card>

            <Card className="p-6">
              <RecentPosts limit={5} currentPostId={post._id} />
            </Card>

            <div className="sticky top-24">
              <SocialShare url={url} title={post.title} orientation="vertical" />
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <RelatedPosts 
          currentPostId={post._id}
          categories={post.categories.map(cat => cat._id)}
        />
      </section>
    </div>
  );
}