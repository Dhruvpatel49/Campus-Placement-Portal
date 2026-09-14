import React, { useState } from 'react';
import { User, FileText, Check, X, Award, Phone, Mail } from 'lucide-react';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';

export const ApplicantCard = ({ application, onUpdateStatus }) => {
  const student = application.studentId || {};
  const studentUser = student.userId || {};
  const job = application.jobId || {};

  const [notes, setNotes] = useState(application.recruiterNotes || '');
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    await onUpdateStatus(application._id, newStatus, notes);
    setUpdating(false);
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-lg shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-100">
              {studentUser.firstName ? `${studentUser.firstName} ${studentUser.lastName}` : 'Candidate'}
            </h3>
            <p className="text-xs text-purple-400 font-medium">
              {student.rollNumber || 'N/A'} • {student.branch || 'Branch'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Applied for: <span className="text-slate-200 font-semibold">{job.title}</span></p>
          </div>
        </div>

        <ApplicationStatusBadge status={application.status} />
      </div>

      {/* Candidate Academic Overview */}
      <div className="grid grid-cols-3 gap-2 text-xs py-2 px-3 rounded-xl bg-slate-950/60 border border-slate-800">
        <div>
          <span className="text-[10px] text-slate-500 block">CGPA Score</span>
          <span className="font-bold text-slate-100">{student.cgpa || 0} / 10</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">Backlogs</span>
          <span className="font-bold text-slate-100">{student.backlogs ?? 0}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">Resume Snapshot</span>
          {application.resumeUrl ? (
            <a
              href={application.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-purple-400 hover:underline flex items-center gap-1 font-semibold text-[11px] mt-0.5"
            >
              <FileText className="w-3 h-3" /> View Resume
            </a>
          ) : (
            <span className="text-slate-500 text-[11px]">No Resume</span>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-400">
        {studentUser.email && (
          <span className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-500" /> {studentUser.email}
          </span>
        )}
        {student.phone && (
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-500" /> {student.phone}
          </span>
        )}
      </div>

      {/* Status Action Buttons */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            disabled={updating}
            onClick={() => handleStatusChange('shortlisted')}
            className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-semibold transition"
          >
            Shortlist
          </button>

          <button
            disabled={updating}
            onClick={() => handleStatusChange('selected')}
            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition"
          >
            Select Candidate
          </button>

          <button
            disabled={updating}
            onClick={() => handleStatusChange('rejected')}
            className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};
