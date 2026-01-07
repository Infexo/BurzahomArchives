// src/lib/types.ts

export interface RawBook {
  title: string;
  author: string;
  genre: string;
  language: string;
  url: string | null;
}
// src/lib/types.ts

export type MegaLinkStatus =
  | { type: 'available'; url: string }
  | { type: 'coming_soon' }
  | { type: 'unavailable' };


export interface Book {
  title: string;
  slug: string;
  author: string;
  authorSlug: string;
  genre: string;
  genreSlug: string;
  language: string;
  languageSlug: string;
  url: string | null;
}

export interface Genre {
  name: string;
  slug: string;
  bookCount: number;
  languages: LanguageInGenre[];
}

export interface LanguageInGenre {
  name: string;
  slug: string;
  bookCount: number;
  authors: AuthorInLanguage[];
}

export interface AuthorInLanguage {
  name: string;
  slug: string;
  bookCount: number;
}

export interface Author {
  name: string;
  slug: string;
  bookCount: number;
  genres: string[];
  languages: string[];
  books: Book[];
}

export interface ArchiveData {
  books: Book[];
  genres: Genre[];
  authors: Author[];
  allLanguages: string[];
  allGenres: string[];
}