'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

// Add initialQuery to the props interface
export interface SearchBarProps {
  initialQuery?: string;  // Add this line
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  initialQuery = '',     // Add this
  placeholder = 'Search artifacts, documents, excavation notes...', 
  className = '' 
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);  // Use initialQuery here
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-300 
                     focus:ring-2 focus:ring-amber-500 focus:border-amber-500 
                     bg-white text-stone-900 placeholder-stone-400"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 
                     bg-amber-600 text-white rounded-md hover:bg-amber-700 
                     transition-colors text-sm font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
}