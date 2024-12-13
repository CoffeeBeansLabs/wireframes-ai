import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.CLAUDE_API_KEY) {
  console.error("CLAUDE_API_KEY is not set in environment variables");
}

export const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || "",
  httpAgent: undefined, // Ensure no custom HTTP agent is used
});
