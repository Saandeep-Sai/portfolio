// Centralized API client — single source of truth for all backend calls
// Replaces scattered fetch() calls with hardcoded URLs across the frontend

export const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  return response.json();
}

export const api = {
  get: async (path: string) => {
    const response = await fetch(`${API_BASE}${path}`);
    return handleResponse(response);
  },

  post: async (path: string, data: any) => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Authenticated requests (admin panel)
  authGet: async (path: string) => {
    const token = getToken();
    const response = await fetch(`${API_BASE}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  authPost: async (path: string, data: any) => {
    const token = getToken();
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  authPut: async (path: string, data: any) => {
    const token = getToken();
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  authDelete: async (path: string) => {
    const token = getToken();
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  // Raw fetch for non-JSON responses
  rawPost: async (path: string, data: any) => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response;
  },
};
