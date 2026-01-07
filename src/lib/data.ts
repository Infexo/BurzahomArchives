// src/lib/data.ts

import fs from 'fs';
import path from 'path';
import {
  Book,
  Genre,
  Author,
  ArchiveData,
  RawBook,
  LanguageInGenre,
} from './types';

let cachedData: ArchiveData | null = null;

// Simple slugify function
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function createBookSlug(title: string, author: string): string {
  const titlePart = slugify(title).slice(0, 50);
  const authorPart = slugify(author).slice(0, 20);
  return `${titlePart}-${authorPart}`;
}

function loadBooksFromJSON(): RawBook[] {
  const filePath = path.join(process.cwd(), 'data', 'books.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

function transformRawData(rawData: RawBook[]): Book[] {
  return rawData.map((row) => ({
    title: row.title,
    slug: createBookSlug(row.title, row.author),
    author: row.author,
    authorSlug: slugify(row.author),
    genre: row.genre || 'Uncategorized',
    genreSlug: slugify(row.genre || 'Uncategorized'),
    language: row.language || 'Unknown',
    languageSlug: slugify(row.language || 'Unknown'),
    url: row.url || null,
  }));
}

function buildGenreHierarchy(books: Book[]): Genre[] {
  const genreMap = new Map<string, {
    name: string;
    slug: string;
    languages: Map<string, {
      name: string;
      slug: string;
      authors: Map<string, { name: string; slug: string; count: number }>;
      count: number;
    }>;
    count: number;
  }>();

  for (const book of books) {
    if (!genreMap.has(book.genreSlug)) {
      genreMap.set(book.genreSlug, {
        name: book.genre,
        slug: book.genreSlug,
        languages: new Map(),
        count: 0,
      });
    }
    const genre = genreMap.get(book.genreSlug)!;
    genre.count++;

    const langSlug = book.languageSlug;
    const langName = book.language;

    if (!genre.languages.has(langSlug)) {
      genre.languages.set(langSlug, {
        name: langName,
        slug: langSlug,
        authors: new Map(),
        count: 0,
      });
    }
    const language = genre.languages.get(langSlug)!;
    language.count++;

    if (!language.authors.has(book.authorSlug)) {
      language.authors.set(book.authorSlug, {
        name: book.author,
        slug: book.authorSlug,
        count: 0,
      });
    }
    language.authors.get(book.authorSlug)!.count++;
  }

  return Array.from(genreMap.values())
    .map(genre => ({
      name: genre.name,
      slug: genre.slug,
      bookCount: genre.count,
      languages: Array.from(genre.languages.values())
        .map(lang => ({
          name: lang.name,
          slug: lang.slug,
          bookCount: lang.count,
          authors: Array.from(lang.authors.values())
            .map(author => ({
              name: author.name,
              slug: author.slug,
              bookCount: author.count,
            }))
            .sort((a, b) => a.name.localeCompare(b.name)),
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function buildAuthorIndex(books: Book[]): Author[] {
  const authorMap = new Map<string, Author>();

  for (const book of books) {
    if (!authorMap.has(book.authorSlug)) {
      authorMap.set(book.authorSlug, {
        name: book.author,
        slug: book.authorSlug,
        bookCount: 0,
        genres: [],
        languages: [],
        books: [],
      });
    }

    const author = authorMap.get(book.authorSlug)!;
    author.books.push(book);
    author.bookCount++;

    if (!author.genres.includes(book.genre)) {
      author.genres.push(book.genre);
    }

    if (!author.languages.includes(book.language)) {
      author.languages.push(book.language);
    }
  }

  return Array.from(authorMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

function extractUniqueLanguages(books: Book[]): string[] {
  const languages = new Set<string>();
  for (const book of books) {
    languages.add(book.language);
  }
  return Array.from(languages).sort();
}

function extractUniqueGenres(books: Book[]): string[] {
  const genres = new Set<string>();
  for (const book of books) {
    genres.add(book.genre);
  }
  return Array.from(genres).sort();
}

export function getArchiveData(): ArchiveData {
  if (cachedData) {
    return cachedData;
  }

  try {
    const rawData = loadBooksFromJSON();
    const books = transformRawData(rawData);

    cachedData = {
      books,
      genres: buildGenreHierarchy(books),
      authors: buildAuthorIndex(books),
      allLanguages: extractUniqueLanguages(books),
      allGenres: extractUniqueGenres(books),
    };

    return cachedData;
  } catch (error) {
    console.error('Error loading archive data:', error);
    return {
      books: [],
      genres: [],
      authors: [],
      allLanguages: [],
      allGenres: [],
    };
  }
}

export function getAllBooks(): Book[] {
  return getArchiveData().books;
}

export function getAllGenres(): Genre[] {
  return getArchiveData().genres;
}

export function getAllAuthors(): Author[] {
  return getArchiveData().authors;
}

export function getBookBySlug(slug: string): Book | undefined {
  return getArchiveData().books.find(b => b.slug === slug);
}

export function getGenreBySlug(slug: string): Genre | undefined {
  return getArchiveData().genres.find(g => g.slug === slug);
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return getArchiveData().authors.find(a => a.slug === slug);
}

export function getLanguageInGenre(
  genreSlug: string,
  languageSlug: string
): LanguageInGenre | undefined {
  const genre = getGenreBySlug(genreSlug);
  return genre?.languages.find(l => l.slug === languageSlug);
}

export function getBooksInGenreAndLanguage(
  genreSlug: string,
  languageSlug: string
): Book[] {
  return getArchiveData().books.filter(
    book =>
      book.genreSlug === genreSlug &&
      book.languageSlug === languageSlug
  );
}

export function searchBooks(
  query: string,
  filters?: { genre?: string; language?: string; author?: string }
): Book[] {
  const normalizedQuery = query.toLowerCase().trim();

  return getArchiveData().books.filter(book => {
    const matchesQuery =
      !normalizedQuery ||
      book.title.toLowerCase().includes(normalizedQuery) ||
      book.author.toLowerCase().includes(normalizedQuery);

    const matchesGenre =
      !filters?.genre || book.genreSlug === filters.genre;

    const matchesLanguage =
      !filters?.language || book.languageSlug === filters.language;

    const matchesAuthor =
      !filters?.author || book.authorSlug === filters.author;

    return matchesQuery && matchesGenre && matchesLanguage && matchesAuthor;
  });
}