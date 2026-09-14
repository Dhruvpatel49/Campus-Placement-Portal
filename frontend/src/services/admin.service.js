import api from './api';

export const adminService = {
  getDashboardStats: async () => {
    return await api.get('/admin/dashboard');
  },
  getUsers: async (params = {}) => {
    return await api.get('/admin/users', { params });
  },
  getRecruiters: async (params = {}) => {
    return await api.get('/admin/recruiters', { params });
  },
  verifyRecruiter: async (id, status, remarks = '') => {
    return await api.patch(`/admin/recruiters/${id}/verify`, { status, remarks });
  },
  getCompanies: async (params = {}) => {
    return await api.get('/admin/companies', { params });
  },
  verifyCompany: async (id, status, remarks = '') => {
    return await api.patch(`/admin/companies/${id}/verify`, { status, remarks });
  },
  getJobs: async (params = {}) => {
    return await api.get('/admin/jobs', { params });
  },
  getApplications: async (params = {}) => {
    return await api.get('/admin/applications', { params });
  },
};
