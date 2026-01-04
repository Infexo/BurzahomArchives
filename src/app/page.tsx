import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getAllGenres, getAllBooks, getAllAuthors } from '@/lib/data';
import GenreCard from '@/components/GenreCard';
import SearchBar from '@/components/SearchBar';
import { BookOpen, Users, FolderOpen, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Collection | Burzahom Archives',
  description: 'Explore our digital archive of Kashmir literature organized by genre, language, and author.',
};

export default function HomePage() {
  const genres = getAllGenres();
  const books = getAllBooks();
  const authors = getAllAuthors();

  const languageSet = new Set<string>();
  books.forEach(book => book.languages.forEach(lang => languageSet.add(lang)));
  const languageCount = languageSet.size;

  const stats = [
    { label: 'Books', value: books.length, icon: BookOpen },
    { label: 'Authors', value: authors.length, icon: Users },
    { label: 'Genres', value: genres.length, icon: FolderOpen },
    { label: 'Languages', value: languageCount, icon: Globe },
  ];

  return (
    <div className="archive-container">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-archive-dark mb-4">
          Burzahom Archives
        </h1>
        <p className="text-lg text-archive-accent max-w-2xl mx-auto mb-8">
          Preserving Kashmir's literary heritage for future generations.
        </p>

        <div className="max-w-xl mx-auto">
          <Suspense fallback={<div className="h-12 bg-archive-paper rounded-sm" />}>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white border border-archive-tan rounded-sm p-4 text-center"
          >
            <Icon className="h-6 w-6 mx-auto text-archive-brown mb-2" />
            <div className="text-2xl font-serif font-medium text-archive-dark">
              {value}
            </div>
            <div className="text-sm text-archive-accent">{label}</div>
          </div>
        ))}
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-medium text-archive-dark">
            Browse by Genre
          </h2>
          <Link
            href="/search"
            className="text-archive-brown hover:text-archive-dark transition-colors"
          >
            View all books →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {genres.map((genre) => (
            <GenreCard key={genre.slug} genre={genre} />
          ))}
        </div>
      </section>
    </div>
  );
}