import React, { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  Menu,
  X,
  MapPin,
  Sparkles,
  Stethoscope,
  Building2,
  Package,
  BookOpen,
  PhoneCall,
  ShieldCheck,
  User,
  HeartHandshake,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    openAuthModal,
    currentUser,
    openBookingModal,
    doctors,
    setCityFilter,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const handleBookClick = () => {
    // Open appointment booking with top featured doctor if none selected
    const doc = doctors[0];
    openBookingModal(doc);
  };

  const navItems = [
    { label: 'Home', view: 'home' as const },
    { label: 'Find Doctors', view: 'doctors' as const },
    { label: 'Specialities', view: 'specialities' as const },
    { label: 'Hospitals', view: 'hospitals' as const },
    { label: 'Gopalganj', view: 'location-gopalganj' as const, city: 'Gopalganj' as const },
    { label: 'Siwan', view: 'location-siwan' as const, city: 'Siwan' as const },
  ];

  const moreItems = [
    { label: 'Health Packages', view: 'health-packages' as const, icon: Package },
    { label: 'Health Articles', view: 'articles' as const, icon: BookOpen },
    { label: 'Emergency Care', view: 'emergency' as const, icon: PhoneCall },
    { label: 'Doctor Registration', view: 'doctor-register' as const, icon: Stethoscope },
    { label: 'About Us', view: 'about' as const, icon: HeartHandshake },
    { label: 'Contact', view: 'contact' as const, icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* ZONE 1: BRAND TITLE (One Line) */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052CC] rounded-lg group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0052CC] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="relative">
                <Stethoscope className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white"></span>
              </div>
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-[#003B95] flex items-center gap-1.5 font-['Outfit',sans-serif]">
                <span>HELLO DOCTOR</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#0052CC] bg-blue-50 border border-blue-200/70 px-1.5 py-0.5 rounded-sm">
                  Gopalganj & Siwan
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Trusted Healthcare Network
              </p>
            </div>
          </button>

          {/* ZONE 2: 4-6 NAV LINKS (1-2 word labels, single-line) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive =
                currentView === item.view ||
                (item.city && currentView === `location-${item.city.toLowerCase()}`);
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.city) setCityFilter(item.city);
                    navigateTo(item.view);
                  }}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    isActive
                      ? 'text-[#0052CC] bg-blue-50 font-bold'
                      : 'text-slate-600 hover:text-[#0052CC] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                onBlur={() => setTimeout(() => setIsMoreMenuOpen(false), 200)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:text-[#0052CC] hover:bg-slate-50 rounded-lg whitespace-nowrap shrink-0 transition-colors"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-150 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {moreItems.map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.label}
                        onClick={() => {
                          setIsMoreMenuOpen(false);
                          navigateTo(m.view);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0052CC] font-medium text-left transition-colors"
                      >
                        <Icon className="w-4 h-4 text-[#0052CC] shrink-0" />
                        <span className="whitespace-nowrap">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* ZONE 3: 1-2 PRIMARY ACTIONS */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <button
                onClick={() => {
                  if (currentUser.role === 'doctor') navigateTo('doctor-dashboard');
                  else if (currentUser.role === 'admin') navigateTo('admin-dashboard');
                  else navigateTo('patient-dashboard');
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg whitespace-nowrap shrink-0 transition-colors border border-slate-200"
              >
                <User className="w-4 h-4 text-[#0052CC]" />
                <span className="whitespace-nowrap">Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login', 'patient')}
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#0052CC] hover:bg-blue-50/80 rounded-lg whitespace-nowrap shrink-0 transition-colors"
              >
                Sign In
              </button>
            )}

            <button
              onClick={handleBookClick}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0052CC] hover:bg-[#003B95] active:bg-[#002D72] text-white text-sm font-bold rounded-full shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Hamburger toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleBookClick}
              className="sm:hidden px-3.5 py-1.5 bg-[#0052CC] text-white text-xs font-bold rounded-full whitespace-nowrap shadow-xs"
            >
              Book
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0052CC] hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => {
                setCityFilter('Gopalganj');
                navigateTo('location-gopalganj');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-sky-50 text-sky-800 text-xs font-bold rounded-lg border border-sky-200"
            >
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>Gopalganj Care</span>
            </button>
            <button
              onClick={() => {
                setCityFilter('Siwan');
                navigateTo('location-siwan');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-50 text-indigo-800 text-xs font-bold rounded-lg border border-indigo-200"
            >
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>Siwan Care</span>
            </button>
          </div>

          <div className="space-y-1">
            {[...navItems, ...moreItems].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if ('city' in item && item.city) setCityFilter(item.city);
                  navigateTo(item.view);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-sky-50 hover:text-sky-700 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-slate-400 text-xs">→</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={() => {
                  if (currentUser.role === 'doctor') navigateTo('doctor-dashboard');
                  else if (currentUser.role === 'admin') navigateTo('admin-dashboard');
                  else navigateTo('patient-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-slate-100 text-slate-800 text-sm font-bold rounded-lg text-center"
              >
                Go to {currentUser.role.toUpperCase()} Dashboard
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    openAuthModal('login', 'patient');
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-2.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openAuthModal('register', 'patient');
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-2.5 bg-sky-100 text-sky-800 text-xs font-bold rounded-lg text-center"
                >
                  Register
                </button>
              </div>
            )}

            <button
              onClick={() => {
                handleBookClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#0052CC] hover:bg-[#003B95] text-white font-bold text-sm rounded-full shadow-sm text-center"
            >
              Book Appointment Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
