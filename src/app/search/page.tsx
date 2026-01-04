import { Suspense } from 'react';
import SearchPageClient from '@/components/SearchPageClient';

export const metadata = {
  title: 'Search | Burzahom Archives',
  description: 'Search books, documents, and literature from Kashmir in the Burzahom Archives',
};

// Loading component for Suspense
function SearchLoading() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-stone-600">Loading search...</p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchPageClient />
    </Suspense>
  );
}