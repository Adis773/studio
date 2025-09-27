
import { createClient } from '@supabase/supabase-js';
import type { Story } from './types';

// IMPORTANT: Replace with your actual Supabase URL and Anon Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Basic validation to ensure environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is not set. Please check your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// The following is an EXAMPLE of how you might fetch data.
// You would need to adjust this based on your actual table structure in Supabase.
// This code is NOT active and is for demonstration purposes.

/*
const getStoryPopularity = (story: Story): number => {
  const totalReactions = Object.values(story.reactions).reduce(
    (sum, count) => sum + count,
    0
  );
  return story.views + totalReactions * 10 + story.comments.length * 20;
};

export const getStoriesFromSupabase = async (options?: {
  sort?: 'newest' | 'popular';
  category?: string;
  limit?: number;
}): Promise<Story[]> => {

  // This assumes you have a table named 'stories'
  let query = supabase.from('stories').select('*');

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.sort === 'popular') {
    // Supabase doesn't directly support sorting by a calculated "popularity" field.
    // You would typically handle this with a database function (RPC) or by sorting client-side.
    // For simplicity, we'll just sort by views as a proxy for popularity.
    query = query.order('views', { ascending: false });
  } else {
    // Default to newest
    query = query.order('created_at', { ascending: false });
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching stories from Supabase:', error);
    return [];
  }

  // The data from Supabase might need to be mapped to your 'Story' type.
  // This is a placeholder and will need to be adjusted.
  return data as Story[];
};
*/
