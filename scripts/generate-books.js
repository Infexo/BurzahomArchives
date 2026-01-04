const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

// Read CSV
const csvPath = path.join(process.cwd(), 'data', 'books.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV
const result = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.toLowerCase().trim().replace(/\s+/g, '_'),
});

// Helper functions
function slugify(text) {
  if (!text) return '';
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

function createBookSlug(title, author) {
  const titleSlug = slugify(title).slice(0, 50);
  const authorSlug = slugify(author).slice(0, 20);
  return `${titleSlug}-${authorSlug}`.replace(/-+$/, '');
}

function parseLanguages(langString) {
  if (!langString) return ['Unknown'];
  return langString.split(/[,\/&]+/).map(l => l.trim()).filter(Boolean);
}

function generateBookId(title, author, index) {
  return `book-${index + 1}-${slugify(title).slice(0, 20)}`;
}

// Transform data
const books = result.data
  .filter(row => row.title && row.author)
  .map((row, index) => {
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
      year: row.year ? parseInt(row.year) : undefined,
      description: row.description || undefined,
    };
  });

// Write output
const output = `// Auto-generated from books.csv - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}

export interface StaticBook {
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
}

export const booksData: StaticBook[] = ${JSON.stringify(books, null, 2)};

export const totalBooks = ${books.length};
`;

// Ensure src/data directory exists
const outputDir = path.join(process.cwd(), 'src', 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'books-static.ts');
fs.writeFileSync(outputPath, output);

console.log(`✅ Generated ${books.length} books to src/data/books-static.ts`);