import React, { useState } from 'react';
import {
  Stethoscope,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Video,
  FileText,
  AlertCircle,
  ShieldCheck,
  Building,
  Phone,
  Power,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DoctorAvatar } from '../common/DoctorAvatar';

export const DoctorDashboard: React.FC = () => {
  const { doctors, appointments, updateAppointmentStatus, showToast } = useApp();
  const doctor = doctors[0]; // Active doctor profile

  const [isAvailableToday, setIsAvailableToday] = useState(doctor.isAvailableToday);
  const [activeTab, setActiveTab] = useState<'today' | 'all' | 'schedule'>('today');
  const [searchPatient, setSearchPatient] = useState('');

  // Doctor's appointments
  const doctorAppointments = appointments.filter((a) => a.doctorId === doctor.id || true);
  const todayAppointments = doctorAppointments.filter((a) => a.status === 'Confirmed');

  const handleToggleAvailability = () => {
    setIsAvailableToday(!isAvailableToday);
    showToast(
      !isAvailableToday
        ? 'Your status is set to: AVAILABLE TODAY for OPD.'
        : 'Your status is set to: OFF DUTY.',
      'info'
    );
  };

  const handleStartConsultation = (apt: any) => {
    if (apt.consultationType === 'Video Consultation') {
      showToast(`Starting video call with patient ${apt.patientName}...`, 'info');
    } else {
      showToast(`Calling token #${apt.bookingCode} for ${apt.patientName}...`, 'info');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Doctor Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <DoctorAvatar doctor={doctor} size="md" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                    {doctor.name}
                  </h1>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Practitioner</span>
                  </span>
                </div>
                <p className="text-xs font-semibold text-sky-700 mt-0.5">
                  {doctor.speciality} • {doctor.hospitalOrClinic} ({doctor.city})
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Medical Registration No: {doctor.registrationNumber}
                </p>
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div>
                <div className="text-xs font-bold text-slate-800">OPD Status</div>
                <div className="text-[11px] text-slate-500">
                  {isAvailableToday ? 'Accepting Patients Today' : 'Marked Off Duty'}
                </div>
              </div>
              <button
                onClick={handleToggleAvailability}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 ${
                  isAvailableToday
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-300 hover:bg-slate-400 text-slate-800'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{isAvailableToday ? 'Online' : 'Offline'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Today's Patients
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {todayAppointments.length}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              In Clinic & Video OPD
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Consults
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-700 mt-1">
              {doctor.reviewCount * 3 + 120}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Recorded in System</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Patient Rating
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">
              {doctor.rating} ★
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              From {doctor.reviewCount} reviews
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Consultation Fee
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              ₹{doctor.consultationFee}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Video: ₹{doctor.videoConsultationFee}</div>
          </div>
        </div>

        {/* Main OPD Queue Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                Today's Patient Appointment Queue
              </h2>
              <p className="text-xs text-slate-500">
                Manage scheduled tokens, live video links, and consultation notes.
              </p>
            </div>

            <div className="w-full sm:w-64 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient name..."
                value={searchPatient}
                onChange={(e) => setSearchPatient(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>

          {/* Queue List */}
          <div className="space-y-4">
            {todayAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 bg-sky-600 text-white rounded-md">
                      Token #{apt.bookingCode}
                    </span>
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      {apt.appointmentTime}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
                      {apt.consultationType}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {apt.patientName}{' '}
                    <span className="text-xs font-normal text-slate-500">
                      ({apt.patientAge}y, {apt.patientGender})
                    </span>
                  </h3>

                  <p className="text-xs text-slate-600">
                    <strong>Chief Complaint:</strong> {apt.reasonForVisit}
                  </p>
                  <p className="text-[11px] text-slate-400">Mobile: {apt.patientMobile}</p>
                </div>

                {/* Status & Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleStartConsultation(apt)}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                  >
                    {apt.consultationType === 'Video Consultation' ? (
                      <Video className="w-3.5 h-3.5" />
                    ) : (
                      <Phone className="w-3.5 h-3.5" />
                    )}
                    <span>Start Consultation</span>
                  </button>

                  <button
                    onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                    className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mark Completed</span>
                  </button>

                  <button
                    onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                    className="px-3 py-2 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
