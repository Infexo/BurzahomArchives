// src/components/LanguageCard.tsx
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { LanguageInGenre } from '@/lib/types';
import { pluralize } from '@/lib/utils';

interface LanguageCardProps {
  language: LanguageInGenre;
  genreSlug: string;
}

export default function LanguageCard({ language, genreSlug }: LanguageCardProps) {
  return (
    <Link 
      href={`/genre/${genreSlug}/${language.slug}`} 
      className="block archive-card p-5 group"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-archive-paper rounded-sm text-archive-brown 
                        group-hover:bg-archive-brown group-hover:text-archive-cream 
                        transition-colors duration-200">
          <Globe className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-archive-dark group-hover:text-archive-brown transition-colors">
            {language.name}
          </h3>
          <p className="text-sm text-archive-accent">
            {pluralize(language.bookCount, 'book')} · {pluralize(language.authors.length, 'author')}
          </p>
        </div>
      </div>
    </Link>
  );
}