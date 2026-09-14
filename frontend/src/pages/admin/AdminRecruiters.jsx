import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { adminService } from '../../services/admin.service';
import { UserCheck, CheckCircle2, XCircle, Clock, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchRecruiters();
  }, [statusFilter]);

  const fetchRecruiters = async () => {
    try {
      const res = await adminService.getRecruiters({ status: statusFilter });
      if (res && res.data) {
        setRecruiters(res.data.recruiters || []);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to fetch recruiters');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id, status) => {
    const remarks = window.prompt(`Verification remarks for set to ${status}:`, 'Verified by Placement Cell');
    try {
      const res = await adminService.verifyRecruiter(id, status, remarks);
      toast.success(res.message || `Recruiter set to ${status}`);
      fetchRecruiters();
    } catch (err) {
      toast.error(err.message || 'Verification update failed');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-amber-400" /> Recruiter Verification
          </h1>
          <p className="text-xs text-slate-400">
            Review corporate recruiter profiles, designations, and verify authority for placement drives.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
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

        {/* Recruiter Table */}
        {loading ? (
          <div className="flex justify-center items-center h-48 text-slate-400">
            <span className="animate-pulse font-medium text-sm">Loading Recruiters...</span>
          </div>
        ) : (
          <div className="glass-card rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Recruiter Name</th>
                    <th className="p-4">Designation</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Verification Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {recruiters.map((r) => {
                    const user = r.userId || {};
                    const company = r.companyId || {};
                    return (
                      <tr key={r._id} className="hover:bg-slate-800/30 transition">
                        <td className="p-4 font-semibold text-slate-100">
                          {user.firstName} {user.lastName}
                          <span className="block text-[11px] text-slate-400 font-normal">{user.email}</span>
                        </td>
                        <td className="p-4">
                          {r.designation || 'N/A'}
                          <span className="block text-[11px] text-slate-500">{r.department || 'HR'}</span>
                        </td>
                        <td className="p-4 font-medium text-purple-400">{company.name || 'Not Bound'}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                              r.adminVerificationStatus === 'verified'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : r.adminVerificationStatus === 'rejected'
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            }`}
                          >
                            {r.adminVerificationStatus || 'PENDING'}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleVerify(r._id, 'verified')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => handleVerify(r._id, 'rejected')}
                            className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-[11px] font-semibold transition"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
