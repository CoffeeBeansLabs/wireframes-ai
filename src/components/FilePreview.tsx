import { useState } from 'preact/hooks';

interface FilePreviewProps {
  file: File;
}

export function FilePreview({ file }: FilePreviewProps) {
  const [preview, setPreview] = useState<string>('');

  useState(() => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      setPreview('/pdf-icon.svg');
    } else {
      setPreview('/doc-icon.svg');
    }
  }, [file]);

  const handlePreviewClick = () => {
    if (file.type === 'application/pdf') {
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div 
      onClick={handlePreviewClick} 
      class="relative group cursor-pointer border rounded-lg p-2 hover:bg-gray-50 transition-colors"
    >
      {file.type.startsWith('image/') ? (
        <img 
          src={preview} 
          alt={file.name} 
          class="w-20 h-20 object-cover rounded"
        />
      ) : (
        <div class="w-20 h-20 flex items-center justify-center bg-gray-100 rounded">
          <img 
            src={preview} 
            alt={file.type} 
            class="w-12 h-12"
          />
        </div>
      )}
      <p class="text-xs mt-1 text-gray-600 truncate max-w-[80px]">{file.name}</p>
      {file.type === 'application/pdf' && (
        <span class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
          Click to preview
        </span>
      )}
    </div>
  );
}