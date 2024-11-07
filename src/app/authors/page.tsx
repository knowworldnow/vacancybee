import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { AuthorCard } from '@/components/AuthorCard';
import type { Author } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Our Authors - VacancyBee',
  description: 'Meet our talented team of writers and contributors.',
};

async function getAuthors(): Promise<Author[]> {
  return client.fetch(`
    *[_type == "author"] | order(featured desc, name asc) {
      _id,
      name,
      slug,
      image,
      role,
      social,
      featured,
      "postCount": count(*[_type == "post" && references(^._id)])
    }
  `);
}

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <main className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Authors</h1>
          <p className="text-xl text-muted-foreground">
            Meet our talented team of writers and contributors.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((author: Author) => (
            <AuthorCard key={author._id} author={author} />
          ))}
        </div>
      </div>
    </main>
  );
}