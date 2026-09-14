import api from './api';

export const companyService = {
  createCompany: async (data) => {
    return await api.post('/company', data);
  },
  getCompany: async () => {
    return await api.get('/company');
  },
  updateCompany: async (data) => {
    return await api.put('/company', data);
  },
  uploadLogo: async (formData) => {
    return await api.post('/company/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getDashboard: async () => {
    return await api.get('/company/dashboard');
  },
};
