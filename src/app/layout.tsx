// src/app/layout.tsx
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Digital Archive - A Preservation-Focused Library',
    template: '%s | Digital Archive',
  },
  description: 'A static, archive-style digital library preserving books across genres, languages, and time periods.',
  keywords: ['digital library', 'book archive', 'preservation', 'ebooks'],
  authors: [{ name: 'Digital Archive' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Digital Archive',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}