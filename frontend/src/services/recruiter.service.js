import api from './api';

export const recruiterService = {
  getProfile: async () => {
    return await api.get('/recruiter/profile');
  },
  updateProfile: async (data) => {
    return await api.put('/recruiter/profile', data);
  },
  getDashboard: async () => {
    return await api.get('/recruiter/dashboard');
  },
  updateSettings: async (data) => {
    return await api.put('/recruiter/settings', data);
  },
};
