import React, { useState } from 'react';
import { Stethoscope, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DoctorCard } from '../doctors/DoctorCard';
import { City } from '../../types';

export const FeaturedDoctors: React.FC = () => {
  const { doctors, navigateTo, setCityFilter } = useApp();
  const [activeTab, setActiveTab] = useState<City>('All');

  const filtered = doctors.filter((doc) => {
    if (activeTab === 'All') return true;
    return doc.city === activeTab;
  });

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with City Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold border border-blue-200/60 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Specialists</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003B95] tracking-tight font-['Outfit',sans-serif]">
              Popular Doctors in Gopalganj & Siwan
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Top rated medical professionals with verified credentials, transparent fees and instant appointment slots.
            </p>
          </div>

          {/* City Switcher Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            {(['All', 'Gopalganj', 'Siwan'] as City[]).map((city) => (
              <button
                key={city}
                onClick={() => setActiveTab(city)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === city
                    ? 'bg-[#0052CC] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {city === 'All' ? 'All Districts' : `${city} Doctors`}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, 6).map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setCityFilter(activeTab);
              navigateTo('doctors');
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-50 hover:bg-blue-100 text-[#0052CC] font-bold text-sm rounded-full border border-blue-200 transition-colors shadow-xs cursor-pointer"
          >
            <span>View All {doctors.length}+ Doctors in Gopalganj & Siwan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
