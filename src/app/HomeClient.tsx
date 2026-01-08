'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HomeClientProps {
  books: any[];
  genres: any[];
  authors: any[];
}

export default function HomeClient({ books, genres, authors }: HomeClientProps) {
  const router = useRouter();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // Organize Data
  const categories = useMemo(() => {
    const languages = [...new Set(books.map((b: any) => b.language))].map(lang => ({
      name: lang,
      slug: String(lang).toLowerCase()
    }));

    return {
      GENRE: genres,
      AUTHOR: authors,
      LANGUAGE: languages
    };
  }, [books, genres, authors]);

  const toggleCategory = (cat: string) => {
    setOpenCategory(openCategory === cat ? null : cat);
  };

  const handleDiscover = () => {
    const randomBook = books[Math.floor(Math.random() * books.length)];
    if (randomBook) {
      router.push(`/book/${randomBook.slug || randomBook.id}`); 
    }
  };

  return (
    <div className="flex flex-col gap-12 min-h-screen bg-white text-black p-4 md:p-8">
      
      {/* HERO SECTION */}
      <section className="flex flex-col py-4">
        <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter">
          EVERYTHING.<br />
          KASHMIRI.<br />
          HERE.
        </h1>
      </section>

      {/* NAVIGATION ACCORDION */}
      <nav className="flex flex-col">
        {Object.entries(categories).map(([key, items]) => (
          <div key={key} className="border-t-4 border-black last:border-b-4">
            <button
              onClick={() => toggleCategory(key)}
              className="w-full flex justify-between items-center py-6 text-3xl md:text-5xl font-black hover:bg-black hover:text-white transition-colors text-left px-2"
            >
              <span>{key}</span>
              <span className="text-xl">{openCategory === key ? '[—]' : '[+]'}</span>
            </button>
            
            {openCategory === key && (
              <ul className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 border-t-2 border-black max-h-[60vh] overflow-y-auto">
                {items.map((item: any) => {
                  const path = key === 'GENRE' 
                    ? `/genre/${item.slug}` 
                    : key === 'AUTHOR' 
                    ? `/authors/${item.slug}`
                    : `/language/${item.slug}`;
                  
                  return (
                    <li key={item.slug || item.name}>
                      <Link 
                        href={path}
                        className="w-full text-left block py-4 px-6 text-lg md:text-xl font-bold border-b border-black hover:bg-black hover:text-white transition-colors uppercase"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}

        {/* ACTIONS SECTION */}
        <div className="mt-12 flex flex-wrap gap-4">
          <button 
            onClick={handleDiscover}
            className="px-4 py-2 border-4 border-black bg-black text-white hover:bg-white hover:text-black transition-colors font-black text-xl uppercase"
          >
            DISCOVER RANDOM RECORD →
          </button>

          {/* NEW BUTTON ADDED HERE */}
          <Link 
            href="/supplementary-material"
            className="px-4 py-2 border-4 border-black bg-white text-black hover:bg-black hover:text-white transition-colors font-black text-xl uppercase"
          >
            SUPPLEMENTARY MATERIAL →
          </Link>
        </div>
      </nav>

      <footer className="mt-12 text-sm font-bold opacity-40">
        <p>BA© {new Date().getFullYear()}// EVERYTHING.KASHMIRI.HERE.</p>
      </footer>
    </div>
  );
}