export interface ToolExecutionResponse {
  success: boolean;
  result: string;
  toolId: string;
  model: string;
  latencyMs: number;
  timestamp: string;
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  organization?: string;
  subject: string;
  message: string;
  privacyPreference: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  ticketId: string;
  message: string;
  receivedAt: string;
}

/**
 * Execute an AI tool via the server API endpoint
 */
export async function executeAiTool(
  toolId: string,
  input: string,
  options?: Record<string, string>
): Promise<ToolExecutionResponse> {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input text cannot be empty.");
  }

  const response = await fetch("/api/ai/tool-execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      toolId,
      input: trimmed,
      options,
    }),
  });

  if (!response.ok) {
    let errorMessage = `Server error (${response.status})`;
    try {
      const errData = await response.json();
      if (errData?.error) {
        errorMessage = errData.error;
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(errorMessage);
  }

  const data = (await response.json()) as ToolExecutionResponse;
  return data;
}

/**
 * Submit contact inquiry to the backend
 */
export async function submitContactInquiry(
  payload: ContactSubmissionPayload
): Promise<ContactSubmissionResponse> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMsg = "Failed to submit inquiry.";
    try {
      const err = await response.json();
      if (err.error) errorMsg = err.error;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

/**
 * Pure calculation helpers
 */
export function calculateStats(text: string) {
  const trimmed = text.trim();
  if (!trimmed) {
    return { words: 0, characters: 0, readingTimeMinutes: 0 };
  }
  const words = trimmed.split(/\s+/).filter(Boolean).length;
  const characters = text.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
  return { words, characters, readingTimeMinutes };
}
