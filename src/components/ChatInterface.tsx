import { useEffect, useRef } from 'preact/hooks';
import { ChatMessage } from './ChatMessage';
import { PromptForm } from './PromptForm';
import { messages } from '../store/messages';

export function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.value]);

  return (
    <div class="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      <div class="flex-1 overflow-y-auto px-4 space-y-4">
        {messages.value.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div class="mt-4 px-4 pb-4">
        <PromptForm />
      </div>
    </div>
  );
}