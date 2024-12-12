import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

async function processFiles(files: File[]): Promise<string> {
  const fileDescriptions = await Promise.all(
    files.map(async (file) => {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      return {
        name: file.name,
        type: file.type,
        content: base64,
      };
    })
  );

  return JSON.stringify(fileDescriptions);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    let prompt: string;
    let fileContext = '';

    if (request.headers.get('Content-Type')?.includes('multipart/form-data')) {
      const formData = await request.formData();
      const projectName = formData.get('projectName') as string;
      const description = formData.get('description') as string;
      const files = formData.getAll('files') as File[];

      if (files.length > 0) {
        fileContext = await processFiles(files);
      }

      prompt = `Project Name: ${projectName}\n\nDescription: ${description}`;
      if (fileContext) {
        prompt += `\n\nReference Files: ${fileContext}`;
      }
    } else {
      const json = await request.json();
      prompt = json.prompt;
    }

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      temperature: 0,
      system:
        'You are a UX designer for a software consultancy company. Reply with SVG wireframes for the given prompt.',
      messages: [
        {
          role: 'user',
          content: `Generate a wireframe for the following use case. Provide the wireframe as an SVG with a clean, minimal design. Make sure the SVG is properly formatted and can be directly embedded in HTML. The wireframe should be practical and follow UI/UX best practices.

Use case: ${prompt}

Please provide the SVG wireframe along with a brief explanation of the design decisions.`,
        },
      ],
    });

    return new Response(JSON.stringify({ response: message.content[0].text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate wireframe' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
