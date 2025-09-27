'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from './firebase'; // Firestore instance
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from './firebase'; // Firebase Auth instance
import type { Story } from './types';


export async function submitStory(formData: FormData) {
  const user = auth.currentUser;

  if (!user) {
    // This should not happen if the form is protected, but as a safeguard.
    redirect('/login');
  }

  const rawData = {
    title: formData.get('title') as string || '',
    content: formData.get('content') as string,
    category: formData.get('category') as string,
  };

  if (!rawData.content || !rawData.category) {
    // Handle error: content and category are required
    return;
  }
  
  try {
    const newStory: Omit<Story, 'id' | 'createdAt'> & { authorId: string; createdAt: any } = {
        authorId: user.uid,
        title: rawData.title,
        content: rawData.content,
        category: rawData.category as any,
        views: 0,
        reactions: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
        comments: [],
        createdAt: serverTimestamp()
    };
    await addDoc(collection(db, "stories"), newStory);
  } catch(e) {
    console.error("Error adding document: ", e);
    // Handle error properly in a real app
  }


  revalidatePath('/');
  revalidatePath('/profile');
  redirect('/profile');
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
