import React from 'react';
import { Building2, Globe, MapPin, Tag, CheckCircle2 } from 'lucide-react';

export const CompanyOverviewCard = ({ company }) => {
  if (!company) return null;

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-xl overflow-hidden shrink-0">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-8 h-8" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-50">{company.name}</h3>
            <p className="text-xs text-slate-400 font-medium">
              {company.industry} • {company.companyType || 'Product Company'}
            </p>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-purple-400 hover:underline mt-1"
              >
                <Globe className="w-3 h-3" /> {company.website}
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              company.verificationStatus === 'verified'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            {company.verificationStatus === 'verified' ? 'Verified Organization' : 'Verification Pending'}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800/60 text-xs text-slate-300 space-y-1">
        <div className="flex items-center gap-2 text-slate-400">
          <MapPin className="w-4 h-4 text-slate-500" />
          <span>{company.city ? `${company.city}, ${company.state}, ${company.country}` : 'Location specified'}</span>
        </div>
        <p className="text-slate-400 line-clamp-2 mt-2">{company.description}</p>
      </div>
    </div>
  );
};
