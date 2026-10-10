import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Clock,
  Star,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Bed,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Hospital, City } from '../../types';

export const HospitalsSection: React.FC = () => {
  const { hospitals, navigateTo, setCityFilter, openBookingModal, doctors } = useApp();
  const [activeCity, setActiveCity] = useState<City>('All');

  const filteredHospitals = hospitals.filter((h) => {
    if (activeCity === 'All') return true;
    return h.city === activeCity;
  });

  const handleBookHospital = (hospital: Hospital) => {
    // Find doctor from this city
    const doctorInCity = doctors.find((d) => d.city === hospital.city) || doctors[0];
    openBookingModal(doctorInCity);
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200/60 uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Medical Facilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Hospitals & Clinics in Gopalganj & Siwan
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              District government hospitals, trauma care units, and multi-speciality private medical institutes.
            </p>
          </div>

          {/* Location toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl border border-slate-200 self-start md:self-auto">
            {(['All', 'Gopalganj', 'Siwan'] as City[]).map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCity === city
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {city === 'All' ? 'All Districts' : `${city} Hospitals`}
              </button>
            ))}
          </div>
        </div>

        {/* Hospital Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Header with Badges */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-slate-700">
                      {hospital.city} District
                    </span>

                    {hospital.has24x7Emergency && (
                      <span className="px-2.5 py-1 bg-rose-600 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                        <span>24/7 Emergency</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold font-['Outfit',sans-serif] drop-shadow-sm">
                      {hospital.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-200 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{hospital.locality}, {hospital.city}</span>
                    </div>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 space-y-4">
                  {/* Rating, Beds & OPD Timings */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="font-bold text-slate-900">{hospital.rating}</span>
                      <span className="text-slate-500">({hospital.reviewCount} reviews)</span>
                    </div>

                    {hospital.bedCount > 0 && (
                      <div className="flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                        <Bed className="w-3.5 h-3.5 text-slate-500" />
                        <span>{hospital.bedCount} Beds</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[170px]">{hospital.openingHours}</span>
                    </div>
                  </div>

                  {/* Departments pills */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Key Medical Departments
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

                  {/* Address & Phone */}
                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{hospital.fullAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{hospital.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    navigateTo('hospitals');
                  }}
                  className="text-xs font-bold text-slate-700 hover:text-sky-600 transition-colors whitespace-nowrap"
                >
                  View Details & Doctors →
                </button>

                <button
                  onClick={() => handleBookHospital(hospital)}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors whitespace-nowrap"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Hospitals button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('hospitals')}
            className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 transition-colors shadow-xs"
          >
            Explore All Hospitals & Diagnostic Centers
          </button>
        </div>
      </div>
    </section>
  );
};
