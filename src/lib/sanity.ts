import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';
import type { BasePost, Post } from '@/lib/types';
import { unstable_cache } from 'next/cache';

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

export const urlForFeaturedImage = (source: any) => {
  return imageBuilder?.image(source)
    .width(1200)
    .height(800)
    .format('webp')
    .quality(90)
    .fit('crop')
    .crop('entropy');
};

// Cache the posts query with tags
export const getPosts = unstable_cache(
  async (): Promise<BasePost[]> => {
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
  },
  ['posts'],
  {
    tags: ['posts', 'layout'],
    revalidate: 3600 // Cache for 1 hour
  }
);

// Cache individual post queries with tags
export const getPost = async (slug: string): Promise<Post | null> => {
  return unstable_cache(
    async (): Promise<Post | null> => {
      try {
        const [post, recentPosts] = await Promise.all([
          client.fetch(`
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
          `, { slug }),
          client.fetch(`
            *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...10] {
              _id,
              _type,
              title,
              slug,
              mainImage,
              excerpt,
              publishedAt
            }
          `, { slug })
        ]);

        if (!post) return null;

        return {
          ...post,
          recentPosts
        };
      } catch (error) {
        console.error('Error fetching post:', error);
        return null;
      }
    },
    ['post', slug],
    {
      tags: ['posts', `post-${slug}`],
      revalidate: 3600 // Cache for 1 hour
    }
  )();
};