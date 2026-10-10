import React, { useState } from 'react';
import {
  Heart,
  Brain,
  Activity,
  Smile,
  Eye,
  Stethoscope,
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
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Speciality } from '../../types';
import { getDoctorEmoji } from '../../utils/emojiHelpers';

// Map icon string to Lucide component
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Heart':
      return Heart;
    case 'Brain':
      return Brain;
    case 'Bone':
    case 'Activity':
      return Activity;
    case 'Baby':
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

export const SpecialitiesGrid: React.FC = () => {
  const { specialities, setSpecialityFilter, navigateTo } = useApp();
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? specialities : specialities.slice(0, 10);

  const handleSpecialityClick = (speciality: Speciality) => {
    setSpecialityFilter(speciality.id);
    navigateTo('doctors');
  };

  return (
    <section className="py-16 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#00A3BF] text-xs font-bold border border-teal-200/60 uppercase tracking-wider mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Medical Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003B95] tracking-tight font-['Outfit',sans-serif]">
              Find Doctors by Speciality
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Select from over 20+ specialized clinical departments in Gopalganj & Siwan
            </p>
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="self-start md:self-auto px-5 py-2.5 bg-white hover:bg-slate-50 text-[#0052CC] border border-blue-200 text-xs sm:text-sm font-bold rounded-full shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>{showAll ? 'Show Top 10' : 'View All 20+ Specialities'}</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${showAll ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Specialities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {displayed.map((spec) => {
            const emojiInfo = getDoctorEmoji({ specialityId: spec.id, speciality: spec.name });
            return (
              <div
                key={spec.id}
                onClick={() => handleSpecialityClick(spec)}
                className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Count */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-2xl group-hover:scale-110 transition-transform duration-200 flex items-center justify-center border border-blue-100 shadow-xs select-none">
                      {emojiInfo.specialityEmoji}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-[#0052CC] whitespace-nowrap">
                      {spec.doctorCount} Doctors
                    </span>
                  </div>

                  {/* Title & Hindi Subtitle */}
                  <h3 className="font-bold text-[#003B95] text-base group-hover:text-[#0052CC] transition-colors font-['Outfit',sans-serif] flex items-center gap-1.5">
                    <span>{spec.name}</span>
                  </h3>
                  {spec.hindiName && (
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                      {spec.hindiName}
                    </div>
                  )}

                  {/* Short description */}
                  <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {spec.description}
                  </p>
                </div>

                {/* Footer link */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0052CC] group-hover:text-[#003B95]">
                  <span className="whitespace-nowrap">View Doctors</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
