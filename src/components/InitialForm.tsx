import { useState } from "preact/hooks";
import { addMessage } from "../store/messages";
import { generateWireframe } from "../services/api";
import { validateFiles } from "../utils/validation";
import { FileUploadZone } from "./FileUpload/FileUploadZone";
import { FilePreview } from "./FileUpload/FilePreview";
import { FormField } from "./Form/FormField";
import { LoadingButton } from "./Form/LoadingButton";
import { ErrorMessage } from "./Form/ErrorMessage";
import type { FormData } from "../types";

interface InitialFormProps {
  onSubmit: () => void;
}

export function InitialForm({ onSubmit }: InitialFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const fileError = validateFiles(fileArray);

    if (fileError) {
      setError(fileError);
      return;
    }

    setSelectedFiles((prev) => [...prev, ...fileArray]);
    setError(null);
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles((files) => files.filter((file) => file !== fileToRemove));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Add selected files to form data
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    setIsLoading(true);
    setError(null);

    try {
      const data = await generateWireframe(formData);

      const projectName = formData.get("projectName") as string;
      const description = formData.get("description") as string;

      addMessage("user", `Project: ${projectName}\n\n${description}`);
      addMessage("assistant", data.response);

      form.reset();
      setSelectedFiles([]);
      onSubmit();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-6">
      <FormField label="Project Name" htmlFor="project-name">
        <input
          type="text"
          id="project-name"
          name="projectName"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 transition-all"
          placeholder="Enter your project name"
        />
      </FormField>

      <FormField label="Use Case Description" htmlFor="description">
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 transition-all"
          placeholder="Describe the flow you want to generate wireframes for..."
        />
      </FormField>

      <FormField label="Reference Files" htmlFor="files" optional>
        <div class="mt-1 space-y-4">
          <FileUploadZone onFilesSelected={handleFilesSelected} />

          {selectedFiles.length > 0 && (
            <div class="flex flex-wrap gap-4">
              {selectedFiles.map((file, index) => (
                <FilePreview
                  key={index}
                  file={file}
                  onRemove={handleRemoveFile}
                />
              ))}
            </div>
          )}
        </div>
      </FormField>

      <ErrorMessage message={error} />

      <LoadingButton isLoading={isLoading} loadingText="Generating...">
        Generate Wireframes
      </LoadingButton>
    </form>
  );
}
