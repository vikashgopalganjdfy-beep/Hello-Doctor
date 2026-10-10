import React from 'react';
import { Phone, AlertCircle, ShieldAlert, HeartPulse, MapPin, ArrowRight, Ambulance } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmergencySection: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-14 bg-gradient-to-r from-[#003B95] via-[#002D72] to-[#001D4A] text-white relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#FF4F4F]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 top-0 w-64 h-64 bg-[#00A3BF]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Emergency Alert & Information */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF4F4F]/20 text-red-200 text-xs font-bold border border-[#FF4F4F]/40">
                <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
                <span>24/7 Critical Response Unit</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
                Need Emergency Medical Care?
              </h2>

              <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-xl">
                Get immediate access to 24/7 emergency casualty departments, ICU trauma facilities, and ambulance services across Gopalganj and Siwan districts.
              </p>

              {/* Quick helpline box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-[#002255]/90 p-4 rounded-2xl border border-blue-900/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF4F4F]/20 text-[#FF4F4F] flex items-center justify-center font-bold shrink-0">
                    <Ambulance className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-[11px] text-blue-200 uppercase font-semibold">National Ambulance</div>
                    <div className="text-base font-extrabold text-white">Dial 108 / 102</div>
                  </div>
                </div>

                <div className="bg-[#002255]/90 p-4 rounded-2xl border border-blue-900/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00A3BF]/20 text-[#00A3BF] flex items-center justify-center font-bold shrink-0">
                    <HeartPulse className="w-5 h-5 text-[#00A3BF]" />
                  </div>
                  <div>
                    <div className="text-[11px] text-blue-200 uppercase font-semibold">District Trauma Desks</div>
                    <div className="text-base font-extrabold text-white">+91 6156-224000</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons & Rapid Hospital Directory */}
            <div className="lg:col-span-5 bg-[#002255]/90 p-6 rounded-3xl border border-blue-900/80 space-y-4 shadow-xl">
              <div className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                Emergency Facilities on Call
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-blue-950/70 rounded-xl border border-blue-900/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Sadar Hospital Gopalganj (Casualty)</div>
                    <div className="text-blue-200 text-[11px]">Hospital Road • 24/7 ICU & Blood Bank</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                    Open 24x7
                  </span>
                </div>

                <div className="p-3 bg-blue-950/70 rounded-xl border border-blue-900/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Sadar Hospital Siwan (Casualty)</div>
                    <div className="text-blue-200 text-[11px]">Hospital Road • Trauma & Surgery Unit</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                    Open 24x7
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={() => navigateTo('emergency')}
                  className="flex-1 py-3 px-4 bg-[#FF4F4F] hover:bg-red-600 active:bg-red-700 text-white font-bold text-xs rounded-full shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Find Emergency Hospital</span>
                </button>

                <a
                  href="tel:108"
                  className="py-3 px-5 bg-white hover:bg-slate-100 text-[#FF4F4F] font-bold text-xs rounded-full shadow-md transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#FF4F4F]" />
                  <span>Call 108 Emergency</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
