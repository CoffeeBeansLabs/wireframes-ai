export async function processFiles(files: File[]): Promise<string> {
  try {
    const fileDescriptions = await Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        return {
          name: file.name,
          type: file.type,
          content: base64,
        };
      })
    );

    return JSON.stringify(fileDescriptions);
  } catch (error) {
    console.error('File processing error:', error);
    throw new Error('Failed to process uploaded files. Please try again.');
  }
}

export function validateFiles(files: File[]): string | null {
  if (files.length > 5) {
    return 'Please upload a maximum of 5 files';
  }

  const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  const invalidFile = files.find(file => !validTypes.includes(file.type));
  
  if (invalidFile) {
    return 'Please upload only JPG, PNG, or PDF files';
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  const oversizedFile = files.find(file => file.size > maxSize);
  
  if (oversizedFile) {
    return 'Files must be smaller than 5MB';
  }

  return null;
}