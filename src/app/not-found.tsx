// src/app/not-found.tsx
import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="archive-container text-center py-16">
      <FileQuestion className="h-24 w-24 text-archive-tan mx-auto mb-6" />
      
      <h1 className="text-3xl font-serif font-medium text-archive-dark mb-4">
        Page Not Found
      </h1>
      
      <p className="text-archive-accent mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      
      <div className="flex justify-center gap-4">
        <Link href="/" className="archive-button">
          Return Home
        </Link>
        <Link href="/search" className="archive-button-secondary">
          Search Archive
        </Link>
      </div>
    </div>
  );
}