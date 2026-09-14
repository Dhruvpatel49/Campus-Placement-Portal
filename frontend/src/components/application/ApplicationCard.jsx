import React from 'react';
import { Building2, MapPin, IndianRupee, Clock, ExternalLink } from 'lucide-react';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';

export const ApplicationCard = ({ application, onWithdraw, onViewTimeline }) => {
  const job = application.jobId || {};
  const company = job.companyId || {};

  const isLocked = ['selected', 'offered', 'rejected', 'withdrawn'].includes(application.status);

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold overflow-hidden shrink-0">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-6 h-6" />
              )}
            </div>
            <div>
              <h4 className="font-semibold text-xs text-brand-400">{company.name || 'Company'}</h4>
              <h3 className="font-bold text-base text-slate-100">{job.title || 'Job Drive'}</h3>
            </div>
          </div>

          <ApplicationStatusBadge status={application.status} />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="flex items-center gap-1 text-slate-300">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-emerald-400">₹{job.ctc} LPA</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span className="truncate">{job.location || 'India'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
          <Clock className="w-3 h-3" />
          <span>Applied on {new Date(application.appliedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewTimeline && onViewTimeline(application)}
          className="text-xs font-semibold text-brand-400 hover:text-brand-300 transition flex items-center gap-1"
        >
          View Timeline <ExternalLink className="w-3 h-3" />
        </button>

        {!isLocked && (
          <button
            onClick={() => onWithdraw && onWithdraw(application._id)}
            className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 text-xs font-semibold transition"
          >
            Withdraw
          </button>
        )}
      </div>
    </div>
  );
};
