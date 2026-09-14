import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentService = {
  getProfile: async () => {
    const response = await apiClient.get('/student/profile');
    return response.data.data;
  },

  updateProfile: async (profileData) => {
    const response = await apiClient.put('/student/profile', profileData);
    return response.data.data;
  },

  getDashboardStats: async () => {
    const response = await apiClient.get('/student/dashboard-stats');
    return response.data.data;
  },
};
