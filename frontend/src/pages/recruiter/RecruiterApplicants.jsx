import React, { useEffect, useState } from 'react';
import { RecruiterLayout } from '../../components/layout/RecruiterLayout';
import { ApplicantCard } from '../../components/application/ApplicantCard';
import { applicationService } from '../../services/application.service';
import { jobService } from '../../services/job.service';
import { Users, Search, Filter, FileCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const RecruiterApplicants = () => {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRecruiterJobs();
  }, []);

  useEffect(() => {
    fetchApplicants();
  }, [selectedJob, statusFilter, search]);

  const fetchRecruiterJobs = async () => {
    try {
      const res = await jobService.getRecruiterJobs();
      if (res && res.data) {
        setJobs(res.data.jobs || []);
      }
    } catch {
      // Ignore err
    }
  };

  const fetchApplicants = async () => {
    try {
      const res = await applicationService.getRecruiterApplications({
        jobId: selectedJob,
        status: statusFilter,
        search,
      });
      if (res && res.data) {
        setApplications(res.data.applications || []);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load candidate applications');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status, notes) => {
    try {
      const res = await applicationService.updateApplicationStatus(id, { status, recruiterNotes: notes });
      toast.success(res.message || `Applicant status updated to ${status.replace('_', ' ').toUpperCase()}`);
      fetchApplicants();
    } catch (err) {
      toast.error(err.message || 'Failed to update applicant status');
    }
  };

  return (
    <RecruiterLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" /> Candidate Applications
          </h1>
          <p className="text-xs text-slate-400">
            Review student candidates, inspect resumes, shortlist, and manage hiring decisions.
          </p>
        </div>

        {/* Filters bar */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Job Filter Dropdown */}
            <div className="w-full sm:w-64">
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="">All Job Drives</option>
                {jobs.map((j) => (
                  <option key={j._id} value={j._id}>
                    {j.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Statuses</option>
                <option value="applied">Applied</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>

            {/* Candidate Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidate name or roll number..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Applicants Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-48 text-slate-400">
            <span className="animate-pulse font-medium text-sm">Fetching Applicants...</span>
          </div>
        ) : applications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <ApplicantCard key={app._id} application={app} onUpdateStatus={handleUpdateStatus} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
            <FileCheck className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-semibold text-slate-200">No Applicants Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No candidate applications match your current filters.
            </p>
          </div>
        )}
      </div>
    </RecruiterLayout>
  );
};
