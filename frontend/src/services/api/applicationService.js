import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const applicationService = {
  applyToJob: async (jobId, resumeId) => {
    const response = await apiClient.post('/application/apply', { jobId, resumeId });
    return response.data.data;
  },

  getMyApplications: async () => {
    const response = await apiClient.get('/application/my-applications');
    return response.data.data;
  },

  updateStatus: async (applicationId, status, note) => {
    const response = await apiClient.patch(`/application/${applicationId}/status`, { status, note });
    return response.data.data;
  },
};
