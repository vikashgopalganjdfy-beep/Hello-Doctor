import React, { useState } from 'react';
import {
  PhoneCall,
  MessageSquare,
  CalendarPlus,
  HeartPulse,
  X,
  ShieldAlert,
  ChevronUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickContactWidget: React.FC = () => {
  const { whatsAppSettings, openBookingModal, doctors, navigateTo } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const officialNumber = whatsAppSettings.phoneNumber || '+91 9007355062';
  const cleanNumber = officialNumber.replace(/\D/g, '');

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Contact Popover */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-3xl p-4 shadow-2xl border border-slate-200/90 animate-in fade-in slide-in-from-bottom-4 duration-200 text-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                <HeartPulse className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  Fast Medical Assistance
                </h4>
                <p className="text-[10px] text-slate-500">Gopalganj & Siwan Direct Helpline</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {/* Direct WhatsApp Call/Chat */}
            <a
              href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                'Hello! I need an urgent doctor appointment in Gopalganj/Siwan. Please share available doctors and booking assistance.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 bg-emerald-50 hover:bg-emerald-100/80 rounded-2xl border border-emerald-200/80 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-emerald-950 text-xs">WhatsApp Direct Booking</div>
                  <div className="text-[10px] text-emerald-700 font-mono">{officialNumber}</div>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded-full">
                Instant
              </span>
            </a>

            {/* Direct Emergency Call */}
            <a
              href={`tel:${officialNumber}`}
              className="flex items-center justify-between p-2.5 bg-rose-50 hover:bg-rose-100/80 rounded-2xl border border-rose-200/80 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-rose-950 text-xs">Call Helpline 24/7</div>
                  <div className="text-[10px] text-rose-700 font-mono">{officialNumber}</div>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-rose-700 bg-rose-200/60 px-2 py-0.5 rounded-full">
                24/7
              </span>
            </a>

            {/* Instant OPD Booking */}
            <button
              onClick={() => {
                setIsOpen(false);
                if (doctors.length > 0) openBookingModal(doctors[0]);
              }}
              className="w-full flex items-center justify-between p-2.5 bg-blue-50 hover:bg-blue-100/80 rounded-2xl border border-blue-200/80 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0052CC] text-white flex items-center justify-center shadow-xs">
                  <CalendarPlus className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#003B95] text-xs">Book OPD Token</div>
                  <div className="text-[10px] text-blue-600">Select Doctor & Time Slot</div>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-[#0052CC] bg-blue-200/60 px-2 py-0.5 rounded-full">
                OPD
              </span>
            </button>

            {/* Emergency Ambulance Page */}
            <button
              onClick={() => {
                setIsOpen(false);
                navigateTo('emergency');
              }}
              className="w-full text-center py-2 text-[11px] font-bold text-slate-600 hover:text-slate-900 border-t border-slate-100 mt-1 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
              <span>View Sadar Hospital & Ambulance Directory</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Sticky Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-full text-white font-extrabold text-xs shadow-2xl transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'bg-slate-900 hover:bg-slate-800'
            : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 ring-4 ring-red-500/20'
        }`}
        aria-label="Quick Emergency & WhatsApp Contact"
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4" />
            <span>Close Help</span>
          </>
        ) : (
          <>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <PhoneCall className="w-4 h-4" />
            <span className="font-['Outfit',sans-serif] tracking-wide">Quick Appointment / 24x7</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  );
};
