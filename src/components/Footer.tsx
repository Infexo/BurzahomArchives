// src/components/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-archive-paper border-t border-archive-tan mt-auto">
      <div className="archive-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-archive-accent text-sm">
            <p>
              Preserving Kashmir's literary heritage for future generations.
            </p>
            <p className="mt-1">
              All texts are provided for educational and archival purposes.
            </p>
          </div>
          
          {/* Clickable About Link */}
          <div className="flex gap-4">
            <Link 
              href="/about" 
              className="px-4 py-2 bg-archive-tan text-archive-accent border border-archive-accent hover:bg-archive-accent hover:text-archive-paper transition-colors rounded cursor-pointer"
            >
              About
            </Link>
          </div>
          
          <div className="text-archive-accent text-sm">
            © {currentYear} Burzahom Archives
          </div>
        </div>
      </div>
    </footer>
  );
}