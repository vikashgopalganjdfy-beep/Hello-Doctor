import React from 'react';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const TestimonialsSection: React.FC = () => {
  const { whatsAppSettings } = useApp();

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5" />
            <span>Real Patient Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003B95] font-['Outfit',sans-serif] tracking-tight">
            Trusted by Families Across Gopalganj & Siwan
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm">
            Read verified reviews from patients who booked doctor appointments and consultations through Hello Doctor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-800 border-2 border-white shadow-xs flex items-center justify-center text-xl shrink-0 select-none">
                  {item.patientName.includes('Kavita') || item.patientName.includes('Pooja') || item.patientName.includes('Suman') ? '👩' : '👨'}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[#003B95] text-xs sm:text-sm truncate">
                      {item.patientName}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {item.location} • Consulted {item.doctorConsulted}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
