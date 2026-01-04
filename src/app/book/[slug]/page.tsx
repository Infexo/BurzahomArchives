// src/app/book/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllBooks, getBookBySlug } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import DownloadButton from '@/components/DownloadButton';
import { Calendar, User, Globe, FolderOpen, ArrowLeft } from 'lucide-react';

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const books = getAllBooks();
  return books.map((book) => ({
    slug: book.slug,
  }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    return { title: 'Book Not Found' };
  }

  return {
    title: `${book.title} by ${book.author}`,
    description: book.description || `${book.title} by ${book.author} - Available in the Burzahom Archives.`,
    openGraph: {
      title: book.title,
      description: book.description || `By ${book.author}`,
      type: 'book',
    },
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const metadata = [
    { label: 'Author', value: book.author, icon: User, href: `/author/${book.authorSlug}` },
    { label: 'Genre', value: book.genre, icon: FolderOpen, href: `/genre/${book.genreSlug}` },
    { label: 'Language', value: book.languages.join(', '), icon: Globe },
    ...(book.year ? [{ label: 'Year', value: book.year.toString(), icon: Calendar }] : []),
  ];

  return (
    <div className="archive-container">
      <Breadcrumb
        items={[
          { label: book.genre, href: `/genre/${book.genreSlug}` },
          { label: book.title },
        ]}
      />

      <article className="max-w-3xl">
        {/* Back Link */}
        <Link
          href={`/author/${book.authorSlug}`}
          className="inline-flex items-center gap-1 text-archive-accent hover:text-archive-dark mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          More by {book.author}
        </Link>

        {/* Title */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-archive-dark mb-2">
            {book.title}
          </h1>
          <p className="text-xl text-archive-accent">
            by{' '}
            <Link href={`/author/${book.authorSlug}`} className="archive-link">
              {book.author}
            </Link>
          </p>
        </header>

        {/* Metadata Grid */}
        <section className="bg-white border border-archive-tan rounded-sm p-6 mb-8">
          <h2 className="sr-only">Book Details</h2>
          
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metadata.map(({ label, value, icon: Icon, href }) => (
              <div key={label}>
                <dt className="flex items-center gap-1 text-sm text-archive-accent mb-1">
                  <Icon className="h-4 w-4" />
                  {label}
                </dt>
                <dd className="font-medium text-archive-dark">
                  {href ? (
                    <Link href={href} className="archive-link">
                      {value}
                    </Link>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Description */}
        {book.description && (
          <section className="mb-8">
            <h2 className="text-lg font-serif font-medium text-archive-dark mb-3">
              About this Book
            </h2>
            <p className="text-archive-ink leading-relaxed">
              {book.description}
            </p>
          </section>
        )}

        {/* Download Section */}
        <section className="bg-archive-paper border border-archive-tan rounded-sm p-6">
          <h2 className="text-lg font-serif font-medium text-archive-dark mb-4">
            Access
          </h2>
          
          <DownloadButton status={book.megaLink} />
          
          {book.megaLink.type !== 'available' && (
            <p className="text-sm text-archive-accent mt-4">
              {book.megaLink.type === 'coming_soon'
                ? 'This book will be available for download soon. Please check back later.'
                : 'We are working on making this book available. Check back for updates.'}
            </p>
          )}
          
          {/* Reserved space for future link */}
          <div className="mt-4 pt-4 border-t border-archive-tan">
            <p className="text-xs text-archive-accent">
              External links open in a new window. Burzahom Archives does not host files directly.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}