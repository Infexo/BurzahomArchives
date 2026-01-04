import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { RawBookData } from './types';

function getDataDirectory(): string {
  const possiblePaths = [
    path.join(process.cwd(), 'data'),
    path.join(process.cwd(), 'src', 'data'),
    path.resolve('./data'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  return path.join(process.cwd(), 'data');
}

export function getDataFilePath(): string {
  const dataDir = getDataDirectory();
  const csvPath = path.join(dataDir, 'books.csv');

  return csvPath;
}

export function parseDataFile(filePath: string): RawBookData[] {
  if (!fs.existsSync(filePath)) {
    console.warn(`Data file not found at ${filePath}, using fallback data`);
    return getFallbackData();
  }

  try {
    const extension = path.extname(filePath).toLowerCase();

    if (extension === '.csv') {
      return parseCSV(filePath);
    } else {
      console.warn(`Unsupported file format: ${extension}. Please use .csv`);
      return getFallbackData();
    }
  } catch (error) {
    console.error('Error parsing data file:', error);
    return getFallbackData();
  }
}

function parseCSV(filePath: string): RawBookData[] {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const result = Papa.parse<RawBookData>(fileContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => {
      return header.toLowerCase().trim().replace(/\s+/g, '_');
    },
    transform: (value: string) => {
      return value.trim();
    },
  });

  if (result.errors.length > 0) {
    console.warn('CSV parsing warnings:', result.errors);
  }

  const validData = result.data.filter(row => row.title && row.author);

  if (validData.length === 0) {
    return getFallbackData();
  }

  return validData;
}

function getFallbackData(): RawBookData[] {
  return [
    {
      title: "Sample Book",
      author: "Sample Author",
      genre: "Fiction",
      language: "English",
      year: "2024",
      description: "This is fallback data. Please add your books.csv file to the data folder.",
      mega_link: ""
    }
  ];
}