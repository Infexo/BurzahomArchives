'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Grid, List, ArrowLeft } from 'lucide-react';
import SearchBar from './SearchBar';
import { booksData, StaticBook } from '@/data/books-static';

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<StaticBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  // Get unique genres and languages for filters
  const genres = ['all', ...new Set(booksData.map(b => b.genreSlug))];
  const languages = ['all', ...new Set(booksData.flatMap(b => b.languageSlugs))];

  // Perform search when query or filters change
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        const normalizedQuery = query.toLowerCase().trim();
        
        const filtered = booksData.filter((book) => {
          // Text search
          const searchableText = [
            book.title,
            book.author,
            book.genre,
            ...book.languages,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
          
          const matchesQuery = searchableText.includes(normalizedQuery);
          
          // Filter by genre
          const matchesGenre = selectedGenre === 'all' || book.genreSlug === selectedGenre;
          
          // Filter by language
          const matchesLanguage = selectedLanguage === 'all' || book.languageSlugs.includes(selectedLanguage);
          
          return matchesQuery && matchesGenre && matchesLanguage;
        });
        
        setResults(filtered);
        setIsLoading(false);
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query, selectedGenre, selectedLanguage]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-stone-600 hover:text-amber-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <SearchBar initialQuery={query} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        {query && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-stone-800">
                {isLoading ? 'Searching...' : `Results for "${query}"`}
              </h1>
              {!isLoading && (
                <p className="text-stone-600 mt-1">
                  Found {results.length} {results.length === 1 ? 'book' : 'books'}
                </p>
              )}
            </div>

            {/* Filters & View Controls */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Genre Filter */}
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="border border-stone-300 rounded-md px-3 py-1.5 text-sm bg-white"
              >
                <option value="all">All Genres</option>
                {genres.filter(g => g !== 'all').map(genre => (
                  <option key={genre} value={genre}>
                    {genre.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>

              {/* Language Filter */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-stone-300 rounded-md px-3 py-1.5 text-sm bg-white"
              >
                <option value="all">All Languages</option>
                {languages.filter(l => l !== 'all').map(lang => (
                  <option key={lang} value={lang}>
                    {lang.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>

              {/* View Toggle */}
              <div className="flex border border-stone-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-amber-100 text-amber-700' : 'bg-white text-stone-600'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-amber-100 text-amber-700' : 'bg-white text-stone-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          </div>
        )}

        {/* No Query State */}
        {!query && !isLoading && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-stone-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-stone-700 mb-2">
              Search the Archive
            </h2>
            <p className="text-stone-500 mb-4">
              Enter keywords to search {booksData.length} books by title, author, genre, or language
            </p>
          </div>
        )}

        {/* No Results State */}
        {query && !isLoading && results.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-stone-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-stone-700 mb-2">
              No Results Found
            </h2>
            <p className="text-stone-500">
              Try different keywords or adjust your filters
            </p>
          </div>
        )}

        {/* Results Grid/List */}
        {!isLoading && results.length > 0 && (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {results.map((book) => (
              <Link
                key={book.id}
                href={`/genre/${book.genreSlug}/${book.languageSlugs[0]}/${book.authorSlug}/${book.slug}`}
                className={`
                  bg-white rounded-lg border border-stone-200 p-4
                  hover:shadow-lg hover:border-amber-300 transition-all
                  ${viewMode === 'list' ? 'flex items-center gap-4' : ''}
                `}
              >
                <div className="flex-1">
                  <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                    {book.genre}
                  </span>
                  <h3 className="font-semibold text-stone-800 mt-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-stone-600 mt-1">
                    by {book.author}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {book.languages.map((lang) => (
                      <span 
                        key={lang}
                        className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}