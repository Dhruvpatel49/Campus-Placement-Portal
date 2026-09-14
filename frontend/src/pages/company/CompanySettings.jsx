import React from 'react';
import { RecruiterLayout } from '../../components/layout/RecruiterLayout';
import { Settings, ShieldCheck } from 'lucide-react';

export const CompanySettings = () => {
  return (
    <RecruiterLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-400" /> Company Settings
          </h1>
          <p className="text-xs text-slate-400">Organization configuration and verification details</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> Verification Status
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Company verification is managed centrally by the Placement Cell Administration. Verified companies gain priority listing for campus placement drives and automated candidate shortlisting.
          </p>
        </div>
      </div>
    </RecruiterLayout>
  );
};
