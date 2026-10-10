import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const bgStyles =
    toast.type === 'success'
      ? 'bg-slate-900 text-white border-emerald-500/50'
      : toast.type === 'error'
      ? 'bg-rose-900 text-white border-rose-500/50'
      : 'bg-slate-900 text-white border-sky-500/50';

  const icon =
    toast.type === 'success' ? (
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
    ) : toast.type === 'error' ? (
      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
    ) : (
      <Info className="w-5 h-5 text-sky-400 shrink-0" />
    );

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl ${bgStyles}`}
      >
        {icon}
        <span className="text-sm font-medium pr-2">{toast.text}</span>
      </div>
    </div>
  );
};
