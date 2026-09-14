import React from 'react';
import { ShieldCheck, Clock, AlertTriangle } from 'lucide-react';

export const VerificationStatusCard = ({ status = 'pending', remarks = '' }) => {
  const getBadge = () => {
    switch (status) {
      case 'verified':
        return {
          icon: ShieldCheck,
          title: 'Account Verified by Placement Office',
          desc: 'Your recruiter account is verified and ready for posting campus placement drives.',
          style: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        };
      case 'rejected':
        return {
          icon: AlertTriangle,
          title: 'Verification Requires Attention',
          desc: remarks || 'Your account verification was rejected. Please contact the administrator.',
          style: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
        };
      default:
        return {
          icon: Clock,
          title: 'Verification Pending Review',
          desc: 'Your recruiter credentials are under review by the placement administration.',
          style: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        };
    }
  };

  const badge = getBadge();
  const Icon = badge.icon;

  return (
    <div className={`p-6 rounded-2xl border ${badge.style} space-y-2`}>
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6 shrink-0" />
        <div>
          <h4 className="font-semibold text-sm">{badge.title}</h4>
          <p className="text-xs opacity-80 mt-0.5">{badge.desc}</p>
        </div>
      </div>
    </div>
  );
};
