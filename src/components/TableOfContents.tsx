'use client';

import { useEffect, useState } from 'react';
import { Link } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const articleHeadings = Array.from(document.querySelectorAll('article h2, article h3'))
      .map((heading) => {
        const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
        if (!heading.id) heading.id = id;
        return {
          id,
          text: heading.textContent || '',
          level: Number(heading.tagName[1]),
        };
      });

    setHeadings(articleHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );

    const observeElements = () => {
      articleHeadings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.observe(element);
      });
    };

    // Initial observation
    observeElements();

    // Re-observe when FAQ sections are toggled
    const faqButtons = document.querySelectorAll('[data-faq-button]');
    faqButtons.forEach(button => {
      button.addEventListener('click', () => {
        setTimeout(observeElements, 100); // Allow time for content to expand
      });
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-2">
      <div className="flex items-center gap-2 font-semibold mb-4">
        <Link className="h-4 w-4" />
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block hover:text-primary transition-colors ${
                activeId === heading.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}