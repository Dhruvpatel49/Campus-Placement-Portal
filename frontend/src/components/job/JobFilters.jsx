import React from 'react';
import { Search, Filter, MapPin, Briefcase } from 'lucide-react';

export const JobFilters = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search job title or keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Location Filter */}
        <div className="relative w-full md:w-48">
          <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={filters.location || ''}
            onChange={(e) => onFilterChange('location', e.target.value)}
            placeholder="Location..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Job Type Select */}
        <div className="relative w-full md:w-44">
          <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <select
            value={filters.jobType || ''}
            onChange={(e) => onFilterChange('jobType', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-brand-500 appearance-none"
          >
            <option value="">All Job Types</option>
            <option value="full_time">Full Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        {/* Work Mode */}
        <div className="w-full md:w-40">
          <select
            value={filters.workMode || ''}
            onChange={(e) => onFilterChange('workMode', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-brand-500"
          >
            <option value="">All Modes</option>
            <option value="on_site">On-Site</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-400 transition shrink-0"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};
