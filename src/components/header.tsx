import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Feather } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Logo />
          </div>
          <nav className="flex items-center">
            <Button asChild>
              <Link href="/submit">
                <Feather className="mr-2 h-4 w-4" />
                Share a Secret
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}