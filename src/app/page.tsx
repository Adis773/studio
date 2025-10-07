
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden">
      <div className="absolute top-8 text-sm text-muted-foreground">
        сделано Адисом и Эмином
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,#3e277733,transparent)]"></div>

      <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-tight md:leading-snug">
        Meet Cosmos
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-2xl text-muted-foreground">
        The universal intelligence. Forged from the core of all leading AI, Cosmos delivers answers and creations beyond imagination.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild size="lg" className="bg-primary/90 hover:bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20">
          <Link href="/app">Enter The Universe</Link>
        </Button>
      </div>
       <div className="mt-16 text-xs text-muted-foreground">
        <p>Your journey begins now.</p>
      </div>
    </main>
  );
}
