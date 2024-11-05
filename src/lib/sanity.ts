import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';
import type { BasePost, Post } from '@/lib/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
});

export const urlForImage = (source: any) => {
  return imageBuilder?.image(source)
    .auto('format')
    .format('webp')
    .quality(90)
    .fit('max');
};

// Helper function specifically for featured images (3:2 ratio)
export const urlForFeaturedImage = (source: any) => {
  return imageBuilder?.image(source)
    .width(1200)
    .height(800)
    .format('webp')
    .quality(90)
    .fit('crop')
    .crop('entropy');
};

export async function getPosts(): Promise<BasePost[]> {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc)[0...6] {
        _id,
        _type,
        title,
        slug,
        mainImage,
        excerpt,
        publishedAt
      }
    `);
    return posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        _type,
        title,
        slug,
        mainImage,
        excerpt,
        publishedAt,
        body,
        author->{
          _id,
          _type,
          name,
          slug,
          image,
          bio
        },
        categories[]->{
          _id,
          _type,
          title,
          slug,
          description
        },
        "viewCount": coalesce(
          *[_type == "postViews" && post._ref == ^._id][0].views,
          0
        ),
        faqs
      }
    `, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}