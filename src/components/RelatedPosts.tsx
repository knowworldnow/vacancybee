import { client } from '@/sanity/lib/client';
import PostGrid from './PostGrid';

interface RelatedPostsProps {
  currentPostId: string;
  categories: string[];
}

async function getRelatedPosts(currentPostId: string, categories: string[]) {
  return client.fetch(`
    *[_type == "post" && 
      _id != $currentPostId && 
      count((categories[]->_id)[@ in $categories]) > 0
    ] | order(publishedAt desc)[0...4] {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt,
      categories[]->{
        title,
        slug
      }
    }
  `, { currentPostId, categories });
}

export default async function RelatedPosts({
  currentPostId,
  categories,
}: RelatedPostsProps) {
  const posts = await getRelatedPosts(currentPostId, categories);

  if (posts.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <PostGrid posts={posts} />
    </div>
  );
}