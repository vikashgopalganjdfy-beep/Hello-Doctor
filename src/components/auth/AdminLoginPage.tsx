import React, { useState } from 'react';
import { Shield, Lock, ArrowRight, ChevronLeft, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminLoginPage: React.FC = () => {
  const { loginUser, navigateTo, showToast } = useApp();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!password.trim()) {
      setErrorMsg('Please enter the admin password');
      showToast('Please enter the admin password', 'error');
      return;
    }

    setIsLoading(true);

    // Verify secret Admin Password
    if (password.trim() === '9007355062') {
      loginUser('admin', 'admin@hellodoctor.com', 'System Administrator', 'Super Admin');
      navigateTo('admin-dashboard');
      showToast('Admin access verified successfully!', 'success');
    } else {
      setIsLoading(false);
      setErrorMsg('Incorrect admin password. Access denied.');
      showToast('Incorrect admin password!', 'error');
    }
  };

  return (
    <div className="bg-[#0F172A] min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1E293B] rounded-3xl p-8 border border-slate-700/80 shadow-2xl space-y-6 text-slate-100 relative">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto">
            <Shield className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
            Admin Control Panel
          </h1>
          <p className="text-xs text-slate-400">
            Protected area for Hello Doctor Gopalganj & Siwan
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2 text-rose-300 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Enter Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter password"
                autoFocus
                className="w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isLoading ? 'Verifying...' : 'Authenticate & Enter Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
