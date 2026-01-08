import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/ClientLayout'; // Import the header/wrapper
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Burzahom Archives',
  description: 'Digital Archive of Kashmir Literature',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* GLOBAL STYLES: font-mono and uppercase to match the AI look */}
      <body className="font-mono uppercase bg-white text-black antialiased selection:bg-black selection:text-white">
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}