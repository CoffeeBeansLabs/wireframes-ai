import { useState } from 'preact/hooks';
import { FileUploadZone } from './FileUploadZone';
import { FilePreviewList } from './FilePreviewList';
import { validateFiles } from '../../utils/fileValidation';

interface FileUploadSectionProps {
  onFilesChange: (files: File[]) => void;
  error: string | null;
}

export function FileUploadSection({ onFilesChange, error }: FileUploadSectionProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelected = (newFiles: FileList | File[]) => {
    const newFileArray = Array.from(newFiles);
    const updatedFiles = [...selectedFiles, ...newFileArray];
    
    const validationError = validateFiles(updatedFiles);
    if (!validationError) {
      setSelectedFiles(updatedFiles);
      onFilesChange(updatedFiles);
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = selectedFiles.filter(file => file !== fileToRemove);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Reference Files (optional)
      </label>
      <div class="mt-1">
        <FileUploadZone onFilesSelected={handleFilesSelected} />
        <FilePreviewList 
          files={selectedFiles} 
          onRemove={handleRemoveFile} 
        />
        {error && (
          <p class="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}