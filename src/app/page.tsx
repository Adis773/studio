import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { StoryCard } from '@/components/story-card';
import { getStories, getCategories } from '@/lib/data';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, TrendingUp } from 'lucide-react';

export default function HomePage({
  searchParams,
}: {
  searchParams?: {
    category?: Category;
    sort?: 'newest' | 'popular';
  };
}) {
  const currentCategory = searchParams?.category || 'all';
  const currentSort = searchParams?.sort || 'newest';

  const trendingStories = getStories({ sort: 'popular', limit: 5 });
  const stories = getStories({
    sort: currentSort,
    category: currentCategory === 'all' ? undefined : currentCategory,
  });
  const categories = getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Trending Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-8 h-8 text-primary-foreground bg-primary/80 rounded-full p-1.5" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Trending Whispers
          </h2>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {trendingStories.map((story) => (
              <CarouselItem
                key={story.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 h-full">
                  <StoryCard story={story} isCompact={true} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      {/* Main Feed Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4 sm:mb-0">
            Latest Whispers
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Sort by:</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="capitalize">
                  {currentSort} <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={`?category=${currentCategory}&sort=newest`}>
                    Newest
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`?category=${currentCategory}&sort=popular`}>
                    Popular
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
          <Link href={`?sort=${currentSort}`} passHref>
            <Button
              variant={currentCategory === 'all' ? 'default' : 'ghost'}
              className="rounded-full"
              size="sm"
            >
              All
            </Button>
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`?category=${category.id}&sort=${currentSort}`}
              passHref
            >
              <Button
                variant={currentCategory === category.id ? 'default' : 'ghost'}
                size="sm"
                className="rounded-full capitalize"
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>

        {/* Stories Grid */}
        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No whispers found in this category.</p>
            <p>Why not be the first to share one?</p>
          </div>
        )}
      </section>
    </div>
  );
}