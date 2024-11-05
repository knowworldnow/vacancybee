import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vacancybee.com';

  // Fetch all posts
  const posts = await client.fetch(`
    *[_type == "post"] {
      slug,
      _updatedAt
    }
  `);

  // Fetch all pages
  const pages = await client.fetch(`
    *[_type == "page"] {
      slug,
      _updatedAt
    }
  `);

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // Post pages
  const postPages = posts.map((post: any) => ({
    url: `${baseUrl}/${post.slug.current}/`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Regular pages
  const regularPages = pages.map((page: any) => ({
    url: `${baseUrl}/${page.slug.current}/`,
    lastModified: new Date(page._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...postPages, ...regularPages];
}
