import React from 'react';
import {
  MapPin,
  Building,
  Users,
  ShieldCheck,
  Phone,
  Calendar,
  Stethoscope,
  HeartPulse,
  Ambulance,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DoctorCard } from '../doctors/DoctorCard';

export const GopalganjPage: React.FC = () => {
  const { doctors, navigateTo, setCityFilter, setAreaFilter, setSpecialityFilter } = useApp();

  const gopalganjDoctors = doctors.filter((d) => d.city === 'Gopalganj');

  const topAreas = [
    { name: 'Hospital Road', desc: 'Sadar Hospital, Trauma Units & Pathologies', count: 18 },
    { name: 'Banjari Road', desc: 'Orthopedic Clinics & Poly Clinics', count: 12 },
    { name: 'Cinema Road', desc: 'Cardiology, Pediatric & Maternity Centers', count: 14 },
    { name: 'Thawe Road', desc: 'Diagnostic Labs & Multispeciality Hospitals', count: 9 },
    { name: 'Post Office Chowk', desc: 'Dental & Skin Specialists', count: 8 },
    { name: 'Mirganj & Hathwa', desc: 'Rural Health Hubs & Emergency OPD', count: 15 },
  ];

  const handleAreaClick = (areaName: string) => {
    setCityFilter('Gopalganj');
    setAreaFilter(areaName);
    navigateTo('doctors');
  };

  const handleSpecialityClick = (specId: string) => {
    setCityFilter('Gopalganj');
    setSpecialityFilter(specId);
    navigateTo('doctors');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* District Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#003B95] via-[#002D72] to-[#001D4A] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-teal-300 text-xs font-bold border border-white/20">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>Gopalganj District Medical Network</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
              Doctors, Clinics & Hospitals in Gopalganj
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Find verified medical specialists practicing across Sadar Hospital Road, Banjari, Cinema Road, Thawe, Mirganj, and Hathwa. Book OPD appointment tokens with zero queue waiting.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  setCityFilter('Gopalganj');
                  navigateTo('doctors');
                }}
                className="py-3 px-6 bg-white hover:bg-slate-50 text-[#003B95] font-extrabold text-xs sm:text-sm rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-[#0052CC]" />
                <span>View All {gopalganjDoctors.length}+ Gopalganj Doctors</span>
              </button>

              <button
                onClick={() => navigateTo('emergency')}
                className="py-3 px-6 bg-[#FF4F4F] hover:bg-red-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Ambulance className="w-4 h-4" />
                <span>24/7 Sadar Casualty</span>
              </button>
            </div>
          </div>
        </div>

        {/* Localities in Gopalganj */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#003B95] font-['Outfit',sans-serif]">
                Explore Doctors by Gopalganj Area
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Browse clinics and hospital clusters across major thoroughfares in Gopalganj
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topAreas.map((area) => (
              <div
                key={area.name}
                onClick={() => handleAreaClick(area.name)}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#003B95] text-base">{area.name}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-50 text-[#0052CC] rounded-full">
                      {area.count}+ Doctors
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{area.desc}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0052CC]">
                  <span>View Practitioners</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Doctors in Gopalganj */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#003B95] font-['Outfit',sans-serif]">
                Popular Doctors Practicing in Gopalganj
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Book in-clinic OPD visits and online video teleconsultations
              </p>
            </div>

            <button
              onClick={() => {
                setCityFilter('Gopalganj');
                navigateTo('doctors');
              }}
              className="text-xs font-bold text-[#0052CC] hover:text-[#003B95] flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gopalganjDoctors.slice(0, 6).map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
