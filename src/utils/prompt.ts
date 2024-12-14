const systemPrompt = () =>
  "You are a UX designer for a software consultancy. Generate SVG wireframes for the specified user journey.";

const userPrompt = ({ projectName, projectBrief, userPersona, userJourney }) =>
  `The project name is ${projectName}. Here is a brief description: ${projectBrief}\n
  The user persona is ${userPersona}. Here is the user journey: ${userJourney}`;

const displayWireframesTool = {
  name: "display_wireframes",
  description:
    "Display the generated SVG wireframes for all screens along with their respective titles on the webpage. The generated SVGs should be passed here as an array so that ",
  input_schema: {
    type: "object" as const,
    properties: {
      wireframes: {
        type: "array" as const,
        description:
          "A list of generated wireframes, containing their SVG code and title",
        items: {
          type: "object" as const,
          properties: {
            title: {
              type: "string" as const,
              description:
                "Name of the screen which this wireframe represents. Up to 10 words, but ideally less than 5.",
            },
            image: {
              type: "string" as const,
              description:
                'SVG code for the generated wireframe for the given screen, such that it can be set as innerHTML of an element. Always set width="100%" and height="auto" on the <svg> tag.',
            },
          },
        },
      },
      explanation: {
        type: "string" as const,
        description:
          "Rationale explaining the generated wireframes, with 5 or fewer bullet points for each screen. It should be well-formed, minified HTML without indentation or line break characters. Use headings, ul, ol wherever relevant.",
      },
    },
  },
};

export default (userInput) => {
  return {
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 8192,
    system: systemPrompt(),
    tools: [displayWireframesTool],
    tool_choice: {
      type: "tool" as const,
      name: displayWireframesTool.name,
    },
    messages: [
      {
        role: "user" as const,
        content: userPrompt(userInput),
      },
    ],
  };
};
