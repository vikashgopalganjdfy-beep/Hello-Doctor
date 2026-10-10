import React, { useState } from 'react';
import {
  Stethoscope,
  MapPin,
  Calendar,
  User,
  Shield,
  Menu,
  X,
  PhoneCall,
  Search,
  Building,
  HeartPulse,
  Sparkles,
  MessageSquare,
  ChevronDown,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { City, ViewState } from '../../types';

export const Navbar: React.FC = () => {
  const {
    currentView,
    navigateTo,
    cityFilter,
    setCityFilter,
    currentUser,
    logoutUser,
    openAuthModal,
    whatsAppSettings,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const handleCitySelect = (city: City) => {
    setCityFilter(city);
    setCityDropdownOpen(false);
    if (city === 'Gopalganj') {
      navigateTo('gopalganj');
    } else if (city === 'Siwan') {
      navigateTo('siwan');
    } else {
      navigateTo('doctors');
    }
  };

  const navLinks: { label: string; view: ViewState; highlight?: boolean }[] = [
    { label: 'Doctors', view: 'doctors' },
    { label: 'Gopalganj', view: 'gopalganj' },
    { label: 'Siwan', view: 'siwan' },
    { label: 'Specialities', view: 'specialities' },
    { label: 'Hospitals', view: 'hospitals' },
    { label: 'Clinics', view: 'clinics' },
    { label: 'Emergency 24/7', view: 'emergency', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Top Notice Bar */}
      <div className="bg-[#003B95] text-white text-[11px] font-semibold py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="truncate">
              Gopalganj & Siwan Official Doctor Portal • Instant WhatsApp Booking Available
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <a
              href={`https://wa.me/${(whatsAppSettings.phoneNumber || '+91 9007355062').replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors flex items-center gap-1 font-mono"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp: {whatsAppSettings.phoneNumber || '+91 9007355062'}</span>
            </a>

            <button
              onClick={() => navigateTo('doctor-register')}
              className="hover:text-teal-300 transition-colors font-bold cursor-pointer"
            >
              Doctor Registration
            </button>

            <button
              onClick={() => {
                if (currentUser?.role === 'admin') {
                  navigateTo('admin-dashboard');
                } else {
                  navigateTo('admin-login');
                }
              }}
              className="hover:text-teal-300 transition-colors font-bold text-amber-300 cursor-pointer flex items-center gap-1"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: [Brand title] — [Nav links] — [Actions] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Title (Single Text Element) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="text-left font-['Outfit',sans-serif] tracking-tight cursor-pointer"
          >
            <span className="text-xl sm:text-2xl font-black text-[#003B95] tracking-tight">
              HELLO<span className="text-[#00A3BF]">DOCTOR</span>
            </span>
          </button>

          {/* District Picker Pill */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full border border-slate-200 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0052CC]" />
              <span>{cityFilter === 'All' ? 'Gopalganj & Siwan' : `${cityFilter} District`}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {cityDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs font-bold">
                <button
                  onClick={() => handleCitySelect('All')}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 hover:text-[#0052CC] text-slate-700"
                >
                  All Districts (Both)
                </button>
                <button
                  onClick={() => handleCitySelect('Gopalganj')}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 hover:text-[#0052CC] text-slate-700 flex items-center justify-between"
                >
                  <span>Gopalganj</span>
                  <span className="text-[10px] bg-blue-100 text-[#0052CC] px-2 py-0.5 rounded-full">Hub</span>
                </button>
                <button
                  onClick={() => handleCitySelect('Siwan')}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 hover:text-[#0052CC] text-slate-700 flex items-center justify-between"
                >
                  <span>Siwan</span>
                  <span className="text-[10px] bg-blue-100 text-[#0052CC] px-2 py-0.5 rounded-full">Hub</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Zone 2: 4-6 Nav Links (Single line, single-word labels) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.label}
                onClick={() => navigateTo(link.view)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  link.highlight
                    ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                    : isActive
                    ? 'bg-blue-50 text-[#0052CC]'
                    : 'text-slate-600 hover:text-[#003B95] hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2.5">
          {/* WhatsApp Direct CTA */}
          <a
            href={`https://wa.me/${(whatsAppSettings.phoneNumber || '+91 9007355062').replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-full shadow-xs transition-colors whitespace-nowrap"
            title="Book appointments directly on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Booking</span>
          </a>

          {/* User Account / Login Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold text-slate-800 transition-colors cursor-pointer border border-slate-200"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <div className="font-bold text-slate-900 truncate">{currentUser.name}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold text-[#0052CC]">
                      {currentUser.role.toUpperCase()} {currentUser.adminRole ? `(${currentUser.adminRole})` : ''}
                    </div>
                  </div>

                  {currentUser.role === 'admin' ? (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigateTo('admin-dashboard');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 text-[#003B95] font-bold flex items-center gap-2"
                    >
                      <Shield className="w-3.5 h-3.5 text-[#0052CC]" />
                      <span>Admin Dashboard</span>
                    </button>
                  ) : currentUser.role === 'doctor' ? (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigateTo('doctor-dashboard');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 text-[#003B95] font-bold flex items-center gap-2"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-[#0052CC]" />
                      <span>Doctor Portal</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigateTo('patient-dashboard');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 text-[#003B95] font-bold flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-[#0052CC]" />
                      <span>My Appointments</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logoutUser();
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-rose-50 text-rose-600 font-bold flex items-center gap-2 border-t border-slate-100"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login', 'patient')}
              className="py-2 px-4 bg-[#0052CC] hover:bg-[#003B95] text-white text-xs font-bold rounded-full shadow-xs transition-colors whitespace-nowrap cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-600 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          {/* Mobile City Picker */}
          <div className="flex gap-2 pb-2 border-b border-slate-100">
            {(['All', 'Gopalganj', 'Siwan'] as City[]).map((city) => (
              <button
                key={city}
                onClick={() => {
                  handleCitySelect(city);
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-full border ${
                  cityFilter === city
                    ? 'bg-[#0052CC] text-white border-[#0052CC]'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                {city === 'All' ? 'All Districts' : city}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  navigateTo(link.view);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                  currentView === link.view
                    ? 'bg-blue-50 text-[#0052CC]'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`https://wa.me/${(whatsAppSettings.phoneNumber || '+91 9007355062').replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Book on WhatsApp ({whatsAppSettings.phoneNumber || '+91 9007355062'})</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  navigateTo('doctor-register');
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 bg-slate-100 text-slate-700 text-xs font-bold rounded-full"
              >
                Doctor Join
              </button>

              <button
                onClick={() => {
                  if (currentUser?.role === 'admin') {
                    navigateTo('admin-dashboard');
                  } else {
                    navigateTo('admin-login');
                  }
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 bg-slate-900 text-white text-xs font-bold rounded-full"
              >
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
