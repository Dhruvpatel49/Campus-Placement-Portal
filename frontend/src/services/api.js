import axios from 'axios';

// Resolve base URL from environment or fallback to relative path for local proxy
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    const trimmed = envUrl.trim().replace(/\/+$/, '');
    return trimmed.endsWith('/api/v1') ? trimmed : `${trimmed}/api/v1`;
  }
  return '/api/v1';
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT Bearer token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('placify_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to format errors and detect invalid HTML responses from SPA rewrites
api.interceptors.response.use(
  (response) => {
    // Detect if API endpoint returned HTML instead of JSON (common when hosted on Vercel without backend proxy)
    if (
      typeof response.data === 'string' &&
      (response.data.includes('<!DOCTYPE html>') || response.data.includes('<html'))
    ) {
      return Promise.reject(
        new Error(
          'API server is not configured or unreachable. Please set VITE_API_BASE_URL in your environment variables.'
        )
      );
    }
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.response?.data?.errors && error.response.data.errors.join('. ')) ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;

