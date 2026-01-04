// src/components/Header.tsx
import Link from 'next/link';
import { BookOpen, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-archive-tan sticky top-0 z-50">
      <div className="archive-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-archive-dark hover:text-archive-brown transition-colors"
          >
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-serif font-medium">
              Burzahom Archives
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-archive-accent hover:text-archive-dark transition-colors"
            >
              About
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-1 text-archive-accent hover:text-archive-dark transition-colors"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}