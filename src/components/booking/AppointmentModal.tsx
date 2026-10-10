import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Building,
  Video,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  Printer,
  Download,
  ShieldCheck,
  MapPin,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Doctor, Appointment, City } from '../../types';
import { DoctorAvatar } from '../common/DoctorAvatar';

export const AppointmentModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    bookingDoctor,
    bookingPreselectedType,
    doctors,
    bookAppointment,
    navigateTo,
    currentUser,
  } = useApp();

  if (!isBookingModalOpen) return null;

  // Selected state
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(bookingDoctor || doctors[0]);
  const [consultType, setConsultType] = useState<'In Clinic' | 'Video Consultation'>(
    bookingPreselectedType || 'In Clinic'
  );
  const [selectedDate, setSelectedDate] = useState('2026-08-16');
  const [selectedTime, setSelectedTime] = useState(
    selectedDoctor.availableTimeSlots[0] || '10:00 AM'
  );

  // Patient form state
  const [patientName, setPatientName] = useState(currentUser?.name || 'Vikash Kumar');
  const [patientAge, setPatientAge] = useState<number>(32);
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [patientMobile, setPatientMobile] = useState('+91 9431X XXXXX');
  const [patientEmail, setPatientEmail] = useState(currentUser?.email || 'patient@example.com');
  const [reasonForVisit, setReasonForVisit] = useState('Consultation and regular health review');

  // Multi-step tracking: 'form' | 'confirmed'
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedApt, setConfirmedApt] = useState<Appointment | null>(null);

  const handleDoctorChange = (docId: string) => {
    const found = doctors.find((d) => d.id === docId);
    if (found) {
      setSelectedDoctor(found);
      setSelectedTime(found.availableTimeSlots[0] || '10:00 AM');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fee =
      consultType === 'Video Consultation'
        ? selectedDoctor.videoConsultationFee || selectedDoctor.consultationFee
        : selectedDoctor.consultationFee;

    const newApt = bookAppointment({
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpeciality: selectedDoctor.speciality,
      doctorPhoto: selectedDoctor.photo,
      hospitalOrClinic: selectedDoctor.hospitalOrClinic,
      city: selectedDoctor.city,
      consultationType: consultType,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      patientName,
      patientAge: Number(patientAge),
      patientGender,
      patientMobile,
      patientEmail,
      reasonForVisit,
      feeAmount: fee,
    });

    setConfirmedApt(newApt);
    setIsConfirmed(true);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 relative">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base sm:text-lg font-['Outfit',sans-serif]">
                {isConfirmed ? 'Appointment Confirmed' : 'Book OPD & Video Appointment'}
              </h2>
              <p className="text-xs text-slate-500">Hello Doctor • Gopalganj & Siwan</p>
            </div>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        {!isConfirmed ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Step 1 & 2: Doctor and Location Selection */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Selected Doctor & Clinic
                </label>
                <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  {selectedDoctor.city} District
                </span>
              </div>

              <select
                value={selectedDoctor.id}
                onChange={(e) => handleDoctorChange(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-sky-500"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.speciality} ({d.city} • {d.hospitalOrClinic})
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-3 pt-1 text-xs text-slate-600">
                <DoctorAvatar doctor={selectedDoctor} size="sm" />
                <div>
                  <div className="font-bold text-slate-900">{selectedDoctor.name}</div>
                  <div className="text-[11px] text-slate-500">{selectedDoctor.hospitalOrClinic} • {selectedDoctor.fullAddress}</div>
                </div>
              </div>
            </div>

            {/* Step 3: Consultation Mode */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Consultation Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultType('In Clinic')}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border flex items-center justify-center gap-2 transition-all ${
                    consultType === 'In Clinic'
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>In-Clinic Visit (₹{selectedDoctor.consultationFee})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultType('Video Consultation')}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border flex items-center justify-center gap-2 transition-all ${
                    consultType === 'Video Consultation'
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>
                    Video Call (₹
                    {selectedDoctor.videoConsultationFee || selectedDoctor.consultationFee})
                  </span>
                </button>
              </div>
            </div>

            {/* Step 4: Preferred Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Appointment Date
                </label>
                <input
                  type="date"
                  required
                  min="2026-08-14"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Available Time Slot
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
                >
                  {selectedDoctor.availableTimeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                  <option value="10:00 AM">10:00 AM (Morning Slot)</option>
                  <option value="11:30 AM">11:30 AM (Morning Slot)</option>
                  <option value="04:30 PM">04:30 PM (Evening Slot)</option>
                  <option value="06:00 PM">06:00 PM (Evening Slot)</option>
                </select>
              </div>
            </div>

            {/* Step 5: Patient Details */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Patient Contact Information
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter patient full name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Age *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="115"
                    value={patientAge}
                    onChange={(e) => setPatientAge(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Gender *
                  </label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 9431X XXXXX"
                    value={patientMobile}
                    onChange={(e) => setPatientMobile(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Reason for Visit / Symptoms
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your health symptoms, past history, or questions for the doctor..."
                  value={reasonForVisit}
                  onChange={(e) => setReasonForVisit(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Fee summary & Confirm button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Total Payable at Clinic:</span>
                <span className="text-2xl font-extrabold text-sky-700">
                  ₹
                  {consultType === 'Video Consultation'
                    ? selectedDoctor.videoConsultationFee || selectedDoctor.consultationFee
                    : selectedDoctor.consultationFee}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-sky-600/20"
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* STEP 6 CONFIRMATION SCREEN & PRINTABLE APPOINTMENT SLIP */
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                Appointment Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Your appointment slip has been generated and queued at the doctor's clinic.
              </p>
            </div>

            {/* Printable Slip Card */}
            <div
              id="printable-slip"
              className="bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-sky-300 space-y-4"
            >
              {/* Slip Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-xs uppercase font-extrabold text-sky-700 tracking-wider">
                    HELLO DOCTOR APPOINTMENT SLIP
                  </span>
                  <div className="text-lg font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                    Token ID: {confirmedApt?.bookingCode}
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">
                  Status: Confirmed
                </span>
              </div>

              {/* Slip Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Doctor</span>
                  <strong className="text-slate-900">{confirmedApt?.doctorName}</strong>
                  <div className="text-slate-600">{confirmedApt?.doctorSpeciality}</div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Hospital / Clinic
                  </span>
                  <strong className="text-slate-900">{confirmedApt?.hospitalOrClinic}</strong>
                  <div className="text-slate-600">{confirmedApt?.city} District</div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Date & Time</span>
                  <strong className="text-slate-900">
                    {confirmedApt?.appointmentDate} at {confirmedApt?.appointmentTime}
                  </strong>
                  <div className="text-sky-700 font-semibold">{confirmedApt?.consultationType}</div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Patient Name
                  </span>
                  <strong className="text-slate-900">
                    {confirmedApt?.patientName} ({confirmedApt?.patientAge}y,{' '}
                    {confirmedApt?.patientGender})
                  </strong>
                  <div className="text-slate-600">{confirmedApt?.patientMobile}</div>
                </div>
              </div>

              {/* Notice */}
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  Please present this digital slip at the reception 15 minutes before your scheduled slot.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handlePrintSlip}
                className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download Slip</span>
              </button>

              <button
                onClick={() => {
                  closeBookingModal();
                  navigateTo('patient-dashboard');
                }}
                className="flex-1 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>View in Patient Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
