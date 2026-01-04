// src/components/GenreCard.tsx
import Link from 'next/link';
import { Folder } from 'lucide-react';
import { Genre } from '@/lib/types';
import { pluralize } from '@/lib/utils';

interface GenreCardProps {
  genre: Genre;
}

export default function GenreCard({ genre }: GenreCardProps) {
  return (
    <Link href={`/genre/${genre.slug}`} className="block archive-card p-6 group">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-archive-paper rounded-sm text-archive-brown 
                        group-hover:bg-archive-brown group-hover:text-archive-cream 
                        transition-colors duration-200">
          <Folder className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-archive-dark group-hover:text-archive-brown transition-colors">
            {genre.name}
          </h3>
          <p className="text-sm text-archive-accent mt-1">
            {pluralize(genre.bookCount, 'book')} in {pluralize(genre.languages.length, 'language')}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {genre.languages.slice(0, 4).map((lang) => (
              <span key={lang.slug} className="archive-badge">
                {lang.name}
              </span>
            ))}
            {genre.languages.length > 4 && (
              <span className="archive-badge">
                +{genre.languages.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}