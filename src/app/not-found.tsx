'use client';

import React from 'react';

export default function NotFound() {
  const safePushState = (url: string) => {
    window.dispatchEvent(new CustomEvent('app-nav', { detail: { path: url } }));
    try { window.history.pushState({}, '', url); } catch (e) {}
  };

  return (
    <div className="flex flex-col gap-12 py-12">
      <header className="border-b-8 border-black pb-8">
        <h1 className="text-[15vw] md:text-[12vw] font-black leading-[0.8] tracking-tighter uppercase">
          404:<br />
          NOT<br />
          FOUND.
        </h1>
      </header>

      <div className="flex flex-col gap-8 max-w-2xl">
        <p className="text-2xl md:text-4xl font-black leading-tight uppercase">
          THE REQUESTED RECORD OR PATH DOES NOT EXIST WITHIN THE BURZAHOM DIGITAL ARCHIVE.
        </p>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => safePushState('/')}
            className="px-8 py-4 border-4 border-black bg-black text-white hover:bg-white hover:text-black transition-colors font-black text-xl uppercase"
          >
            RETURN TO HOME
          </button>
          <button 
            onClick={() => safePushState('/search')}
            className="px-8 py-4 border-4 border-black hover:bg-black hover:text-white transition-colors font-black text-xl uppercase"
          >
            SEARCH ARCHIVE
          </button>
        </div>
      </div>

      <footer className="mt-12 text-[10px] font-bold opacity-30 italic uppercase tracking-[0.2em]">
        ERROR_STATUS: NULL_POINTER // LOCATION_INDEX: {typeof window !== 'undefined' ? window.location.pathname.toUpperCase() : 'UNKNOWN'}
      </footer>
    </div>
  );
}