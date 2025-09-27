export type CategoryID = 'confession' | 'secret' | 'life' | 'love' | 'random';

export type Category = {
  id: CategoryID;
  name: string;
};

export type ReactionID = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

export type Reactions = Record<ReactionID, number>;

export type Comment = {
  id: string;
  text: string;
  createdAt: string;
};

// This type now reflects what we expect from Supabase
// It's mostly the same but `id` can be a number or string from Supabase
// and created_at will be a string.
export type Story = {
  id: string | number;
  authorId: string;
  title?: string;
  content: string;
  category: CategoryID;
  createdAt: string; // comes as 'created_at' from supabase
  views: number;
  reactions: Reactions;
  comments: Comment[];
};
