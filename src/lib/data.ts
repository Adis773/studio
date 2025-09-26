import type { Story, Category, CategoryID, Comment } from './types';
import { subDays, subHours, subMinutes } from 'date-fns';

const now = new Date();

const categories: Category[] = [
  { id: 'confession', name: 'Confession' },
  { id: 'secret', name: 'Secret' },
  { id: 'life', name: 'Life' },
  { id: 'love', name: 'Love' },
  { id: 'random', name: 'Random' },
];

let stories: Story[] = [
  {
    id: '1',
    title: 'I still think about my first love',
    content:
      "It's been over a decade, but sometimes I find myself wondering what could have been. We were young, and things ended messily. I'm happily married now, but there's a small part of me that will always hold a place for her. Is that normal?",
    category: 'love',
    createdAt: subDays(now, 2).toISOString(),
    views: 12500,
    reactions: { like: 1200, love: 800, haha: 5, wow: 250, sad: 400, angry: 10 },
    comments: [
      {
        id: 'c1-1',
        text: 'Totally normal. First loves leave a deep mark.',
        createdAt: subHours(now, 20).toISOString(),
      },
      {
        id: 'c1-2',
        text: "I think it's sweet. It doesn't mean you love your partner any less.",
        createdAt: subHours(now, 18).toISOString(),
      },
    ],
  },
  {
    id: '2',
    title: 'I quit my 6-figure job to sell pottery',
    content:
      "Everyone thinks I'm crazy. I had a stable, high-paying tech job, but I was miserable. I dreaded Mondays. Last month, I handed in my notice. Now I'm covered in clay every day and I've never been happier, even though I'm barely making rent. It's terrifying but exhilarating.",
    category: 'life',
    createdAt: subHours(now, 5).toISOString(),
    views: 8900,
    reactions: { like: 1500, love: 300, haha: 10, wow: 600, sad: 20, angry: 5 },
    comments: [
      {
        id: 'c2-1',
        text: 'Good for you! Life is too short to be miserable.',
        createdAt: subHours(now, 4).toISOString(),
      },
      {
        id: 'c2-2',
        text: 'This is my dream. You are so brave!',
        createdAt: subHours(now, 3).toISOString(),
      },
      {
        id: 'c2-3',
        text: 'Any tips for someone wanting to do the same?',
        createdAt: subMinutes(now, 90).toISOString(),
      },
    ],
  },
  {
    id: '3',
    title: 'I ate the last piece of cake and blamed the dog',
    content:
      'It was a chocolate fudge cake. My partner was saving it. The dog looked so guilty when confronted, he totally sold it. I feel a little bad, but it was worth it. That was a 10/10 cake.',
    category: 'confession',
    createdAt: subDays(now, 1).toISOString(),
    views: 25300,
    reactions: {
      like: 2000,
      love: 500,
      haha: 4500,
      wow: 300,
      sad: 10,
      angry: 150,
    },
    comments: [
      {
        id: 'c3-1',
        text: 'The dog knows. The dog will remember.',
        createdAt: subHours(now, 23).toISOString(),
      },
      {
        id: 'c3-2',
        text: 'LMAO this is the most relatable thing I have read all day.',
        createdAt: subHours(now, 22).toISOString(),
      },
    ],
  },
  {
    id: '4',
    title: "I know my friend's partner is cheating",
    content:
      "I saw them. At a bar downtown, with someone else. It was not ambiguous. My friend is head-over-heels, talking about marriage. If I tell her, I'll break her heart and she might even resent me. If I don't, I feel like I'm betraying her. I'm paralyzed and don't know what to do.",
    category: 'secret',
    createdAt: subMinutes(now, 15).toISOString(),
    views: 500,
    reactions: { like: 50, love: 5, haha: 2, wow: 80, sad: 150, angry: 40 },
    comments: [
      {
        id: 'c4-1',
        text: 'You have to tell her. She deserves to know.',
        createdAt: subMinutes(now, 10).toISOString(),
      },
    ],
  },
  {
    id: '5',
    title: 'Sometimes I pretend to be a secret agent in the supermarket',
    content:
      'When I\'m doing my weekly grocery shopping, I put in one earbud and pretend I\'m on a covert mission. "The target is in the dairy aisle. I repeat, the yogurt has been located." It makes buying milk and bread significantly more exciting.',
    category: 'random',
    createdAt: subDays(now, 5).toISOString(),
    views: 18000,
    reactions: {
      like: 2200,
      love: 600,
      haha: 3800,
      wow: 400,
      sad: 5,
      angry: 2,
    },
    comments: [],
  },
  {
    id: '6',
    content:
      "I have a crippling fear of phone calls. Texting, emails, face-to-face, all fine. But the moment a phone rings, my heart starts pounding. I have to rehearse what I'm going to say for an hour just to order a pizza. It's so illogical and I hate it.",
    category: 'confession',
    createdAt: subDays(now, 10).toISOString(),
    views: 9500,
    reactions: { like: 900, love: 50, haha: 120, wow: 300, sad: 700, angry: 3 },
    comments: [
      {
        id: 'c6-1',
        text: 'You are not alone! Phone calls are the worst.',
        createdAt: subDays(now, 9).toISOString(),
      },
    ],
  },
];

const getStoryPopularity = (story: Story): number => {
  const totalReactions = Object.values(story.reactions).reduce(
    (sum, count) => sum + count,
    0
  );
  return story.views + totalReactions * 10 + story.comments.length * 20;
};

export const getStories = (options?: {
  sort?: 'newest' | 'popular';
  category?: CategoryID;
  limit?: number;
}): Story[] => {
  let filteredStories = [...stories];

  if (options?.category) {
    filteredStories = filteredStories.filter(
      (story) => story.category === options.category
    );
  }

  if (options?.sort === 'popular') {
    filteredStories.sort((a, b) => getStoryPopularity(b) - getStoryPopularity(a));
  } else {
    // Default to newest
    filteredStories.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  if (options?.limit) {
    return filteredStories.slice(0, options.limit);
  }

  return filteredStories;
};

export const getStoryById = (id: string): Story | undefined => {
  return stories.find((story) => story.id === id);
};

export const getCategories = (): Category[] => {
  return categories;
};

export const getCategoryById = (id: CategoryID): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};
