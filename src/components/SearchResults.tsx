import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { urlForImage } from '@/lib/sanity';
import type { BasePost } from '@/lib/types';

interface SearchResultsProps {
  results: BasePost[];
  loading: boolean;
  onSelect: () => void;
}

export default function SearchResults({ results, loading, onSelect }: SearchResultsProps) {
  if (loading) {
    return <p className="text-center py-4">Searching...</p>;
  }

  if (results.length === 0) {
    return <p className="text-center py-4">No results found</p>;
  }

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
      {results.map((post) => (
        <Link
          key={post._id}
          href={`/${post.slug.current}`}
          onClick={onSelect}
          className="flex gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
        >
          {post.mainImage && (
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={urlForImage(post.mainImage).width(64).height(64).url()}
                alt={post.title}
                fill
                className="object-cover rounded"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium line-clamp-1">{post.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {post.excerpt}
            </p>
            <time className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
            </time>
          </div>
        </Link>
      ))}
    </div>
  );
}