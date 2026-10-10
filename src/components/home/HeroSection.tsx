import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Stethoscope,
  ShieldCheck,
  Building,
  HeartPulse,
  PhoneCall,
  Clock,
  Sparkles,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { City } from '../../types';

export const HeroSection: React.FC = () => {
  const {
    cityFilter,
    setCityFilter,
    searchQuery,
    setSearchQuery,
    setSpecialityFilter,
    executeDoctorSearch,
    navigateTo,
    doctors,
    whatsAppSettings,
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeDoctorSearch(
      {
        query: localSearch.trim(),
        city: cityFilter,
      },
      true
    );
  };

  const handleSpecialityQuickSelect = (specId: string) => {
    setSpecialityFilter(specId);
    navigateTo('doctors');
  };

  const handleCityQuickSelect = (city: City) => {
    setCityFilter(city);
    if (city === 'Gopalganj') {
      navigateTo('gopalganj');
    } else if (city === 'Siwan') {
      navigateTo('siwan');
    } else {
      navigateTo('doctors');
    }
  };

  const trendingCategories = [
    { label: 'Cardiology (Heart)', id: 'cardiology', icon: '❤️' },
    { label: 'Gynecology & Maternity', id: 'gynecology', icon: '🤰' },
    { label: 'Orthopedic (Bone & Joint)', id: 'orthopedics', icon: '🦴' },
    { label: 'Pediatrics (Child Care)', id: 'pediatrics', icon: '👶' },
    { label: 'General Physician', id: 'general-medicine', icon: '🩺' },
    { label: 'Dental Care', id: 'dentistry', icon: '🦷' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F4F8FC] to-[#F8FAFC] pt-8 pb-14 border-b border-slate-200/80">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* District Selector Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0052CC] text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0052CC] animate-ping" />
            <span>Dedicated Healthcare Platform • Bihar</span>
          </div>

          {/* City Switching Pills */}
          <div className="inline-flex p-1 bg-white rounded-full border border-slate-200 shadow-xs">
            {(['All', 'Gopalganj', 'Siwan'] as City[]).map((city) => (
              <button
                key={city}
                onClick={() => handleCityQuickSelect(city)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  cityFilter === city
                    ? 'bg-[#0052CC] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#003B95] hover:bg-slate-50'
                }`}
              >
                {city === 'All' ? 'Gopalganj & Siwan' : `${city} District`}
              </button>
            ))}
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#003B95] tracking-tight leading-[1.1] font-['Outfit',sans-serif]">
            Find Trusted Doctors in{' '}
            <span className="text-[#0052CC]">Gopalganj</span> &{' '}
            <span className="text-[#00A3BF]">Siwan</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Book verified hospital OPD tokens and home teleconsultations with 220+ senior doctors, surgeons & clinics. No queue waiting, direct confirmation on WhatsApp.
          </p>
        </div>

        {/* Core Search Box */}
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-2.5 sm:p-3 rounded-3xl border-2 border-blue-200/80 shadow-xl flex flex-col sm:flex-row gap-2 items-center transition-all hover:border-[#0052CC]"
          >
            {/* City Selector in input */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-2xl sm:w-48 w-full shrink-0 border border-slate-200/60">
              <MapPin className="w-4 h-4 text-[#0052CC] shrink-0" />
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value as City)}
                className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="All">All Locations</option>
                <option value="Gopalganj">Gopalganj</option>
                <option value="Siwan">Siwan</option>
              </select>
            </div>

            {/* Keyword Search */}
            <div className="relative flex-1 w-full flex items-center px-3">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Doctor name, speciality (e.g. Cardiologist), or hospital..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto py-3 px-7 bg-[#0052CC] hover:bg-[#003B95] active:bg-[#002D72] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Search Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Speciality Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-4">
            <span className="text-[11px] font-bold text-slate-600">Quick Search:</span>
            {trendingCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSpecialityQuickSelect(cat.id)}
                className="px-3 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-[#0052CC] text-xs font-semibold rounded-full border border-slate-200 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* WhatsApp Direct Banner & Trust Metrics */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#003B95]">220+ Verified Doctors</div>
              <div className="text-[11px] text-slate-500">Gopalganj & Siwan specialists</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-emerald-800">WhatsApp Booking</div>
              <div className="text-[11px] text-slate-500 font-mono">
                {whatsAppSettings.phoneNumber || '+91 9007355062'}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#FF4F4F] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#FF4F4F]">24/7 Casualty Desk</div>
              <div className="text-[11px] text-slate-500">Sadar Hospitals & Trauma Units</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
