import { useState } from "preact/hooks";
import { ProjectForm } from "./Form/ProjectForm";
import { PromptForm } from "./PromptForm";
import { generateWireframe } from "../services/api";

interface Message {
  role: "user" | "assistant";
  content: {
    response: string;
    preview: string[];
  };
}

export function SplitView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [conversationId, setConversationId] = useState<string>();

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);

    const { assistantMessage, currentConversationId } = await generateWireframe(
      formData
    );

    setIsLoading(false);
    setShowResponse(true);
    setConversationId(currentConversationId);

    setMessages([
      ...messages,
      {
        role: "assistant",
        content: {
          response: assistantMessage.content[0].input.explanation,
          preview: assistantMessage.content[0].input.wireframes.map(
            (w) => w.image
          ),
        },
      },
    ]);
  };

  return (
    <div class="transition-all duration-500">
      {!showResponse ? (
        <div class="animate-fade-out">
          <ProjectForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
      ) : (
        <div class="max-w-10xl space-y-6 grid grid-cols-2 gap-6">
          {/* Response Section */}
          <div class="bg-white rounded-lg p-6 animate-slide-in">
            {messages.map((message) => (
              <div
                class="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: message.content.response }}
              ></div>
            ))}
          </div>

          {/* Preview Section */}
          <div class="bg-white rounded-lg p-6 animate-slide-in">
            <div class="space-y-6">
              {messages
                .filter((m) => m.role == "assistant")
                .at(-1)
                ?.content.preview.map((svg, index) => (
                  <div
                    key={index}
                    class="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                ))}
            </div>
          </div>

          {/* Chat Input */}
          <div class="sticky bottom-0 bg-white border-t p-4 animate-slide-up">
            <PromptForm />
          </div>
        </div>
      )}
    </div>
  );
}
