interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  children: preact.ComponentChildren;
}

export function FormField({ label, htmlFor, required, optional, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} class="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {optional && <span class="text-gray-500 ml-1">(optional)</span>}
      </label>
      {children}
    </div>
  );
}