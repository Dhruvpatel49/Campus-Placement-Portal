import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecruiterLayout } from '../../components/layout/RecruiterLayout';
import { JobCard } from '../../components/job/JobCard';
import { jobService } from '../../services/job.service';
import { Plus, Search, Briefcase, FileCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [statusFilter, search]);

  const fetchJobs = async () => {
    try {
      const res = await jobService.getRecruiterJobs({ status: statusFilter, search });
      if (res && res.data) {
        setJobs(res.data.jobs || []);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load company jobs');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (id) => {
    try {
      const res = await jobService.publishJob(id);
      toast.success(res.message || 'Job drive published successfully!');
      fetchJobs();
    } catch (err) {
      toast.error(err.message || 'Failed to publish job');
    }
  };

  const handleClose = async (id) => {
    try {
      const res = await jobService.closeJob(id);
      toast.success(res.message || 'Job drive closed');
      fetchJobs();
    } catch (err) {
      toast.error(err.message || 'Failed to close job');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) return;
    try {
      const res = await jobService.deleteJob(id);
      toast.success(res.message || 'Job posting deleted');
      fetchJobs();
    } catch (err) {
      toast.error(err.message || 'Failed to delete job');
    }
  };

  return (
    <RecruiterLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-purple-400" /> Job Drive Postings
            </h1>
            <p className="text-xs text-slate-400">Manage, publish, and track campus recruitment drives</p>
          </div>

          <Link
            to="/recruiter/jobs/create"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 transition"
          >
            <Plus className="w-4 h-4" /> Create New Job
          </Link>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {['all', 'draft', 'active', 'closed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                  statusFilter === st
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {st === 'active' ? 'Published' : st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Job Listings Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-48 text-slate-400">
            <span className="animate-pulse font-medium text-sm">Loading Job Drives...</span>
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                isRecruiter={true}
                onPublish={handlePublish}
                onClose={handleClose}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
            <FileCheck className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-semibold text-slate-200">No Job Drives Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Create your first placement drive posting to start attracting top campus talent.
            </p>
            <Link
              to="/recruiter/jobs/create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold mt-2 transition"
            >
              <Plus className="w-4 h-4" /> Create Job Drive
            </Link>
          </div>
        )}
      </div>
    </RecruiterLayout>
  );
};
