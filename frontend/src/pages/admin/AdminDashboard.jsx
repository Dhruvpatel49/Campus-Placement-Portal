import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AnalyticsCards } from '../../components/admin/AnalyticsCards';
import { adminService } from '../../services/admin.service';
import { ShieldCheck, UserCheck, Building2, Briefcase, FileCheck, ArrowRight, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await adminService.getDashboardStats();
      if (res && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load admin statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64 text-slate-400">
          <span className="animate-pulse font-medium text-sm">Loading Platform Metrics...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" /> Platform Overview
          </h1>
          <p className="text-xs text-slate-400">
            Monitor campus placement ecosystem metrics, verify organizations, and manage users.
          </p>
        </div>

        {/* Analytics Cards */}
        <AnalyticsCards stats={stats} />

        {/* Verification Alert Callouts */}
        {(stats?.pendingRecruitersCount > 0 || stats?.pendingCompaniesCount > 0) && (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <h4 className="font-bold text-xs text-amber-300">Pending Verification Requests</h4>
                <p className="text-xs text-slate-300">
                  {stats.pendingRecruitersCount} recruiters & {stats.pendingCompaniesCount} companies are awaiting administrative review.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/admin/recruiters"
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition"
              >
                Review Recruiters
              </Link>
              <Link
                to="/admin/companies"
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                Review Companies
              </Link>
            </div>
          </div>
        )}

        {/* Quick Management Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/users"
            className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-amber-500/50 transition space-y-2 block"
          >
            <UserCheck className="w-5 h-5 text-amber-400" />
            <h4 className="font-semibold text-xs text-slate-100">User Accounts</h4>
            <p className="text-[11px] text-slate-400">View and manage all registered student and recruiter profiles.</p>
          </Link>

          <Link
            to="/admin/companies"
            className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-amber-500/50 transition space-y-2 block"
          >
            <Building2 className="w-5 h-5 text-blue-400" />
            <h4 className="font-semibold text-xs text-slate-100">Company Profiles</h4>
            <p className="text-[11px] text-slate-400">Verify company profiles and monitor recruiting organizations.</p>
          </Link>

          <Link
            to="/admin/jobs"
            className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-amber-500/50 transition space-y-2 block"
          >
            <Briefcase className="w-5 h-5 text-purple-400" />
            <h4 className="font-semibold text-xs text-slate-100">Placement Drives</h4>
            <p className="text-[11px] text-slate-400">Moderate published job drives and inspect application deadlines.</p>
          </Link>

          <Link
            to="/admin/applications"
            className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-amber-500/50 transition space-y-2 block"
          >
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="font-semibold text-xs text-slate-100">Applications Activity</h4>
            <p className="text-[11px] text-slate-400">Monitor candidate selection rates across placement drives.</p>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};
