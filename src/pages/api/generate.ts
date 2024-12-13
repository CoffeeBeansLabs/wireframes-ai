import type { APIRoute } from "astro";
import Anthropic from "@anthropic-ai/sdk";

import dotenv from "dotenv";
import { v6 as uuidv6 } from "uuid";
import buildPrompt from "../../utils/prompt";

dotenv.config();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const conversations = new Map();
const prompts = new Map();

export const POST: APIRoute = async ({ request }) => {
  try {
    const { initialInput, subsequentMessage, conversationId } =
      await request.json();

    const prompt = initialInput
      ? buildPrompt(initialInput)
      : prompts.get(conversationId);

    if (conversationId && subsequentMessage) {
      prompt.messages.push({
        role: "user" as const,
        content: subsequentMessage,
      });
    }
    const assistantMessage = await client.messages.create(prompt);
    const currentConversationId = conversationId ?? uuidv6();

    conversations.set(currentConversationId, [
      ...prompt.messages,
      assistantMessage,
    ]);

    prompts.set(currentConversationId, prompt);

    return new Response(
      JSON.stringify({
        response: (assistantMessage.content[0] as any).input,
        conversationId,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate wireframe" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
