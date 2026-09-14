import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

export const StatusTimeline = ({ timeline = [] }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
      {timeline.map((item, idx) => (
        <div key={idx} className="flex items-start gap-4 relative z-10">
          <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-brand-500 flex items-center justify-center text-brand-400 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div className="space-y-0.5 pt-0.5">
            <p className="text-xs font-semibold text-slate-100 uppercase tracking-wider">
              {item.status.replace('_', ' ')}
            </p>
            {item.note && <p className="text-[11px] text-slate-400">{item.note}</p>}
            <p className="text-[10px] text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {new Date(item.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
