// src/lib/types.ts
export interface RawBookData {
  title: string;
  author: string;
  genre: string;
  language: string;
  year?: string | number;
  description?: string;
  mega_link?: string;
  archive_link?: string; // Add this
  download_url?: string; 
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorSlug: string;
  genre: string;
  genreSlug: string;
  languages: string[];
  languageSlugs: string[];
  year?: number;
  description?: string;
  megaLink: MegaLinkStatus;
}

export type MegaLinkStatus = 
  | { type: 'available'; url: string }
  | { type: 'coming_soon' }
  | { type: 'unavailable' };

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

export interface SearchFilters {
  query?: string;
  genre?: string;
  language?: string;
}

export interface ArchiveData {
  books: Book[];
  genres: Genre[];
  authors: Author[];
  allLanguages: string[];
  allGenres: string[];
}