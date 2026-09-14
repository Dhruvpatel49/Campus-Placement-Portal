import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

import { LandingPage } from './pages/common/LandingPage';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { NotFound } from './pages/error/NotFound';
import { Forbidden } from './pages/error/Forbidden';

import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfile } from './pages/student/StudentProfile';
import { EditStudentProfile } from './pages/student/EditStudentProfile';
import { StudentResume } from './pages/student/StudentResume';
import { StudentSettings } from './pages/student/StudentSettings';
import { StudentJobs } from './pages/student/StudentJobs';
import { JobDetails } from './pages/student/JobDetails';
import { StudentApplications } from './pages/student/StudentApplications';

import { RecruiterDashboard } from './pages/recruiter/RecruiterDashboard';
import { RecruiterProfile } from './pages/recruiter/RecruiterProfile';
import { EditRecruiterProfile } from './pages/recruiter/EditRecruiterProfile';
import { RecruiterSettings } from './pages/recruiter/RecruiterSettings';
import { RecruiterJobs } from './pages/recruiter/RecruiterJobs';
import { CreateJob } from './pages/recruiter/CreateJob';
import { EditJob } from './pages/recruiter/EditJob';
import { RecruiterApplicants } from './pages/recruiter/RecruiterApplicants';

import { CompanyDashboard } from './pages/company/CompanyDashboard';
import { CompanyProfile } from './pages/company/CompanyProfile';
import { EditCompanyProfile } from './pages/company/EditCompanyProfile';
import { CompanySettings } from './pages/company/CompanySettings';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminRecruiters } from './pages/admin/AdminRecruiters';
import { AdminCompanies } from './pages/admin/AdminCompanies';
import { AdminJobs } from './pages/admin/AdminJobs';
import { AdminApplications } from './pages/admin/AdminApplications';
import { NotificationsPage } from './pages/notifications/NotificationsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const ProtectedStudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium text-sm">
        Authenticating session...
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'recruiter' || user.role === 'company') {
    return <Navigate to="/recruiter/dashboard" replace />;
  }
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

const ProtectedRecruiterRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium text-sm">
        Authenticating session...
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'student') {
    return <Navigate to="/student/dashboard" replace />;
  }
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium text-sm">
        Authenticating session...
      </div>
    );
  }
  if (!user || user.role !== 'admin') return <Navigate to="/403" replace />;
  return children;
};

const ProtectedUserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium text-sm">
        Authenticating session...
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <BrowserRouter>
          <Routes>
            {/* Landing & Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/403" element={<Forbidden />} />

            {/* Notifications Feed */}
            <Route
              path="/notifications"
              element={
                <ProtectedUserRoute>
                  <NotificationsPage />
                </ProtectedUserRoute>
              }
            />

            {/* Student Module Protected Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedStudentRoute>
                  <StudentDashboard />
                </ProtectedStudentRoute>
              }
            />
            <Route
              path="/student/jobs"
              element={
                <ProtectedStudentRoute>
                  <StudentJobs />
                </ProtectedStudentRoute>
              }
            />
            <Route
              path="/student/jobs/:id"
              element={
                <ProtectedStudentRoute>
                  <JobDetails />
                </ProtectedStudentRoute>
              }
            />
            <Route
              path="/student/applications"
              element={
                <ProtectedStudentRoute>
                  <StudentApplications />
                </ProtectedStudentRoute>
              }
            />
            <Route
              path="/student/profile"
              element={
                <ProtectedStudentRoute>
                  <StudentProfile />
                </ProtectedStudentRoute>
              }
            />
            <Route
              path="/student/edit-profile"
              element={
                <ProtectedStudentRoute>
                  <EditStudentProfile />
                </ProtectedStudentRoute>
              }
            />
            <Route
              path="/student/resume"
              element={
                <ProtectedStudentRoute>
                  <StudentResume />
                </ProtectedStudentRoute>
              }
            />
            <Route
              path="/student/settings"
              element={
                <ProtectedStudentRoute>
                  <StudentSettings />
                </ProtectedStudentRoute>
              }
            />

            {/* Recruiter Module Protected Routes */}
            <Route
              path="/recruiter/dashboard"
              element={
                <ProtectedRecruiterRoute>
                  <RecruiterDashboard />
                </ProtectedRecruiterRoute>
              }
            />
            <Route
              path="/recruiter/applicants"
              element={
                <ProtectedRecruiterRoute>
                  <RecruiterApplicants />
                </ProtectedRecruiterRoute>
              }
            />
            <Route
              path="/recruiter/jobs"
              element={
                <ProtectedRecruiterRoute>
                  <RecruiterJobs />
                </ProtectedRecruiterRoute>
              }
            />
            <Route
              path="/recruiter/jobs/create"
              element={
                <ProtectedRecruiterRoute>
                  <CreateJob />
                </ProtectedRecruiterRoute>
              }
            />
            <Route
              path="/recruiter/jobs/edit/:id"
              element={
                <ProtectedRecruiterRoute>
                  <EditJob />
                </ProtectedRecruiterRoute>
              }
            />
            <Route
              path="/recruiter/profile"
              element={
                <ProtectedRecruiterRoute>
                  <RecruiterProfile />
                </ProtectedRecruiterRoute>
              }
            />
            <Route
              path="/recruiter/edit-profile"
              element={
                <ProtectedRecruiterRoute>
                  <EditRecruiterProfile />
                </ProtectedRecruiterRoute>
              }
            />
            <Route
              path="/recruiter/settings"
              element={
                <ProtectedRecruiterRoute>
                  <RecruiterSettings />
                </ProtectedRecruiterRoute>
              }
            />

            {/* Company Module Protected Routes */}
            <Route
              path="/recruiter/company"
              element={
                <ProtectedRecruiterRoute>
                  <CompanyDashboard />
                </ProtectedRecruiterRoute>
              }
            />
            <Route
              path="/recruiter/company/profile"
              element={
                <ProtectedRecruiterRoute>
                  <CompanyProfile />
                </ProtectedRecruiterRoute>
              }
            />
            <Route
              path="/recruiter/company/edit"
              element={
                <ProtectedRecruiterRoute>
                  <EditCompanyProfile />
                </ProtectedRecruiterRoute>
              }
            />
            <Route
              path="/recruiter/company/settings"
              element={
                <ProtectedRecruiterRoute>
                  <CompanySettings />
                </ProtectedRecruiterRoute>
              }
            />

            {/* Admin Module Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedAdminRoute>
                  <AdminUsers />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/recruiters"
              element={
                <ProtectedAdminRoute>
                  <AdminRecruiters />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/companies"
              element={
                <ProtectedAdminRoute>
                  <AdminCompanies />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/jobs"
              element={
                <ProtectedAdminRoute>
                  <AdminJobs />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/applications"
              element={
                <ProtectedAdminRoute>
                  <AdminApplications />
                </ProtectedAdminRoute>
              }
            />

            {/* Fallback 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
