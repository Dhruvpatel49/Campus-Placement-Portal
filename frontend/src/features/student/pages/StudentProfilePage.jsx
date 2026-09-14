import React, { useState } from 'react';
import { User, AcademicCap, BookOpen, Wrench, Save, Check } from 'lucide-react';

export function StudentProfilePage({ initialProfile, onSave }) {
  const [profile, setProfile] = useState(
    initialProfile || {
      enrollmentNumber: 'CS2026_01',
      branch: 'Computer Science & Engineering',
      batch: 2026,
      cgpa: 8.75,
      backlogs: 0,
      phone: '+91 9876543210',
      skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    }
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Student Profile</h1>
          <p className="text-slate-400 text-sm">Update your academic and personal information for recruiter review.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl space-y-6 border border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Enrollment Number</label>
            <input
              type="text"
              value={profile.enrollmentNumber}
              onChange={(e) => setProfile({ ...profile, enrollmentNumber: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Phone Number</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Branch</label>
            <input
              type="text"
              value={profile.branch}
              onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Graduation Batch</label>
            <input
              type="number"
              value={profile.batch}
              onChange={(e) => setProfile({ ...profile, batch: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">CGPA (0 - 10)</label>
            <input
              type="number"
              step="0.01"
              value={profile.cgpa}
              onChange={(e) => setProfile({ ...profile, cgpa: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Active Backlogs</label>
            <input
              type="number"
              value={profile.backlogs}
              onChange={(e) => setProfile({ ...profile, backlogs: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition shadow-lg shadow-brand-600/20"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Saved!' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentProfilePage;
