import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobService = {
  getJobs: async (params) => {
    const response = await apiClient.get('/job', { params });
    return response.data.data;
  },

  getJobById: async (id) => {
    const response = await apiClient.get(`/job/${id}`);
    return response.data.data;
  },

  createJob: async (jobData) => {
    const response = await apiClient.post('/job', jobData);
    return response.data.data;
  },

  getCompanies: async (params) => {
    const response = await apiClient.get('/company', { params });
    return response.data.data;
  },
};
