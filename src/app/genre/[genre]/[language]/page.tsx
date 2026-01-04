/// src/app/genre/[genre]/[language]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllGenres,
  getGenreBySlug,
  getLanguageInGenre,
  getBooksInGenreAndLanguage,
} from '@/lib/data';
import { pluralize } from '@/lib/utils';
import Breadcrumb from '@/components/Breadcrumb';
import AuthorCard from '@/components/AuthorCard';
import BookCard from '@/components/BookCard';

interface LanguagePageProps {
  params: Promise<{ genre: string; language: string }>;
}

export async function generateStaticParams() {
  const genres = getAllGenres();
  const params: { genre: string; language: string }[] = [];

  for (const genre of genres) {
    for (const language of genre.languages) {
      params.push({
        genre: genre.slug,
        language: language.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { genre: genreSlug, language: languageSlug } = await params;
  const genre = getGenreBySlug(genreSlug);
  const language = getLanguageInGenre(genreSlug, languageSlug);

  if (!genre || !language) {
    return { title: 'Not Found' };
  }

  return {
    title: `${language.name} ${genre.name} Books`,
    description: `Browse ${language.bookCount} ${genre.name.toLowerCase()} books in ${language.name}.`,
  };
}

export default async function LanguagePage({ params }: LanguagePageProps) {
  const { genre: genreSlug, language: languageSlug } = await params;
  const genre = getGenreBySlug(genreSlug);
  const language = getLanguageInGenre(genreSlug, languageSlug);
  const books = getBooksInGenreAndLanguage(genreSlug, languageSlug);

  if (!genre || !language) {
    notFound();
  }

  return (
    <div className="archive-container">
      <Breadcrumb
        items={[
          { label: genre.name, href: `/genre/${genre.slug}` },
          { label: language.name },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-archive-dark mb-2">
          {language.name} {genre.name}
        </h1>
        <p className="text-archive-accent">
          {pluralize(language.bookCount, 'book')} by {pluralize(language.authors.length, 'author')}
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Authors Sidebar */}
        <aside className="lg:col-span-1">
          <h2 className="text-lg font-serif font-medium text-archive-dark mb-4">
            Authors
          </h2>
          <div className="space-y-3">
            {language.authors.map((author) => (
              <AuthorCard key={author.slug} author={author} />
            ))}
          </div>
        </aside>

        {/* Books List */}
        <section className="lg:col-span-2">
          <h2 className="text-lg font-serif font-medium text-archive-dark mb-4">
            All Books
          </h2>
          <div className="space-y-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}