import React from 'react';
import {
  Stethoscope,
  ShieldCheck,
  Award,
  HeartHandshake,
  MapPin,
  CheckCircle2,
  Users,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-xs text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200/60 uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Our Mission & Vision</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Transforming Healthcare Access in Gopalganj & Siwan
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            HELLO DOCTOR is an independent healthcare discovery and appointment facilitation network designed specifically for the communities of Gopalganj and Siwan in Bihar.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
              Rigorous Doctor Verification
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed">
              Every medical practitioner profile on our platform is cross-verified against official medical council registrations, post-graduate degrees, and verified physical clinic hours.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Building className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
              Hyper-Local District Focus
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed">
              Unlike generic national aggregators, our directory maps sub-division clinics, hospital landmarks in Thawe, Mirganj, Hathwa, Mairwa, and Maharajganj with exact contact desks.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
              Patient Transparency & Choice
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed">
              Transparent consultation fees, zero platform booking markups, direct clinic tokens, and authentic patient feedback to help families make informed medical decisions.
            </p>
          </div>
        </div>

        {/* Verification Standards Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-['Outfit',sans-serif]">
              Our Medical Verification Protocol
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              How we ensure high quality, verified healthcare across Saran division:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
            {[
              'Manual verification of State Medical Council / MCI registration numbers',
              'Inspection of recognized Medical degrees (MBBS, MD, MS, DNB, DM, MCh)',
              'Real-time physical clinic location verification with landmarks',
              'Clear distinction between OPD in-clinic consultations and teleconsultation channels',
              'Active patient moderation to ensure unbiased review authenticity',
              'Strict zero-fabrication standards for demo and real clinical listings',
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
