import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
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
  const xlsxPath = path.join(dataDir, 'books.xlsx');

  if (fs.existsSync(csvPath)) {
    return csvPath;
  }

  if (fs.existsSync(xlsxPath)) {
    return xlsxPath;
  }

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
    } else if (extension === '.xlsx' || extension === '.xls') {
      return parseXLSX(filePath);
    } else {
      console.warn(`Unsupported file format: ${extension}`);
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

function parseXLSX(filePath: string): RawBookData[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
  });

  const normalized = jsonData.map((row) => {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(row)) {
      const normalizedKey = key.toLowerCase().trim().replace(/\s+/g, '_');
      result[normalizedKey] = String(value).trim();
    }

    return result as unknown as RawBookData;
  }).filter(row => row.title && row.author);

  if (normalized.length === 0) {
    return getFallbackData();
  }

  return normalized;
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