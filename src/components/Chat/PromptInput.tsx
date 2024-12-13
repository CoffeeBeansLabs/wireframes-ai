import { useState } from 'preact/hooks';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    
    onSubmit(prompt);
    setPrompt('');
  };

  return (
    <form onSubmit={handleSubmit} class="relative">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        placeholder="Type your feedback or suggestions..."
        disabled={isLoading}
        class="w-full px-4 py-3 pr-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
        rows={3}
      />
      <button
        type="submit"
        disabled={!prompt.trim() || isLoading}
        class="absolute right-2 bottom-2 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-all duration-200"
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}