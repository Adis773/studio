import { notFound } from 'next/navigation';
import { getStoryById, getCategoryById } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageSquare, Heart, Clock, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { ReactionButtons } from '@/components/reaction-buttons';
import { CommentSection } from '@/components/comment-section';
import { SimilarStories } from '@/components/similar-stories';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default async function StoryPage({ params }: { params: { id: string } }) {
  const story = getStoryById(params.id);

  if (!story) {
    notFound();
  }

  const category = getCategoryById(story.category);
  const totalReactions = Object.values(story.reactions).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="container mx-auto max-w-4xl py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        <article className="lg:col-span-2">
          {/* Header */}
          <header className="mb-8">
            {category && (
              <Badge variant="default" className="capitalize mb-4">
                {category.name}
              </Badge>
            )}
            {story.title && (
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
                {story.title}
              </h1>
            )}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>
                  Posted on {format(new Date(story.createdAt), 'MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>{story.views.toLocaleString()} Views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                <span>{totalReactions.toLocaleString()} Reactions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>{story.comments.length.toLocaleString()} Comments</span>
              </div>
            </div>
          </header>

          {/* Story Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 mb-8 whitespace-pre-wrap font-sans">
            {story.content}
          </div>

          {/* Reactions and Report */}
          <div className="py-8 border-t border-b bg-accent/30 rounded-lg px-6">
            <p className="text-center font-medium text-foreground mb-4">
              How does this make you feel?
            </p>
            <ReactionButtons initialReactions={story.reactions} />
          </div>

          <div className="mt-6 flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Flag className="w-4 h-4 mr-2" /> Report
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Report this whisper?</AlertDialogTitle>
                  <AlertDialogDescription>
                    If this content violates our community guidelines, please report it. Our moderation team will review it shortly.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Report</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Comments */}
          <CommentSection storyId={story.id} initialComments={story.comments} />
        </article>
        
        {/* Sidebar */}
        <aside className="lg:col-span-1 mt-12 lg:mt-0">
          <div className="sticky top-24 space-y-8">
            <SimilarStories storyId={story.id} storyContent={story.content} />
          </div>
        </aside>
      </div>
    </div>
  );
}