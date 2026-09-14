import api from './api';

export const jobService = {
  createJob: async (data) => {
    return await api.post('/jobs', data);
  },
  updateJob: async (id, data) => {
    return await api.put(`/jobs/${id}`, data);
  },
  publishJob: async (id) => {
    return await api.patch(`/jobs/${id}/publish`);
  },
  closeJob: async (id) => {
    return await api.patch(`/jobs/${id}/close`);
  },
  deleteJob: async (id) => {
    return await api.delete(`/jobs/${id}`);
  },
  getRecruiterJobs: async (params = {}) => {
    return await api.get('/jobs/recruiter', { params });
  },
  getStudentJobs: async (params = {}) => {
    return await api.get('/jobs', { params });
  },
  getJobById: async (id) => {
    return await api.get(`/jobs/${id}`);
  },
};
