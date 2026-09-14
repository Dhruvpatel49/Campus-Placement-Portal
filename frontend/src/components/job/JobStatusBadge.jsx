import React from 'react';

export const JobStatusBadge = ({ status = 'draft' }) => {
  const styles = {
    draft: 'bg-slate-800 text-slate-300 border-slate-700',
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    closed: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    archived: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  };

  const labels = {
    draft: 'DRAFT',
    active: 'ACTIVE DRIVE',
    closed: 'CLOSED',
    archived: 'ARCHIVED',
  };

  const currentStyle = styles[status] || styles.draft;
  const currentLabel = labels[status] || status.toUpperCase();

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${currentStyle}`}>
      {currentLabel}
    </span>
  );
};
