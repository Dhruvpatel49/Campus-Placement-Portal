import api from './api';

export const studentService = {
  getProfile: async () => {
    return await api.get('/student/profile');
  },
  updateProfile: async (data) => {
    return await api.put('/student/profile', data);
  },
  getDashboard: async () => {
    return await api.get('/student/dashboard');
  },
  uploadResume: async (formData) => {
    return await api.post('/student/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteResume: async () => {
    return await api.delete('/student/resume');
  },
  updateSettings: async (data) => {
    return await api.put('/student/settings', data);
  },
};
