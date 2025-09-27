
import { getStoryById } from '@/lib/data';
import { StoryCard } from './story-card';
import { Lightbulb } from 'lucide-react';

interface SimilarStoriesProps {
  storyId: string;
  storyContent: string;
}

export async function SimilarStories({ storyId, storyContent }: SimilarStoriesProps) {
  // AI functionality is temporarily removed.
  return null;
}


import Link from 'next/link';
import type { Story } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Heart } from 'lucide-react';
import {Badge} from "@/components/ui/badge";

function LinkStoryCard({ story }: { story: Story }) {
    const totalReactions = Object.values(story.reactions).reduce((s, c) => s + c, 0);
  return (
    <Link href={`/story/${story.id}`} className="block p-3 rounded-md hover:bg-accent transition-colors">
        <div className="flex justify-between items-start">
            {story.title && <h4 className="font-semibold text-sm mb-1 line-clamp-1">{story.title}</h4>}
            <Badge variant="secondary" className="capitalize text-xs">{story.category}</Badge>
        </div>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{story.content}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className='font-medium'>{formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })}</span>
        <div className="flex items-center gap-1">
            <Heart className="w-3 h-3"/>
            <span>{totalReactions}</span>
        </div>
        <div className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3"/>
            <span>{story.comments.length}</span>
        </div>
      </div>
    </Link>
  );
}
