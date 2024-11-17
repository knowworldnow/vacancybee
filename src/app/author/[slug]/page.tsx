import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import PostGrid from '@/components/PostGrid';
import { BasePost } from '@/lib/types';

type Props = {
  params: { slug: string };
};

type AuthorData = {
  _id: string;
  name: string;
  image: any;
  bio: any[];
  posts: BasePost[];
};

async function getAuthor(slug: string): Promise<AuthorData | null> {
  return client.fetch(`
    *[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      image,
      bio,
      "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
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
    }
  `, { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getAuthor(params.slug);
  if (!author) return {};

  const imageUrl = author.image ? urlForImage(author.image)?.url() : undefined;
  const canonicalUrl = `https://vacancybee.com/author/${params.slug}`;

  return {
    title: `${author.name} - Author Profile | VacancyBee`,
    description: `Read articles by ${author.name} on VacancyBee - Your trusted source for job opportunities and career insights.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${author.name} - Author Profile | VacancyBee`,
      description: `Read articles by ${author.name} on VacancyBee - Your trusted source for job opportunities and career insights.`,
      images: imageUrl ? [{ url: imageUrl, width: 800, height: 600, alt: author.name }] : [],
      url: canonicalUrl,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${author.name} - Author Profile | VacancyBee`,
      description: `Read articles by ${author.name} on VacancyBee - Your trusted source for job opportunities and career insights.`,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const author = await getAuthor(params.slug);
  if (!author) notFound();

  const imageUrl = author.image ? urlForImage(author.image)?.url() : undefined;

  return (
    <div className="container py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {imageUrl && (
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Image
                src={imageUrl}
                alt={author.name}
                fill
                className="object-cover rounded-full"
                sizes="(min-width: 768px) 128px, 96px"
                priority
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{author.name}</h1>
          {author.bio && (
            <div className="prose prose-lg dark:prose-invert mx-auto mb-6">
              <PortableText value={author.bio} />
            </div>
          )}
        </div>

        {author.posts && author.posts.length > 0 ? (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Articles by {author.name}</h2>
            <PostGrid posts={author.posts} />
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No articles found for this author.
          </p>
        )}
      </div>
    </div>
  );
}