import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  Calendar,
  Clock,
  Building,
  User,
  Phone,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Doctor, WhatsAppBooking } from '../../types';
import { DoctorAvatar } from '../common/DoctorAvatar';

export const WhatsAppBookingModal: React.FC = () => {
  const {
    isWhatsAppModalOpen,
    closeWhatsAppModal,
    whatsAppDoctor,
    doctors,
    createWhatsAppBooking,
    whatsAppSettings,
    currentUser,
    showToast,
  } = useApp();

  if (!isWhatsAppModalOpen) return null;

  const doctor: Doctor = whatsAppDoctor || doctors[0];

  const [patientName, setPatientName] = useState(currentUser?.name || 'Vikash Kumar');
  const [patientMobile, setPatientMobile] = useState(currentUser?.phone || '+91 9431X XXXXX');
  const [patientAge, setPatientAge] = useState<number>(32);
  const [patientGender, setPatientGender] = useState<string>('Male');
  const [consultType, setConsultType] = useState<'In Clinic' | 'Video Consultation' | 'Home Visit'>('In Clinic');
  const [selectedDate, setSelectedDate] = useState('2026-08-16');
  const [selectedTime, setSelectedTime] = useState(
    doctor.availableTimeSlots && doctor.availableTimeSlots.length > 0
      ? doctor.availableTimeSlots[0]
      : '04:30 PM'
  );
  const [reasonForVisit, setReasonForVisit] = useState('Doctor consultation and diagnosis');

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<WhatsAppBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim() || !patientMobile.trim()) {
      showToast('Please enter patient name and mobile number', 'error');
      return;
    }

    const fee =
      consultType === 'Video Consultation'
        ? doctor.videoConsultationFee || doctor.consultationFee
        : doctor.consultationFee;

    // 1. Create booking in database state
    const newBooking = createWhatsAppBooking({
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpeciality: doctor.speciality,
      city: doctor.city,
      hospitalOrClinic: doctor.hospitalOrClinic,
      patientVisitAddress: doctor.patientVisitAddress || doctor.fullAddress,
      consultationType: consultType,
      preferredDate: selectedDate,
      preferredTime: selectedTime,
      patientName,
      patientMobile,
      patientAge: Number(patientAge),
      patientGender,
      reasonForVisit,
      feeAmount: fee,
    });

    setCreatedBooking(newBooking);
    setBookingSuccess(true);

    // 2. Format WhatsApp text
    const message = `HELLO DOCTOR — APPOINTMENT REQUEST

Booking ID: ${newBooking.bookingCode}
Patient Name: ${patientName}
Patient Mobile: ${patientMobile}
Doctor: ${doctor.name}
Speciality: ${doctor.speciality}
City: ${doctor.city}
Hospital/Clinic: ${doctor.hospitalOrClinic}
Patient Visit Location: ${doctor.patientVisitAddress || doctor.fullAddress}
Consultation Type: ${consultType}
Preferred Date: ${selectedDate}
Preferred Time: ${selectedTime}
Reason for Visit: ${reasonForVisit}

Please confirm my appointment.`;

    // 3. Clean phone number
    const cleanNumber = (whatsAppSettings.phoneNumber || '+91 9007355062').replace(/\D/g, '');
    const encodedText = encodeURIComponent(message);
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

    // Open WhatsApp in new window/app
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    showToast(`WhatsApp request created (ID: ${newBooking.bookingCode})! Opening WhatsApp...`, 'success');
  };

  const handleOpenAgain = () => {
    if (!createdBooking) return;
    const message = `HELLO DOCTOR — APPOINTMENT REQUEST

Booking ID: ${createdBooking.bookingCode}
Patient Name: ${createdBooking.patientName}
Patient Mobile: ${createdBooking.patientMobile}
Doctor: ${createdBooking.doctorName}
Speciality: ${createdBooking.doctorSpeciality}
City: ${createdBooking.city}
Hospital/Clinic: ${createdBooking.hospitalOrClinic}
Patient Visit Location: ${createdBooking.patientVisitAddress}
Consultation Type: ${createdBooking.consultationType}
Preferred Date: ${createdBooking.preferredDate}
Preferred Time: ${createdBooking.preferredTime}
Reason for Visit: ${createdBooking.reasonForVisit}

Please confirm my appointment.`;

    const cleanNumber = (whatsAppSettings.phoneNumber || '+91 9007355062').replace(/\D/g, '');
    const encodedText = encodeURIComponent(message);
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 relative">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-emerald-600 text-white px-6 py-4 rounded-t-3xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg font-['Outfit',sans-serif]">
                Book on WhatsApp
              </h2>
              <p className="text-xs text-emerald-100">
                Direct Official Helpline: {whatsAppSettings.phoneNumber || '+91 9007355062'}
              </p>
            </div>
          </div>

          <button
            onClick={closeWhatsAppModal}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!bookingSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Selected Doctor Summary */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 flex items-center gap-3.5">
              <DoctorAvatar doctor={doctor} size="sm" />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-[#003B95] text-sm">{doctor.name}</h3>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    {doctor.city}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#0052CC]">{doctor.speciality}</p>
                <div className="text-[11px] text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{doctor.patientVisitAddress || doctor.hospitalOrClinic}</span>
                </div>
              </div>
            </div>

            {/* Consultation Mode */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Consultation Type
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setConsultType('In Clinic')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    consultType === 'In Clinic'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>In-Clinic (₹{doctor.consultationFee})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultType('Video Consultation')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    consultType === 'Video Consultation'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Video Call (₹{doctor.videoConsultationFee || doctor.consultationFee})</span>
                </button>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                >
                  {(doctor.availableTimeSlots || ['10:00 AM', '12:00 PM', '04:30 PM', '06:00 PM']).map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Patient Info */}
            <div className="space-y-3 pt-1">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Patient Details
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    WhatsApp Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={patientMobile}
                    onChange={(e) => setPatientMobile(e.target.value)}
                    placeholder="e.g. +91 9431X XXXXX"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Patient Age
                  </label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(Number(e.target.value))}
                    min={1}
                    max={120}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Gender
                  </label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Reason for Visit / Symptoms
                </label>
                <input
                  type="text"
                  value={reasonForVisit}
                  onChange={(e) => setReasonForVisit(e.target.value)}
                  placeholder="e.g. Fever, Blood pressure checkup, Knee pain..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Note & Action */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
              <strong>Notice:</strong> Submitting will generate your official Hello Doctor Booking ID and open WhatsApp with pre-filled details to <strong>{whatsAppSettings.phoneNumber || '+91 9007355062'}</strong>. The appointment desk will confirm your slot upon receiving the message.
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm rounded-full shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Generate Booking ID & Open WhatsApp</span>
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
                Booking ID Generated
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {createdBooking?.bookingCode}
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your WhatsApp appointment request for <strong>{createdBooking?.doctorName}</strong> ({createdBooking?.preferredDate} at {createdBooking?.preferredTime}) has been registered in the system with status <strong>Pending</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Patient:</span>
                <strong className="text-slate-900">{createdBooking?.patientName}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Location:</span>
                <strong className="text-slate-900">{createdBooking?.patientVisitAddress}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>WhatsApp Helpline:</span>
                <strong className="text-emerald-700">{whatsAppSettings.phoneNumber || '+91 9007355062'}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleOpenAgain}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open WhatsApp Chat Again</span>
              </button>

              <button
                onClick={closeWhatsAppModal}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
