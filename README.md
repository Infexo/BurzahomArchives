
[Burzahom Archives Website](https://burzahomarchives.vercel.app/)

# Digital Archive - Static Book Website

A preservation-focused digital library built with Next.js, TypeScript, and Tailwind CSS.
Generates entirely from CSV/XLSX at build time and deploys to Vercel.

## Features

- **Static Site Generation (SSG)** - All pages generated at build time
- **CSV/XLSX Support** - Parse book metadata from spreadsheets
- **Dynamic Hierarchy** - Genre → Language → Author → Books
- **Search & Filters** - Search by title, author, language with genre/language filters
- **External Link Handling** - Graceful handling of missing/coming soon links
- **SEO Optimized** - Full metadata for all pages
- **Academic Design** - Clean, archive-style aesthetic

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/BurzahomArchives.git
cd BurzahomArchives

# Install dependencies
npm install

# Add your data file
# Place books.csv or books.xlsx in the data/ folder

# Run development server
npm run dev

# Build for production
npm run build