'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInverted, setIsInverted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persistence: Load inversion state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("inverted") === "true";
    setIsInverted(saved);
  }, []);

  // Apply the filter to the document root so it covers EVERYTHING
  useEffect(() => {
    if (isInverted) {
      document.documentElement.classList.add('inverted-mode');
      localStorage.setItem("inverted", "true");
    } else {
      document.documentElement.classList.remove('inverted-mode');
      localStorage.setItem("inverted", "false");
    }
  }, [isInverted]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-mono uppercase">
      <header className="border-b-4 border-black px-4 py-4 md:px-8 md:py-6 flex items-center justify-between gap-4 sticky top-0 bg-white z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-5xl md:text-6xl font-black leading-none bg-black text-white px-3 py-1 select-none cursor-pointer hover:bg-white hover:text-black border-4 border-black transition-colors">
            B
          </Link>
          <div className="hidden sm:flex flex-col text-[10px] md:text-[12px] font-black leading-tight tracking-[0.2em]">
            <span>BURZAHOM</span>
            <span>ARCHIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          {!isSearchOpen && (
            <>
              <button
                onClick={() => setIsInverted(!isInverted)}
                title="INVERT COLORS"
                className="p-2 border-4 border-black bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18V4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
                </svg>
              </button>

              <Link
                href="/about"
                className="group flex items-center gap-2 px-4 py-2 border-4 border-black bg-black text-white hover:bg-white hover:text-black transition-colors"
              >
                <span className="font-black text-xl">ABOUT</span>
              </Link>
            </>
          )}

          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex-1 max-w-md flex items-center border-4 border-black">
              <input
                ref={inputRef}
                type="text"
                placeholder="SEARCH..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 outline-none font-bold text-lg uppercase bg-transparent text-black placeholder:text-gray-400 font-mono"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="px-4 py-2 border-l-4 border-black hover:bg-black hover:text-white font-black text-black"
              >
                [X]
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="group flex items-center gap-2 px-4 py-2 border-4 border-black bg-black text-white hover:bg-white hover:text-black transition-colors"
            >
              <span className="font-black text-xl hidden md:block">SEARCH</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" className="stroke-white group-hover:stroke-black transition-colors">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}