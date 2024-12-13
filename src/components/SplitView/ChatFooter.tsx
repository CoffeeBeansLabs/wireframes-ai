import { useState } from 'preact/hooks';

export function ChatFooter() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    // Handle message submission
    setMessage('');
    setIsLoading(false);
  };

  return (
    <div className="border-t bg-white p-4 shadow-lg">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            placeholder="Ask a follow-up question..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}