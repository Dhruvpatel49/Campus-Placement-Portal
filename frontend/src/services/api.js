import axios from 'axios';
import { getMockResponseForUrl } from './mockData';

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

// Response interceptor to format responses, catch HTML rewrites, and provide offline fallback
api.interceptors.response.use(
  (response) => {
    // If the response returned an HTML document (e.g. Vercel SPA rewrites for unmatched API routes)
    if (
      typeof response.data === 'string' &&
      (response.data.includes('<!DOCTYPE html>') || response.data.includes('<html'))
    ) {
      const mock = getMockResponseForUrl(response.config.url, response.config.method, response.config.data);
      if (mock) {
        return mock;
      }
      return Promise.reject(
        new Error(
          'API server is not configured or unreachable. Switched to offline demo mode.'
        )
      );
    }
    return response.data;
  },
  async (error) => {
    const isNetworkOrRouteError =
      error.message === 'Network Error' ||
      error.code === 'ERR_NETWORK' ||
      !error.response ||
      error.response?.status === 404 ||
      error.response?.status === 405;

    if (isNetworkOrRouteError && error.config) {
      // Parse body if stringified
      let body = error.config.data;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          // ignore
        }
      }
      const mock = getMockResponseForUrl(error.config.url, error.config.method, body);
      if (mock) {
        return mock;
      }
    }

    const message =
      error.response?.data?.message ||
      (error.response?.data?.errors && error.response.data.errors.join('. ')) ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;
