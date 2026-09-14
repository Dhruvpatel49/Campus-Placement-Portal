import React, { useEffect, useState } from 'react';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { ApplicationCard } from '../../components/application/ApplicationCard';
import { StatusTimeline } from '../../components/application/StatusTimeline';
import { applicationService } from '../../services/application.service';
import { FileCheck, SearchX, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const fetchApplications = async () => {
    try {
      const res = await applicationService.getStudentApplications({ status: statusFilter });
      if (res && res.data) {
        setApplications(res.data.applications || []);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load submitted applications');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (id) => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) return;
    try {
      const res = await applicationService.withdrawApplication(id);
      toast.success(res.message || 'Application withdrawn successfully');
      fetchApplications();
    } catch (err) {
      toast.error(err.message || 'Failed to withdraw application');
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-brand-400" /> My Job Applications
          </h1>
          <p className="text-xs text-slate-400">
            Track real-time status and recruitment progress for your submitted placement drives.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-4">
          {['all', 'applied', 'under_review', 'shortlisted', 'selected', 'rejected', 'withdrawn'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition ${
                statusFilter === st
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Applications Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-48 text-slate-400">
            <span className="animate-pulse font-medium text-sm">Loading Applications...</span>
          </div>
        ) : applications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <ApplicationCard
                key={app._id}
                application={app}
                onWithdraw={handleWithdraw}
                onViewTimeline={(application) => setSelectedApp(application)}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
            <SearchX className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-semibold text-slate-200">No Applications Submitted</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven't submitted any placement drive applications under this filter. Browse active jobs to get started.
            </p>
          </div>
        )}

        {/* Timeline Drawer Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card p-6 rounded-3xl border border-slate-800 bg-slate-900 max-w-md w-full space-y-6 relative">
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 absolute right-5 top-5 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-50">{selectedApp.jobId?.title}</h3>
                <p className="text-xs text-brand-400 font-medium">{selectedApp.jobId?.companyId?.name}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Application Timeline Log</h4>
                <StatusTimeline timeline={selectedApp.timeline} />
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};
