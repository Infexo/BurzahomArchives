// src/lib/data.ts
import { parseDataFile, getDataFilePath } from './parser';
import {
  Book,
  Genre,
  Author,
  ArchiveData,
  LanguageInGenre,
  AuthorInLanguage,
  RawBookData,
} from './types';
import {
  slugify,
  createBookSlug,
  parseMegaLink,
  parseLanguages,
  parseYear,
  generateBookId,
} from './utils';

let cachedData: ArchiveData | null = null;

/**
 * Transforms raw CSV/XLSX data into normalized Book objects
 */
function transformRawData(rawData: RawBookData[]): Book[] {
  return rawData.map((row, index) => {
    const languages = parseLanguages(row.language);
    
    return {
      id: generateBookId(row.title, row.author, index),
      slug: createBookSlug(row.title, row.author),
      title: row.title,
      author: row.author,
      authorSlug: slugify(row.author),
      genre: row.genre || 'Uncategorized',
      genreSlug: slugify(row.genre || 'Uncategorized'),
      languages,
      languageSlugs: languages.map(l => slugify(l)),
      year: parseYear(row.year),
      description: row.description || undefined,
      megaLink: parseMegaLink(row.mega_link),
    };
  });
}

/**
 * Builds the genre hierarchy with languages and authors
 */
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
    // Get or create genre
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

    // Process each language the book is in
    for (let i = 0; i < book.languages.length; i++) {
      const langName = book.languages[i];
      const langSlug = book.languageSlugs[i];

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

      // Add author to language
      if (!language.authors.has(book.authorSlug)) {
        language.authors.set(book.authorSlug, {
          name: book.author,
          slug: book.authorSlug,
          count: 0,
        });
      }
      language.authors.get(book.authorSlug)!.count++;
    }
  }

  // Convert to final structure
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

/**
 * Builds author index with their books
 */
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

    for (const lang of book.languages) {
      if (!author.languages.includes(lang)) {
        author.languages.push(lang);
      }
    }
  }

  return Array.from(authorMap.values()).sort((a, b) => 
    a.name.localeCompare(b.name)
  );
}

/**
 * Extracts unique languages from all books
 */
function extractUniqueLanguages(books: Book[]): string[] {
  const languages = new Set<string>();
  for (const book of books) {
    for (const lang of book.languages) {
      languages.add(lang);
    }
  }
  return Array.from(languages).sort();
}

/**
 * Extracts unique genres from all books
 */
function extractUniqueGenres(books: Book[]): string[] {
  const genres = new Set<string>();
  for (const book of books) {
    genres.add(book.genre);
  }
  return Array.from(genres).sort();
}

/**
 * Main function to load and process all archive data
 */
export function getArchiveData(): ArchiveData {
  if (cachedData) {
    return cachedData;
  }

  const dataFilePath = getDataFilePath();
  const rawData = parseDataFile(dataFilePath);
  const books = transformRawData(rawData);

  cachedData = {
    books,
    genres: buildGenreHierarchy(books),
    authors: buildAuthorIndex(books),
    allLanguages: extractUniqueLanguages(books),
    allGenres: extractUniqueGenres(books),
  };

  return cachedData;
}

// Convenience functions for data access

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
      book.languageSlugs.includes(languageSlug)
  );
}

export function getAuthorsInGenreAndLanguage(
  genreSlug: string,
  languageSlug: string
): AuthorInLanguage[] {
  const language = getLanguageInGenre(genreSlug, languageSlug);
  return language?.authors || [];
}

export function getBooksForAuthorInGenreLanguage(
  genreSlug: string,
  languageSlug: string,
  authorSlug: string
): Book[] {
  return getArchiveData().books.filter(
    book =>
      book.genreSlug === genreSlug &&
      book.languageSlugs.includes(languageSlug) &&
      book.authorSlug === authorSlug
  );
}

export function searchBooks(
  query: string,
  filters?: { genre?: string; language?: string }
): Book[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  return getArchiveData().books.filter(book => {
    // Text search
    const matchesQuery =
      !normalizedQuery ||
      book.title.toLowerCase().includes(normalizedQuery) ||
      book.author.toLowerCase().includes(normalizedQuery) ||
      book.languages.some(l => l.toLowerCase().includes(normalizedQuery));

    // Genre filter
    const matchesGenre =
      !filters?.genre || book.genreSlug === filters.genre;

    // Language filter
    const matchesLanguage =
      !filters?.language || book.languageSlugs.includes(filters.language);

    return matchesQuery && matchesGenre && matchesLanguage;
  });
}