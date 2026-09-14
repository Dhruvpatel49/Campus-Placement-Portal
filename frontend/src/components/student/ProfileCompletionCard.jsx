import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const ProfileCompletionCard = ({ percentage = 20, resumeUploaded = false, skillsCount = 0 }) => {
  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">Profile Completion</h3>
          <p className="text-xs text-slate-400">Complete your profile to increase placement eligibility</p>
        </div>
        <span className="text-2xl font-extrabold text-brand-400">{percentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-brand-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Checklist recommendations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
        <div className={`flex items-center gap-2 ${resumeUploaded ? 'text-emerald-400' : 'text-amber-400'}`}>
          {resumeUploaded ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{resumeUploaded ? 'Resume Uploaded' : 'Upload Resume File'}</span>
        </div>
        <div className={`flex items-center gap-2 ${skillsCount > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
          {skillsCount > 0 ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{skillsCount > 0 ? `${skillsCount} Skills Added` : 'Add Technical Skills'}</span>
        </div>
      </div>

      <div className="pt-2">
        <Link
          to="/student/edit-profile"
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-400 hover:text-brand-300 transition"
        >
          Complete Missing Information <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
