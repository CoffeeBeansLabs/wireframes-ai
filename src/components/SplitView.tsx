import { useState } from "preact/hooks";
import { ProjectForm } from "./Form/ProjectForm";
import { PromptForm } from "./PromptForm";
import { generateWireframe, sendMessage } from "../services/api";

interface Message {
  role: "user" | "assistant";
  content: {
    response: string;
    preview?: string[];
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

    const newMessage: Message = {
      role: "assistant",
      content: {
        response: assistantMessage.content[0].input.explanation,
        preview: assistantMessage.content[0].input.wireframes.map(
          (w) => w.image
        ),
      },
    };

    setMessages([newMessage]);
  };

  const handleMessageSent = async (prompt: string) => {
    try {
      setIsLoading(true);

      const userMessage: Message = {
        role: "user",
        content: { response: prompt },
      };
      setMessages((prev) => [...prev, userMessage]);

      const requestBody = conversationId
        ? {
            subsequentMessage: prompt,
            conversationId,
          }
        : {
            initialInput: prompt,
          };

      const { assistantMessage, currentConversationId } =
        await generateWireframe(requestBody);

      if (currentConversationId !== conversationId) {
        setConversationId(currentConversationId);
      }

      const assistantResponseMessage: Message = {
        role: "assistant",
        content: {
          response: assistantMessage.content[0].text,
        },
      };
      setMessages((prev) => [...prev, assistantResponseMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="transition-all duration-500">
      {!showResponse ? (
        <div class="animate-fade-out">
          <ProjectForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
      ) : (
        <div class="space-y-6 grid grid-cols-2 gap-6">
          {/* Response Section */}
          <div class="max-w-6xl bg-white rounded-lg p-6 animate-slide-in">
            {messages.map((message, index) => (
              <div
                key={index}
                class={`prose max-w-none ${
                  message.role === "assistant"
                    ? "bg-gray-50 p-4 rounded-lg mb-4"
                    : "text-right p-4"
                }`}
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
                ?.content.preview?.map((svg, index) => (
                  <div
                    key={index}
                    class="wireframe-container border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                ))}
            </div>
          </div>

          {/* Chat Input */}
          <div class="sticky col-span-2 bottom-0 bg-white border-t p-4 animate-slide-up">
            <PromptForm onSubmit={handleMessageSent} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  );
}
