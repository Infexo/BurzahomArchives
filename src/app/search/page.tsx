// src/app/search/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import { getArchiveData, searchBooks } from '@/lib/data';
import { slugify } from '@/lib/utils';
import Breadcrumb from '@/components/Breadcrumb';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import SearchResults from '@/components/SearchResults';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the Digital Archive for books by title, author, or language.',
};

interface SearchPageProps {
  searchParams: { q?: string; genre?: string; language?: string };
}
export const dynamic = "force-dynamic"

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { allGenres, allLanguages } = getArchiveData();
  
  const query = searchParams.q || '';
  const genreFilter = searchParams.genre ? slugify(searchParams.genre) : undefined;
  const languageFilter = searchParams.language ? slugify(searchParams.language) : undefined;
  
  const results = searchBooks(query, {
    genre: genreFilter,
    language: languageFilter,
  });

  return (
    <div className="archive-container">
      <Breadcrumb items={[{ label: 'Search' }]} />

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-archive-dark mb-4">
          Search the Archive
        </h1>
        
        <Suspense fallback={<div className="h-12 bg-archive-paper animate-pulse rounded-sm" />}>
          <SearchBar className="max-w-2xl" />
        </Suspense>
      </header>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <Suspense fallback={<div className="h-64 bg-archive-paper animate-pulse rounded-sm" />}>
            <FilterSidebar genres={allGenres} languages={allLanguages} />
          </Suspense>
        </aside>

        {/* Results */}
        <section className="lg:col-span-3">
          <SearchResults books={results} query={query} />
        </section>
      </div>
    </div>
  );
}