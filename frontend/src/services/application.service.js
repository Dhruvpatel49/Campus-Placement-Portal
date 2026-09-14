import api from './api';

export const applicationService = {
  applyForJob: async (data) => {
    return await api.post('/applications', data);
  },
  withdrawApplication: async (id) => {
    return await api.delete(`/applications/${id}`);
  },
  getStudentApplications: async (params = {}) => {
    return await api.get('/applications', { params });
  },
  getRecruiterApplications: async (params = {}) => {
    return await api.get('/applications/recruiter', { params });
  },
  updateApplicationStatus: async (id, data) => {
    return await api.patch(`/applications/recruiter/${id}/status`, data);
  },
  getApplicationDetails: async (id) => {
    return await api.get(`/applications/${id}`);
  },
};
