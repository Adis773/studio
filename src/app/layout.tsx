import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Forest AI - Nurture Your Ideas',
  description: 'Harnessing the power of AI to grow your concepts from seedlings to mighty oaks.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontInter.variable
        )}
      >
        <div className="relative flex min-h-dvh flex-col bg-background">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
