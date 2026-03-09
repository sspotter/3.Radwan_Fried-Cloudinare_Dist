import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Engineered Indulgence | Modern Catalog',
  description: 'A curated selection where modern precision meets timeless flavor.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
