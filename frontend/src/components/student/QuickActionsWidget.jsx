import React from 'react';
import { Link } from 'react-router-dom';
import { UserCog, FileUp, Briefcase, Settings } from 'lucide-react';

export const QuickActionsWidget = () => {
  const actions = [
    { title: 'Edit Profile', desc: 'Update academic & personal details', icon: UserCog, path: '/student/edit-profile', color: 'from-blue-500/20 to-indigo-500/20 text-blue-400' },
    { title: 'Upload Resume', desc: 'Add or replace PDF resume', icon: FileUp, path: '/student/resume', color: 'from-purple-500/20 to-pink-500/20 text-purple-400' },
    { title: 'Browse Jobs', desc: 'Explore active placement drives', icon: Briefcase, path: '/student/dashboard', color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400' },
    { title: 'Account Settings', desc: 'Password & profile visibility', icon: Settings, path: '/student/settings', color: 'from-amber-500/20 to-orange-500/20 text-amber-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.title}
            to={action.path}
            className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/60 transition group space-y-3"
          >
            <div className={`p-3 rounded-xl w-fit bg-gradient-to-br ${action.color} border border-white/5`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 text-sm group-hover:text-brand-400 transition">{action.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{action.desc}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
