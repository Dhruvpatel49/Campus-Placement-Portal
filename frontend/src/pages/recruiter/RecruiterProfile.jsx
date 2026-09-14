import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecruiterLayout } from '../../components/layout/RecruiterLayout';
import { recruiterService } from '../../services/recruiter.service';
import { User, Mail, Phone, Building2, UserCog, ShieldCheck, Globe, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

export const RecruiterProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await recruiterService.getProfile();
      if (res && res.data) {
        setProfile(res.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load recruiter profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <RecruiterLayout>
        <div className="flex justify-center items-center h-64 text-slate-400">
          <span className="animate-pulse font-medium text-sm">Loading Recruiter Profile...</span>
        </div>
      </RecruiterLayout>
    );
  }

  const user = profile?.userId || {};

  return (
    <RecruiterLayout>
      <div className="space-y-8">
        {/* Header Profile Banner */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-extrabold text-2xl">
              {user.firstName ? user.firstName[0] : 'R'}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-50">
                {user.firstName ? `${user.firstName} ${user.lastName}` : 'Recruiter Profile'}
              </h1>
              <p className="text-sm text-slate-400 font-medium">
                {profile?.designation} • {profile?.department}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${
                  profile?.verificationStatus === 'verified'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  Status: {profile?.verificationStatus ? profile.verificationStatus.toUpperCase() : 'PENDING'}
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/recruiter/edit-profile"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 transition"
          >
            <UserCog className="w-4 h-4" />
            Edit Profile
          </Link>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Personal & Links */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" /> Contact Details
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>{user.email || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>{profile?.phone || 'Not specified'}</span>
                </div>
                <div className="text-slate-400">
                  <span className="text-slate-500">Company Email: </span> {profile?.companyEmail || user.email}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" /> Online Presence
              </h3>
              <div className="space-y-2 text-xs">
                {profile?.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="block text-purple-400 hover:underline truncate">
                    LinkedIn: {profile.linkedin}
                  </a>
                )}
                {profile?.portfolio && (
                  <a href={profile.portfolio} target="_blank" rel="noreferrer" className="block text-purple-400 hover:underline truncate">
                    Portfolio: {profile.portfolio}
                  </a>
                )}
                {!profile?.linkedin && !profile?.portfolio && (
                  <p className="text-slate-500">No social profiles added</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Professional Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-400" /> Professional Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Designation</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">{profile?.designation}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Department</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">{profile?.department}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Experience</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">{profile?.yearsOfExperience || 0} Years</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Account Status</p>
                  <p className="text-sm font-semibold text-emerald-400 mt-1">Active</p>
                </div>
              </div>
            </div>

            {/* Recruiter Bio */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
              <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" /> Professional Bio
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {profile?.bio || 'No professional bio provided yet. Click "Edit Profile" to add a bio describing your recruitment focus and company background.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
};
