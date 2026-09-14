import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RecruiterLayout } from '../../components/layout/RecruiterLayout';
import { jobService } from '../../services/job.service';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
    allowedBranchesInput: '',
    graduationBatch: 2025,
    maxBacklogs: 0,
    openings: 5,
    deadline: '',
    selectionProcess: '',
    description: '',
    requirementsInput: '',
    status: 'draft',
  });

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await jobService.getJobById(id);
      if (res && res.data) {
        const j = res.data;
        setFormData({
          title: j.title || '',
          jobType: j.jobType || 'full_time',
          employmentType: j.employmentType || 'Permanent',
          location: j.location || '',
          workMode: j.workMode || 'on_site',
          ctc: j.ctc || 0,
          stipend: j.stipend || 0,
          minCgpa: j.minCgpa || 0,
          allowedBranchesInput: j.allowedBranches ? j.allowedBranches.join(', ') : '',
          graduationBatch: j.graduationBatch || 2025,
          maxBacklogs: j.maxBacklogs || 0,
          openings: j.openings || 1,
          deadline: j.deadline ? new Date(j.deadline).toISOString().split('T')[0] : '',
          selectionProcess: j.selectionProcess || '',
          description: j.description || '',
          requirementsInput: j.requirements ? j.requirements.join(', ') : '',
          status: j.status || 'draft',
        });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
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
      };

      const res = await jobService.updateJob(id, payload);
      toast.success(res.message || 'Job posting updated successfully!');
      navigate('/recruiter/jobs');
    } catch (err) {
      toast.error(err.message || 'Failed to update job posting');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <RecruiterLayout>
        <div className="flex justify-center items-center h-64 text-slate-400">
          <span className="animate-pulse font-medium text-sm">Loading Job Form...</span>
        </div>
      </RecruiterLayout>
    );
  }

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
          <h1 className="text-xl font-bold text-slate-50">Edit Job Drive</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Job Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs text-slate-300 font-medium">Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
              <label className="text-xs text-slate-300 font-medium">Description</label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
              ></textarea>
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
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Job Changes'}
            </button>
          </div>
        </form>
      </div>
    </RecruiterLayout>
  );
};
