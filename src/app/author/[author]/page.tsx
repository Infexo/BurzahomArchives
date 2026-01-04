// src/app/author/[author]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllAuthors, getAuthorBySlug } from '@/lib/data';
import { pluralize } from '@/lib/utils';
import Breadcrumb from '@/components/Breadcrumb';
import BookCard from '@/components/BookCard';
import { Globe, FolderOpen } from 'lucide-react';

interface AuthorPageProps {
  params: { author: string };
}

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((author) => ({
    author: author.slug,
  }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = getAuthorBySlug(params.author);

  if (!author) {
    return { title: 'Author Not Found' };
  }

  return {
    title: `${author.name} - Author`,
    description: `Browse ${author.bookCount} books by ${author.name}.`,
  };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthorBySlug(params.author);

  if (!author) {
    notFound();
  }

  return (
    <div className="archive-container">
      <Breadcrumb
        items={[
          { label: 'Authors', href: '/search' },
          { label: author.name },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-archive-dark mb-2">
          {author.name}
        </h1>
        <p className="text-archive-accent mb-4">
          {pluralize(author.bookCount, 'book')} in the archive
        </p>
        
        <div className="flex flex-wrap gap-4">
          {/* Genres */}
          <div className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-archive-accent" />
            <span className="text-sm text-archive-accent">
              {author.genres.join(', ')}
            </span>
          </div>
          
          {/* Languages */}
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-archive-accent" />
            <span className="text-sm text-archive-accent">
              {author.languages.join(', ')}
            </span>
          </div>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-serif font-medium text-archive-dark mb-4">
          Books by {author.name}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {author.books.map((book) => (
            <BookCard key={book.id} book={book} showGenre />
          ))}
        </div>
      </section>
    </div>
  );
}