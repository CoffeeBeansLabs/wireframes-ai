import { useEffect, useRef } from 'preact/hooks';
import { ResponseView } from './ResponseView';

interface ChatResponseProps {
  content: { response: string; preview: string[] };
  isNew?: boolean;
  isLoading?: boolean;
}

export function ChatResponse({ content, isNew = false, isLoading = false }: ChatResponseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNew && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isNew]);

  if (isLoading) {
    return (
      <div class="bg-white rounded-lg p-4 md:p-6">
        <div class="animate-pulse space-y-4">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      class={`bg-white rounded-lg transition-all duration-500 ${
        isNew ? 'animate-slide-in shimmer' : ''
      }`}
    >
      <ResponseView content={content} />
    </div>
  );
}