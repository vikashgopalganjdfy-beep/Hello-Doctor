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

export const SiwanPage: React.FC = () => {
  const { doctors, navigateTo, setCityFilter, setAreaFilter, setSpecialityFilter } = useApp();

  const siwanDoctors = doctors.filter((d) => d.city === 'Siwan');

  const topAreas = [
    { name: 'Babunia Road', desc: 'Apex Hospital, Gynecology, Cardiac & Eye Clinics', count: 22 },
    { name: 'Hospital Road', desc: 'Sadar Hospital Siwan & Specialized Surgical OPDs', count: 19 },
    { name: 'Gaushala Road', desc: 'Pediatric Care, Orthopedic & Dental Centers', count: 11 },
    { name: 'Rajendra Path', desc: 'ENT, Skin & General Physicians Hub', count: 14 },
    { name: 'Mairwa Road', desc: 'Dialysis Units, Nursing Homes & Diagnostics', count: 10 },
    { name: 'Maharajganj & Barharia', desc: 'Sub-divisional Medical Care & Polyclinics', count: 12 },
  ];

  const handleAreaClick = (areaName: string) => {
    setCityFilter('Siwan');
    setAreaFilter(areaName);
    navigateTo('doctors');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* District Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#003B95] via-[#0052CC] to-[#002D72] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-teal-300 text-xs font-bold border border-white/20">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>Siwan District Medical Network</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
              Doctors, Clinics & Hospitals in Siwan
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Discover senior surgeons, gynecologists, pediatricians, cardiologists, and orthopedic specialists practicing across Babunia Road, Hospital Road, Rajendra Path, Gaushala Road, and Mairwa.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  setCityFilter('Siwan');
                  navigateTo('doctors');
                }}
                className="py-3 px-6 bg-white hover:bg-slate-50 text-[#003B95] font-extrabold text-xs sm:text-sm rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-[#0052CC]" />
                <span>View All {siwanDoctors.length}+ Siwan Doctors</span>
              </button>

              <button
                onClick={() => navigateTo('emergency')}
                className="py-3 px-6 bg-[#FF4F4F] hover:bg-red-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Ambulance className="w-4 h-4" />
                <span>24/7 Siwan Casualty</span>
              </button>
            </div>
          </div>
        </div>

        {/* Localities in Siwan */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#003B95] font-['Outfit',sans-serif]">
                Explore Doctors by Siwan Locality
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Medical centers and doctor clinics in major hubs of Siwan district
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

        {/* Featured Doctors in Siwan */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#003B95] font-['Outfit',sans-serif]">
                Popular Doctors Practicing in Siwan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Book in-clinic visits and teleconsultation tokens with trusted doctors in Siwan
              </p>
            </div>

            <button
              onClick={() => {
                setCityFilter('Siwan');
                navigateTo('doctors');
              }}
              className="text-xs font-bold text-[#0052CC] hover:text-[#003B95] flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siwanDoctors.slice(0, 6).map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
