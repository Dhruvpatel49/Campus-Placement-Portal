import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecruiterLayout } from '../../components/layout/RecruiterLayout';
import { CompanyOverviewCard } from '../../components/company/CompanyOverviewCard';
import { CompanyCompletionCard } from '../../components/company/CompanyCompletionCard';
import { companyService } from '../../services/company.service';
import { Building2, Plus, Upload, Users, CheckCircle2, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

export const CompanyDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const [dashRes, compRes] = await Promise.all([
        companyService.getDashboard(),
        companyService.getCompany(),
      ]);

      if (dashRes && dashRes.data) {
        setDashboard(dashRes.data);
      }
      if (compRes && compRes.data) {
        setCompany(compRes.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load company dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <RecruiterLayout>
        <div className="flex justify-center items-center h-64 text-slate-400">
          <span className="animate-pulse font-medium text-sm">Loading Company Workspace...</span>
        </div>
      </RecruiterLayout>
    );
  }

  // If no company created yet, render Create Company Callout
  if (!dashboard?.hasCompany && !company) {
    return (
      <RecruiterLayout>
        <div className="max-w-3xl mx-auto space-y-6 text-center py-12">
          <div className="glass-card p-10 rounded-3xl border border-slate-800 bg-slate-900/80 space-y-6">
            <div className="p-4 rounded-full bg-purple-500/10 text-purple-400 w-fit mx-auto border border-purple-500/20">
              <Building2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-50">No Company Associated Yet</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Create your company profile to start organizing campus placement drives, associate recruiters, and present your brand to students.
              </p>
            </div>
            <Link
              to="/recruiter/company/edit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 transition"
            >
              <Plus className="w-4 h-4" /> Create Company Profile
            </Link>
          </div>
        </div>
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      <div className="space-y-8">
        {/* Company Overview Header */}
        <CompanyOverviewCard company={company} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Industry</p>
              <h4 className="text-sm font-semibold text-slate-100">{company?.industry}</h4>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Associated Recruiters</p>
              <h4 className="text-sm font-semibold text-slate-100">{company?.recruiters ? company.recruiters.length : 1}</h4>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Verification</p>
              <h4 className="text-sm font-semibold text-emerald-400">{company?.verificationStatus?.toUpperCase() || 'PENDING'}</h4>
            </div>
          </div>
        </div>

        {/* Completion & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CompanyCompletionCard percentage={company?.profileCompletionPercentage} />
          </div>

          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-4">
            <h3 className="text-md font-semibold text-slate-100">Management Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/recruiter/company/edit"
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/50 transition block space-y-1"
              >
                <h4 className="text-xs font-semibold text-purple-400">Edit Company Information</h4>
                <p className="text-[11px] text-slate-400">Update company description, contact details & website.</p>
              </Link>
              <Link
                to="/recruiter/company/profile"
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/50 transition block space-y-1"
              >
                <h4 className="text-xs font-semibold text-purple-400">View Public Profile</h4>
                <p className="text-[11px] text-slate-400">Inspect full organization overview and recruiter team.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
};
