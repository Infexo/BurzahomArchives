// src/components/SearchResults.tsx
'use client';

import { Book } from '@/lib/types';
import BookCard from './BookCard';
import { FileQuestion } from 'lucide-react';

interface SearchResultsProps {
  books: Book[];
  query?: string;
}

export default function SearchResults({ books, query }: SearchResultsProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <FileQuestion className="h-16 w-16 text-archive-tan mx-auto mb-4" />
        <h3 className="text-lg font-medium text-archive-dark mb-2">
          No books found
        </h3>
        <p className="text-archive-accent">
          {query
            ? `No results for "${query}". Try adjusting your search or filters.`
            : 'Try searching for a title, author, or language.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-archive-accent">
        Found {books.length} {books.length === 1 ? 'book' : 'books'}
        {query && ` for "${query}"`}
      </p>
      
      <div className="grid gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} showGenre />
        ))}
      </div>
    </div>
  );
}