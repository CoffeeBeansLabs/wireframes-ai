import type { ApiResponse } from "../types";

const API_BASE_URL = "/api";

async function handleResponse(response: Response): Promise<ApiResponse> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.details || `HTTP error! status: ${response.status}`
    );
  }
  const data = await response.json();
  return data;
}

export async function generateWireframe(
  formData: FormData
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      body: formData,
    });
    return handleResponse(response);
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to generate wireframe. Please try again."
    );
  }
}

export async function sendMessage(prompt: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to process your request. Please try again."
    );
  }
}