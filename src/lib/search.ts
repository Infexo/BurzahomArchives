// Simple search result type
export interface SearchResult {
  id: string;
  title: string;
  type: 'book';
  url: string;
  author: string;
  genre: string;
  languages: string[];
}