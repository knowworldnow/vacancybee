'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { client } from '@/lib/sanity';
import SearchResults from './SearchResults';
import type { BasePost } from '@/lib/types';

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BasePost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchPosts = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const searchQuery = `*[_type == "post" && (
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
          publishedAt
        }`;

        const params = {
          searchTerm: query.toLowerCase()
        };

        const posts = await client.fetch(searchQuery, params);
        setResults(posts);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Search posts</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
            autoFocus
          />
          <SearchResults 
            results={results} 
            loading={loading} 
            onSelect={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
