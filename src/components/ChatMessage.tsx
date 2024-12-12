import { SVGDisplay } from './SVGDisplay';
import { MessageText } from './MessageText';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div class={`p-4 rounded-lg ${
      role === 'user' 
        ? 'bg-dark-input ml-8 md:ml-16' 
        : 'bg-dark-lighter mr-8 md:mr-16'
    }`}>
      <div class="prose prose-invert max-w-none">
        {role === 'assistant' && content.includes('<svg') ? (
          <SVGDisplay content={content} />
        ) : (
          <MessageText content={content} />
        )}
      </div>
    </div>
  );
}