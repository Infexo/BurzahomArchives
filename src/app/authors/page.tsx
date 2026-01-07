import { Metadata } from 'next';
import Link from 'next/link';
import { getAllAuthors } from '@/lib/data';
import { Users } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'All Authors | Burzahom Archives',
  description: 'Browse all authors in the Burzahom Archives collection.',
};

export default function AllAuthorsPage() {
  const authors = getAllAuthors();

  // Sort A-Z
  const sortedAuthors = [...authors].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  // Group by Letter
  const groupedAuthors = sortedAuthors.reduce((acc, author) => {
    const firstLetter = author.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(author);
    return acc;
  }, {} as Record<string, typeof authors>);

  const letters = Object.keys(groupedAuthors).sort();

  return (
    <div className="archive-container">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Authors' },
        ]}
      />

      <div className="flex items-center gap-3 mb-8">
        <Users className="h-8 w-8 text-archive-brown" />
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-archive-dark">
            All Authors
          </h1>
          <p className="text-archive-accent">
            {authors.length} authors available
          </p>
        </div>
      </div>

      {/* Letters Filter */}
      <div className="flex flex-wrap gap-2 mb-8 p-4 bg-white border border-archive-tan rounded-sm">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#${letter}`}
            className="w-8 h-8 flex items-center justify-center bg-archive-paper hover:bg-archive-tan text-archive-dark text-sm font-medium rounded-sm transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>

      {/* List */}
      <div className="space-y-12">
        {letters.map((letter) => (
          <div key={letter} id={letter} className="scroll-mt-24">
            <h2 className="text-2xl font-serif font-medium text-archive-dark border-b border-archive-tan pb-2 mb-6">
              {letter}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedAuthors[letter].map((author) => (
                <Link
                  key={author.slug}
                  href={`/authors/${author.slug}`}
                  className="group flex justify-between items-center p-4 bg-white border border-archive-tan rounded-sm hover:border-archive-brown transition-colors"
                >
                  <span className="font-medium text-archive-dark group-hover:text-archive-brown transition-colors">
                    {author.name}
                  </span>
                  <span className="text-xs font-medium text-archive-brown bg-archive-paper px-2 py-1 rounded-full">
                    {author.bookCount}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}