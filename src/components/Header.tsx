// src/components/Header.tsx
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import SearchDialog from './SearchDialog';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Left side - Site Title */}
        <Link href="/" className="text-2xl font-bold">
          VacancyBee
        </Link>

        {/* Right side - Search and Theme Toggle */}
        <div className="flex items-center gap-4">
          <SearchDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
