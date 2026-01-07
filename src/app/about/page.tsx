import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | Burzahom Archives',
  description: 'Mission statement and disclaimer.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-12 font-mono uppercase">
      
      {/* HEADER */}
      <header className="border-b-4 border-black pb-8">
        <Link 
          href="/" 
          className="inline-block text-sm font-bold mb-6 hover:bg-black hover:text-white px-1 transition-colors"
        >
          ← RETURN HOME
        </Link>
        <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
          ABOUT
        </h1>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex flex-col gap-16 text-lg md:text-xl font-bold leading-normal">
        
        {/* MISSION STATEMENT */}
        <section className="space-y-6">
          <p className="bg-black text-white p-4 inline-block text-xl md:text-2xl font-black leading-tight">
            NON-COMMERCIAL DIGITAL LIBRARY FOCUSED ON KASHMIR-RELATED MATERIAL.
          </p>
          <p>
            The collection spans multiple languages and includes books across literature, history, politics, society, and research.
          </p>
        </section>

        {/* NEUTRALITY */}
        <section className="border-t-2 border-black pt-6">
          <p className="mb-4">
            The archive brings together works representing diverse viewpoints — including pro-India, pro-Kashmir, pro-Pakistan, as well as neutral and academic perspectives.
          </p>
          <p className="opacity-60 text-base">
            // The purpose is documentation, access, and preservation, not the promotion or endorsement of any particular position.
          </p>
        </section>

        {/* SOURCES */}
        <section className="border-t-2 border-black pt-6">
          <h2 className="text-3xl font-black mb-6 decoration-4 underline-offset-8">SOURCES</h2>
          <div className="space-y-4">
            <p>
              This archive has been built by collecting publicly circulating material from various open sources.
            </p>
            <p>
              Indexing efforts include works originally shared by <span className="bg-gray-200 px-1">Cedar Archives</span>, whose work in preservation is acknowledged.
            </p>
          </div>
        </section>

        {/* LEGAL / OWNERSHIP */}
        <section className="border-t-2 border-black pt-6 text-base">
          <p>
            This website does not host files directly and does not claim ownership of listed content. All materials remain the property of their respective authors and publishers.
          </p>
        </section>

        {/* CONTACT BOX */}
        <section className="border-4 border-black bg-gray-50 p-6 md:p-8">
          <p className="text-sm opacity-70 mb-4">
            RIGHTS HOLDERS OR CONTENT QUERIES MAY CONTACT THE ADMINISTRATOR:
          </p>
          <a 
            href="mailto:burzahom.archives@gmail.com" 
            className="text-xl md:text-3xl font-black underline hover:bg-black hover:text-white transition-colors break-all"
          >
            BURZAHOM.ARCHIVES@GMAIL.COM
          </a>
        </section>

      </main>

      <footer className="mt-8 border-t border-black pt-4 pb-12">
        <p className="text-xs font-bold opacity-30">
          BURZAHOM // PRESERVATION_THROUGH_DOCUMENTATION // 2026
        </p>
      </footer>
    </div>
  );
}