'use server'

export async function getChatResponse(message: string) {
  console.log("Received message:", message);
  // Simulate a delay for the AI response
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In the future, this will call the real AI.
  // For now, it returns a placeholder response.
  return "This is a placeholder response from Cosmos. The real AI integration is coming next.";
}
