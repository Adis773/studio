
'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStories } from '@/lib/data';
import { StoryCard } from '@/components/story-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import type { Story } from '@/lib/types';


export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      const fetchStories = async () => {
        setStoriesLoading(true);
        const q = query(
          collection(db, 'stories'), 
          where('authorId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const userStories = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Convert Firestore Timestamp to ISO string if needed
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
          } as Story;
        });
        setStories(userStories);
        setStoriesLoading(false);
      };
      fetchStories();
    }
  }, [user]);


  if (authLoading || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center sm:flex-row gap-6 mb-12">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2 text-center sm:text-left">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-64" />
          </div>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
          My Whispers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
             <div key={i} className="p-4 rounded-lg border bg-card space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
             </div>
          ))}
        </div>
      </div>
    );
  }

  const getInitials = (email: string | null | undefined) => {
    if (!email) return '?';
    const name = user.displayName;
    return name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center sm:flex-row gap-6 mb-12">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.photoURL || ''} alt={user.displayName || user.email || ''} />
          <AvatarFallback className="text-3xl">
            {getInitials(user.email)}
          </AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">{user.displayName || 'Anonymous'}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
          My Whispers
        </h2>
        {storiesLoading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
               <div key={i} className="p-4 rounded-lg border bg-card space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
               </div>
            ))}
          </div>
        ) : stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground bg-card rounded-lg">
            <p className="text-lg">You haven't shared any whispers yet.</p>
            <p>Go on, share a story!</p>
          </div>
        )}
      </section>
    </div>
  );
}
