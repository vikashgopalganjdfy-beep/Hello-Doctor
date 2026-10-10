import React, { useState } from 'react';
import {
  Building,
  MapPin,
  Phone,
  Clock,
  Search,
  CheckCircle2,
  Stethoscope,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { City } from '../../types';

export const ClinicsPage: React.FC = () => {
  const { clinics, navigateTo, setCityFilter, setSearchQuery } = useApp();
  const [selectedCity, setSelectedCity] = useState<City>('All');
  const [search, setSearch] = useState('');

  const filtered = clinics.filter((c) => {
    if (selectedCity !== 'All' && c.city !== selectedCity) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        (c.doctorName && c.doctorName.toLowerCase().includes(q)) ||
        (c.speciality && c.speciality.toLowerCase().includes(q)) ||
        c.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-2">
              <Building className="w-3.5 h-3.5" />
              <span>Outpatient Clinics & Diagnostic Centers</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#003B95] font-['Outfit',sans-serif]">
              Clinics & Polyclinics — Gopalganj & Siwan
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Find doctor consultation chambers, day-care polyclinics, and diagnostic facilities.
            </p>
          </div>

          <div className="inline-flex p-1 bg-slate-200/70 rounded-full shrink-0">
            {(['All', 'Gopalganj', 'Siwan'] as City[]).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#0052CC] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {city === 'All' ? 'All Districts' : city}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xl">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clinic by name, doctor, or locality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#0052CC] shadow-xs"
          />
        </div>

        {/* Clinics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-slate-200/80 shadow-xs flex items-center justify-center text-4xl shrink-0 select-none">
                    🏥
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-blue-50 text-[#0052CC] text-[10px] font-bold rounded-full">
                        {clinic.city}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{clinic.locality}</span>
                    </div>

                    <h3 className="font-bold text-[#003B95] text-base truncate font-['Outfit',sans-serif]">
                      {clinic.name}
                    </h3>

                    {clinic.doctorName && (
                      <p className="text-xs font-bold text-[#0052CC] truncate">
                        {clinic.doctorName} • {clinic.speciality}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{clinic.address}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium text-emerald-800">{clinic.openingHours}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono">{clinic.phone}</span>
                  </div>
                </div>

                {/* Services */}
                {clinic.services && clinic.services.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {clinic.services.map((svc: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setCityFilter(clinic.city);
                    if (clinic.doctorName) setSearchQuery(clinic.doctorName);
                    navigateTo('doctors');
                  }}
                  className="py-2 px-4 bg-[#0052CC] hover:bg-[#003B95] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
                >
                  View Consulting Doctors
                </button>

                <a
                  href={`tel:${clinic.phone}`}
                  className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full transition-colors"
                >
                  Call Clinic
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
