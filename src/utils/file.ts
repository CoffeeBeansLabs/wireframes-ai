import type { FilePreviewInfo } from '../types';

export async function getFilePreviewUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

export async function getFilePreviewInfo(file: File): Promise<FilePreviewInfo> {
  if (file.type.startsWith('image/')) {
    const url = await getFilePreviewUrl(file);
    return { type: 'image', url };
  }

  return {
    type: 'document',
    iconUrl: file.type === 'application/pdf' ? '/pdf-icon.svg' : '/doc-icon.svg'
  };
}

export function openFilePreview(file: File): void {
  const fileUrl = URL.createObjectURL(file);
  window.open(fileUrl, '_blank');
  URL.revokeObjectURL(fileUrl); // Clean up the URL object
}