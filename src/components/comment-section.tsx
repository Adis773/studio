'use client';

import { useState, useTransition, useRef } from 'react';
import type { Comment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Send } from 'lucide-react';
import { submitComment } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

export function CommentSection({
  storyId,
  initialComments,
}: {
  storyId: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (formData: FormData) => {
    const commentText = formData.get('comment') as string;
    if (!commentText.trim()) return;

    // Optimistic update
    const newComment: Comment = {
      id: Date.now().toString(),
      text: commentText,
      createdAt: new Date().toISOString(),
    };
    setComments(prev => [...prev, newComment]);
    formRef.current?.reset();

    startTransition(async () => {
      const result = await submitComment(storyId, formData);
      if (result?.error) {
        // Revert optimistic update
        setComments(prev => prev.filter(c => c.id !== newComment.id));
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <section className="mt-12 pt-8 border-t">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-7 h-7 text-foreground" />
        <h2 className="text-2xl font-bold">
          Comments ({comments.length})
        </h2>
      </div>

      <form action={handleFormSubmit} ref={formRef} className="mb-8">
        <div className="space-y-2">
          <Textarea
            name="comment"
            placeholder="Share your thoughts anonymously..."
            className="min-h-[100px]"
            required
            disabled={isPending}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              <Send className="w-4 h-4 mr-2" />
              {isPending ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {comments.length > 0 ? (
          [...comments].reverse().map((comment) => (
            <div key={comment.id} className="flex flex-col gap-2 p-4 rounded-lg bg-card border">
              <p className="text-sm text-foreground/90">{comment.text}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No comments yet. Be the first to say something!
          </p>
        )}
      </div>
    </section>
  );
}