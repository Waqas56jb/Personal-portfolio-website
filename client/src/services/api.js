/** Single place that knows where the backend lives. */

export const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '');

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = new Error(payload?.error || `Request failed (${response.status})`);
    error.status = response.status;
    error.errors = payload?.errors;
    throw error;
  }

  return payload;
};

export const sendContactMessage = (values) =>
  request('/api/contact', { method: 'POST', body: JSON.stringify(values) });

export const createVoiceSession = () => request('/api/realtime/session');
