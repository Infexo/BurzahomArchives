// src/app/layout.tsx
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Burzahom Archives - Preserving Kashmir\'s Heritage',
    template: '%s | Burzahom Archives',
  },
  description: 'A digital archive preserving books, documents, and literature from Kashmir across genres, languages, and time periods.',
  keywords: ['Kashmir', 'Burzahom', 'digital library', 'book archive', 'Kashmir literature', 'preservation'],
  authors: [{ name: 'Burzahom Archives' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Burzahom Archives',
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