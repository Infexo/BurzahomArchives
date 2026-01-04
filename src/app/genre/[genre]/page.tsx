// src/app/genre/[genre]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllGenres, getGenreBySlug } from '@/lib/data';
import { unslugify, pluralize } from '@/lib/utils';
import Breadcrumb from '@/components/Breadcrumb';
import LanguageCard from '@/components/LanguageCard';

interface GenrePageProps {
  params: { genre: string };
}

export async function generateStaticParams() {
  const genres = getAllGenres();
  return genres.map((genre) => ({
    genre: genre.slug,
  }));
}

export async function generateMetadata({ params }: GenrePageProps): Promise<Metadata> {
  const genre = getGenreBySlug(params.genre);
  
  if (!genre) {
    return { title: 'Genre Not Found' };
  }

  return {
    title: `${genre.name} Books`,
    description: `Browse ${genre.bookCount} ${genre.name.toLowerCase()} books in ${genre.languages.length} languages.`,
  };
}

export default function GenrePage({ params }: GenrePageProps) {
  const genre = getGenreBySlug(params.genre);

  if (!genre) {
    notFound();
  }

  return (
    <div className="archive-container">
      <Breadcrumb
        items={[
          { label: genre.name },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-archive-dark mb-2">
          {genre.name}
        </h1>
        <p className="text-archive-accent">
          {pluralize(genre.bookCount, 'book')} across {pluralize(genre.languages.length, 'language')}
        </p>
      </header>

      <section>
        <h2 className="text-xl font-serif font-medium text-archive-dark mb-4">
          Select Language
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {genre.languages.map((language) => (
            <LanguageCard
              key={language.slug}
              language={language}
              genreSlug={genre.slug}
            />
          ))}
        </div>
      </section>
    </div>
  );
}