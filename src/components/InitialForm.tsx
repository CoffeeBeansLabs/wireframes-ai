import { useState } from 'preact/hooks';
import { addMessage } from '../store/messages';
import { generateWireframe } from '../utils/api';
import { FileUploadSection } from './FileUpload/FileUploadSection';
import type { FormData } from '../types';

interface InitialFormProps {
  onSubmit: () => void;
}

export function InitialForm({ onSubmit }: InitialFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Add all selected files to form data
    files.forEach(file => {
      formData.append('files', file);
    });
    
    setIsLoading(true);
    setError(null);

    try {
      const data = await generateWireframe(formData);
      
      const projectName = formData.get('projectName') as string;
      const description = formData.get('description') as string;
      
      addMessage('user', `Project: ${projectName}\n\n${description}`);
      addMessage('assistant', data.response);
      
      form.reset();
      setFiles([]);
      onSubmit();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-6">
      <div>
        <label for="project-name" class="block text-sm font-medium text-gray-700 mb-2">
          Project Name
        </label>
        <input 
          type="text" 
          id="project-name" 
          name="projectName" 
          required 
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 transition-all"
          placeholder="Enter your project name"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
          Use Case Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows="4"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 transition-all"
          placeholder="Describe the flow you want to generate wireframes for..."
        />
      </div>

      <FileUploadSection 
        onFilesChange={setFiles}
        error={error}
      />

      <button
        type="submit"
        disabled={isLoading}
        class="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Wireframes'
        )}
      </button>
    </form>
  );
}