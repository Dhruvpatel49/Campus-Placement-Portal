import api from '../api';

export const studentService = {
  getProfile: async () => {
    const response = await api.get('/student/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/student/profile', profileData);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get('/student/dashboard-stats');
    return response.data;
  },
};
