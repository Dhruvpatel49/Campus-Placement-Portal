import React, { useEffect, useState } from 'react';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { studentService } from '../../services/student.service';
import { FileUp, FileText, Trash2, ExternalLink, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const StudentResume = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await studentService.getProfile();
      if (res && res.data) {
        setProfile(res.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load resume details');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.size > 5 * 1024 * 1024) {
        toast.error('File size must be under 5MB');
        return;
      }
      setFile(selected);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a PDF, DOC, or DOCX file to upload');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await studentService.uploadResume(formData);
      setProfile(res.data);
      setFile(null);
      toast.success(res.message || 'Resume uploaded successfully!');
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your active resume?')) return;

    try {
      const res = await studentService.deleteResume();
      setProfile(res.data);
      toast.success(res.message || 'Resume deleted successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to delete resume');
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex justify-center items-center h-64 text-slate-400">
          <span className="animate-pulse font-medium text-sm">Loading Resume Page...</span>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-50">Resume Management</h1>
          <p className="text-xs text-slate-400">
            Upload your professional resume in PDF, DOC, or DOCX format (Max 5MB).
          </p>
        </div>

        {/* Current Active Resume Status */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-400" /> Active Resume Document
          </h3>

          {profile?.resumeUrl ? (
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-100">
                    {profile.userId?.firstName ? `${profile.userId.firstName}_Resume.pdf` : 'Resume_Document.pdf'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Uploaded at: {profile.resumeUploadedAt ? new Date(profile.resumeUploadedAt).toLocaleDateString() : 'Recently'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View / Download
                </a>

                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-semibold transition"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center border border-dashed border-amber-500/30 rounded-xl bg-amber-500/5 space-y-2">
              <AlertCircle className="w-7 h-7 text-amber-400 mx-auto" />
              <p className="text-sm font-semibold text-amber-300">No active resume uploaded</p>
              <p className="text-xs text-amber-400/80 max-w-md mx-auto">
                Uploading a professional resume increases your profile completion score and eligibility for campus placement drives.
              </p>
            </div>
          )}
        </div>

        {/* Upload / Replace Section */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
            <FileUp className="w-5 h-5 text-brand-400" /> {profile?.resumeUrl ? 'Replace Resume' : 'Upload New Resume'}
          </h3>

          <div className="border-2 border-dashed border-slate-800 hover:border-brand-500/50 rounded-2xl p-8 text-center space-y-4 bg-slate-950/40 transition">
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="resume-upload" className="cursor-pointer space-y-2 block">
              <div className="p-4 rounded-full bg-brand-500/10 text-brand-400 w-fit mx-auto border border-brand-500/20">
                <FileUp className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  {file ? file.name : 'Click to select or drag & drop resume file'}
                </p>
                <p className="text-xs text-slate-500 mt-1">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>
            </label>

            {file && (
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 transition disabled:opacity-50"
                >
                  {uploading ? 'Uploading to Cloudinary...' : 'Confirm Upload'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};
