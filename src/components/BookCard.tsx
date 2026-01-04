// src/components/BookCard.tsx
import Link from 'next/link';
import { Book as BookType } from '@/lib/types';
import { BookOpen, Calendar, ExternalLink, Clock, AlertCircle } from 'lucide-react';

interface BookCardProps {
  book: BookType;
  showGenre?: boolean;
}

export default function BookCard({ book, showGenre = false }: BookCardProps) {
  const getLinkStatusIcon = () => {
    switch (book.megaLink.type) {
      case 'available':
        return <ExternalLink className="h-4 w-4 text-green-600" />;
      case 'coming_soon':
        return <Clock className="h-4 w-4 text-amber-600" />;
      case 'unavailable':
        return <AlertCircle className="h-4 w-4 text-archive-accent" />;
    }
  };

  return (
    <Link href={`/book/${book.slug}`} className="block archive-card p-5 group">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-archive-paper rounded-sm text-archive-brown 
                        group-hover:bg-archive-brown group-hover:text-archive-cream 
                        transition-colors duration-200 shrink-0">
          <BookOpen className="h-5 w-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-archive-dark group-hover:text-archive-brown 
                           transition-colors line-clamp-2">
              {book.title}
            </h3>
            {getLinkStatusIcon()}
          </div>
          
          <p className="text-sm text-archive-accent mt-1">
            by {book.author}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {book.year && (
              <span className="flex items-center gap-1 text-xs text-archive-accent">
                <Calendar className="h-3 w-3" />
                {book.year}
              </span>
            )}
            
            {showGenre && (
              <span className="archive-badge">
                {book.genre}
              </span>
            )}
            
            {book.languages.map((lang) => (
              <span key={lang} className="archive-badge">
                {lang}
              </span>
            ))}
          </div>
          
          {book.description && (
            <p className="text-sm text-archive-accent mt-3 line-clamp-2">
              {book.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}