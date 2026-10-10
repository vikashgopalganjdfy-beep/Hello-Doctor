import React from 'react';
import {
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  MessageSquare,
  Building,
  Ambulance,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo, setCityFilter, setSpecialityFilter, whatsAppSettings, websiteSettings } = useApp();

  const quickSpecialities = [
    { name: 'Cardiology (Heart)', id: 'cardiology' },
    { name: 'Gynecology & Maternity', id: 'gynecology' },
    { name: 'Orthopedics (Bone & Joint)', id: 'orthopedics' },
    { name: 'Pediatrics (Child Care)', id: 'pediatrics' },
    { name: 'Neurology (Brain & Spine)', id: 'neurology' },
    { name: 'General Medicine', id: 'general-medicine' },
    { name: 'Dermatology (Skin)', id: 'dermatology' },
    { name: 'Dentistry', id: 'dentistry' },
  ];

  return (
    <footer className="bg-[#001D4A] text-slate-300 border-t border-blue-950/60 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top 4-Column Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Official Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
                HELLO<span className="text-[#00A3BF]">DOCTOR</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              The premier doctor discovery and appointment booking network for <strong>Gopalganj & Siwan</strong>, Bihar. Connecting patients with verified medical practitioners, diagnostics, and 24/7 casualty trauma centers.
            </p>

            {/* Official WhatsApp Quick Action Box */}
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <MessageSquare className="w-4 h-4" />
                <span>Official WhatsApp Booking Helpline</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Book appointment tokens directly on WhatsApp with pre-filled slips.
              </p>
              <a
                href={`https://wa.me/${(whatsAppSettings.phoneNumber || '+91 9007355062').replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-full transition-colors font-mono"
              >
                <span>{whatsAppSettings.phoneNumber || '+91 9007355062'}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Gopalganj & Siwan Quick Navigation */}
          <div className="space-y-3 text-xs">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs">
              Districts & Locations
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCityFilter('Gopalganj');
                    navigateTo('gopalganj');
                  }}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Gopalganj District Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCityFilter('Siwan');
                    navigateTo('siwan');
                  }}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Siwan District Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('hospitals')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Hospitals in Gopalganj & Siwan
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('clinics')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Clinics & Polyclinics
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('emergency')}
                  className="text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Ambulance className="w-3.5 h-3.5" />
                  <span>24/7 Casualty & Blood Banks</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Specialities */}
          <div className="space-y-3 text-xs">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs">
              Top Specialities
            </h4>
            <ul className="space-y-2">
              {quickSpecialities.map((spec) => (
                <li key={spec.id}>
                  <button
                    onClick={() => {
                      setSpecialityFilter(spec.id);
                      navigateTo('doctors');
                    }}
                    className="hover:text-teal-300 transition-colors cursor-pointer"
                  >
                    {spec.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: For Doctors & Portal Management */}
          <div className="space-y-3 text-xs">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs">
              Practitioners & Admin
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('doctor-register')}
                  className="text-teal-400 hover:text-teal-300 font-bold transition-colors cursor-pointer"
                >
                  + Register as a Doctor
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('doctor-dashboard')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Doctor OPD Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('patient-dashboard')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Patient Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('health-packages')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Diagnostic Health Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  FAQs & Token Help
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin-login')}
                  className="text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
                >
                  Admin Control Panel
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 HELLO DOCTOR — Gopalganj & Siwan Healthcare Platform. All rights reserved.
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => navigateTo('privacy-policy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => navigateTo('medical-disclaimer')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Medical Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
