export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface FormData {
  projectName: string;
  description: string;
  files: File[];
}

export interface ApiResponse {
  response: string;
  error?: string;
}