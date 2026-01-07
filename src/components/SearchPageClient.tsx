'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Grid, List, ArrowLeft, Download, XCircle, User, Globe, Tag } from 'lucide-react';
import SearchBar from './SearchBar';

// Book type matching your schema
interface Book {
  title: string;
  author: string;
  genre: string;
  language: string;
  url: string | null;
}

// Helper function to create slug
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');

  // Load books from JSON
  useEffect(() => {
    fetch('/books.json')
      .then(res => res.json())
      .then((data: Book[]) => {
        setAllBooks(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading books:', err);
        setIsLoading(false);
      });
  }, []);

  // Get unique values for filters
  const genres = ['all', ...new Set(allBooks.map(b => b.genre))].sort();
  const languages = ['all', ...new Set(allBooks.map(b => b.language))].sort();
  const authors = ['all', ...new Set(allBooks.map(b => b.author))].sort();

  // Perform search when query or filters change
  useEffect(() => {
    if (!allBooks.length) return;

    const normalizedQuery = query.toLowerCase().trim();
    
    const filtered = allBooks.filter((book) => {
      const searchableText = [
        book.title,
        book.author,
        book.genre,
        book.language,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      const matchesLanguage = selectedLanguage === 'all' || book.language === selectedLanguage;
      const matchesAuthor = selectedAuthor === 'all' || book.author === selectedAuthor;
      
      return matchesQuery && matchesGenre && matchesLanguage && matchesAuthor;
    });
    
    setResults(filtered);
  }, [query, selectedGenre, selectedLanguage, selectedAuthor, allBooks]);

  return (
    <div className="min-h-screen bg-archive-paper">
      {/* Header */}
      <div className="bg-white border-b border-archive-tan sticky top-0 z-10">
        <div className="archive-container py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-archive-accent hover:text-archive-brown transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <SearchBar initialQuery={query} />
        </div>
      </div>

      {/* Main Content */}
      <div className="archive-container py-8">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-serif font-medium text-archive-dark">
              {isLoading ? 'Loading...' : query ? `Results for "${query}"` : 'Browse All Books'}
            </h1>
            {!isLoading && (
              <p className="text-archive-accent mt-1">
                Showing {results.length} of {allBooks.length} {results.length === 1 ? 'book' : 'books'}
              </p>
            )}
          </div>

          {/* Filters & View Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="border border-archive-tan rounded-sm px-3 py-1.5 text-sm bg-white text-archive-dark focus:ring-2 focus:ring-archive-brown focus:border-archive-brown"
            >
              <option value="all">All Genres</option>
              {genres.filter(g => g !== 'all').map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            {/* Language Filter */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="border border-archive-tan rounded-sm px-3 py-1.5 text-sm bg-white text-archive-dark focus:ring-2 focus:ring-archive-brown focus:border-archive-brown"
            >
              <option value="all">All Languages</option>
              {languages.filter(l => l !== 'all').map(lang => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            {/* Author Filter */}
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="border border-archive-tan rounded-sm px-3 py-1.5 text-sm bg-white text-archive-dark focus:ring-2 focus:ring-archive-brown focus:border-archive-brown max-w-[200px]"
            >
              <option value="all">All Authors</option>
              {authors.filter(a => a !== 'all').map(author => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex border border-archive-tan rounded-sm overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-archive-brown text-white' : 'bg-white text-archive-accent'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-archive-brown text-white' : 'bg-white text-archive-accent'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-archive-brown"></div>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && results.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-archive-tan mx-auto mb-4" />
            <h2 className="text-xl font-serif font-medium text-archive-dark mb-2">
              No Results Found
            </h2>
            <p className="text-archive-accent">
              Try different keywords or adjust your filters
            </p>
          </div>
        )}

        {/* Results Grid/List */}
        {!isLoading && results.length > 0 && (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-4'
          }>
            {results.map((book, index) => (
              <div
                key={`${slugify(book.title)}-${index}`}
                className={`
                  bg-white border border-archive-tan rounded-sm p-4
                  hover:shadow-md transition-shadow
                  ${viewMode === 'list' ? 'flex items-start gap-4' : ''}
                `}
              >
                <div className="flex-1">
                  {/* Genre Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-3 w-3 text-archive-brown" />
                    <span className="text-xs font-medium text-archive-brown uppercase tracking-wide">
                      {book.genre}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-medium text-archive-dark text-lg mb-2 line-clamp-2">
                    {book.title}
                  </h3>

                  {/* Author */}
                  <div className="flex items-center gap-2 text-sm text-archive-accent mb-1">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span>{book.author}</span>
                  </div>

                  {/* Language */}
                  <div className="flex items-center gap-2 text-sm text-archive-accent mb-4">
                    <Globe className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs bg-archive-paper text-archive-accent px-2 py-1 rounded-sm">
                      {book.language}
                    </span>
                  </div>

                  {/* Download Button */}
                  <div>
                    {book.url ? (
                      <a
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-archive-brown text-white rounded-sm hover:bg-archive-dark transition-colors text-sm"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-500 rounded-sm text-sm cursor-not-allowed">
                        <XCircle className="h-4 w-4" />
                        <span>Not Available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}