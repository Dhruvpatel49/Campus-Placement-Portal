import api from '../api';

export const applicationService = {
  applyToJob: async (jobId, resumeId) => {
    const response = await api.post('/application/apply', { jobId, resumeId });
    return response.data;
  },

  getMyApplications: async () => {
    const response = await api.get('/application/my-applications');
    return response.data;
  },

  updateStatus: async (applicationId, status, note) => {
    const response = await api.patch(`/application/${applicationId}/status`, { status, note });
    return response.data;
  },
};
