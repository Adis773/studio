
'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function submitStory(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const rawData = {
    title: formData.get('title') as string || '',
    content: formData.get('content') as string,
    category: formData.get('category') as string,
  };

  if (!rawData.content || !rawData.category) {
    return { error: 'Content and category are required' };
  }
  
  const newStory = {
      authorId: user.id,
      title: rawData.title,
      content: rawData.content,
      category: rawData.category,
      // Default values for views, reactions, and comments should be set in Supabase table
  };

  const { error } = await supabase.from('stories').insert([newStory]);

  if (error) {
    console.error("Error inserting story into Supabase:", error);
    return { error: 'Could not save the story. Please try again.' };
  }

  revalidatePath('/');
  revalidatePath('/profile');
  redirect('/profile');
}

export async function submitComment(storyId: string, formData: FormData) {
  const supabase = createClient();
  const commentText = formData.get('comment');
  
  if (!commentText || typeof commentText !== 'string') {
    return { error: 'Comment cannot be empty.' };
  }

  const { data: { user } } = await supabase.auth.getUser();

  const { data: story, error: fetchError } = await supabase
    .from('stories')
    .select('comments')
    .eq('id', storyId)
    .single();

  if (fetchError || !story) {
    return { error: 'Failed to fetch story for commenting.' };
  }

  const newComment = {
    id: new Date().toISOString(), // Or use a UUID
    userId: user?.id,
    text: commentText,
    createdAt: new Date().toISOString(),
  };

  const updatedComments = [...(story.comments || []), newComment];

  const { error: updateError } = await supabase
    .from('stories')
    .update({ comments: updatedComments })
    .eq('id', storyId);

  if (updateError) {
    return { error: 'Failed to post comment.' };
  }

  revalidatePath(`/story/${storyId}`);
}
