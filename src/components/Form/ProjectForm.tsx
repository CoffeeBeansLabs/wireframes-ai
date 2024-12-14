import { useState } from "preact/hooks";
import { FormField } from "./FormField";
import { LoadingButton } from "./LoadingButton";
import { ErrorMessage } from "./ErrorMessage";

interface ProjectFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export function ProjectForm({ onSubmit, isLoading }: ProjectFormProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const projectName = formData.get("projectName") as string;
    if (!projectName?.trim()) {
      setError("User Journey is required");
      return;
    }

    const projectBrief = formData.get("projectBrief") as string;
    if (!projectBrief?.trim()) {
      setError("User Journey is required");
      return;
    }

    const userPersona = formData.get("userPersona") as string;

    const userJourney = formData.get("userJourney") as string;
    if (!userJourney?.trim()) {
      setError("User Journey is required");
      return;
    }

    const requestPayload = {
      initialInput: {
        projectName,
        projectBrief,
        userPersona,
        userJourney,
      },
    };

    setError(null);
    onSubmit(requestPayload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      class="max-w-4xl space-y-6 transition-all duration-300"
    >
      <FormField label="Project Name" htmlFor="projectName">
        <input
          type="text"
          id="projectName"
          name="projectName"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Enter project name"
        />
      </FormField>

      <FormField label="Project Brief" htmlFor="projectBrief">
        <textarea
          id="projectBrief"
          name="projectBrief"
          rows={3}
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Brief description of the project"
        />
      </FormField>

      <FormField label="User Persona (optional)" htmlFor="userPersona">
        <textarea
          id="userPersona"
          name="userPersona"
          rows={3}
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Describe your target user"
        />
      </FormField>

      <FormField label="User Journey" htmlFor="userJourney" required>
        <textarea
          id="userJourney"
          name="userJourney"
          rows={4}
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Describe the user journey"
        />
      </FormField>

      {error && <ErrorMessage message={error} />}

      <LoadingButton isLoading={isLoading}>Generate Wireframes</LoadingButton>
    </form>
  );
}
