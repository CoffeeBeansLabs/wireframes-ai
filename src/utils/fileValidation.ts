export function validateFiles(files: File[]): string | null {
  if (files.length > 3) {
    return 'Please upload a maximum of 3 files';
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  const oversizedFile = files.find(file => file.size > maxSize);
  
  if (oversizedFile) {
    return `${oversizedFile.name} is too large. Files must be smaller than 5MB`;
  }

  return null;
}