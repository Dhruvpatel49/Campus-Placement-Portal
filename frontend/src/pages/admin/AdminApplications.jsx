import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { adminService } from '../../services/admin.service';
import { FileCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const fetchApplications = async () => {
    try {
      const res = await adminService.getApplications({ status: statusFilter });
      if (res && res.data) {
        setApplications(res.data.applications || []);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to fetch application records');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-amber-400" /> Platform Placement Activity
          </h1>
          <p className="text-xs text-slate-400">Monitor candidate application submissions and selection outcomes.</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-4">
          {['all', 'applied', 'shortlisted', 'selected', 'rejected', 'withdrawn'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition ${
                statusFilter === st
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Applications Table */}
        {loading ? (
          <div className="flex justify-center items-center h-48 text-slate-400">
            <span className="animate-pulse font-medium text-sm">Fetching Applications...</span>
          </div>
        ) : (
          <div className="glass-card rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Student Candidate</th>
                    <th className="p-4">Branch & CGPA</th>
                    <th className="p-4">Job Drive</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Applied Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {applications.map((app) => {
                    const student = app.studentId || {};
                    const user = student.userId || {};
                    const job = app.jobId || {};
                    const company = app.companyId || {};

                    return (
                      <tr key={app._id} className="hover:bg-slate-800/30 transition">
                        <td className="p-4 font-semibold text-slate-100">
                          {user.firstName ? `${user.firstName} ${user.lastName}` : 'Candidate'}
                          <span className="block text-[11px] text-slate-400 font-normal">{user.email}</span>
                        </td>
                        <td className="p-4">
                          {student.branch || 'Branch'}
                          <span className="block text-[11px] text-slate-500 font-medium">CGPA: {student.cgpa}</span>
                        </td>
                        <td className="p-4 font-medium text-slate-200">{job.title || 'N/A'}</td>
                        <td className="p-4 text-purple-400 font-semibold">{company.name || 'N/A'}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase bg-slate-800 text-slate-300 border-slate-700">
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400">{new Date(app.appliedAt).toLocaleDateString()}</td>
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
