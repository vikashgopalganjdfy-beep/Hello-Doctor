import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Building,
  Video,
  User,
  ShieldCheck,
  Bookmark,
  FileText,
  Printer,
  Download,
  AlertCircle,
  CheckCircle2,
  X,
  Phone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DoctorCard } from '../doctors/DoctorCard';
import { DoctorAvatar } from '../common/DoctorAvatar';

export const PatientDashboard: React.FC = () => {
  const {
    currentUser,
    appointments,
    cancelAppointment,
    doctors,
    savedDoctorIds,
    navigateTo,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'saved' | 'records'>('upcoming');

  const upcomingAppointments = appointments.filter(
    (a) => a.status === 'Confirmed' || a.status === 'Pending'
  );
  const pastAppointments = appointments.filter(
    (a) => a.status === 'Completed' || a.status === 'Cancelled'
  );
  const savedDoctors = doctors.filter((d) => savedDoctorIds.includes(d.id));

  const handleJoinVideo = (apt: any) => {
    showToast(`Joining secure encrypted video call with ${apt.doctorName}...`, 'info');
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Patient Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
                {currentUser?.name ? currentUser.name.charAt(0) : 'P'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                    {currentUser?.name || 'Vikash Kumar'}
                  </h1>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                    Patient Profile
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentUser?.email || 'patient@example.com'} • {currentUser?.phone || '+91 94310 XXXXX'}
                </p>
                <div className="text-[11px] text-sky-700 font-semibold mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Ayushman Bharat ABHA ID Linked: 91-8421-4091-2291</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('doctors')}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
              >
                + Book New Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 flex gap-1 overflow-x-auto">
          {[
            { id: 'upcoming', label: `Upcoming Appointments (${upcomingAppointments.length})` },
            { id: 'past', label: `Past Consultations (${pastAppointments.length})` },
            { id: 'saved', label: `Saved Doctors (${savedDoctors.length})` },
            { id: 'records', label: 'Medical Records & Slips' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: UPCOMING APPOINTMENTS */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-14 h-14 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                  No upcoming appointments
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  Book an OPD slot or video consultation with verified specialists in Gopalganj & Siwan.
                </p>
                <button
                  onClick={() => navigateTo('doctors')}
                  className="px-6 py-2.5 bg-sky-600 text-white font-bold text-xs rounded-xl"
                >
                  Find Doctors
                </button>
              </div>
            ) : (
              upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <DoctorAvatar
                      doctor={{ name: apt.doctorName, speciality: apt.doctorSpeciality }}
                      size="sm"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {apt.status}
                        </span>
                        <span className="text-xs font-bold text-sky-700">
                          Token ID: {apt.bookingCode}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                        {apt.doctorName}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600">
                        {apt.doctorSpeciality} • {apt.hospitalOrClinic} ({apt.city})
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-sky-600" />
                          {apt.appointmentDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-sky-600" />
                          {apt.appointmentTime}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          Fee: ₹{apt.feeAmount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 md:self-center">
                    {apt.consultationType === 'Video Consultation' && (
                      <button
                        onClick={() => handleJoinVideo(apt)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Video Call</span>
                      </button>
                    )}

                    <button
                      onClick={handlePrintSlip}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Slip</span>
                    </button>

                    <button
                      onClick={() => cancelAppointment(apt.id)}
                      className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: PAST CONSULTATIONS */}
        {activeTab === 'past' && (
          <div className="space-y-4">
            {pastAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <DoctorAvatar
                    doctor={{ name: apt.doctorName, speciality: apt.doctorSpeciality }}
                    size="sm"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{apt.doctorName}</h4>
                    <div className="text-xs text-slate-500">
                      {apt.doctorSpeciality} • {apt.appointmentDate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                      apt.status === 'Completed'
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {apt.status}
                  </span>
                  <button
                    onClick={() => navigateTo('doctors')}
                    className="text-xs font-bold text-sky-600 hover:underline"
                  >
                    Book Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: SAVED DOCTORS */}
        {activeTab === 'saved' && (
          <div>
            {savedDoctors.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-base font-bold text-slate-900">No saved doctors</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Click the bookmark icon on any doctor card to save them here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDoctors.map((doc) => (
                  <DoctorCard key={doc.id} doctor={doc} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MEDICAL RECORDS */}
        {activeTab === 'records' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Digital Health Slips & Prescriptions
                </h3>
                <p className="text-xs text-slate-500">
                  Access your electronic OPD appointment tokens and diagnostic reports.
                </p>
              </div>
              <button
                onClick={() => showToast('Report upload dialog opened.', 'info')}
                className="px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl"
              >
                + Upload Lab Report
              </button>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Complete Blood Count (CBC) Report', date: 'August 10, 2026', lab: 'Sadar Diagnostic Lab, Gopalganj' },
                { title: 'Cardiology ECG Prescription', date: 'July 28, 2026', lab: 'Dr. Rajeev Kumar Clinic' },
              ].map((rec, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{rec.title}</div>
                      <div className="text-xs text-slate-500">{rec.lab} • {rec.date}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(`Downloading ${rec.title}...`, 'success')}
                    className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg"
                    title="Download Report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
