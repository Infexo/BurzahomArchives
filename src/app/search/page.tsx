import { Metadata } from 'next';
import { getAllBooks, getArchiveData } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import SearchPageClient from '@/components/SearchPageClient';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the Digital Archive.',
};

export default function SearchPage() {
  // Get data at build time (server-side)
  const books = getAllBooks();
  const { allGenres, allLanguages } = getArchiveData();

  return (
    <div className="archive-container">
      <Breadcrumb items={[{ label: 'Search' }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-serif font-medium text-archive-dark mb-4">
          Search the Archive
        </h1>
      </header>

      {/* Pass data as props to client component */}
      <SearchPageClient 
        books={books} 
        allGenres={allGenres} 
        allLanguages={allLanguages} 
      />
    </div>
  );
}