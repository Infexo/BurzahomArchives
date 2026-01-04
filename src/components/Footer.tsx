// src/components/Footer.tsx
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-archive-paper border-t border-archive-tan mt-auto">
      <div className="archive-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-archive-accent text-sm">
            <p>
              A preservation-focused digital library.
            </p>
            <p className="mt-1">
              All texts are provided for educational and archival purposes.
            </p>
          </div>
          <div className="text-archive-accent text-sm">
            © {currentYear} Digital Archive
          </div>
        </div>
      </div>
    </footer>
  );
}