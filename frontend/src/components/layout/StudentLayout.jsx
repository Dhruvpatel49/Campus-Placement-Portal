import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notification.service';
import {
  LayoutDashboard,
  User,
  UserCog,
  FileText,
  Settings,
  LogOut,
  GraduationCap,
  Briefcase,
  FileCheck,
  Bell,
} from 'lucide-react';

export const StudentLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const res = await notificationService.getNotifications({ limit: 1 });
      if (res && res.data) {
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch {
      // Ignore err
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Browse Jobs', path: '/student/jobs', icon: Briefcase },
    { label: 'Applications', path: '/student/applications', icon: FileCheck },
    { label: 'Notifications', path: '/notifications', icon: Bell, badge: unreadCount },
    { label: 'My Profile', path: '/student/profile', icon: User },
    { label: 'Edit Profile', path: '/student/edit-profile', icon: UserCog },
    { label: 'Resume', path: '/student/resume', icon: FileText },
    { label: 'Settings', path: '/student/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/student/dashboard" className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/20 group-hover:bg-brand-500/20 transition">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-brand-400 transition">
                Placify
              </span>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {Boolean(item.badge) && item.badge > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-brand-500 text-white font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side user badge & logout */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs">
                <span className="w-2 h-2 rounded-full bg-brand-400"></span>
                <span className="font-medium text-slate-300">
                  {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}
                </span>
                <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400 font-semibold ml-1">
                  Student
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex overflow-x-auto border-t border-slate-800/60 px-2 py-1.5 gap-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
                  isActive ? 'bg-brand-500/20 text-brand-400' : 'text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        © 2026 Placify — Student Workspace.
      </footer>
    </div>
  );
};
