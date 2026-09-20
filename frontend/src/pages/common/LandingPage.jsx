import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Building2, ShieldCheck, ArrowRight, CheckCircle2, Briefcase, FileCheck } from 'lucide-react';

export const LandingPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium text-sm">
        Connecting session...
      </div>
    );
  }

  if (user) {
    if (user.role === 'student') return <Navigate to="/student/dashboard" replace />;
    if (user.role === 'recruiter') return <Navigate to="/recruiter/dashboard" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Placify</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
            <span>Next-Gen Campus Recruitment Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-50 leading-tight">
            Streamlining Campus Placements for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Students & Recruiters</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Centralized ecosystem connecting students with top hiring organizations. Complete with eligibility checking, job drive management, applicant tracking, and automated verification.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold shadow-xl shadow-purple-500/25 transition flex items-center justify-center gap-2"
            >
              Register Account <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold transition"
            >
              Sign In to Portal
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">For Students</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maintain professional academic profile, upload resume snapshots, view eligibility badges, and track real-time application status.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">For Recruiters</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Register company profile, publish campus placement drives, review candidate resumes, and manage applicant hiring pipelines.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">For Administration</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verify recruiter and company credentials, moderate placement drives, monitor platform activity, and emit in-app notifications.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        © 2026 Placify. Built with Node.js, Express, MongoDB & React.
      </footer>
    </div>
  );
};
