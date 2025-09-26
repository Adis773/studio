'use server';

/**
 * @fileOverview An AI agent that suggests similar stories based on the content of a given story.
 *
 * - suggestSimilarStories - A function that takes a story's content and returns a list of similar story IDs.
 * - SuggestSimilarStoriesInput - The input type for the suggestSimilarStories function.
 * - SuggestSimilarStoriesOutput - The return type for the suggestSimilarStories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSimilarStoriesInputSchema = z.object({
  storyContent: z.string().describe('The content of the story to find similar stories for.'),
  storyId: z.string().describe('The ID of the story to find similar stories for.'),
});
export type SuggestSimilarStoriesInput = z.infer<typeof SuggestSimilarStoriesInputSchema>;

const SuggestSimilarStoriesOutputSchema = z.array(z.string()).describe('A list of story IDs that are similar to the input story.');
export type SuggestSimilarStoriesOutput = z.infer<typeof SuggestSimilarStoriesOutputSchema>;

export async function suggestSimilarStories(input: SuggestSimilarStoriesInput): Promise<SuggestSimilarStoriesOutput> {
  return suggestSimilarStoriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSimilarStoriesPrompt',
  input: {schema: SuggestSimilarStoriesInputSchema},
  output: {schema: SuggestSimilarStoriesOutputSchema},
  prompt: `You are an AI agent that suggests similar stories based on the content of a given story.

You will receive the content of a story and must respond with a list of story IDs that are similar to the input story.

Story Content: {{{storyContent}}}
Story ID: {{{storyId}}}

Return a list of story IDs that are similar to the input story.  Do not include the input story's ID in the output list.
The returned list must be a JSON array of strings.
`, // Ensure output is a JSON array of strings
});

const suggestSimilarStoriesFlow = ai.defineFlow(
  {
    name: 'suggestSimilarStoriesFlow',
    inputSchema: SuggestSimilarStoriesInputSchema,
    outputSchema: SuggestSimilarStoriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Attempt to parse the output as JSON.  If it fails, return an empty array.
    try {
      return JSON.parse(output!.toString());
    } catch (e) {
      console.error('Failed to parse story ID suggestions as JSON, returning empty array:', e);
      return [];
    }
  }
);
