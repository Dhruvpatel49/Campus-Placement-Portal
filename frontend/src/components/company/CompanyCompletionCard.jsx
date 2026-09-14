import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CompanyCompletionCard = ({ percentage = 20 }) => {
  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">Company Completion</h3>
          <p className="text-xs text-slate-400">Complete details to publish campus placement drives</p>
        </div>
        <span className="text-2xl font-extrabold text-purple-400">{percentage}%</span>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-500 to-indigo-400 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="pt-2">
        <Link
          to="/recruiter/company/edit"
          className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition"
        >
          Update Company Profile <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
