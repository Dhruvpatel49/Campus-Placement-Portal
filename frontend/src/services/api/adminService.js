import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const adminService = {
  getDashboardStats: async () => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data.data;
  },

  approveRecruiter: async (recruiterId, status) => {
    const response = await apiClient.patch(`/admin/recruiter/${recruiterId}/approval`, { status });
    return response.data.data;
  },

  createAnnouncement: async (announcementData) => {
    const response = await apiClient.post('/admin/announcements', announcementData);
    return response.data.data;
  },
};
