import React from 'react';
import { Users, GraduationCap, Building2, Briefcase, FileCheck, ShieldAlert } from 'lucide-react';

export const AnalyticsCards = ({ stats = {} }) => {
  const cards = [
    {
      title: 'Total Registered Users',
      value: stats.totalUsers || 0,
      sub: `${stats.studentsCount || 0} Students • ${stats.recruitersCount || 0} Recruiters`,
      icon: Users,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Registered Companies',
      value: stats.companiesCount || 0,
      sub: `${stats.pendingCompaniesCount || 0} Pending Verification`,
      icon: Building2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Job Postings',
      value: stats.jobsCount || 0,
      sub: `${stats.activeJobsCount || 0} Active Placement Drives`,
      icon: Briefcase,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Applications Submitted',
      value: stats.applicationsCount || 0,
      sub: 'Across all active recruitment drives',
      icon: FileCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className={`p-3 rounded-xl border ${card.bg} ${card.color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">{card.title}</p>
              <h3 className="text-xl font-extrabold text-slate-50">{card.value}</h3>
              <p className="text-[10px] text-slate-500 truncate">{card.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
