import { useState } from 'preact/hooks';
import { InitialForm } from './InitialForm';
import { ResponseView } from './ResponseView';
import { ChatFooter } from './ChatFooter';
import type { Message } from '../../types';

export function SplitView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);
    setShowResponse(true);

    // Simulating API call
    setTimeout(() => {
      setMessages([
        {
          role: 'user',
          content: {
            response: 'Your wireframe design explanation...',
            preview: ['<svg>...</svg>']
          }
        }
      ]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col">
      <div className={`transition-all duration-500 ${showResponse ? 'opacity-0 hidden' : 'opacity-100'}`}>
        <InitialForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </div>

      {showResponse && (
        <div className="flex-1 flex flex-col">
          <ResponseView 
            isLoading={isLoading}
            messages={messages}
          />
          <ChatFooter />
        </div>
      )}
    </div>
  );
}