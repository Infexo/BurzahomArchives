'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Book } from '@/lib/types';
import SearchBar from './SearchBar';
import BookCard from './BookCard';
import { FileQuestion } from 'lucide-react';

interface SearchPageClientProps {
  books: Book[];
  allGenres: string[];
  allLanguages: string[];
}

export default function SearchPageClient({ 
  books, 
  allGenres, 
  allLanguages 
}: SearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const query = mounted ? (searchParams.get('q') || '') : '';
  const genreFilter = mounted ? (searchParams.get('genre') || '') : '';
  const languageFilter = mounted ? (searchParams.get('language') || '') : '';

  // Filter books based on search
  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return books.filter(book => {
      const matchesQuery =
        !normalizedQuery ||
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.author.toLowerCase().includes(normalizedQuery) ||
        book.languages.some(l => l.toLowerCase().includes(normalizedQuery));

      const matchesGenre =
        !genreFilter || book.genre.toLowerCase() === genreFilter.toLowerCase();

      const matchesLanguage =
        !languageFilter || book.languages.some(l => 
          l.toLowerCase() === languageFilter.toLowerCase()
        );

      return matchesQuery && matchesGenre && matchesLanguage;
    });
  }, [books, query, genreFilter, languageFilter]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    router.push(`/search?${params.toString()}`);
  };

  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-archive-paper rounded-sm mb-8 max-w-2xl" />
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="h-64 bg-archive-paper rounded-sm" />
          <div className="lg:col-span-3 space-y-4">
            <div className="h-32 bg-archive-paper rounded-sm" />
            <div className="h-32 bg-archive-paper rounded-sm" />
          </div>
        </div>
      </div>
    );
  }

  const hasFilters = genreFilter || languageFilter;

  return (
    <>
      <div className="mb-8 max-w-2xl">
        <SearchBar />
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-archive-tan rounded-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-archive-dark">Filters</h3>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-archive-brown hover:text-archive-dark"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-archive-accent mb-2">
                Genre
              </label>
              <select
                value={genreFilter}
                onChange={(e) => updateFilter('genre', e.target.value)}
                className="w-full px-3 py-2 bg-archive-paper border border-archive-tan rounded-sm
                           focus:outline-none focus:ring-2 focus:ring-archive-brown"
              >
                <option value="">All Genres</option>
                {allGenres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-archive-accent mb-2">
                Language
              </label>
              <select
                value={languageFilter}
                onChange={(e) => updateFilter('language', e.target.value)}
                className="w-full px-3 py-2 bg-archive-paper border border-archive-tan rounded-sm
                           focus:outline-none focus:ring-2 focus:ring-archive-brown"
              >
                <option value="">All Languages</option>
                {allLanguages.map((language) => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Results */}
        <section className="lg:col-span-3">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <FileQuestion className="h-16 w-16 text-archive-tan mx-auto mb-4" />
              <h3 className="text-lg font-medium text-archive-dark mb-2">
                No books found
              </h3>
              <p className="text-archive-accent">
                {query ? `No results for "${query}".` : 'Try searching for a title or author.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-archive-accent">
                Found {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
                {query && ` for "${query}"`}
              </p>
              <div className="grid gap-4">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} showGenre />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}