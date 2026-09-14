import React from 'react';
import { Briefcase, CheckCircle, Clock, Award, FileText, UserCheck } from 'lucide-react';

export function StudentDashboardPage({ stats, user }) {
  const dashboardStats = stats || {
    profileCompletion: 80,
    stats: { appliedCount: 4, shortlistedCount: 2, offeredCount: 1 },
    placementEligibility: true,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Header banner */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-brand-900/30">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-brand-400 text-xs font-semibold uppercase tracking-wider">Student Dashboard</span>
            <h1 className="text-3xl font-extrabold text-slate-50 mt-1">
              Welcome back, {user?.firstName || 'Student'}! 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Track your campus placement journey, manage applications, and update your profile.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <UserCheck className="w-4 h-4" />
            <span>{dashboardStats.placementEligibility ? 'Eligible for Placement Drives' : 'Eligibility Pending'}</span>
          </div>
        </div>

        {/* Profile Completion Meter */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-2">
            <span>Profile Completion Strength</span>
            <span className="text-brand-400 font-bold">{dashboardStats.profileCompletion}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-600 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${dashboardStats.profileCompletion}%` }}
            />
          </div>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition">
          <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Jobs Applied</p>
            <h3 className="text-3xl font-bold text-slate-100 mt-1">{dashboardStats.stats.appliedCount}</h3>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Shortlisted</p>
            <h3 className="text-3xl font-bold text-slate-100 mt-1">{dashboardStats.stats.shortlistedCount}</h3>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Offers Received</p>
            <h3 className="text-3xl font-bold text-slate-100 mt-1">{dashboardStats.stats.offeredCount}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardPage;
