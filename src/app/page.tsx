
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden">
      <div className="absolute top-8 text-sm text-muted-foreground">
        сделано Адисом и Эмином
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,#27773e33,transparent)]"></div>
      
      <div className="flex items-center gap-4 mb-4">
        <Leaf className="h-12 w-12 text-primary" />
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-tight md:leading-snug">
          Forest AI
        </h1>
      </div>
      <p className="mt-4 text-lg md:text-xl max-w-2xl text-muted-foreground">
        Harnessing AI to nurture your ideas from seedlings to mighty oaks. Let your creativity flourish.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild size="lg" className="bg-primary/90 hover:bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20">
          <Link href="/app">Start Creating</Link>
        </Button>
      </div>
       <div className="mt-16 text-xs text-muted-foreground">
        <p>Your creative journey begins now.</p>
      </div>
    </main>
  );
}
