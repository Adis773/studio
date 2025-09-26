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

export type Story = {
  id: string;
  title?: string;
  content: string;
  category: CategoryID;
  createdAt: string;
  views: number;
  reactions: Reactions;
  comments: Comment[];
};
