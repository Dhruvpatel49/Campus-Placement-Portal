import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to format errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.response?.data?.errors && error.response.data.errors.join('. ')) ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;
