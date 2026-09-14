import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { RecruiterLayout } from '../../components/layout/RecruiterLayout';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { NotificationCard } from '../../components/notification/NotificationCard';
import { notificationService } from '../../services/notification.service';
import { Bell, CheckCheck, Inbox } from 'lucide-react';
import toast from 'react-hot-toast';

export const NotificationsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await notificationService.getNotifications();
      if (res && res.data) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      fetchNotifications();
    } catch (err) {
      toast.error(err.message || 'Failed to mark notification as read');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      toast.success('All notifications marked as read');
      fetchNotifications();
    } catch (err) {
      toast.error(err.message || 'Failed to mark all as read');
    }
  };

  const Layout = user?.role === 'recruiter' ? RecruiterLayout : user?.role === 'admin' ? AdminLayout : StudentLayout;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
              <Bell className="w-6 h-6 text-brand-400" /> Notifications Feed
            </h1>
            <p className="text-xs text-slate-400">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification(s)` : 'All caught up!'}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition"
            >
              <CheckCheck className="w-4 h-4 text-emerald-400" /> Mark All as Read
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48 text-slate-400">
            <span className="animate-pulse font-medium text-sm">Fetching Notifications...</span>
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((n) => (
              <NotificationCard key={n._id} notification={n} onMarkRead={handleMarkRead} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
            <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-semibold text-slate-200">No Notifications</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You have no platform notifications at this time.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};
