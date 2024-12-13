export function validateFiles(files: File[]): string | null {
  const MAX_FILES = 5;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

  if (files.length > MAX_FILES) {
    return `Please upload a maximum of ${MAX_FILES} files`;
  }

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `${file.name} is not a supported file type. Please upload only JPG, PNG, or PDF files`;
    }

    if (file.size > MAX_FILE_SIZE) {
      return `${file.name} is too large. Files must be smaller than 5MB`;
    }
  }

  return null;
}
