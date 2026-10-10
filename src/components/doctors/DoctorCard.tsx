import React from 'react';
import {
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Calendar,
  Video,
  Heart,
  MessageSquare,
  Building,
  CheckCircle,
} from 'lucide-react';
import { Doctor } from '../../types';
import { useApp } from '../../context/AppContext';

import { DoctorAvatar } from '../common/DoctorAvatar';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const {
    navigateTo,
    openBookingModal,
    openWhatsAppModal,
    savedDoctorIds,
    toggleSaveDoctor,
  } = useApp();

  const isSaved = savedDoctorIds.includes(doctor.id);

  const handleCardClick = () => {
    navigateTo('doctor-detail', { doctor });
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openBookingModal(doctor, 'In Clinic');
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsAppModal(doctor);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Top Banner / District Badge */}
      <div className="p-5 pb-0 flex items-start gap-4">
        {/* Doctor Medical Emoji Avatar */}
        <div className="relative shrink-0">
          <DoctorAvatar doctor={doctor} size="md" />
          {doctor.isVerified && (
            <div
              className="absolute -top-1.5 -left-1.5 bg-emerald-600 text-white rounded-full p-1 shadow-xs z-10"
              title="Verified by Hello Doctor Administration"
            >
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Doctor Main Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#0052CC]">
              {doctor.city} District
            </span>

            {/* Save to Favorites */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveDoctor(doctor.id);
              }}
              className={`p-1.5 rounded-full transition-colors ${
                isSaved
                  ? 'text-rose-500 bg-rose-50'
                  : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50'
              }`}
              title={isSaved ? 'Remove from favorites' : 'Save doctor'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#003B95] mt-1 truncate group-hover:text-[#0052CC] transition-colors font-['Outfit',sans-serif]">
            {doctor.name}
          </h3>

          <p className="text-xs font-bold text-[#0052CC] truncate">
            {doctor.speciality}
          </p>

          <p className="text-[11px] text-slate-500 truncate mt-0.5">
            {doctor.qualification} • {doctor.experienceYears}+ Years Exp
          </p>

          {/* Rating & Review */}
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>{doctor.rating}</span>
            </div>
            <span className="text-[11px] text-slate-400">
              ({doctor.reviewCount || 12} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Middle Clinic & Patient Visit Location */}
      <div className="px-5 py-3 text-xs space-y-1.5">
        <div className="flex items-start gap-1.5 text-slate-700">
          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span className="font-semibold truncate">{doctor.hospitalOrClinic}</span>
        </div>

        <div className="flex items-start gap-1.5 text-slate-600">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span className="text-[11px] text-slate-600 line-clamp-1">
            <strong>Visit:</strong> {doctor.patientVisitAddress || doctor.fullAddress}
          </span>
        </div>

        {/* Available Timings & Badges */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-emerald-600" />
            <span>Available Today</span>
          </span>

          {doctor.consultationTypes.includes('Video Consultation') && (
            <span className="text-[10px] font-semibold text-[#0052CC] bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Video className="w-2.5 h-2.5" /> Video Call
            </span>
          )}

          {doctor.isVerified && (
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50/50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" /> Verified
            </span>
          )}
        </div>
      </div>

      {/* Bottom Action Footer with 3 buttons */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Consultation Fee</span>
            <span className="text-base font-extrabold text-[#003B95]">
              ₹{doctor.consultationFee}
            </span>
            {doctor.videoConsultationFee && (
              <span className="text-[10px] text-slate-500 ml-1">
                (Video: ₹{doctor.videoConsultationFee})
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            View Profile
          </button>
        </div>

        {/* 2 Primary CTAs: Book Appointment & Book on WhatsApp */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleBookClick}
            className="py-2 px-3 bg-[#0052CC] hover:bg-[#003B95] active:bg-[#002D72] text-white text-xs font-bold rounded-full shadow-xs transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Token</span>
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-full shadow-xs transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer"
            title="Book directly on official WhatsApp (+91 9007355062)"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>On WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
