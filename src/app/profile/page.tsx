
'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getStories } from '@/lib/data';
import { StoryCard } from '@/components/story-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // NOTE: In a real application, you would fetch stories created by the current user.
  // Since we are using mock data and stories are anonymous, we will display all stories
  // as a placeholder for "My Whispers".
  const myStories = getStories();

  const getInitials = (email: string | null | undefined) => {
    return email ? email.charAt(0).toUpperCase() : '?';
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center sm:flex-row gap-6 mb-12">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.photoURL || ''} alt={user.email || ''} />
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
        {myStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground bg-card rounded-lg">
            <p className="text-lg">You haven&apos;t shared any whispers yet.</p>
            <p>Why not be the first to share one?</p>
          </div>
        )}
      </section>
    </div>
  );
}
