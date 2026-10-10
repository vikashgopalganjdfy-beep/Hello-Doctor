import React from 'react';
import { MapPin, Building2, Stethoscope, Activity, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LocationSelectorSection: React.FC = () => {
  const { navigateTo, setCityFilter } = useApp();

  const handleSelectCity = (city: 'Gopalganj' | 'Siwan') => {
    setCityFilter(city);
    navigateTo(city === 'Gopalganj' ? 'location-gopalganj' : 'location-siwan');
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200/60 uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Regional Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Healthcare Near You
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Quickly access verified medical care, government & private hospitals, and emergency services in your district.
          </p>
        </div>

        {/* Two Large Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* GOPALGANJ CARD */}
          <div className="group relative bg-gradient-to-br from-slate-50 to-sky-50/40 rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-600"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                      District Hub
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-['Outfit',sans-serif]">
                    Gopalganj
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Banjari Road, Hospital Chowk, Cinema Road, Thawe & Mirganj
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-sky-600/10 text-sky-600 flex items-center justify-center font-bold text-lg group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-7 h-7" />
                </div>
              </div>

              {/* Service Capabilities Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {[
                  { label: '50+ Doctors', sub: 'Cardio, Gynae, Ortho' },
                  { label: '12+ Hospitals', sub: 'Sadar & Multi-Speciality' },
                  { label: 'Clinics & OPD', sub: 'Private Practices' },
                  { label: 'Diagnostic Labs', sub: 'Blood & X-Ray Tests' },
                  { label: '24/7 Casualty', sub: 'Emergency Response' },
                  { label: 'Pharmacies', sub: 'Doorstep Medicine' },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs"
                  >
                    <div className="text-xs font-bold text-slate-900">{s.label}</div>
                    <div className="text-[11px] text-slate-500">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
                <span>Ayushman & Cashless Accepted</span>
              </div>

              <button
                onClick={() => handleSelectCity('Gopalganj')}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer"
              >
                <span>Explore Gopalganj</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SIWAN CARD */}
          <div className="group relative bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                      District Hub
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-['Outfit',sans-serif]">
                    Siwan
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Babunia Road, Hospital Road, Gaushala Road, Rajendra Path & Mairwa
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-7 h-7" />
                </div>
              </div>

              {/* Service Capabilities Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {[
                  { label: '60+ Doctors', sub: 'Super-Specialists' },
                  { label: '15+ Hospitals', sub: 'Sadar & LifeLine ICU' },
                  { label: 'Clinics & OPD', sub: 'Specialized Polyclinics' },
                  { label: 'Diagnostic Centers', sub: '4D USG & CT Scans' },
                  { label: '24/7 Ambulance', sub: 'ICU on Wheels' },
                  { label: 'Maternity Wings', sub: 'Safe Normal Delivery' },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs"
                  >
                    <div className="text-xs font-bold text-slate-900">{s.label}</div>
                    <div className="text-[11px] text-slate-500">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
                <span>Ayushman & Cashless Accepted</span>
              </div>

              <button
                onClick={() => handleSelectCity('Siwan')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer"
              >
                <span>Explore Siwan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
