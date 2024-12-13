import { FilePreview } from './FilePreview';

interface FilePreviewListProps {
  files: File[];
  onRemove: (file: File) => void;
}

export function FilePreviewList({ files, onRemove }: FilePreviewListProps) {
  if (files.length === 0) return null;

  return (
    <div class="flex flex-wrap gap-4 mt-4">
      {files.map((file, index) => (
        <FilePreview 
          key={`${file.name}-${index}`} 
          file={file} 
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}