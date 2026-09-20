import api from '../api';

export const adminService = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  approveRecruiter: async (recruiterId, status) => {
    const response = await api.patch(`/admin/recruiter/${recruiterId}/approval`, { status });
    return response.data;
  },

  createAnnouncement: async (announcementData) => {
    const response = await api.post('/admin/announcements', announcementData);
    return response.data;
  },
};
