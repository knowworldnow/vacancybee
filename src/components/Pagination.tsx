'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pathPrefix?: string;
}

export default function Pagination({ 
  currentPage, 
  totalPages,
  pathPrefix = ''
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisible = 5;
  
  let visiblePages = pages;
  if (totalPages > maxVisible) {
    const start = Math.max(
      Math.min(
        currentPage - Math.floor(maxVisible / 2),
        totalPages - maxVisible + 1
      ),
      1
    );
    visiblePages = pages.slice(start - 1, start + maxVisible - 1);
  }

  const getPageUrl = (page: number) => {
    if (page === 1) return pathPrefix || '/';
    return `${pathPrefix}?page=${page}`;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        asChild
      >
        <Link href={getPageUrl(currentPage - 1)}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Link>
      </Button>

      {visiblePages[0] > 1 && (
        <>
          <Button variant="outline" size="icon" asChild>
            <Link href={pathPrefix || '/'}>1</Link>
          </Button>
          {visiblePages[0] > 2 && (
            <span className="text-muted-foreground">...</span>
          )}
        </>
      )}

      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="icon"
          asChild
        >
          <Link href={getPageUrl(page)}>{page}</Link>
        </Button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="text-muted-foreground">...</span>
          )}
          <Button variant="outline" size="icon" asChild>
            <Link href={getPageUrl(totalPages)}>{totalPages}</Link>
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        asChild
      >
        <Link href={getPageUrl(currentPage + 1)}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Link>
      </Button>
    </div>
  );
}
