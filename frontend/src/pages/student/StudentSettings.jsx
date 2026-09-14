import React, { useState } from 'react';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { studentService } from '../../services/student.service';
import { Settings, Lock, Eye, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const StudentSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [saving, setSaving] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setSaving(true);
    try {
      const res = await studentService.updateSettings({ currentPassword, newPassword });
      toast.success(res.message || 'Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.message || 'Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  const handleVisibilityToggle = async () => {
    const nextVal = !profileVisibility;
    setProfileVisibility(nextVal);
    try {
      const res = await studentService.updateSettings({ profileVisibility: nextVal });
      toast.success(res.message || `Profile visibility set to ${nextVal ? 'Public' : 'Private'}`);
    } catch (err) {
      toast.error(err.message || 'Failed to update profile visibility');
      setProfileVisibility(!nextVal);
    }
  };

  return (
    <StudentLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <Settings className="w-6 h-6 text-brand-400" /> Account Settings
          </h1>
          <p className="text-xs text-slate-400">Manage security options and profile privacy</p>
        </div>

        {/* Change Password */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-400" /> Security & Password
          </h3>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">New Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Confirm New Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Profile Visibility Toggle */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-brand-400" />
            <div>
              <h4 className="text-sm font-semibold text-slate-100">Recruiter Profile Visibility</h4>
              <p className="text-xs text-slate-400">Allow verified campus recruiters to discover your profile</p>
            </div>
          </div>

          <button
            onClick={handleVisibilityToggle}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
              profileVisibility
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {profileVisibility ? 'Public to Recruiters' : 'Private'}
          </button>
        </div>
      </div>
    </StudentLayout>
  );
};
