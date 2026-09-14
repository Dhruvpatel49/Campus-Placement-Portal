import React from 'react';
import { Briefcase, MapPin, DollarSign, Calendar, Building } from 'lucide-react';

export function JobListContainer({ jobs }) {
  const sampleJobs = jobs || [
    {
      _id: '1',
      title: 'Full Stack Software Engineer',
      companyId: { name: 'Google Inc.', logo: '', location: 'Mountain View, CA' },
      location: 'Hybrid / Bengaluru',
      ctc: 2400000,
      jobType: 'full_time',
      deadline: '2026-08-30T00:00:00.000Z',
    },
    {
      _id: '2',
      title: 'Frontend Developer Intern',
      companyId: { name: 'Microsoft', logo: '', location: 'Redmond, WA' },
      location: 'Remote / Hyderabad',
      ctc: 1200000,
      jobType: 'internship',
      deadline: '2026-09-15T00:00:00.000Z',
    },
  ];

  return (
    <div className="space-y-4 max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Placement Opportunities</h2>
          <p className="text-slate-400 text-sm">Explore verified campus placement job postings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sampleJobs.map((job) => (
          <div
            key={job._id}
            className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-500/50 transition duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400 font-bold text-lg border border-slate-700">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">{job.title}</h3>
                <p className="text-sm font-medium text-brand-400">{job.companyId?.name}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <DollarSign className="w-3.5 h-3.5" />
                    ₹{(job.ctc / 100000).toFixed(1)} LPA
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <button className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition shadow-lg shadow-brand-600/20 w-full sm:w-auto">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobListContainer;
