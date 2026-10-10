import React from 'react';
import { ShieldCheck, CalendarCheck2, MapPinCheck, BookOpenCheck, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: 'Verified Doctors',
      description:
        'Every medical specialist is manually screened for state medical council registrations, clinical degrees, and clinic operational hours.',
      points: ['Council Registration Verified', 'Strict Clinical Standards', 'Transparent Experience Details'],
    },
    {
      icon: CalendarCheck2,
      iconBg: 'bg-sky-50 text-sky-600',
      title: 'Easy Appointment Booking',
      description:
        'Schedule your clinic OPD visit or video consultation in 60 seconds with instant digital confirmation slips and zero queue waiting.',
      points: ['Instant Booking Code', 'Downloadable OPD Slip', 'Easy Reschedule & Cancel'],
    },
    {
      icon: MapPinCheck,
      iconBg: 'bg-indigo-50 text-indigo-600',
      title: 'Local Healthcare Focus',
      description:
        'Tailored specifically for Gopalganj, Siwan, Mirganj, Hathwa, Mairwa, and surrounding blocks with regional clinic address clarity.',
      points: ['Hyper-Local Coverage', 'Hindi & Bhojpuri Speaking Staff', 'Ayushman Empanelled Centers'],
    },
    {
      icon: BookOpenCheck,
      iconBg: 'bg-amber-50 text-amber-600',
      title: 'Trusted Health Guidance',
      description:
        'Access doctor-written medical articles, preventive wellness guides, and disease prevention tips calibrated for Bihar families.',
      points: ['Doctor-Authored Guides', 'Accurate Diagnostic Details', 'Free Preventive Advice'],
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200/60 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Healthcare Built for Gopalganj & Siwan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            We are eliminating long OPD lines, opaque consultation fees, and guesswork in finding trusted local doctors.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/90 hover:bg-white hover:shadow-lg hover:border-sky-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif] mb-2">
                    {f.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {f.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-slate-200/60">
                  {f.points.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
