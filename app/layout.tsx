import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/nav/Navbar';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RecallAI',
  description: 'The fastest way to go from confused to confident',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <Toaster
          richColors
          closeButton
          style={{
            fontFamily: 'var(--geist-sans)',
          }}
        />
      </body>
    </html>
  );
}
