// src/app/search/page.tsx
import { Suspense } from 'react';
import SearchPageClient from '@/components/SearchPageClient';

// Force dynamic rendering - prevents static generation
export const dynamic = 'force-dynamic';

// Metadata for SEO
export const metadata = {
  title: 'Search Books - Book Archive',
  description: 'Search through our collection of books by title, author, or genre.',
};

// Loading skeleton component
function SearchSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-full max-w-xl mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchPageClient />
    </Suspense>
  );
}