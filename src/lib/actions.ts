'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function submitStory(formData: FormData) {
  const rawData = {
    title: formData.get('title'),
    content: formData.get('content'),
    category: formData.get('category'),
  };

  // In a real app, you would save this data to a database.
  // For this demo, we'll just log it to the server console.
  console.log('New story submitted:', rawData);

  // In a real app, you might add the new story to your data source.
  // For now, since we're using static mock data, we can't add to it.
  // We'll revalidate the path to ensure that if the data source was dynamic,
  // the page would be updated.
  revalidatePath('/');

  // Redirect to the home page after submission.
  redirect('/');
}

export async function submitComment(storyId: string, formData: FormData) {
  const commentText = formData.get('comment');
  
  if (!commentText || typeof commentText !== 'string') {
    return { error: 'Comment cannot be empty.' };
  }

  // In a real app, you would save this to the database.
  console.log(`New comment for story ${storyId}:`, commentText);

  revalidatePath(`/story/${storyId}`);
}
