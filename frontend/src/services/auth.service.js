import api from './api';

export const authService = {
  login: async (credentials) => {
    return await api.post('/auth/login', credentials);
  },
  register: async (userData) => {
    return await api.post('/auth/register', userData);
  },
  logout: async () => {
    return await api.post('/auth/logout');
  },
  getCurrentUser: async () => {
    return await api.get('/auth/me');
  },
};
