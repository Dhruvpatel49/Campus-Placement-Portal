import React from 'react';

export const ApplicationStatusBadge = ({ status = 'applied' }) => {
  const styles = {
    applied: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    under_review: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    shortlisted: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    interview_scheduled: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    selected: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    offered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    withdrawn: 'bg-slate-800 text-slate-400 border-slate-700',
  };

  const labels = {
    applied: 'APPLIED',
    under_review: 'UNDER REVIEW',
    shortlisted: 'SHORTLISTED',
    interview_scheduled: 'INTERVIEW SCHEDULED',
    selected: 'SELECTED / OFFERED',
    offered: 'OFFERED',
    rejected: 'REJECTED',
    withdrawn: 'WITHDRAWN',
  };

  const currentStyle = styles[status] || styles.applied;
  const currentLabel = labels[status] || status.replace('_', ' ').toUpperCase();

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${currentStyle}`}>
      {currentLabel}
    </span>
  );
};
