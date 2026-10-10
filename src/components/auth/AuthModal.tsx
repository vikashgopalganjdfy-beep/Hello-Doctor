import React, { useState } from 'react';
import { X, Lock, Mail, User, Stethoscope, ArrowRight, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    authModalRole,
    loginUser,
    navigateTo,
    showToast,
  } = useApp();

  if (!isAuthModalOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [role, setRole] = useState<UserRole>(authModalRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 94310 00000');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (role === 'admin') {
      if (password.trim() !== '9007355062') {
        setErrorMsg('Invalid Admin Password. Please enter the correct security password.');
        showToast('Invalid Admin Password!', 'error');
        return;
      }
      loginUser('admin', 'admin@hellodoctor.com', 'System Administrator', 'Super Admin');
      closeAuthModal();
      navigateTo('admin-dashboard');
      showToast('Admin access granted!', 'success');
      return;
    }

    if (mode === 'login') {
      const userEmail = email || (role === 'doctor' ? 'doctor@hellodoctor.com' : 'patient@example.com');
      const userName = role === 'doctor' ? 'Dr. Medical Practitioner' : 'Registered Patient';
      loginUser(role, userEmail, userName);
      closeAuthModal();
      if (role === 'doctor') navigateTo('doctor-dashboard');
      else navigateTo('patient-dashboard');
    } else {
      const userEmail = email || 'user@example.com';
      const userName = name || 'New Registered User';
      loginUser(role, userEmail, userName);
      closeAuthModal();
      if (role === 'doctor') navigateTo('doctor-dashboard');
      else navigateTo('patient-dashboard');
    }
  };

  const fillDemo = (fillRole: UserRole) => {
    setRole(fillRole);
    setErrorMsg('');
    if (fillRole === 'patient') {
      setEmail('patient@example.com');
      setName('Patient Demo');
      setPassword('demo1234');
    } else if (fillRole === 'doctor') {
      setEmail('doctor@hellodoctor.com');
      setName('Dr. Rajeev Kumar');
      setPassword('demo1234');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 relative">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            {role === 'admin' ? 'Admin Verification' : mode === 'login' ? 'Sign In to Portal' : 'Create Account'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">HELLO DOCTOR • Gopalganj & Siwan</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
          {[
            { id: 'patient', label: 'Patient' },
            { id: 'doctor', label: 'Doctor' },
            { id: 'admin', label: 'Admin' },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setRole(r.id as UserRole);
                setErrorMsg('');
                if (r.id === 'admin') {
                  setMode('login');
                  setPassword('');
                }
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                role === r.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Quick Demo Credentials Autofill for Patients and Doctors only */}
        {role !== 'admin' && (
          <div className="mb-4 p-2.5 bg-sky-50 rounded-xl border border-sky-200/80">
            <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider mb-1.5">
              One-Click Demo Access:
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillDemo('patient')}
                className="flex-1 py-1 bg-white hover:bg-sky-100 text-sky-800 text-xs font-bold rounded-lg border border-sky-200 transition-colors cursor-pointer"
              >
                👤 Patient Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemo('doctor')}
                className="flex-1 py-1 bg-white hover:bg-sky-100 text-sky-800 text-xs font-bold rounded-lg border border-sky-200 transition-colors cursor-pointer"
              >
                🩺 Doctor Demo
              </button>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && role !== 'admin' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          )}

          {role !== 'admin' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              {role === 'admin' ? 'Admin Password' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder={role === 'admin' ? 'Enter admin password' : '••••••••'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{role === 'admin' ? 'Verify Admin Access' : mode === 'login' ? `Login as ${role.toUpperCase()}` : 'Register Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Mode */}
        {role !== 'admin' && (
          <div className="mt-5 text-center text-xs text-slate-600">
            {mode === 'login' ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-sky-600 font-bold hover:underline cursor-pointer"
                >
                  Register Here
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-sky-600 font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
