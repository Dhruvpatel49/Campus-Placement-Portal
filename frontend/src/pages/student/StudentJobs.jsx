import React, { useEffect, useState } from 'react';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { JobCard } from '../../components/job/JobCard';
import { JobFilters } from '../../components/job/JobFilters';
import { jobService } from '../../services/job.service';
import { Briefcase, SearchX } from 'lucide-react';
import toast from 'react-hot-toast';

export const StudentJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    workMode: '',
    minCtc: '',
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const res = await jobService.getStudentJobs(filters);
      if (res && res.data) {
        setJobs(res.data.jobs || []);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load active job postings');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      location: '',
      jobType: '',
      workMode: '',
      minCtc: '',
    });
  };

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-brand-400" /> Campus Placement Drives
          </h1>
          <p className="text-xs text-slate-400">
            Browse published placement opportunities and inspect your eligibility.
          </p>
        </div>

        {/* Filters */}
        <JobFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Job Listings Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-48 text-slate-400">
            <span className="animate-pulse font-medium text-sm">Searching Placement Drives...</span>
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} isRecruiter={false} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
            <SearchX className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-semibold text-slate-200">No Job Drives Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No active drives match your current search filters. Try adjusting your criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold mt-2 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};
