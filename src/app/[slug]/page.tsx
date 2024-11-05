import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { client, urlForImage } from '@/lib/sanity';
import { portableTextComponents } from '@/lib/portableTextComponents';

type Props = {
  params: { slug: string };
};

async function getPost(slug: string) {
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      mainImage,
      body,
      publishedAt,
      author->{
        name
      },
      categories[]->{
        title
      }
    }
  `, { slug });
  return post;
}

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

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <p>By {post.author.name}</p>
          <time>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
          <div className="flex gap-2">
            {post.categories?.map((cat: any) => (
              <span key={cat.title} className="bg-gray-100 px-2 py-1 rounded text-sm">
                {cat.title}
              </span>
            ))}
          </div>
        </div>
      </header>

      {post.mainImage && (
        <div className="relative aspect-video mb-8">
          <Image
            src={urlForImage(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg prose-gray max-w-none">
        <PortableText 
          value={post.body} 
          components={portableTextComponents}
        />
      </div>
    </article>
  );
}