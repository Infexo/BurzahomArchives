import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getAllGenres, getAllBooks, getAllAuthors } from '@/lib/data';
import SearchBar from '@/components/SearchBar';
import BrowseSection from '@/components/BrowseSection';
import { BookOpen, Users, FolderOpen, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Collection | Burzahom Archives',
  description: 'Explore our digital archive of Kashmir literature organized by genre, language, and author.',
};

export default function HomePage() {
  const genres = getAllGenres();
  const books = getAllBooks();
  const authors = getAllAuthors();

  // Get unique languages
  const languages = [...new Set(books.map(book => book.language))];

  const stats = [
    { label: 'Books', value: books.length, icon: BookOpen },
    { label: 'Authors', value: authors.length, icon: Users },
    { label: 'Genres', value: genres.length, icon: FolderOpen },
    { label: 'Languages', value: languages.length, icon: Globe },
  ];

  return (
    <div className="archive-container">
      {/* Header */}
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

      {/* Stats */}
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

      {/* Browse Sections - Clean Dropdowns */}
<section className="space-y-4">
  <h2 className="text-2xl font-serif font-medium text-archive-dark mb-6">
    Browse Collection
  </h2>

  <BrowseSection
    title="Browse by Genre"
    iconType="genre"
    items={genres.map(g => ({ name: g.name, slug: g.slug, count: g.bookCount }))}
    basePath="/genre"
  />

  <BrowseSection
    title="Browse by Author"
    iconType="author"
    items={authors.slice(0, 20).map(a => ({ name: a.name, slug: a.slug, count: a.bookCount }))}
    basePath="/author"
    showMore={{ href: '/authors', label: `View all ${authors.length} authors` }}
  />

  <BrowseSection
    title="Browse by Language"
    iconType="language"
    items={languages.map(lang => ({
      name: lang,
      slug: lang.toLowerCase(),
      count: books.filter(b => b.language === lang).length
    }))}
    basePath="/language"
  />
</section>
    </div>
  );
}