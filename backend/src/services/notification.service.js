import { Notification } from '../models/notification.model.js';
import { ApiError } from '../utils/ApiError.js';

export const createNotification = async ({
  recipientId,
  title,
  message,
  type = 'info',
  link = '',
  referenceType = '',
  referenceId = null,
}) => {
  if (!recipientId || !title || !message) {
    throw ApiError.badRequest('Recipient, title, and message are required for notifications');
  }

  const notification = await Notification.create({
    recipientId,
    title,
    message,
    type,
    link,
    referenceType,
    referenceId,
  });

  return notification;
};

export const getUserNotifications = async (userId, queryParams = {}) => {
  const { page = 1, limit = 15, isRead } = queryParams;
  const filter = { recipientId: userId };

  if (isRead !== undefined) {
    filter.isRead = isRead === 'true';
  }

  const skip = (Number(page) - 1) * Number(limit);
  const notifications = await Notification.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Notification.countDocuments(filter);
  const unreadCount = await Notification.countDocuments({ recipientId: userId, isRead: false });

  return {
    notifications,
    unreadCount,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  };
};

export const markAsRead = async (userId, notificationId) => {
  const notification = await Notification.findOne({ _id: notificationId, recipientId: userId });
  if (!notification) {
    throw ApiError.notFound('Notification not found');
  }

  notification.isRead = true;
  await notification.save();
  return notification;
};

export const markAllAsRead = async (userId) => {
  await Notification.updateMany({ recipientId: userId, isRead: false }, { isRead: true });
  return true;
};
