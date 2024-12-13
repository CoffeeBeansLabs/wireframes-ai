import type { FilePreviewInfo } from '../types';

export async function getFilePreviewInfo(file: File): Promise<FilePreviewInfo> {
  if (file.type.startsWith('image/')) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          type: 'image',
          url: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    });
  }

  // For PDFs and other document types
  return {
    type: 'document',
    iconUrl: file.type === 'application/pdf' ? '/pdf-icon.svg' : '/doc-icon.svg'
  };
}