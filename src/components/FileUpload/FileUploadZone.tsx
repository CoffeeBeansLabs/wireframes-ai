import { useCallback } from 'preact/hooks';
import type { DragEvent } from 'preact/compat';

interface FileUploadZoneProps {
  onFilesSelected: (files: FileList | File[]) => void;
}

export function FileUploadZone({ onFilesSelected }: FileUploadZoneProps) {
  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer?.files) {
      onFilesSelected(e.dataTransfer.files);
    }
  }, [onFilesSelected]);

  return (
    <div 
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors duration-200"
    >
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
              onChange={(e) => {
                const input = e.currentTarget;
                if (input.files) {
                  onFilesSelected(input.files);
                }
              }}
            />
          </label>
          <p class="pl-1">or drag and drop</p>
        </div>
        <p class="text-xs text-gray-500">
          JPG, PNG, PDF up to 5MB each (max 3 files)
        </p>
      </div>
    </div>
  );
}