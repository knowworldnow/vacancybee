import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import type { BasePost, Post } from '@/lib/types';
import { unstable_cache } from 'next/cache';

interface PostsResponse {
  posts: BasePost[];
  total: number;
  totalPages: number;
}

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

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source)
    .auto('format')
    .format('webp')
    .quality(90)
    .fit('max');
};

export const urlForFeaturedImage = (source: Image) => {
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
  async (page = 1): Promise<PostsResponse> => {
    try {
      const postsPerPage = 6;
      const start = (page - 1) * postsPerPage;
      const end = start + postsPerPage;

      const query = `
        *[_type == "post"] | order(publishedAt desc)[$start...$end] {
          _id,
          _type,
          title,
          slug,
          mainImage,
          excerpt,
          publishedAt
        }
      `;

      const countQuery = `count(*[_type == "post"])`;

      const [posts, total] = await Promise.all([
        client.fetch<BasePost[]>(query, { start, end }),
        client.fetch<number>(countQuery)
      ]);

      return {
        posts: posts || [],
        total,
        totalPages: Math.ceil(total / postsPerPage)
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return {
        posts: [],
        total: 0,
        totalPages: 0
      };
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
        const query = `
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
        `;

        const recentPostsQuery = `
          *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...10] {
            _id,
            _type,
            title,
            slug,
            mainImage,
            excerpt,
            publishedAt
          }
        `;

        const [post, recentPosts] = await Promise.all([
          client.fetch<Post>(query, { slug }),
          client.fetch<BasePost[]>(recentPostsQuery, { slug })
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

// Search posts
export const searchPosts = async (searchQuery: string): Promise<BasePost[]> => {
  try {
    const query = `
      *[_type == "post" && (
        title match $searchQuery + "*" ||
        excerpt match $searchQuery + "*" ||
        pt::text(body) match $searchQuery + "*"
      )] | order(publishedAt desc)[0...10] {
        _id,
        _type,
        title,
        slug,
        mainImage,
        excerpt,
        publishedAt
      }
    `;

    const params = { searchQuery: searchQuery.toLowerCase() };
    const posts = await client.fetch<BasePost[]>(query, params);
    return posts || [];
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
};
