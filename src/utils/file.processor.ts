export async function processFiles(files: File[]): Promise<string> {
  try {
    const fileDescriptions = await Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        return {
          name: file.name,
          type: file.type,
          content: base64,
        };
      })
    );
    return JSON.stringify(fileDescriptions);
  } catch (error) {
    console.error("File processing error:", error);
    throw new Error("Failed to process uploaded files");
  }
}
