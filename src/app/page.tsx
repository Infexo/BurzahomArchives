import { Metadata } from 'next';
import { getAllGenres, getAllBooks, getAllAuthors } from '@/lib/data';
import HomeClient from './HomeClient'; // Import the client component we just made

export const metadata: Metadata = {
  title: 'Burzahom Archives',
  description: 'Everything. Kashmiri. Here.',
};

export default function HomePage() {
  // This runs on the server, so 'fs' is allowed here
  const genres = getAllGenres();
  const books = getAllBooks();
  const authors = getAllAuthors();

  // We pass the data down to the Client Component
  return (
    <main>
      <HomeClient 
        books={books} 
        genres={genres} 
        authors={authors} 
      />
    </main>
  );
}