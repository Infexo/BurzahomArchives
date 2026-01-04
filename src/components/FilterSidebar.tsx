// src/components/FilterSidebar.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface FilterSidebarProps {
  genres: string[];
  languages: string[];
}

export default function FilterSidebar({ genres, languages }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentGenre = searchParams.get('genre') || '';
  const currentLanguage = searchParams.get('language') || '';
  const currentQuery = searchParams.get('q') || '';

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
    if (currentQuery) {
      params.set('q', currentQuery);
    }
    router.push(`/search?${params.toString()}`);
  };

  const hasFilters = currentGenre || currentLanguage;

  return (
    <aside className="bg-white border border-archive-tan rounded-sm p-5">
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

      {/* Genre Filter */}
      <div className="mb-6">
        <label htmlFor="genre-filter" className="block text-sm font-medium text-archive-accent mb-2">
          Genre
        </label>
        <select
          id="genre-filter"
          value={currentGenre}
          onChange={(e) => updateFilter('genre', e.target.value)}
          className="w-full px-3 py-2 bg-archive-paper border border-archive-tan rounded-sm
                     text-archive-ink focus:outline-none focus:ring-2 focus:ring-archive-brown"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Language Filter */}
      <div>
        <label htmlFor="language-filter" className="block text-sm font-medium text-archive-accent mb-2">
          Language
        </label>
        <select
          id="language-filter"
          value={currentLanguage}
          onChange={(e) => updateFilter('language', e.target.value)}
          className="w-full px-3 py-2 bg-archive-paper border border-archive-tan rounded-sm
                     text-archive-ink focus:outline-none focus:ring-2 focus:ring-archive-brown"
        >
          <option value="">All Languages</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}