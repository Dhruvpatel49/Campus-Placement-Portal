import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { adminService } from '../../services/admin.service';
import { Briefcase, Search, IndianRupee, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [statusFilter, search]);

  const fetchJobs = async () => {
    try {
      const res = await adminService.getJobs({ status: statusFilter, search });
      if (res && res.data) {
        setJobs(res.data.jobs || []);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to fetch job postings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-400" /> Platform Job Postings
          </h1>
          <p className="text-xs text-slate-400">Monitor all published, draft, and closed campus placement drives.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {['all', 'draft', 'active', 'closed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                  statusFilter === st
                    ? 'bg-amber-600 text-white shadow-md'
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
              placeholder="Search job drives..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Jobs Table */}
        {loading ? (
          <div className="flex justify-center items-center h-48 text-slate-400">
            <span className="animate-pulse font-medium text-sm">Fetching Job Drives...</span>
          </div>
        ) : (
          <div className="glass-card rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Job Title</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Package (CTC)</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {jobs.map((j) => (
                    <tr key={j._id} className="hover:bg-slate-800/30 transition">
                      <td className="p-4 font-semibold text-slate-100">{j.title}</td>
                      <td className="p-4 text-amber-400 font-medium">{j.companyId?.name || 'N/A'}</td>
                      <td className="p-4 text-slate-400">{j.location}</td>
                      <td className="p-4 text-emerald-400 font-bold">₹{j.ctc} LPA</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                            j.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : j.status === 'closed'
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {j.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">{new Date(j.deadline).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
