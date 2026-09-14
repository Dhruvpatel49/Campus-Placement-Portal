import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { studentService } from '../../services/student.service';
import { User, Mail, Phone, GraduationCap, Code, Globe, FileText, UserCog, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
      toast.error(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex justify-center items-center h-64 text-slate-400">
          <span className="animate-pulse font-medium text-sm">Loading Student Profile...</span>
        </div>
      </StudentLayout>
    );
  }

  const user = profile?.userId || {};

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Header Profile Banner */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-extrabold text-2xl">
              {user.firstName ? user.firstName[0] : 'S'}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-50">
                {user.firstName ? `${user.firstName} ${user.lastName}` : 'Student Profile'}
              </h1>
              <p className="text-sm text-slate-400 font-medium">
                {profile?.branch} • Batch of {profile?.batch}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {profile?.enrollmentNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  CGPA: {profile?.cgpa}
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/student/edit-profile"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 transition"
          >
            <UserCog className="w-4 h-4" />
            Edit Profile
          </Link>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Personal & Links */}
          <div className="space-y-6">
            {/* Personal Details */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
                <User className="w-4 h-4 text-brand-400" /> Personal Details
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
                  <span className="text-slate-500">Gender: </span> {profile?.gender || 'N/A'}
                </div>
                <div className="text-slate-400">
                  <span className="text-slate-500">Location: </span> {profile?.city ? `${profile.city}, ${profile.state}` : 'N/A'}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-400" /> Online Profiles
              </h3>
              <div className="space-y-2 text-xs">
                {profile?.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="block text-brand-400 hover:underline truncate">
                    LinkedIn: {profile.linkedin}
                  </a>
                )}
                {profile?.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer" className="block text-brand-400 hover:underline truncate">
                    GitHub: {profile.github}
                  </a>
                )}
                {profile?.portfolio && (
                  <a href={profile.portfolio} target="_blank" rel="noreferrer" className="block text-brand-400 hover:underline truncate">
                    Portfolio: {profile.portfolio}
                  </a>
                )}
                {!profile?.linkedin && !profile?.github && !profile?.portfolio && (
                  <p className="text-slate-500">No social links added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Academics, Skills, Projects */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Summary */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-brand-400" /> Academic Credentials
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Degree</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">{profile?.degree || 'B.Tech'}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Semester</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">Sem {profile?.currentSemester || 7}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">CGPA</p>
                  <p className="text-sm font-bold text-emerald-400 mt-1">{profile?.cgpa}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Backlogs</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">{profile?.backlogs ?? 0}</p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
                <Code className="w-4 h-4 text-brand-400" /> Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile?.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-medium">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">No skills added yet</p>
                )}
              </div>
            </div>

            {/* Projects */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-400" /> Projects
              </h3>
              {profile?.projects && profile.projects.length > 0 ? (
                <div className="space-y-4">
                  {profile.projects.map((proj, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                      <h4 className="font-semibold text-sm text-slate-100">{proj.title}</h4>
                      <p className="text-xs text-slate-400">{proj.description}</p>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No projects added yet</p>
              )}
            </div>

            {/* Active Resume */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-brand-400" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-100">Resume Status</h4>
                  <p className="text-xs text-slate-400">
                    {profile?.resumeUrl ? 'Active resume uploaded' : 'No resume uploaded yet'}
                  </p>
                </div>
              </div>
              <Link
                to="/student/resume"
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
              >
                Manage Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};
