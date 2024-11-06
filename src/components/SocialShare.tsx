'use client';

import { useEffect, useState } from 'react';
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link as LinkIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface SocialShareProps {
  url: string;
  title: string;
  orientation?: 'vertical' | 'horizontal';
}

export default function SocialShare({
  url,
  title,
  orientation = 'vertical',
}: SocialShareProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contentStart = document.querySelector('.prose')?.getBoundingClientRect().top;
      const contentEnd = document.querySelector('.prose')?.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      if (contentStart && contentEnd) {
        if (contentStart <= windowHeight / 2 && contentEnd >= windowHeight / 2) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: 'The article URL has been copied to your clipboard.',
      });
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again or copy the URL manually.',
        variant: 'destructive',
      });
    }
  };

  const containerClasses = orientation === 'vertical'
    ? 'flex-col fixed left-4 top-1/2 transform -translate-y-1/2 z-10 transition-opacity duration-300'
    : 'flex-row justify-center';

  const visibilityClasses = orientation === 'vertical'
    ? visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    : '';

  return (
    <div
      className={`flex gap-2 ${containerClasses} ${visibilityClasses}`}
      aria-label="Share this article"
    >
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="outline"
          size="icon"
          onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
          title={`Share on ${link.name}`}
          className="bg-background hover:bg-accent"
        >
          <link.icon className="h-4 w-4" />
          <span className="sr-only">Share on {link.name}</span>
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        title="Copy link"
        className="bg-background hover:bg-accent"
      >
        <LinkIcon className="h-4 w-4" />
        <span className="sr-only">Copy link</span>
      </Button>
    </div>
  );
}