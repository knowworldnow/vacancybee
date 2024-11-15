'use client';

import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';

const SearchResults = dynamic(() => import('./SearchResults'), { ssr: false });

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPosts = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const posts = await res.json();
      setResults(posts);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-10 h-10 p-0">
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
            onKeyUp={(e) => e.key === 'Enter' && searchPosts()}
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