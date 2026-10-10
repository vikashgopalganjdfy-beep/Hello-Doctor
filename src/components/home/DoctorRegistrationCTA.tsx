import React from 'react';
import { Stethoscope, UserCheck, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorRegistrationCTA: React.FC = () => {
  const { navigateTo, openAuthModal } = useApp();

  return (
    <section className="py-16 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#003B95] via-[#002D72] to-[#001D4A] p-8 sm:p-12 text-white overflow-hidden shadow-2xl">
          {/* Subtle background decoration */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#00A3BF]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Stethoscope className="w-4 h-4" />
                <span>Doctor Onboarding Portal</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
                Are You a Medical Practitioner in Gopalganj or Siwan?
              </h2>

              <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl">
                Join Hello Doctor to expand your digital OPD presence, manage patient appointment schedules seamlessly, conduct secure video teleconsultations, and build verified credibility in North Bihar.
              </p>

              {/* Badges list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Profile Verification</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-100">
                  <Award className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>Smart OPD Queue Control</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-100">
                  <UserCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Direct Patient Connection</span>
                </div>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => navigateTo('doctor-register')}
                className="w-full py-3.5 px-6 bg-white hover:bg-slate-50 active:bg-slate-100 text-[#003B95] font-extrabold text-sm rounded-full shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Register as a Doctor</span>
                <ArrowRight className="w-4 h-4 text-[#0052CC]" />
              </button>

              <button
                onClick={() => openAuthModal('login', 'doctor')}
                className="w-full py-3.5 px-6 border-2 border-white/80 hover:bg-white/10 text-white font-bold text-xs sm:text-sm rounded-full transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Already Registered? Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
