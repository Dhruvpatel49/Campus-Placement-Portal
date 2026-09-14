import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecruiterLayout } from '../../components/layout/RecruiterLayout';
import { jobService } from '../../services/job.service';
import { Plus, ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const CreateJob = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    jobType: 'full_time',
    employmentType: 'Permanent',
    location: '',
    workMode: 'on_site',
    ctc: 12,
    stipend: 0,
    minCgpa: 7.0,
    allowedBranchesInput: 'Computer Science, Information Technology, Electronics',
    graduationBatch: new Date().getFullYear() + 1,
    maxBacklogs: 0,
    openings: 5,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    selectionProcess: 'Aptitude Test -> Coding Round -> Technical Interview -> HR Round',
    description: '',
    requirementsInput: 'Proficiency in Data Structures, Algorithms, React, Node.js',
    status: 'draft',
  });

  const handleSubmit = async (e, publishStatus = 'draft') => {
    e.preventDefault();
    setSaving(true);

    try {
      const branchesArray = formData.allowedBranchesInput
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean);

      const reqsArray = formData.requirementsInput
        .split(',')
        .map((r) => r.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        jobType: formData.jobType,
        employmentType: formData.employmentType,
        location: formData.location,
        workMode: formData.workMode,
        ctc: Number(formData.ctc),
        stipend: Number(formData.stipend),
        minCgpa: Number(formData.minCgpa),
        allowedBranches: branchesArray,
        graduationBatch: Number(formData.graduationBatch),
        maxBacklogs: Number(formData.maxBacklogs),
        openings: Number(formData.openings),
        deadline: new Date(formData.deadline),
        selectionProcess: formData.selectionProcess,
        description: formData.description,
        requirements: reqsArray,
        status: publishStatus,
      };

      const res = await jobService.createJob(payload);
      toast.success(res.message || 'Job created successfully!');
      navigate('/recruiter/jobs');
    } catch (err) {
      toast.error(err.message || 'Failed to create job posting');
    } finally {
      setSaving(false);
    }
  };

  return (
    <RecruiterLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/recruiter/jobs')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </button>
          <h1 className="text-xl font-bold text-slate-50 flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-400" /> Create Campus Placement Drive
          </h1>
        </div>

        <form onSubmit={(e) => handleSubmit(e, 'draft')} className="space-y-6">
          {/* Basic Job Details */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Basic Job Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs text-slate-300 font-medium">Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Software Development Engineer (SDE-1)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Job Type</label>
                <select
                  value={formData.jobType}
                  onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                >
                  <option value="full_time">Full Time</option>
                  <option value="internship">Internship</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Work Mode</label>
                <select
                  value={formData.workMode}
                  onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                >
                  <option value="on_site">On-Site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Bengaluru, KA"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Annual CTC (LPA)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  min={0}
                  value={formData.ctc}
                  onChange={(e) => setFormData({ ...formData, ctc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Job Description</label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed job description and responsibilities..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500"
              ></textarea>
            </div>
          </div>

          {/* Student Eligibility Criteria */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Student Eligibility Criteria</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Minimum CGPA (0 - 10)</label>
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  max={10}
                  value={formData.minCgpa}
                  onChange={(e) => setFormData({ ...formData, minCgpa: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Max Backlogs Allowed</label>
                <input
                  type="number"
                  min={0}
                  value={formData.maxBacklogs}
                  onChange={(e) => setFormData({ ...formData, maxBacklogs: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Graduation Batch</label>
                <input
                  type="number"
                  value={formData.graduationBatch}
                  onChange={(e) => setFormData({ ...formData, graduationBatch: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Allowed Branches (Comma Separated)</label>
              <input
                type="text"
                value={formData.allowedBranchesInput}
                onChange={(e) => setFormData({ ...formData, allowedBranchesInput: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Hiring Deadlines & Details */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Hiring Deadlines & Process</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Application Deadline</label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Number of Openings</label>
                <input
                  type="number"
                  min={1}
                  value={formData.openings}
                  onChange={(e) => setFormData({ ...formData, openings: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/recruiter/jobs')}
              className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'active')}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Publishing...' : 'Publish Job Drive'}
            </button>
          </div>
        </form>
      </div>
    </RecruiterLayout>
  );
};
