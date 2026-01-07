import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBookBySlug, getAllBooks, getSlug } from '@/lib/data';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: 'Record Not Found' };
  return { title: `${book.title} | Burzahom Archive` };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) return notFound();

  const relatedBooks = getAllBooks().filter(b =>
    b.genre === book.genre &&
    b.title !== book.title
  ).slice(0, 3);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto px-4 py-8 font-mono uppercase">

      <header className="border-b-4 border-black pb-6">
        <Link
          href="/"
          className="text-xs font-bold block mb-4 underline hover:bg-black hover:text-white inline-block px-1 transition-colors"
        >
          ← RETURN HOME
        </Link>

        <h1 className="text-4xl md:text-7xl font-black leading-tight mb-4 uppercase break-words">
          {book.title}
        </h1>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-lg font-bold uppercase opacity-80">
          <span>BY {book.author}</span>
          <span>GENRE: {book.genre}</span>
          <span>LANG: {book.language}</span>
        </div>
      </header>

      <section className="flex flex-col gap-6 max-w-2xl">
        <p className="text-xl md:text-2xl leading-none font-black opacity-80 uppercase">
          ITEM DATA PRESERVATION MODE // BURZAHOM ARCHIVE
        </p>

        <div>
          {book.url ? (
            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white px-8 py-5 text-xl font-black hover:bg-white hover:text-black border-4 border-black transition-all uppercase"
            >
              DOWNLOAD (MEGA)
            </a>
          ) : (
            <div className="inline-block border-4 border-black px-8 py-5 text-xl font-black text-gray-400 cursor-not-allowed uppercase">
              NOT AVAILABLE
            </div>
          )}
        </div>
      </section>

      {relatedBooks.length > 0 && (
        <section className="mt-8 flex flex-col gap-2">
          <h2 className="text-[10px] font-black tracking-[0.3em] opacity-40 uppercase border-b border-black pb-1 self-start">
            SIMILAR RECORDS
          </h2>
          <div className="flex flex-col">
            {relatedBooks.map((rb) => (
              <Link
                key={rb.title}
                href={`/book/${getSlug(rb.title)}`}
                className="w-full text-left py-3 border-b border-black last:border-b-0 hover:bg-black hover:text-white transition-colors group px-1 block"
              >
                <div className="flex justify-between items-baseline gap-4">
                  <span className="text-sm md:text-base font-bold uppercase truncate">
                    {rb.title}
                  </span>
                  <span className="text-[10px] font-medium uppercase opacity-50 group-hover:opacity-100 whitespace-nowrap">
                    {rb.author}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="border-t border-black pt-4 mt-8">
        <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest break-all">
          REF_ID: {slug.toUpperCase().replace(/-/g, '_')} // ARCHIVE_STAMP: 2026.04.12
        </p>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  const books = getAllBooks();
  return books.map((book) => ({
    slug: book.slug,
  }));
}