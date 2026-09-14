import api from './api';

export const notificationService = {
  getNotifications: async (params = {}) => {
    return await api.get('/notifications', { params });
  },
  markAsRead: async (id) => {
    return await api.patch(`/notifications/${id}/read`);
  },
  markAllAsRead: async () => {
    return await api.patch('/notifications/read-all');
  },
};
