// src/components/AuthorCard.tsx
import Link from 'next/link';
import { User } from 'lucide-react';
import { Author, AuthorInLanguage } from '@/lib/types';
import { pluralize } from '@/lib/utils';

interface AuthorCardProps {
  author: Author | AuthorInLanguage;
  showDetails?: boolean;
}

export default function AuthorCard({ author, showDetails = false }: AuthorCardProps) {
  const isFullAuthor = 'books' in author;

  return (
    <Link 
      href={`/author/${author.slug}`} 
      className="block archive-card p-5 group"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-archive-paper rounded-sm text-archive-brown 
                        group-hover:bg-archive-brown group-hover:text-archive-cream 
                        transition-colors duration-200">
          <User className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-archive-dark group-hover:text-archive-brown transition-colors">
            {author.name}
          </h3>
          <p className="text-sm text-archive-accent">
            {pluralize(author.bookCount, 'book')}
          </p>
          
          {showDetails && isFullAuthor && (
            <div className="flex flex-wrap gap-2 mt-2">
              {(author as Author).genres.map((genre) => (
                <span key={genre} className="archive-badge">
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}