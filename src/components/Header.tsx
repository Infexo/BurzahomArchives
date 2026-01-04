// src/components/Header.tsx
import Link from 'next/link';
import { Search } from 'lucide-react';

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
            {/* Your custom SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g style={{fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'}}
                 transform="matrix(1.857746,0,0,1.857746,2.1094193,2.0841917)">
                <path d="M 19,17 V 5 A 2,2 0 0 0 17,3 H 4" />
                <path d="m 8,21 h 12 a 2,2 0 0 0 2,-2 V 18 A 1,1 0 0 0 21,17 H 11 a 1,1 0 0 0 -1,1 v 1 A 2,2 0 1 1 6,19 V 5 A 2,2 0 1 0 2,5 v 2 a 1,1 0 0 0 1,1 h 3" />
              </g>
              <g style={{fill: 'none', stroke: 'currentColor', strokeWidth: 2.75, strokeLinecap: 'round', strokeLinejoin: 'round'}}
                 transform="translate(13.485145,9.1592997)">
                <path d="m 6,12 h 9 a 4,4 0 0 1 0,8 H 7 A 1,1 0 0 1 6,19 V 5 A 1,1 0 0 1 7,4 h 7 a 4,4 0 0 1 0,8" />
              </g>
            </svg>
            
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