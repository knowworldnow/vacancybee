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
    .fit('max');
};

export async function getPosts(): Promise<BasePost[]> {
  try {
    const posts = await client.fetch<BasePost[]>(`
      *[_type == "post"] | order(publishedAt desc)[0...6] {
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
    `);
    return posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const [post, relatedPosts] = await Promise.all([
      client.fetch<Post>(`
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
      client.fetch<BasePost[]>(`
        *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...4] {
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
      `, { slug })
    ]);

    if (!post) return null;

    return {
      ...post,
      relatedPosts
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getCategory(slug: string) {
  try {
    const category = await client.fetch(`
      *[_type == "category" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
          _id,
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
    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export async function searchPosts(searchTerm: string): Promise<BasePost[]> {
  try {
    const posts = await client.fetch<BasePost[]>(`
      *[_type == "post" && (
        title match $searchTerm + "*" ||
        excerpt match $searchTerm + "*" ||
        pt::text(body) match $searchTerm + "*"
      )] | order(publishedAt desc)[0...10] {
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
    `, { searchTerm: searchTerm.toLowerCase() });
    return posts;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}