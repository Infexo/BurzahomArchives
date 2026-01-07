import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBooks, getSlug } from '@/lib/data';

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  const books = getAllBooks();
  const languages = [...new Set(books.map(b => getSlug(b.language)))];
  return languages.map(slug => ({ slug }));
}

export default function LanguagePage({ params }: Props) {
  const allBooks = getAllBooks();
  const books = allBooks.filter(b => getSlug(b.language) === params.slug);

  if (books.length === 0) return notFound();

  const languageName = books[0].language;

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto px-4 py-8 font-mono uppercase">
      <div className="border-b-4 border-black pb-4 flex flex-col gap-2">
        <div className="flex justify-between items-baseline">
          <span className="text-xs font-black opacity-60 tracking-widest">
            LANGUAGE
          </span>
          <Link
            href="/"
            className="text-sm font-bold underline hover:bg-black hover:text-white px-1"
          >
            ← BACK
          </Link>
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase break-words">
          {languageName}
        </h1>
      </div>

      <div className="flex flex-col border-b border-black">
        {books.map(book => (
          <Link
            key={book.title}
            href={`/book/${getSlug(book.title)}`}
            className="group flex flex-col md:flex-row md:items-center py-6 border-t border-black hover:bg-black hover:text-white transition-colors px-2 text-left"
          >
            <span className="text-xl md:text-2xl font-bold flex-1">
              {book.title}
            </span>
            <div className="flex gap-4 text-sm mt-2 md:mt-0 font-medium">
              <span className="opacity-70">{book.author}</span>
              <span className="border-l-2 border-black group-hover:border-white pl-4">
                {book.genre}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
