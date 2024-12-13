import type { FilePreviewInfo } from '../../types';

interface PreviewOverlayProps {
  file: File;
  previewInfo: FilePreviewInfo;
  onRemove: (file: File) => void;
}

export function PreviewOverlay({ file, previewInfo, onRemove }: PreviewOverlayProps) {
  const handlePreview = () => {
    if (previewInfo.type === 'image') {
      // For images, create a modal or lightbox preview
      const img = new Image();
      img.src = previewInfo.url;
      const w = window.open('');
      w?.document.write(img.outerHTML);
    } else {
      // For documents, open in new tab
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
      <button 
        onClick={handlePreview}
        class="text-white text-sm hover:underline mb-2"
      >
        Click to preview
      </button>
      <button
        onClick={() => onRemove(file)}
        class="text-red-400 text-sm hover:text-red-300"
      >
        Remove
      </button>
    </div>
  );
}