import { useState } from 'preact/hooks';
import { addMessage } from '../store/messages';
import { sendMessage } from '../services/api';

export function PromptForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const prompt = formData.get('prompt') as string;

    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await sendMessage(prompt);
      addMessage('user', data.response);
      form.reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="relative max-w-4xl mx-auto">
      {error && (
        <div class="absolute -top-12 left-0 right-0 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      <div class="flex gap-4">
        <input
          type="text"
          name="prompt"
          placeholder="Ask a follow-up question..."
          required
          disabled={isLoading}
          class="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 transition-all disabled:bg-gray-50 disabled:text-gray-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          class="bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 rounded-lg transition-all duration-200 flex items-center justify-center whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </form>
  );
}