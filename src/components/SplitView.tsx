import { useState } from "preact/hooks";
import { ProjectForm } from "./Form/ProjectForm";
import { ChatResponse } from "./Chat/ChatResponse";
import { PromptForm } from "./PromptForm";
import { dummyWireframeResponse } from "../constants/dummyData";

interface Message {
  role: "user";
  content: {
    response: string;
    preview: string[];
  };
}

export function SplitView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);

    // Simulating API call with dummy data
    setTimeout(() => {
      setMessages([
        {
          role: "user",
          content: {
            response: dummyWireframeResponse.code,
            preview: dummyWireframeResponse.preview,
          },
        },
      ]);
      setIsLoading(false);
      setShowResponse(true);
    }, 2000);
  };

  return (
    <div class="transition-all duration-500">
      {!showResponse ? (
        <div class="animate-fade-out">
          <ProjectForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
      ) : (
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            {/* Response Section */}
            <div class="bg-white rounded-lg p-6 animate-slide-in">
              <h2 class="text-xl font-semibold mb-4">Response</h2>
              <div class="prose prose-lg max-w-none whitespace-pre-wrap">
                {messages[0]?.content.response}
              </div>
            </div>

            {/* Preview Section */}
            <div class="bg-white rounded-lg p-6 animate-slide-in">
              <h2 class="text-xl font-semibold mb-4">Preview</h2>
              <div class="space-y-6">
                {messages[0]?.content.preview.map((svg, index) => (
                  <div
                    key={index}
                    class="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                ))}
              </div>
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
