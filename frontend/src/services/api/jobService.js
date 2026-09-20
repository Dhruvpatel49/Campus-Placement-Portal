import api from '../api';

export const jobService = {
  getJobs: async (params) => {
    const response = await api.get('/job', { params });
    return response.data;
  },

  getJobById: async (id) => {
    const response = await api.get(`/job/${id}`);
    return response.data;
  },

  createJob: async (jobData) => {
    const response = await api.post('/job', jobData);
    return response.data;
  },

  getCompanies: async (params) => {
    const response = await api.get('/company', { params });
    return response.data;
  },
};
