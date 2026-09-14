import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecruiterLayout } from '../../components/layout/RecruiterLayout';
import { companyService } from '../../services/company.service';
import { Building2, Globe, Mail, Phone, MapPin, Users, Edit3, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await companyService.getCompany();
      if (res && res.data) {
        setCompany(res.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load company profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <RecruiterLayout>
        <div className="flex justify-center items-center h-64 text-slate-400">
          <span className="animate-pulse font-medium text-sm">Loading Company Profile...</span>
        </div>
      </RecruiterLayout>
    );
  }

  if (!company) {
    return (
      <RecruiterLayout>
        <div className="text-center py-12 space-y-4">
          <p className="text-sm text-slate-400">No company details created yet.</p>
          <Link to="/recruiter/company/edit" className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold">
            Create Company Profile
          </Link>
        </div>
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      <div className="space-y-8">
        {/* Banner */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-extrabold text-2xl overflow-hidden shrink-0">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-8 h-8" />
              )}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-50">{company.name}</h1>
              <p className="text-sm text-slate-400 font-medium">
                {company.industry} • Founded {company.foundedYear || 2020}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {company.companyType || 'Product'}
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/recruiter/company/edit"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 transition"
          >
            <Edit3 className="w-4 h-4" />
            Edit Company
          </Link>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" /> Contact Info
              </h3>
              <div className="space-y-3 text-xs">
                {company.officialEmail && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span>{company.officialEmail}</span>
                  </div>
                )}
                {company.phone && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span>{company.phone}</span>
                  </div>
                )}
                {company.website && (
                  <div className="flex items-center gap-2 text-purple-400">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <a href={company.website} target="_blank" rel="noreferrer" className="hover:underline truncate">
                      {company.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{company.city ? `${company.city}, ${company.state}` : 'India'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Team */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
              <h3 className="text-md font-semibold text-slate-100">About {company.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{company.description}</p>
            </div>

            {/* Recruiters Team */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" /> Recruiter Team ({company.recruiters ? company.recruiters.length : 1})
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {company.recruiters && company.recruiters.length > 0 ? (
                  company.recruiters.map((r, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                      <p className="font-semibold text-slate-200">{r.designation || 'Recruiter'}</p>
                      <p className="text-slate-400">{r.department || 'Human Resources'}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">1 Recruiter Associated</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
};
