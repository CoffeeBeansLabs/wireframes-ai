interface ErrorMessageProps {
  message: string | null;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
      {message}
    </div>
  );
}