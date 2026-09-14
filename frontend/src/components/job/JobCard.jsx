import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, IndianRupee, Clock, ArrowRight, Briefcase } from 'lucide-react';
import { JobStatusBadge } from './JobStatusBadge';
import { EligibilityBadge } from './EligibilityBadge';

export const JobCard = ({ job, isRecruiter = false, onPublish, onClose, onDelete }) => {
  const company = job.companyId || {};

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Company Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold overflow-hidden shrink-0">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-6 h-6" />
              )}
            </div>
            <div>
              <h4 className="font-semibold text-xs text-purple-400">{company.name || 'Company'}</h4>
              <h3 className="font-bold text-base text-slate-100 line-clamp-1">{job.title}</h3>
            </div>
          </div>

          <div className="shrink-0">
            {isRecruiter ? (
              <JobStatusBadge status={job.status} />
            ) : (
              <EligibilityBadge isEligible={job.isEligible} reason={job.ineligibilityReason} />
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="flex items-center gap-1.5 text-slate-300">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-semibold text-emerald-400">₹{job.ctc} LPA</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="capitalize">{job.jobType ? job.jobType.replace('_', ' ') : 'Full Time'}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Ends: {new Date(job.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2">{job.description}</p>

        {/* Branch Chips */}
        {job.allowedBranches && job.allowedBranches.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {job.allowedBranches.map((b, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                {b}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        {isRecruiter ? (
          <div className="flex items-center gap-2 w-full justify-between">
            <div className="flex items-center gap-1.5">
              {job.status === 'draft' && (
                <button
                  onClick={() => onPublish && onPublish(job._id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
                >
                  Publish
                </button>
              )}
              {job.status === 'active' && (
                <button
                  onClick={() => onClose && onClose(job._id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold transition"
                >
                  Close Drive
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/recruiter/jobs/edit/${job._id}`}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete && onDelete(job._id)}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold transition"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Min CGPA: {job.minCgpa || 0}</span>
            <Link
              to={`/student/jobs/${job._id}`}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-500/20 transition"
            >
              View Details <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
