import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';

export const Forbidden = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="glass-card p-10 rounded-3xl border border-slate-800 bg-slate-900/80 max-w-md w-full text-center space-y-6 shadow-2xl">
        <div className="p-4 rounded-full bg-rose-500/10 text-rose-400 w-fit mx-auto border border-rose-500/20">
          <ShieldAlert className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-50">403</h1>
          <h2 className="text-lg font-semibold text-rose-400">Access Restricted</h2>
          <p className="text-xs text-slate-400">
            You do not have the necessary permissions or role clearance to view this platform area.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 transition"
        >
          <Home className="w-4 h-4" /> Return to Dashboard
        </Link>
      </div>
    </div>
  );
};
