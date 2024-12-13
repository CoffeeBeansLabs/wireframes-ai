import type { APIRoute } from "astro";
import AnthropicBedrock from "@anthropic-ai/sdk";

import dotenv from "dotenv";
import buildPrompt from "../../utils/prompt";

dotenv.config();

const client = new AnthropicBedrock({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const { userInput } = await request.json();

    const message = await client.messages.create(buildPrompt(userInput));

    return new Response(
      JSON.stringify({ response: (message.content[0] as any).input }),
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
