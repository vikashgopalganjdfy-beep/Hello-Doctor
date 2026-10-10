import React from 'react';
import { Home, Users, CalendarPlus, FileText, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { currentView, navigateTo, openBookingModal, doctors, currentUser, openAuthModal } = useApp();

  const items = [
    { label: 'Home', view: 'home' as const, icon: Home },
    { label: 'Doctors', view: 'doctors' as const, icon: Users },
    { label: 'Book', isAction: true, icon: CalendarPlus },
    { label: 'Packages', view: 'health-packages' as const, icon: FileText },
    { label: 'Profile', isUser: true, icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-5 items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = !item.isAction && currentView === item.view;

          if (item.isAction) {
            return (
              <button
                key={item.label}
                onClick={() => openBookingModal(doctors[0])}
                className="flex flex-col items-center justify-center -mt-4 group focus:outline-none"
              >
                <div className="w-11 h-11 rounded-full bg-sky-600 group-hover:bg-sky-700 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 transition-transform active:scale-95">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-sky-700 mt-0.5 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          }

          if (item.isUser) {
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (currentUser) {
                    if (currentUser.role === 'doctor') navigateTo('doctor-dashboard');
                    else if (currentUser.role === 'admin') navigateTo('admin-dashboard');
                    else navigateTo('patient-dashboard');
                  } else {
                    openAuthModal('login', 'patient');
                  }
                }}
                className={`flex flex-col items-center justify-center py-1 rounded-lg transition-colors ${
                  currentView.includes('dashboard') ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] mt-0.5 font-medium whitespace-nowrap">
                  {currentUser ? 'Account' : 'Login'}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => navigateTo(item.view!)}
              className={`flex flex-col items-center justify-center py-1 rounded-lg transition-colors ${
                isActive ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 font-medium whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
