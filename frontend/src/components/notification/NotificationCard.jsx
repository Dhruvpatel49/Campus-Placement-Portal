import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationCard = ({ notification, onMarkRead }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    error: <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
    application_update: <Bell className="w-5 h-5 text-purple-400 shrink-0" />,
    system: <Bell className="w-5 h-5 text-amber-400 shrink-0" />,
  };

  const currentIcon = icons[notification.type] || icons.info;

  return (
    <div
      className={`glass-card p-5 rounded-2xl border transition flex items-start justify-between gap-4 ${
        notification.isRead
          ? 'border-slate-800/80 bg-slate-900/40 opacity-80'
          : 'border-brand-500/40 bg-slate-900/80 shadow-md shadow-brand-500/5'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">{currentIcon}</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-slate-100">{notification.title}</h4>
            {!notification.isRead && (
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
            )}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{notification.message}</p>
          <span className="text-[10px] text-slate-500 block pt-1">
            {new Date(notification.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {notification.link && (
          <Link
            to={notification.link}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
        {!notification.isRead && (
          <button
            onClick={() => onMarkRead(notification._id)}
            className="px-3 py-1.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-semibold transition"
          >
            Mark Read
          </button>
        )}
      </div>
    </div>
  );
};
