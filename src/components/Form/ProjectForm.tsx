import { useState } from 'preact/hooks';
import { FormField } from './FormField';
import { LoadingButton } from './LoadingButton';
import { ErrorMessage } from './ErrorMessage';

interface ProjectFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

interface FormData {
  projectName: string;
  projectBrief: string;
  userPersona: string;
  userJourney: string;
}

export function ProjectForm({ onSubmit, isLoading }: ProjectFormProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const userJourney = formData.get('userJourney') as string;
    if (!userJourney?.trim()) {
      setError('User Journey is required');
      return;
    }

    const data = {
      projectName: formData.get('projectName') as string,
      projectBrief: formData.get('projectBrief') as string,
      userPersona: formData.get('userPersona') as string,
      userJourney: userJourney,
    };

    setError(null);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-6 transition-all duration-300">
      <FormField label="Project Name (optional)" htmlFor="projectName">
        <input
          type="text"
          id="projectName"
          name="projectName"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Enter project name"
        />
      </FormField>

      <FormField label="Project Brief (optional)" htmlFor="projectBrief">
        <textarea
          id="projectBrief"
          name="projectBrief"
          rows={3}
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

      <FormField label="User Journey (required)" htmlFor="userJourney" required>
        <textarea
          id="userJourney"
          name="userJourney"
          rows={4}
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Describe the user journey (required)"
        />
      </FormField>

      {error && <ErrorMessage message={error} />}

      <LoadingButton isLoading={isLoading}>
        Generate Wireframes
      </LoadingButton>
    </form>
  );
}