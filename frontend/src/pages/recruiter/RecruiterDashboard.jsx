import React, { useEffect, useState } from 'react';
import { RecruiterLayout } from '../../components/layout/RecruiterLayout';
import { VerificationStatusCard } from '../../components/recruiter/VerificationStatusCard';
import { RecruiterQuickActions } from '../../components/recruiter/RecruiterQuickActions';
import { recruiterService } from '../../services/recruiter.service';
import { useAuth } from '../../context/AuthContext';
import { Building2, Briefcase, Users, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await recruiterService.getDashboard();
      if (res && res.data) {
        setData(res.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load recruiter dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <RecruiterLayout>
        <div className="flex justify-center items-center h-64 text-slate-400">
          <span className="animate-pulse font-medium text-sm">Loading Recruiter Workspace...</span>
        </div>
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-purple-950/40 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              Recruiter Hub
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome, {user?.firstName || 'Recruiter'}! 🏢
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Manage your recruiter credentials, complete professional details, and track your admin verification status.
            </p>
          </div>
        </div>

        {/* Verification Status Banner */}
        <VerificationStatusCard
          status={data?.verificationStatus}
          remarks={data?.verificationRemarks}
        />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Designation</p>
              <h4 className="text-sm font-semibold text-slate-100">{data?.designation || 'HR Manager'}</h4>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Department</p>
              <h4 className="text-sm font-semibold text-slate-100">{data?.department || 'Talent Acquisition'}</h4>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Profile Completion</p>
              <h4 className="text-sm font-semibold text-emerald-400">{data?.profileCompletionPercentage}%</h4>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-100">Quick Actions</h3>
          <RecruiterQuickActions />
        </div>
      </div>
    </RecruiterLayout>
  );
};
