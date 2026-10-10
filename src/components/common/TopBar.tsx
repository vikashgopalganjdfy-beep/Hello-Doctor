import React from 'react';
import { Phone, AlertCircle, MapPin, ShieldCheck, User, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TopBar: React.FC = () => {
  const { cityFilter, setCityFilter, navigateTo, currentUser, openAuthModal, logoutUser } = useApp();

  return (
    <div className="bg-[#003B95] text-white text-xs font-semibold py-2 px-4 border-b border-blue-900/40 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Emergency & Contact info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-red-300 font-bold">
            <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
            <span className="whitespace-nowrap">24/7 Emergency Helpline:</span>
            <span className="text-white font-bold tracking-wide">108 / 102</span>
          </div>

          <div className="flex items-center gap-1.5 text-blue-100">
            <Phone className="w-3.5 h-3.5 text-teal-300" />
            <span className="whitespace-nowrap">Local Healthcare Support:</span>
            <span className="text-white font-semibold">+91 6156-224000</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">100% Verified Specialists</span>
          </div>
        </div>

        {/* Right: Quick City Switcher & User Account State */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-blue-900/60 px-2.5 py-1 rounded-md border border-blue-800/60">
            <MapPin className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-blue-200 whitespace-nowrap">Region:</span>
            <select
              value={cityFilter}
              onChange={(e) => {
                const val = e.target.value as any;
                setCityFilter(val);
                if (val === 'Gopalganj') navigateTo('location-gopalganj');
                else if (val === 'Siwan') navigateTo('location-siwan');
              }}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="All" className="bg-[#003B95] text-white">Gopalganj & Siwan (All)</option>
              <option value="Gopalganj" className="bg-[#003B95] text-white">Gopalganj District</option>
              <option value="Siwan" className="bg-[#003B95] text-white">Siwan District</option>
            </select>
          </div>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (currentUser.role === 'doctor') navigateTo('doctor-dashboard');
                  else if (currentUser.role === 'admin') navigateTo('admin-dashboard');
                  else navigateTo('patient-dashboard');
                }}
                className="flex items-center gap-1.5 text-teal-200 hover:text-white font-semibold whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5" />
                <span className="truncate max-w-[130px]">{currentUser.name}</span>
                <span className="bg-blue-800 text-teal-100 text-[10px] px-1.5 py-0.5 rounded border border-blue-700 uppercase font-bold">
                  {currentUser.role}
                </span>
              </button>
              <button
                onClick={logoutUser}
                title="Logout"
                className="text-blue-200 hover:text-red-300 p-0.5"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => openAuthModal('login', 'patient')}
                className="text-blue-100 hover:text-white font-semibold whitespace-nowrap cursor-pointer"
              >
                Patient Login
              </button>
              <span className="text-blue-300/60">|</span>
              <button
                onClick={() => navigateTo('doctor-register')}
                className="text-amber-300 hover:text-amber-200 font-bold whitespace-nowrap cursor-pointer"
              >
                Doctor Portal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
