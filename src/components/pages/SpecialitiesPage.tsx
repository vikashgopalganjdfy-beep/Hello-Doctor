import React, { useState } from 'react';
import {
  Stethoscope,
  Search,
  ArrowRight,
  Heart,
  Brain,
  Activity,
  Smile,
  Eye,
  Sparkles,
  Wind,
  Headphones,
  Droplet,
  Filter,
  ShieldPlus,
  Scissors,
  Zap,
  Scan,
  TestTube2,
  HeartPulse,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Speciality } from '../../types';

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Heart':
      return Heart;
    case 'Brain':
      return Brain;
    case 'Activity':
      return Activity;
    case 'UserCheck':
      return UserCheck;
    case 'Smile':
      return Smile;
    case 'Eye':
      return Eye;
    case 'Stethoscope':
      return Stethoscope;
    case 'Sparkles':
      return Sparkles;
    case 'Wind':
      return Wind;
    case 'Headphones':
      return Headphones;
    case 'Droplet':
      return Droplet;
    case 'Filter':
      return Filter;
    case 'ShieldPlus':
      return ShieldPlus;
    case 'Scissors':
      return Scissors;
    case 'Zap':
      return Zap;
    case 'Scan':
      return Scan;
    case 'TestTube2':
      return TestTube2;
    default:
      return HeartPulse;
  }
};

export const SpecialitiesPage: React.FC = () => {
  const { specialities, setSpecialityFilter, navigateTo } = useApp();
  const [query, setQuery] = useState('');

  const filtered = specialities.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      (s.hindiName && s.hindiName.toLowerCase().includes(query.toLowerCase())) ||
      s.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (s: Speciality) => {
    setSpecialityFilter(s.id);
    navigateTo('doctors');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200/60 uppercase tracking-wider mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Medical Specialities Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Explore 20+ Medical Specialities in Gopalganj & Siwan
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From Cardiology and Neurology to Pediatrics and Gynecology, discover qualified specialists and OPD clinics near you.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-6 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search speciality or symptom (e.g. skin, heart, teeth)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sky-500 shadow-xs"
            />
          </div>
        </div>

        {/* Specialities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((spec) => {
            const Icon = getIconComponent(spec.iconName);
            return (
              <div
                key={spec.id}
                onClick={() => handleSelect(spec)}
                className="group bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-sky-50 group-hover:text-sky-700">
                      {spec.doctorCount} Doctors
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-sky-700 transition-colors font-['Outfit',sans-serif]">
                    {spec.name}
                  </h3>
                  {spec.hindiName && (
                    <div className="text-xs text-slate-400 font-medium mt-0.5">
                      {spec.hindiName}
                    </div>
                  )}

                  <p className="text-slate-500 text-xs mt-2.5 line-clamp-3 leading-relaxed">
                    {spec.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-sky-700">
                  <span>View Doctors</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
