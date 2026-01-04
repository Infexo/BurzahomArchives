// src/lib/utils.ts
import { MegaLinkStatus } from './types';

/**
 * Creates a URL-friendly slug from a string
 */
export function slugify(text: string): string {
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

/**
 * Creates a unique book slug from title and author
 */
export function createBookSlug(title: string, author: string): string {
  return `${slugify(title)}-${slugify(author)}`;
}

/**
 * Parses the mega_link field into a typed status
 */
export function parseMegaLink(link: string | undefined | null): MegaLinkStatus {
  if (!link || link.trim() === '') {
    return { type: 'unavailable' };
  }
  
  const trimmed = link.trim().toLowerCase();
  
  if (trimmed === 'coming soon' || trimmed === 'coming_soon') {
    return { type: 'coming_soon' };
  }
  
  if (trimmed === 'null' || trimmed === 'undefined' || trimmed === 'n/a') {
    return { type: 'unavailable' };
  }
  
  // Validate URL format
  try {
    new URL(link.trim());
    return { type: 'available', url: link.trim() };
  } catch {
    // If it's not a valid URL, treat as unavailable
    return { type: 'unavailable' };
  }
}

/**
 * Parses language field which may contain multiple languages (e.g., "Urdu/Kashmiri")
 */
export function parseLanguages(language: string): string[] {
  if (!language) return ['Unknown'];
  
  return language
    .split(/[\/,;]/)
    .map(l => l.trim())
    .filter(l => l.length > 0);
}

/**
 * Parses year field, handling various formats
 */
export function parseYear(year: string | number | undefined): number | undefined {
  if (!year) return undefined;
  
  const parsed = typeof year === 'number' ? year : parseInt(year.toString(), 10);
  
  if (isNaN(parsed) || parsed < 0 || parsed > new Date().getFullYear() + 1) {
    return undefined;
  }
  
  return parsed;
}

/**
 * Formats a number with proper pluralization
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const p = plural || `${singular}s`;
  return count === 1 ? `${count} ${singular}` : `${count} ${p}`;
}

/**
 * Decodes a URL slug back to display name (approximation)
 */
export function unslugify(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generates a stable ID for a book
 */
export function generateBookId(title: string, author: string, index: number): string {
  return `book-${slugify(title)}-${slugify(author)}-${index}`;
}