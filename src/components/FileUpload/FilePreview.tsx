import { useState, useEffect } from 'preact/hooks';
import { PreviewOverlay } from './PreviewOverlay';
import { getFilePreviewInfo } from '../../utils/filePreview';
import type { FilePreviewInfo } from '../../types';

interface FilePreviewProps {
  file: File;
  onRemove: (file: File) => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const [previewInfo, setPreviewInfo] = useState<FilePreviewInfo | null>(null);

  useEffect(() => {
    getFilePreviewInfo(file).then(setPreviewInfo);
  }, [file]);

  if (!previewInfo) return null;

  return (
    <div class="relative group">
      <div class="border rounded-lg p-2 hover:bg-gray-50 transition-colors">
        <div class="w-24 h-24 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
          {previewInfo.type === 'image' ? (
            <img 
              src={previewInfo.url} 
              alt={file.name}
              class="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={previewInfo.iconUrl} 
              alt={file.type}
              class="w-12 h-12"
            />
          )}
        </div>
        <p class="text-xs mt-1 text-gray-600 truncate max-w-[96px]">{file.name}</p>
      </div>
      
      <PreviewOverlay 
        file={file} 
        previewInfo={previewInfo}
        onRemove={onRemove}
      />
    </div>
  );
}