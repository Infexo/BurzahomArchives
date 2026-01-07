// src/components/BookCard.tsx

import Link from 'next/link';
import { Book } from '@/lib/types';
import { BookOpen, Download, User, Globe, Tag, XCircle } from 'lucide-react';

interface BookCardProps {
  book: Book;
  showGenre?: boolean;
}

export default function BookCard({ book, showGenre = false }: BookCardProps) {
  const hasDownload = book.url !== null;

  return (
    <div className="bg-white border border-archive-tan rounded-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-serif font-medium text-archive-dark text-lg mb-2 truncate">
            {book.title}
          </h3>

          {/* Author */}
          <div className="flex items-center gap-2 text-sm text-archive-accent mb-2">
            <User className="h-4 w-4 flex-shrink-0" />
            <Link
              href={`/author/${book.authorSlug}`}
              className="hover:text-archive-brown transition-colors truncate"
            >
              {book.author}
            </Link>
          </div>

          {/* Language */}
          <div className="flex items-center gap-2 text-sm text-archive-accent mb-2">
            <Globe className="h-4 w-4 flex-shrink-0" />
            <span>{book.language}</span>
          </div>

          {/* Genre (optional) */}
          {showGenre && (
            <div className="flex items-center gap-2 text-sm text-archive-accent">
              <Tag className="h-4 w-4 flex-shrink-0" />
              <Link
                href={`/genre/${book.genreSlug}`}
                className="hover:text-archive-brown transition-colors"
              >
                {book.genre}
              </Link>
            </div>
          )}
        </div>

        {/* Download Button */}
        <div className="flex-shrink-0">
          {hasDownload ? (
            <a
              href={book.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-archive-brown text-white rounded-sm hover:bg-archive-dark transition-colors text-sm"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-500 rounded-sm text-sm cursor-not-allowed">
              <XCircle className="h-4 w-4" />
              <span>Not Available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}