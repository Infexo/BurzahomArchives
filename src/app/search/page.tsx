'use client';

import React, { useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

// ✅ USE YOUR REAL DATA SOURCE
import { getAllBooks } from '@/lib/data';

/**
 * BRUTALIST LOADING STATE
 */
function SearchLoading() {
  return (
    <div className="flex flex-col gap-4 py-12">
      <div className="bg-black text-white p-8 border-4 border-black">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          SEARCHING<br />
          ARCHIVE...
        </h2>
      </div>
      <p className="font-bold text-sm opacity-50 uppercase tracking-[0.2em]">
        ACCESSING DIGITAL INDEX [STABLE]
      </p>
    </div>
  );
}

function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = (searchParams.get('q') || '').trim();

  const books = useMemo(() => getAllBooks(), []);

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toUpperCase();

    return books.filter(book =>
      book.title.toUpperCase().includes(q) ||
      book.author.toUpperCase().includes(q) ||
      book.genre.toUpperCase().includes(q) ||
      book.language.toUpperCase().includes(q)
    );
  }, [query, books]);

  return (
    <div className="flex flex-col gap-10">
      {/* HEADER */}
      <header className="border-b-8 border-black pb-8">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl md:text-7xl font-black leading-none uppercase tracking-tighter">
            QUERY:<br />
            {query ? `"${query.toUpperCase()}"` : 'NONE'}
          </h1>

          <button
            onClick={() => router.push('/')}
            className="text-xl font-black underline bg-black text-white px-2 py-1 border-4 border-black hover:bg-white hover:text-black transition-colors"
          >
            [CLOSE]
          </button>
        </div>
      </header>

      {/* RESULTS */}
      <section className="flex flex-col">
        {results.length > 0 ? (
          <div className="flex flex-col border-b-4 border-black">
            {results.map(book => (
              <Link
                key={book.slug}
                href={`/book/${book.slug}`}
                className="group flex flex-col md:flex-row md:items-center py-8 border-t-4 border-black hover:bg-black hover:text-white transition-colors px-4 text-left first:border-t-0"
              >
                <div className="flex flex-col flex-1 gap-1">
                  <span className="text-2xl md:text-4xl font-black uppercase leading-tight">
                    {book.title}
                  </span>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="bg-black text-white px-1 group-hover:bg-white group-hover:text-black">
                      {book.genre.toUpperCase()}
                    </span>
                    <span>AUTHOR: {book.author.toUpperCase()}</span>
                    <span>LANG: {book.language.toUpperCase()}</span>
                  </div>
                </div>

                <span className="mt-4 md:mt-0 md:ml-4 text-2xl font-black md:opacity-0 group-hover:opacity-100 transition-opacity">
                  VIEW →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 border-y-4 border-black text-center flex flex-col gap-4">
            <h2 className="text-5xl md:text-8xl font-black opacity-10 uppercase tracking-tighter">
              VOID_RESULT
            </h2>
            <p className="text-xl md:text-2xl font-black uppercase">
              NO RECORDS MATCH THIS QUERY IN THE ARCHIVE.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 border-4 border-black hover:bg-black hover:text-white font-black uppercase"
              >
                BACK TO DIRECTORY
              </button>
            </div>
          </div>
        )}
      </section>

      {results.length > 0 && (
        <footer className="flex justify-between items-center text-xs font-black opacity-40 uppercase tracking-[0.2em] border-t-4 border-black pt-4">
          <span>FOUND {results.length} RECORD(S)</span>
          <span>STAMP_ID: SEARCH_RES_2026</span>
        </footer>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchPageClient />
    </Suspense>
  );
}
