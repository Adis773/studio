import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Sparkles className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold text-foreground">
        Cosmos
      </span>
    </Link>
  );
}
