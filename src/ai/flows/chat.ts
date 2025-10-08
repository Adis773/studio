'use server';

/**
 * @fileoverview A simple chat flow that responds to user input.
 *
 * - chat - A function that takes a user message and returns a response from the AI.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export async function chat(message: string): Promise<string> {
  const llm = ai.getLlm('googleai/gemini-1.5-flash');
  const {output} = await llm.generate({
    prompt: `You are Forest AI, an AI assistant that helps users grow and nurture their ideas. Respond to the user's message: ${message}`,
  });
  return output?.text ?? "I'm sorry, I couldn't process that.";
}
