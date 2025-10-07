'use server'

import { chat } from "@/ai/flows/chat";

export async function getChatResponse(message: string) {
  console.log("Received message:", message);
  const response = await chat(message);
  return response;
}
