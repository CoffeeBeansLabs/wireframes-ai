import { useState } from 'preact/hooks';
import { InitialForm } from './InitialForm';
import { ChatInterface } from './ChatInterface';

export function AppContainer() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div class="app-container bg-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl flex-1">
      <div class="max-w-7xl mx-auto p-6 md:p-8">
        <div class="transition-all duration-300 shimmer">
          {!showChat ? (
            <InitialForm onSubmit={() => setShowChat(true)} />
          ) : (
            <ChatInterface />
          )}
        </div>
      </div>
    </div>
  );
}