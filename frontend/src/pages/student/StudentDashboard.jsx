import React, { useEffect, useState } from 'react';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { ProfileCompletionCard } from '../../components/student/ProfileCompletionCard';
import { QuickActionsWidget } from '../../components/student/QuickActionsWidget';
import { studentService } from '../../services/student.service';
import { useAuth } from '../../context/AuthContext';
import { Award, Briefcase, FileCheck, CheckCircle2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await studentService.getDashboard();
      if (res && res.data) {
        setData(res.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex justify-center items-center h-64 text-slate-400">
          <span className="animate-pulse font-medium text-sm">Loading Student Dashboard...</span>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-brand-950/40 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-medium border border-brand-500/20">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
              Placement Season Active
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.firstName || 'Student'}! 👋
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Track your profile status, upload your resume, and stay updated with placement opportunities.
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Academic CGPA</p>
              <h4 className="text-xl font-bold text-slate-100">{data?.cgpa ?? 8.0} / 10</h4>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Placement Eligible</p>
              <h4 className="text-xl font-bold text-emerald-400">{data?.placementEligible ? 'Eligible' : 'Under Review'}</h4>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Active Resume</p>
              <h4 className="text-xl font-bold text-slate-100">{data?.resumeUploaded ? 'Uploaded' : 'Pending'}</h4>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Applied Jobs</p>
              <h4 className="text-xl font-bold text-slate-100">{data?.applicationStats?.applied || 0} Drives</h4>
            </div>
          </div>
        </div>

        {/* Profile Completion & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfileCompletionCard
              percentage={data?.profileCompletionPercentage}
              resumeUploaded={data?.resumeUploaded}
              skillsCount={data?.skillsCount}
            />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-slate-100">Quick Actions</h3>
            <QuickActionsWidget />
          </div>
        </div>

        {/* Recent Applications Placeholder */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-100">Recent Applications</h3>
            <span className="text-xs text-slate-500">Live Status</span>
          </div>

          <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl space-y-2">
            <Clock className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-medium text-slate-300">No active job applications yet</p>
            <p className="text-xs text-slate-500">
              Once recruiters publish job postings, your applied drives and statuses will appear here.
            </p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};
