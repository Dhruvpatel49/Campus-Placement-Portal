import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { EligibilityBadge } from '../../components/job/EligibilityBadge';
import { jobService } from '../../services/job.service';
import { applicationService } from '../../services/application.service';
import { Building2, MapPin, IndianRupee, Clock, ArrowLeft, CheckCircle2, ShieldAlert, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const res = await jobService.getJobById(id);
      if (res && res.data) {
        setJob(res.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    setApplying(true);
    try {
      const res = await applicationService.applyForJob({ jobId: id });
      toast.success(res.message || 'Applied for job drive successfully!');
      setApplied(true);
      navigate('/student/applications');
    } catch (err) {
      toast.error(err.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex justify-center items-center h-64 text-slate-400">
          <span className="animate-pulse font-medium text-sm">Loading Job Drive Details...</span>
        </div>
      </StudentLayout>
    );
  }

  if (!job) {
    return (
      <StudentLayout>
        <div className="text-center py-12 space-y-4">
          <p className="text-sm text-slate-400">Job posting not found.</p>
          <button onClick={() => navigate('/student/jobs')} className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold">
            Back to Jobs
          </button>
        </div>
      </StudentLayout>
    );
  }

  const company = job.companyId || {};

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={() => navigate('/student/jobs')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Jobs
        </button>

        {/* Job Header */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold overflow-hidden shrink-0">
                {company.logo ? (
                  <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-8 h-8" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-brand-400">{company.name || 'Company'}</p>
                <h1 className="text-2xl font-bold text-slate-50">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {job.location} ({job.workMode})
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <IndianRupee className="w-3.5 h-3.5" /> ₹{job.ctc} LPA
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <EligibilityBadge isEligible={job.isEligible} reason={job.ineligibilityReason} />
            </div>
          </div>
        </div>

        {/* Eligibility Callout Banner */}
        {!job.isEligible && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <div>
              <span className="font-bold">Eligibility Constraint: </span>
              {job.ineligibilityReason}
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Description & Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
              <h3 className="text-md font-semibold text-slate-100">Job Description</h3>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>

            {job.requirements && job.requirements.length > 0 && (
              <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
                <h3 className="text-md font-semibold text-slate-100">Key Requirements</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
              <h3 className="text-md font-semibold text-slate-100">Selection Process</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{job.selectionProcess}</p>
            </div>
          </div>

          {/* Right Column: Overview Card & Apply Action */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-md font-semibold text-slate-100">Drive Overview</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-500">Min CGPA:</span>
                  <span className="font-semibold text-slate-200">{job.minCgpa} / 10</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-500">Max Backlogs:</span>
                  <span className="font-semibold text-slate-200">{job.maxBacklogs}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-500">Openings:</span>
                  <span className="font-semibold text-slate-200">{job.openings} Positions</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-500">Deadline:</span>
                  <span className="font-semibold text-amber-400">{new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  disabled={!job.isEligible || applying || applied}
                  onClick={handleApply}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {applying ? 'Submitting Application...' : applied ? 'Application Submitted' : job.isEligible ? 'Apply Now' : 'Ineligible to Apply'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};
