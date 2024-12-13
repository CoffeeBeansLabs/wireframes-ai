import { anthropic } from "../config/anthropic";

export async function generateWireframeWithAI(prompt: string): Promise<string> {
  try {
    const message = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 4096,
      temperature: 0,
      system:
        "You are a UX designer for a software consultancy company. Reply with SVG wireframes for the given prompt.",
      messages: [
        {
          role: "user",
          content: `Generate a wireframe for the following use case. Provide the wireframe as an SVG with a clean, minimal design. Make sure the SVG is properly formatted and can be directly embedded in HTML. The wireframe should be practical and follow UI/UX best practices.

          Use case: ${prompt}
          Please provide the SVG wireframe along with a brief explanation of the design decisions.`,
        },
      ],
    });

    return message.content[0].text;
  } catch (error) {
    console.error("Anthropic API Error:", error);
    throw new Error("Failed to generate wireframe with AI");
  }
}
