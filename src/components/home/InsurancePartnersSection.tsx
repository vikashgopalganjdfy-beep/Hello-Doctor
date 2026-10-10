import React from 'react';
import { ShieldCheck, CheckCircle } from 'lucide-react';
import { INSURANCE_PARTNERS } from '../../data/mockData';

export const InsurancePartnersSection: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Cashless Hospitalization & Mediclaim
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 font-['Outfit',sans-serif]">
            Our Insurance & Healthcare Partners
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
            Cashless medical claim support and Ayushman Bharat PM-JAY processing available at empanelled hospital partners.
          </p>
        </div>

        {/* Partners Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {INSURANCE_PARTNERS.map((p, idx) => (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-sky-50/50 p-3 rounded-xl border border-slate-200/90 text-center flex flex-col justify-center items-center transition-colors"
            >
              <ShieldCheck className="w-5 h-5 text-sky-700 mb-1" />
              <div className="text-xs font-bold text-slate-800 leading-tight">
                {p.logoText}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate w-full">
                {p.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
