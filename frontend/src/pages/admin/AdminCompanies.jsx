import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { adminService } from '../../services/admin.service';
import { Building2, Search, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, [statusFilter, search]);

  const fetchCompanies = async () => {
    try {
      const res = await adminService.getCompanies({ status: statusFilter, search });
      if (res && res.data) {
        setCompanies(res.data.companies || []);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to fetch company list');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id, status) => {
    const remarks = window.prompt(`Verification remarks for set to ${status}:`, 'Verified organization');
    try {
      const res = await adminService.verifyCompany(id, status, remarks);
      toast.success(res.message || `Company verification updated to ${status}`);
      fetchCompanies();
    } catch (err) {
      toast.error(err.message || 'Company verification update failed');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-amber-400" /> Company Moderation & Verification
          </h1>
          <p className="text-xs text-slate-400">
            Review company registrations, verify corporate authenticity, and monitor partner organizations.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {['all', 'pending', 'verified', 'rejected'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                  statusFilter === st
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company name..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Company Table */}
        {loading ? (
          <div className="flex justify-center items-center h-48 text-slate-400">
            <span className="animate-pulse font-medium text-sm">Fetching Companies...</span>
          </div>
        ) : (
          <div className="glass-card rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Company Name</th>
                    <th className="p-4">Industry</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {companies.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-800/30 transition">
                      <td className="p-4 font-semibold text-slate-100">{c.name}</td>
                      <td className="p-4 text-slate-400">{c.industry}</td>
                      <td className="p-4 text-slate-400">{c.city ? `${c.city}, ${c.country}` : 'India'}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                            c.verificationStatus === 'verified'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : c.verificationStatus === 'rejected'
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}
                        >
                          {c.verificationStatus || 'PENDING'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleVerify(c._id, 'verified')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleVerify(c._id, 'rejected')}
                          className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-[11px] font-semibold transition"
                        >
                          Reject
                        </button>
                      </td>
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
