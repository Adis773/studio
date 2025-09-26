import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Eye, ArrowRight } from 'lucide-react';
import type { Story } from '@/lib/types';
import { getCategoryById } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface StoryCardProps {
  story: Story;
  isCompact?: boolean;
}

export function StoryCard({ story, isCompact = false }: StoryCardProps) {
  const category = getCategoryById(story.category);
  const totalReactions = Object.values(story.reactions).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          {story.title && (
            <CardTitle className={cn('text-lg font-bold', isCompact && 'text-base')}>
              <Link href={`/story/${story.id}`} className="hover:underline">
                {story.title}
              </Link>
            </CardTitle>
          )}
          {category && (
            <Badge variant="secondary" className="capitalize shrink-0">
              {category.name}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })}
        </p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p
          className={cn(
            'text-sm text-muted-foreground',
            isCompact ? 'line-clamp-3' : 'line-clamp-4'
          )}
        >
          {story.content}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground w-full">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{totalReactions.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{story.comments.length.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{story.views.toLocaleString()}</span>
          </div>
        </div>
        <Button asChild variant="ghost" size="sm" className="w-full sm:w-auto">
          <Link href={`/story/${story.id}`}>
            Read more <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}