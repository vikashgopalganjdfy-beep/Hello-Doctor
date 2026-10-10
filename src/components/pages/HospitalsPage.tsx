import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Clock,
  Star,
  Search,
  AlertCircle,
  Bed,
  Filter,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Hospital, City } from '../../types';

export const HospitalsPage: React.FC = () => {
  const { hospitals, openBookingModal, doctors, setCityFilter, navigateTo } = useApp();
  const [selectedCity, setSelectedCity] = useState<City>('All');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = hospitals.filter((h) => {
    if (selectedCity !== 'All' && h.city !== selectedCity) return false;
    if (emergencyOnly && !h.has24x7Emergency) return false;
    if (
      query.trim() &&
      !h.name.toLowerCase().includes(query.toLowerCase()) &&
      !h.locality.toLowerCase().includes(query.toLowerCase()) &&
      !h.departments.some((d) => d.toLowerCase().includes(query.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  const handleBookAtHospital = (hospital: Hospital) => {
    const doc = doctors.find((d) => d.city === hospital.city) || doctors[0];
    openBookingModal(doc);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200/60 uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>Hospital & Medical Institute Directory</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
                Hospitals & Clinics in Gopalganj & Siwan
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Explore government district hospitals, multispeciality nursing homes, and emergency trauma centers.
              </p>
            </div>

            {/* City Selector */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 self-start md:self-auto">
              {(['All', 'Gopalganj', 'Siwan'] as City[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCity === c
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {c === 'All' ? 'All Districts' : c}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Filter Strip */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-80 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search hospital, department, locality..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer self-start sm:self-auto">
              <input
                type="checkbox"
                checked={emergencyOnly}
                onChange={(e) => setEmergencyOnly(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-500"
              />
              <span className="text-rose-600 font-bold">24/7 Emergency Casualty Only</span>
            </label>
          </div>
        </div>

        {/* Hospital Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-40 select-none drop-shadow-md">
                    {hospital.has24x7Emergency ? '🚑' : '🏥'}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-slate-700">
                      {hospital.city} District
                    </span>

                    {hospital.has24x7Emergency && (
                      <span className="px-2.5 py-1 bg-rose-600 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>24/7 Casualty</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold font-['Outfit',sans-serif]">
                      {hospital.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-200 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{hospital.locality}, {hospital.city}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="font-bold text-slate-900">{hospital.rating}</span>
                      <span className="text-slate-500">({hospital.reviewCount} reviews)</span>
                    </div>

                    {hospital.bedCount > 0 && (
                      <div className="flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                        <Bed className="w-3.5 h-3.5 text-slate-500" />
                        <span>{hospital.bedCount} In-Patient Beds</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{hospital.openingHours}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Clinical Departments
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {hospital.departments.map((dept, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-slate-50 text-slate-700 text-xs font-semibold rounded-md border border-slate-200"
                        >
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{hospital.fullAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{hospital.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={`tel:${hospital.phone}`}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-600" />
                  <span>Call Hospital</span>
                </a>

                <button
                  onClick={() => handleBookAtHospital(hospital)}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book OPD Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
