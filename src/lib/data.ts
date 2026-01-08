// src/lib/data.ts

// --------------------------------------------------------
// 1. IMPORT REAL DATA
// --------------------------------------------------------
import rawBooks from '../../data/books.json';

// --------------------------------------------------------
// 2. HELPERS
// --------------------------------------------------------
export const getSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// --------------------------------------------------------
// 3. NORMALIZE BOOKS (SINGLE SOURCE OF TRUTH)
// --------------------------------------------------------
export const getAllBooks = () => {
  return rawBooks.map((book: any) => ({
    title: book.title,
    author: book.author,
    genre: book.genre,
    language: book.language,
    url: book.url,
    slug: getSlug(book.title),
  }));
};

// --------------------------------------------------------
// 4. GET-ALL FUNCTIONS (USED ON HOME PAGE)
// --------------------------------------------------------
export const getAllGenres = () => {
  const genres = new Set(getAllBooks().map(b => b.genre));
  return Array.from(genres).sort().map(genre => ({
    name: genre,
    slug: getSlug(genre),
  }));
};

export const getAllAuthors = () => {
  const authors = new Set(getAllBooks().map(b => b.author));
  return Array.from(authors).sort().map(author => ({
    name: author,
    slug: getSlug(author),
  }));
};

// --------------------------------------------------------
// 5. LOOKUP FUNCTIONS (USED ON SUB-PAGES)
// --------------------------------------------------------
export const getGenreBySlug = (slug: string) => {
  return getAllGenres().find(g => g.slug === slug);
};

export const getAuthorBySlug = (slug: string) => {
  return getAllAuthors().find(a => a.slug === slug);
};

export const getBooksByGenre = (slug: string) => {
  return getAllBooks().filter(
    b => getSlug(b.genre) === slug
  );
};

export const getBooksByAuthor = (slug: string) => {
  return getAllBooks().filter(
    b => getSlug(b.author) === slug
  );
};

export const getBookBySlug = (slug: string) => {
  return getAllBooks().find(b => b.slug === slug);
};
// Add these to the end of src/lib/data.ts

export const getAllLanguages = () => {
  const languages = new Set(getAllBooks().map(b => b.language));
  return Array.from(languages).sort().map(lang => ({
    name: lang,
    slug: getSlug(lang),
  }));
};

export const getLanguageBySlug = (slug: string) => {
  return getAllLanguages().find(l => l.slug === slug);
};

export const getBooksByLanguage = (slug: string) => {
  const allBooks = getAllBooks();
  return allBooks.filter(
    b => getSlug(b.language) === slug
  );
};