'use client';

import { useState } from 'react';
import type { Reactions, ReactionID } from '@/lib/types';
import { cn } from '@/lib/utils';

type ReactionInfo = {
  id: ReactionID;
  emoji: string;
  label: string;
};

const availableReactions: ReactionInfo[] = [
  { id: 'like', emoji: '👍', label: 'Like' },
  { id: 'love', emoji: '❤️', label: 'Love' },
  { id: 'haha', emoji: '😂', label: 'Haha' },
  { id: 'wow', emoji: '😮', label: 'Wow' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'angry', emoji: '😡', label: 'Angry' },
];

export function ReactionButtons({
  initialReactions,
}: {
  initialReactions: Reactions;
}) {
  const [reactions, setReactions] = useState(initialReactions);
  const [userReaction, setUserReaction] = useState<ReactionID | null>(null);

  const handleReactionClick = (reactionId: ReactionID) => {
    setReactions((prevReactions) => {
      const newReactions = { ...prevReactions };

      // If user is clicking the same reaction, un-react
      if (userReaction === reactionId) {
        newReactions[reactionId]--;
        setUserReaction(null);
        return newReactions;
      }
      
      // If user is changing reaction, decrement old and increment new
      if (userReaction) {
        newReactions[userReaction]--;
      }
      newReactions[reactionId]++;
      setUserReaction(reactionId);

      return newReactions;
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
      {availableReactions.map(({ id, emoji, label }) => (
        <button
          key={id}
          onClick={() => handleReactionClick(id)}
          aria-label={`React with ${label}`}
          className={cn(
            'group flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm transition-all duration-200 ease-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            userReaction === id
              ? 'border-primary bg-accent text-accent-foreground'
              : 'border-border'
          )}
        >
          <span className="text-lg transition-transform duration-200 group-hover:rotate-12 group-active:scale-125">
            {emoji}
          </span>
          <span className="font-semibold text-foreground/80">
            {reactions[id].toLocaleString()}
          </span>
        </button>
      ))}
    </div>
  );
}