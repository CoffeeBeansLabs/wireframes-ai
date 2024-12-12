import { useState } from 'preact/hooks';
import { addMessage } from '../store/messages';
import { generateWireframe } from '../utils/api';
import { validateFiles } from '../utils/file';
import type { FormData } from '../types';

interface InitialFormProps {
  onSubmit: () => void;
}

export function InitialForm({ onSubmit }: InitialFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const files = formData.getAll('files') as File[];
    
    const fileError = validateFiles(files);
    if (fileError) {
      setError(fileError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await generateWireframe(formData);
      
      const projectName = formData.get('projectName') as string;
      const description = formData.get('description') as string;
      
      addMessage('user', `Project: ${projectName}\n\n${description}`);
      addMessage('assistant', data.response);
      
      form.reset();
      onSubmit();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div class="space-y-6">
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
            class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 transition-all min-h-[120px]"
            placeholder="Describe the flow you want to generate wireframes for..."
          />
        </div>

        <div>
          <label for="files" class="block text-sm font-medium text-gray-700 mb-2">
            Reference Files (optional)
          </label>
          <div class="mt-1">
            <div class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors duration-200">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label for="files" class="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none">
                    <span>Upload files</span>
                    <input 
                      id="files" 
                      name="files" 
                      type="file" 
                      multiple 
                      accept=".jpg,.jpeg,.png,.pdf"
                      class="sr-only"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">
                  JPG, PNG, PDF up to 5MB each (max 5 files)
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          class="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
      </div>
    </form>
  );
}