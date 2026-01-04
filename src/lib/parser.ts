// src/lib/parser.ts
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { RawBookData } from './types';

/**
 * Detects file type and parses accordingly
 */
export function parseDataFile(filePath: string): RawBookData[] {
  const absolutePath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(absolutePath)) {
    console.error(`Data file not found: ${absolutePath}`);
    return [];
  }

  const extension = path.extname(filePath).toLowerCase();

  if (extension === '.csv') {
    return parseCSV(absolutePath);
  } else if (extension === '.xlsx' || extension === '.xls') {
    return parseXLSX(absolutePath);
  } else {
    throw new Error(`Unsupported file format: ${extension}`);
  }
}

/**
 * Parses CSV file using PapaParse
 */
function parseCSV(filePath: string): RawBookData[] {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  const result = Papa.parse<RawBookData>(fileContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => {
      // Normalize header names
      return header.toLowerCase().trim().replace(/\s+/g, '_');
    },
    transform: (value: string) => {
      return value.trim();
    },
  });

  if (result.errors.length > 0) {
    console.warn('CSV parsing warnings:', result.errors);
  }

  return result.data.filter(row => row.title && row.author);
}

/**
 * Parses XLSX/XLS file using xlsx library
 */
function parseXLSX(filePath: string): RawBookData[] {
  const workbook = XLSX.readFile(filePath);
  
  // Get the first sheet
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // Convert to JSON with header row
  const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
  });

  // Normalize the data
  return jsonData.map((row) => {
    const normalized: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(row)) {
      const normalizedKey = key.toLowerCase().trim().replace(/\s+/g, '_');
      normalized[normalizedKey] = String(value).trim();
    }
    
    return normalized as unknown as RawBookData;
  }).filter(row => row.title && row.author);
}

/**
 * Gets the data file path, checking for both CSV and XLSX
 */
export function getDataFilePath(): string {
  const csvPath = 'data/books.csv';
  const xlsxPath = 'data/books.xlsx';
  
  if (fs.existsSync(path.join(process.cwd(), csvPath))) {
    return csvPath;
  }
  
  if (fs.existsSync(path.join(process.cwd(), xlsxPath))) {
    return xlsxPath;
  }
  
  throw new Error('No data file found. Please add books.csv or books.xlsx to the data/ folder.');
}