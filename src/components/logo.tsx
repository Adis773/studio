import { Feather } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Feather className="h-6 w-6 text-primary-foreground bg-primary/80 rounded-md p-1" />
      <span className="text-xl font-bold text-foreground">
        WhisperNet
      </span>
    </Link>
  );
}