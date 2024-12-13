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

export interface FilePreviewInfo {
  type: 'image' | 'document';
  url?: string;
  iconUrl?: string;
}