import React, { useState } from 'react';
import {
  Phone,
  AlertCircle,
  ShieldAlert,
  HeartPulse,
  MapPin,
  Ambulance,
  Droplets,
  HelpCircle,
  Clock,
  Building2,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmergencyPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeFirstAid, setActiveFirstAid] = useState<number | null>(0);

  const emergencyHospitals = [
    {
      name: 'Sadar District Hospital Casualty (Gopalganj)',
      city: 'Gopalganj',
      address: 'Hospital Road, Gopalganj, Bihar 841428',
      phone: '+91 6156-224000',
      services: ['24x7 Emergency Casualty', 'ICU on standby', 'Blood Storage Center', 'Ambulance Station'],
    },
    {
      name: 'Sadar District Hospital Casualty (Siwan)',
      city: 'Siwan',
      address: 'Hospital Road, Near Court Compound, Siwan, Bihar 841226',
      phone: '+91 6154-222000',
      services: ['24x7 Trauma Casualty', 'Emergency OT', 'Mother & Child Care Unit', 'Blood Bank'],
    },
    {
      name: 'LifeLine Trauma & Emergency Hospital',
      city: 'Siwan',
      address: 'Rajendra Path, Near Bus Stand, Siwan',
      phone: '+91 94310 99882',
      services: ['Critical Care ICU', 'Cardiac Defibrillator', 'Orthopedic Trauma Team'],
    },
  ];

  const firstAidGuides = [
    {
      title: 'Sudden Chest Pain / Possible Heart Attack',
      steps: [
        'Call 108 immediately or rush the patient to Sadar Hospital Casualty.',
        'Keep the patient calm, seated in a comfortable propped-up position.',
        'Loosen any tight clothing around neck and chest.',
        'If advised previously by a doctor and no contraindication, chew a 300mg Aspirin tablet.',
      ],
    },
    {
      title: 'Road Accident & Severe Bleeding Trauma',
      steps: [
        'Apply firm, continuous direct pressure to the bleeding wound using a clean cloth or bandage.',
        'Do not remove deeply lodged objects; stabilize them in place with padding.',
        'Keep the injured limb elevated above the heart level if possible.',
        'Ensure ambulance (108) is en route while preventing the patient from moving suddenly.',
      ],
    },
    {
      title: 'Snakebite Emergency (Important for Bihar Rural Areas)',
      steps: [
        'Keep the patient as calm and still as possible to slow venom absorption.',
        'Immobilize the bitten limb below the level of the heart.',
        'DO NOT cut the wound, attempt to suck venom, or apply tight tourniquets.',
        'Transport immediately to the nearest Sadar Hospital where Anti-Snake Venom (ASV) is stocked.',
      ],
    },
    {
      title: 'Severe High Fever / Convulsions in Children',
      steps: [
        'Gently sponge the forehead, arms, and legs with room temperature water (never ice water).',
        'Do not restrain a seizing child; move nearby hard or sharp objects away.',
        'Turn the child gently to their side to prevent choking.',
        'Rush to a pediatric casualty immediately.',
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Emergency Alert Banner */}
        <div className="bg-gradient-to-r from-rose-700 via-rose-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl space-y-6 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-950/80 text-rose-200 text-xs font-bold border border-rose-400/40">
              <ShieldAlert className="w-4 h-4 text-rose-300 animate-pulse" />
              <span>24/7 Emergency Medical Response • Gopalganj & Siwan</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
              Emergency Medical Contacts & 24/7 Casualty
            </h1>

            <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
              If someone is experiencing a life-threatening health crisis, acute cardiac symptoms, or trauma, contact emergency ambulance dispatch or rush to the nearest casualty desk below.
            </p>
          </div>

          {/* Rapid Dialers */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <a
              href="tel:108"
              className="p-5 bg-white text-slate-900 rounded-2xl shadow-xl flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold shrink-0">
                <Ambulance className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">National Ambulance</div>
                <div className="text-xl font-extrabold text-rose-700">Dial 108</div>
              </div>
            </a>

            <a
              href="tel:102"
              className="p-5 bg-white text-slate-900 rounded-2xl shadow-xl flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shrink-0">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Mother & Child Care</div>
                <div className="text-xl font-extrabold text-sky-700">Dial 102</div>
              </div>
            </a>

            <a
              href="tel:112"
              className="p-5 bg-white text-slate-900 rounded-2xl shadow-xl flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
                <Phone className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Unified Emergency</div>
                <div className="text-xl font-extrabold text-slate-900">Dial 112</div>
              </div>
            </a>
          </div>
        </div>

        {/* 24/7 Casualty Centers */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit',sans-serif]">
              24/7 Emergency Hospitals in Gopalganj & Siwan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Equipped with round-the-clock medical officers, emergency operating theatres, and oxygen supplies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyHospitals.map((h, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200/90 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-[11px] font-bold rounded">
                      24/7 Open
                    </span>
                    <span className="text-xs font-bold text-sky-700">{h.city}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base font-['Outfit',sans-serif]">
                    {h.name}
                  </h3>

                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{h.address}</span>
                  </div>

                  <div className="space-y-1 pt-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Facilities:</div>
                    {h.services.map((s, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={`tel:${h.phone}`}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {h.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* First Aid Guidance Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-sky-600" />
              <span>Step-by-Step Emergency First Aid Protocol</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Crucial actions to take during the critical "Golden Hour" before medical transport arrives.
            </p>
          </div>

          <div className="space-y-3">
            {firstAidGuides.map((guide, idx) => {
              const isOpen = activeFirstAid === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFirstAid(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base"
                  >
                    <span>{guide.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                      {guide.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
