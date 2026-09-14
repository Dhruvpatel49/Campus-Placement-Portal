import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const EligibilityBadge = ({ isEligible = true, reason = '' }) => {
  if (isEligible) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
        <CheckCircle2 className="w-3 h-3" /> Eligible
      </span>
    );
  }

  return (
    <span
      title={reason}
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 cursor-help"
    >
      <XCircle className="w-3 h-3" /> Ineligible
    </span>
  );
};
