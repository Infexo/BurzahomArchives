// src/components/SearchPageClient.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import BookCard from './BookCard';
import { Book } from '@/lib/types';

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!query.trim()) {
        setBooks([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Option 1: Fetch from API route
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
        
        const data = await response.json();
        setBooks(data.books || []);
      } catch (err) {
        setError('Failed to load search results. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Books</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar initialQuery={query} />
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      ) : query && books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No books found for "{query}"</p>
        </div>
      ) : books.length > 0 ? (
        <>
          <p className="text-gray-600 mb-4">
            Found {books.length} result{books.length !== 1 ? 's' : ''} for "{query}"
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.slug || book.id} book={book} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Enter a search term to find books</p>
        </div>
      )}
    </div>
  );
}