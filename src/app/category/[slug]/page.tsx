import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategory } from '@/lib/sanity';
import PostGrid from '@/components/PostGrid';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(params.slug);
  if (!category) return {};

  return {
    title: `${category.title} - Celebrity News`,
    description: category.description || `Latest ${category.title} celebrity news and updates`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategory(params.slug);
  
  if (!category) {
    notFound();
  }

  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground">{category.description}</p>
        )}
      </div>

      {category.posts && category.posts.length > 0 ? (
        <PostGrid posts={category.posts} />
      ) : (
        <p className="text-center text-muted-foreground">
          No posts found in this category.
        </p>
      )}
    </div>
  );
}