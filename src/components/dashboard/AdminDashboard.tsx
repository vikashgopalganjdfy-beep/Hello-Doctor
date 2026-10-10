import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  ShieldCheck,
  Building,
  Calendar,
  MessageSquare,
  FileSpreadsheet,
  Settings,
  History,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  DollarSign,
  Phone,
  MapPin,
  Stethoscope,
  Plus,
  Save,
  Check,
  AlertCircle,
  Share2,
  RefreshCw,
  LogOut,
  Volume2,
  VolumeX,
  Bell,
  Download,
  Upload,
  Database,
  FileJson,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Doctor, Speciality, Hospital, Clinic, WhatsAppBooking, Appointment } from '../../types';
import { DoctorAvatar } from '../common/DoctorAvatar';
import { AdminLoginPage } from '../auth/AdminLoginPage';

export const AdminDashboard: React.FC = () => {
  const {
    doctors,
    addDoctor,
    updateDoctor,
    updateDoctorPrice,
    deleteDoctor,
    bulkUpdateDoctors,
    bulkImportDoctors,
    specialities,
    addSpeciality,
    updateSpeciality,
    hospitals,
    addHospital,
    updateHospital,
    clinics,
    addClinic,
    updateClinic,
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    updateAppointmentStatus,
    whatsAppBookings,
    updateWhatsAppBookingStatus,
    doctorApplications,
    approveDoctorApplication,
    rejectDoctorApplication,
    patients,
    activityLogs,
    whatsAppSettings,
    updateWhatsAppSettings,
    websiteSettings,
    updateWebsiteSettings,
    soundAlertEnabled,
    setSoundAlertEnabled,
    testBookingAlarm,
    exportDoctorsCSV,
    exportDoctorsJSON,
    exportAppointmentsCSV,
    exportSystemBackupJSON,
    importDoctorsJSON,
    restoreSystemBackup,
    currentUser,
    logoutUser,
    navigateTo,
    showToast,
  } = useApp();

  // If user is not authenticated as admin, prompt password login
  if (!currentUser || currentUser.role !== 'admin') {
    return <AdminLoginPage />;
  }

  type AdminTab =
    | 'overview'
    | 'doctors'
    | 'add-doctor'
    | 'verifications'
    | 'bulk-import'
    | 'specialities'
    | 'hospitals'
    | 'clinics'
    | 'appointments'
    | 'whatsapp-bookings'
    | 'patients'
    | 'activity-logs'
    | 'whatsapp-settings'
    | 'website-settings'
    | 'data-backup';

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Search & Filter in Doctor table
  const [docSearch, setDocSearch] = useState('');
  const [docCityFilter, setDocCityFilter] = useState<'All' | 'Gopalganj' | 'Siwan'>('All');
  const [docSpecFilter, setDocSpecFilter] = useState('All');
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);

  // Quick Price Edit Modal / Inline
  const [editingPriceDocId, setEditingPriceDocId] = useState<string | null>(null);
  const [tempClinicFee, setTempClinicFee] = useState<number>(500);
  const [tempVideoFee, setTempVideoFee] = useState<number>(400);

  // Edit Doctor Modal / State
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  // Add Doctor Form State
  const [newDocForm, setNewDocForm] = useState({
    name: '',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    gender: 'Male' as 'Male' | 'Female',
    speciality: 'Cardiology',
    specialityId: 'cardiology',
    subSpeciality: '',
    qualification: 'MBBS, MD',
    experienceYears: 8,
    hospitalOrClinic: 'Maya Hospital & Poly Clinic',
    city: 'Gopalganj' as 'Gopalganj' | 'Siwan',
    locality: 'Hospital Road',
    patientVisitAddress: 'Maya Hospital Road, Near Sadar Hospital, Gopalganj',
    fullAddress: 'Hospital Road, Gopalganj, Bihar 841428',
    phone: '+91 9431X XXXXX',
    email: 'doctor@example.com',
    consultationFee: 500,
    videoConsultationFee: 400,
    followUpFee: 300,
    homeVisitFee: 1000,
    consultationTypes: ['In Clinic', 'Video Consultation'] as ('In Clinic' | 'Video Consultation' | 'Home Visit')[],
    languages: ['Hindi', 'Bhojpuri', 'English'],
    about: 'Experienced clinical specialist committed to comprehensive patient care.',
    services: 'OPD, Consultation, ECG, Emergency Care',
    registrationNumber: 'BIMC-99120',
    registrationAuthority: 'Bihar Medical Council, Patna',
    isVerified: true,
    isActive: true,
  });

  // Bulk Import CSV State
  const [csvText, setCsvText] = useState(`name,city,speciality,qualification,fee,phone,address
Dr. Anand Kishor,Gopalganj,Cardiology,MBBS MD,600,+91 94314 55101,Cinema Road Gopalganj
Dr. Priya Mishra,Siwan,Gynecology,MBBS MS (OBG),500,+91 94315 66202,Babunia Road Siwan
Dr. Santosh Rai,Gopalganj,Orthopedics,MBBS MS (Ortho),550,+91 94314 77303,Banjari Road Gopalganj`);

  // WhatsApp Settings Form State
  const [waPhone, setWaPhone] = useState(whatsAppSettings.phoneNumber || '+91 9007355062');
  const [waBookingTemplate, setWaBookingTemplate] = useState(whatsAppSettings.bookingMessageTemplate);
  const [waConfirmTemplate, setWaConfirmTemplate] = useState(whatsAppSettings.confirmationMessageTemplate);

  // Filtered doctors for admin table
  const adminFilteredDoctors = doctors.filter((doc) => {
    if (docCityFilter !== 'All' && doc.city !== docCityFilter) return false;
    if (docSpecFilter !== 'All' && doc.specialityId !== docSpecFilter && doc.speciality !== docSpecFilter)
      return false;
    if (docSearch.trim() !== '') {
      const q = docSearch.toLowerCase();
      return (
        doc.name.toLowerCase().includes(q) ||
        doc.speciality.toLowerCase().includes(q) ||
        doc.hospitalOrClinic.toLowerCase().includes(q) ||
        (doc.patientVisitAddress || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingApplications = doctorApplications.filter((a) => a.status === 'Pending Verification');
  const pendingWABookings = whatsAppBookings.filter((w) => w.status === 'Pending');

  // Handle Add Doctor Submit
  const handleAddDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocForm.name.trim()) {
      showToast('Please enter doctor name', 'error');
      return;
    }

    const created = addDoctor({
      ...newDocForm,
      name: newDocForm.name.startsWith('Dr.') ? newDocForm.name : `Dr. ${newDocForm.name}`,
      services: newDocForm.services.split(',').map((s) => s.trim()).filter(Boolean),
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      availableTimeSlots: ['10:00 AM', '11:30 AM', '04:30 PM', '06:00 PM'],
    });

    // Reset and switch to doctors list
    setActiveTab('doctors');
    showToast(`Dr. ${created.name} added and published live!`, 'success');
  };

  // Handle Bulk Import Submit
  const handleBulkImportSubmit = () => {
    try {
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        showToast('Please provide valid CSV rows', 'error');
        return;
      }

      const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
      const records: Partial<Doctor>[] = [];

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',').map((c) => c.trim());
        if (row.length >= 3) {
          const docObj: any = {
            name: row[0] || 'Dr. Medical Practitioner',
            city: row[1] === 'Siwan' ? 'Siwan' : 'Gopalganj',
            speciality: row[2] || 'General Medicine',
            qualification: row[3] || 'MBBS',
            consultationFee: Number(row[4]) || 500,
            phone: row[5] || '+91 9431X XXXXX',
            patientVisitAddress: row[6] || 'Hospital Road, Bihar',
            fullAddress: row[6] || 'Hospital Road, Bihar',
            isVerified: true,
            isActive: true,
          };
          records.push(docObj);
        }
      }

      const count = bulkImportDoctors(records);
      setActiveTab('doctors');
    } catch (err) {
      showToast('Error parsing CSV. Please check formatting.', 'error');
    }
  };

  // Appointment Management State
  const [aptSearch, setAptSearch] = useState('');
  const [aptChannelFilter, setAptChannelFilter] = useState<'all' | 'Website' | 'WhatsApp'>('all');
  const [aptStatusFilter, setAptStatusFilter] = useState<'all' | 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'>('all');
  const [aptCityFilter, setAptCityFilter] = useState<'all' | 'Gopalganj' | 'Siwan'>('all');

  // Manual Walk-in Appointment Modal State
  const [isAddAptModalOpen, setIsAddAptModalOpen] = useState(false);
  const [manualAptForm, setManualAptForm] = useState({
    doctorId: doctors[0]?.id || '',
    patientName: '',
    patientMobile: '',
    patientAge: 30,
    patientGender: 'Male' as 'Male' | 'Female' | 'Other',
    consultationType: 'In Clinic' as 'In Clinic' | 'Video Consultation' | 'Home Visit',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: '11:00 AM',
    reasonForVisit: 'General OPD Consultation',
    feeAmount: 500,
    status: 'Confirmed' as Appointment['status'],
    bookingChannel: 'Walk-in' as 'Website' | 'WhatsApp' | 'Walk-in',
  });

  // Edit Appointment Modal State
  const [editingApt, setEditingApt] = useState<Appointment | null>(null);

  // Filtered Appointments for Admin Desk
  const filteredAppointments = appointments.filter((apt) => {
    if (aptChannelFilter !== 'all' && (apt.bookingChannel || 'Website') !== aptChannelFilter) return false;
    if (aptStatusFilter !== 'all' && apt.status !== aptStatusFilter) return false;
    if (aptCityFilter !== 'all' && apt.city !== aptCityFilter) return false;
    if (aptSearch.trim() !== '') {
      const q = aptSearch.toLowerCase();
      return (
        apt.bookingCode.toLowerCase().includes(q) ||
        apt.patientName.toLowerCase().includes(q) ||
        apt.patientMobile.toLowerCase().includes(q) ||
        apt.doctorName.toLowerCase().includes(q) ||
        apt.doctorSpeciality.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleManualAptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualAptForm.patientName.trim() || !manualAptForm.patientMobile.trim()) {
      showToast('Please enter patient name and mobile number', 'error');
      return;
    }
    const targetDoc = doctors.find((d) => d.id === manualAptForm.doctorId) || doctors[0];
    addAppointment({
      doctorId: targetDoc.id,
      doctorName: targetDoc.name,
      doctorSpeciality: targetDoc.speciality,
      doctorPhoto: targetDoc.photo,
      hospitalOrClinic: targetDoc.hospitalOrClinic,
      patientVisitAddress: targetDoc.patientVisitAddress || targetDoc.fullAddress,
      city: targetDoc.city,
      consultationType: manualAptForm.consultationType,
      appointmentDate: manualAptForm.appointmentDate,
      appointmentTime: manualAptForm.appointmentTime,
      patientName: manualAptForm.patientName,
      patientAge: Number(manualAptForm.patientAge),
      patientGender: manualAptForm.patientGender,
      patientMobile: manualAptForm.patientMobile,
      patientEmail: '',
      reasonForVisit: manualAptForm.reasonForVisit,
      feeAmount: manualAptForm.feeAmount,
      status: manualAptForm.status,
      bookingChannel: manualAptForm.bookingChannel,
    });
    setIsAddAptModalOpen(false);
    setManualAptForm({
      doctorId: doctors[0]?.id || '',
      patientName: '',
      patientMobile: '',
      patientAge: 30,
      patientGender: 'Male',
      consultationType: 'In Clinic',
      appointmentDate: new Date().toISOString().split('T')[0],
      appointmentTime: '11:00 AM',
      reasonForVisit: 'General OPD Consultation',
      feeAmount: 500,
      status: 'Confirmed',
      bookingChannel: 'Walk-in',
    });
  };

  const handleEditAptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApt) return;
    updateAppointment(editingApt.id, {
      patientName: editingApt.patientName,
      patientMobile: editingApt.patientMobile,
      patientAge: editingApt.patientAge,
      appointmentDate: editingApt.appointmentDate,
      appointmentTime: editingApt.appointmentTime,
      consultationType: editingApt.consultationType,
      reasonForVisit: editingApt.reasonForVisit,
      feeAmount: editingApt.feeAmount,
      status: editingApt.status,
      notes: editingApt.notes,
    });
    setEditingApt(null);
  };

  return (
    <div className="bg-[#0F172A] min-h-screen text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#1E293B] border-b border-slate-700/80 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 cursor-pointer font-['Outfit',sans-serif]"
          >
            <span className="text-xl font-black text-white">
              HELLO<span className="text-teal-400">DOCTOR</span>
            </span>
            <span className="px-2 py-0.5 bg-blue-600/30 text-blue-400 border border-blue-500/40 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Admin Suite
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          {/* Sound Alarm Controls */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 rounded-full px-2.5 py-1">
            <button
              onClick={() => setSoundAlertEnabled(!soundAlertEnabled)}
              title={soundAlertEnabled ? 'Click to Mute Alarm Sound' : 'Click to Enable Alarm Sound'}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                soundAlertEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {soundAlertEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Alarm: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span>Alarm: OFF</span>
                </>
              )}
            </button>

            <button
              onClick={testBookingAlarm}
              title="Test the Web Audio Chime Alarm"
              className="px-2 py-0.5 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 rounded-full text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1"
            >
              <Bell className="w-3 h-3 text-blue-300" />
              <span>Test Chime</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Database Live • {doctors.length} Doctors</span>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className="px-3.5 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </button>

          <button
            onClick={() => logoutUser()}
            className="px-3.5 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body: Sidebar + Dynamic Content Canvas */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Admin Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-[#1E293B] border-r border-slate-700/80 p-4 space-y-6 shrink-0 overflow-y-auto">
          {/* Admin User Info */}
          <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              AD
            </div>
            <div className="min-w-0">
              <div className="font-bold text-white text-xs truncate">
                {currentUser?.name || 'Super Admin'}
              </div>
              <div className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider">
                Full Database Access
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Executive Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'doctors'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-teal-400" />
                <span>All Doctors</span>
              </div>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-full text-[10px]">
                {doctors.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('add-doctor')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'add-doctor'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <span>+ Add New Doctor</span>
            </button>

            <button
              onClick={() => setActiveTab('verifications')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'verifications'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Verifications</span>
              </div>
              {pendingApplications.length > 0 && (
                <span className="px-2 py-0.5 bg-amber-500 text-slate-900 font-bold rounded-full text-[10px]">
                  {pendingApplications.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('bulk-import')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'bulk-import'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Bulk Import CSV</span>
            </button>

            <div className="pt-3 pb-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider px-3">
              Operations & Bookings
            </div>

            <button
              onClick={() => setActiveTab('whatsapp-bookings')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'whatsapp-bookings'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Bookings</span>
              </div>
              {pendingWABookings.length > 0 && (
                <span className="px-2 py-0.5 bg-emerald-500 text-slate-900 font-bold rounded-full text-[10px]">
                  {pendingWABookings.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'appointments'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Appointments</span>
              </div>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-full text-[10px]">
                {appointments.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('specialities')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'specialities'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <span>Specialities (20+)</span>
            </button>

            <button
              onClick={() => setActiveTab('hospitals')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'hospitals'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Building className="w-4 h-4 text-indigo-400" />
              <span>Hospitals & Clinics</span>
            </button>

            <button
              onClick={() => setActiveTab('patients')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'patients'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4 text-pink-400" />
              <span>Patient Directory</span>
            </button>

            <div className="pt-3 pb-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider px-3">
              Logs & Configuration
            </div>

            <button
              onClick={() => setActiveTab('activity-logs')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'activity-logs'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4 text-amber-400" />
              <span>Audit Activity Logs</span>
            </button>

            <button
              onClick={() => setActiveTab('whatsapp-settings')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'whatsapp-settings'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Integration</span>
            </button>

            <button
              onClick={() => setActiveTab('website-settings')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'website-settings'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>CMS Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('data-backup')}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'data-backup'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Database className="w-4 h-4 text-indigo-400" />
              <span>💾 Backup & Export</span>
            </button>
          </nav>
        </aside>

        {/* Dynamic Center Canvas */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* TAB 1: EXECUTIVE DASHBOARD OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit',sans-serif]">
                  Hello Doctor — Admin Operations Desk
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Real-time centralized control for Gopalganj & Siwan doctor discovery, pricing, and WhatsApp bookings.
                </p>
              </div>

              {/* KPI Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/80 space-y-2">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Total Doctors</span>
                    <Users className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{doctors.length}</div>
                  <div className="text-[11px] text-teal-400">
                    {doctors.filter((d) => d.city === 'Gopalganj').length} Gopalganj • {doctors.filter((d) => d.city === 'Siwan').length} Siwan
                  </div>
                </div>

                <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/80 space-y-2">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Pending Verifications</span>
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black text-amber-400">{pendingApplications.length}</div>
                  <button
                    onClick={() => setActiveTab('verifications')}
                    className="text-[11px] text-amber-300 font-bold hover:underline cursor-pointer"
                  >
                    Review applications →
                  </button>
                </div>

                <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/80 space-y-2">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>WhatsApp Bookings</span>
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-emerald-400">{whatsAppBookings.length}</div>
                  <div className="text-[11px] text-emerald-300">
                    {pendingWABookings.length} Pending Confirmation
                  </div>
                </div>

                <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/80 space-y-2">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Confirmed Tokens</span>
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-3xl font-black text-blue-400">{appointments.length}</div>
                  <div className="text-[11px] text-slate-400">Total appointments booked</div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="p-6 bg-[#1E293B] rounded-3xl border border-slate-700/80 space-y-4">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                  Quick Management Operations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setActiveTab('add-doctor')}
                    className="p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 rounded-2xl text-left space-y-1 transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-blue-300 text-sm flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      <span>Add New Doctor</span>
                    </div>
                    <p className="text-xs text-slate-400">Register and publish doctor to directory instantly</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('whatsapp-bookings')}
                    className="p-4 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 rounded-2xl text-left space-y-1 transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Bookings Queue</span>
                    </div>
                    <p className="text-xs text-slate-400">1-click confirm & WhatsApp chat reply</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('bulk-import')}
                    className="p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 rounded-2xl text-left space-y-1 transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-purple-300 text-sm flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Bulk CSV Import</span>
                    </div>
                    <p className="text-xs text-slate-400">Upload 50+ doctors at once</p>
                  </button>
                </div>
              </div>

              {/* Recent Activity Mini-Feed */}
              <div className="p-6 bg-[#1E293B] rounded-3xl border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                    Recent Administrative Activity
                  </h3>
                  <button
                    onClick={() => setActiveTab('activity-logs')}
                    className="text-xs text-teal-400 hover:underline cursor-pointer"
                  >
                    View all logs →
                  </button>
                </div>

                <div className="space-y-2">
                  {activityLogs.slice(0, 5).map((log) => (
                    <div
                      key={log.id}
                      className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-teal-300">{log.action}:</span>{' '}
                        <span className="text-slate-200">{log.entityName}</span>
                        {log.newValue && (
                          <span className="text-slate-400 ml-2">({log.oldValue} → {log.newValue})</span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 shrink-0">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ALL DOCTORS DIRECTORY & CRUD */}
          {activeTab === 'doctors' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
                    Doctor Directory Management ({adminFilteredDoctors.length})
                  </h1>
                  <p className="text-xs text-slate-400">
                    Live database view. Any price or detail edit is immediately reflected on the public website.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('add-doctor')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-full flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Doctor</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="p-4 bg-[#1E293B] rounded-2xl border border-slate-700/80 flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search doctor by name, speciality, locality..."
                    value={docSearch}
                    onChange={(e) => setDocSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <select
                  value={docCityFilter}
                  onChange={(e) => setDocCityFilter(e.target.value as any)}
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="All">All Districts</option>
                  <option value="Gopalganj">Gopalganj</option>
                  <option value="Siwan">Siwan</option>
                </select>

                <select
                  value={docSpecFilter}
                  onChange={(e) => setDocSpecFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="All">All Specialities</option>
                  {specialities.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctors Table */}
              <div className="bg-[#1E293B] rounded-3xl border border-slate-700/80 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-700">
                      <tr>
                        <th className="py-3 px-4">Doctor</th>
                        <th className="py-3 px-4">Speciality</th>
                        <th className="py-3 px-4">City / Locality</th>
                        <th className="py-3 px-4">Patient Visit Location</th>
                        <th className="py-3 px-4">Consultation Fee</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {adminFilteredDoctors.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <DoctorAvatar doctor={doc} size="sm" />
                              <div>
                                <div className="font-bold text-white">{doc.name}</div>
                                <div className="text-[11px] text-slate-400">{doc.qualification}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-semibold text-teal-300">{doc.speciality}</span>
                          </td>

                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 bg-slate-800 text-blue-400 font-bold rounded-md">
                              {doc.city}
                            </span>
                            <div className="text-[11px] text-slate-400 mt-0.5">{doc.locality}</div>
                          </td>

                          <td className="py-3 px-4 max-w-xs">
                            <span className="text-slate-300 line-clamp-1">
                              {doc.patientVisitAddress || doc.fullAddress}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            {editingPriceDocId === doc.id ? (
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="number"
                                  value={tempClinicFee}
                                  onChange={(e) => setTempClinicFee(Number(e.target.value))}
                                  className="w-16 px-2 py-1 bg-slate-900 border border-blue-500 rounded text-xs text-white"
                                />
                                <button
                                  onClick={() => {
                                    updateDoctorPrice(doc.id, tempClinicFee, tempVideoFee);
                                    setEditingPriceDocId(null);
                                  }}
                                  className="p-1 bg-emerald-600 text-white rounded cursor-pointer"
                                  title="Save New Price"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-emerald-400">₹{doc.consultationFee}</span>
                                <button
                                  onClick={() => {
                                    setEditingPriceDocId(doc.id);
                                    setTempClinicFee(doc.consultationFee);
                                    setTempVideoFee(doc.videoConsultationFee || 400);
                                  }}
                                  className="p-1 text-slate-400 hover:text-blue-400 cursor-pointer"
                                  title="Edit Consultation Price"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                doc.isVerified
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-300'
                              }`}
                            >
                              {doc.isVerified ? 'Verified' : 'Pending'}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  updateDoctor(doc.id, { isVerified: !doc.isVerified });
                                }}
                                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] cursor-pointer"
                                title="Toggle Verified Badge"
                              >
                                {doc.isVerified ? 'Unverify' : 'Verify'}
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete / archive ${doc.name}?`)) {
                                    deleteDoctor(doc.id);
                                  }
                                }}
                                className="p-1.5 bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 rounded cursor-pointer"
                                title="Delete / Archive Doctor"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADD DOCTOR FULL FORM */}
          {activeTab === 'add-doctor' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
                  Register New Doctor Profile
                </h1>
                <p className="text-xs text-slate-400">
                  Add verified doctor to Gopalganj or Siwan directory. Profile is instantly queryable and bookable.
                </p>
              </div>

              <form
                onSubmit={handleAddDoctorSubmit}
                className="bg-[#1E293B] rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Doctor Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Rajeshwar Singh"
                      value={newDocForm.name}
                      onChange={(e) => setNewDocForm({ ...newDocForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      District *
                    </label>
                    <select
                      value={newDocForm.city}
                      onChange={(e) =>
                        setNewDocForm({
                          ...newDocForm,
                          city: e.target.value as any,
                          patientVisitAddress:
                            e.target.value === 'Gopalganj'
                              ? 'Near Sadar Hospital Road, Gopalganj'
                              : 'Babunia Road, Opposite SBI, Siwan',
                        })
                      }
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Gopalganj">Gopalganj District</option>
                      <option value="Siwan">Siwan District</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Primary Speciality *
                    </label>
                    <select
                      value={newDocForm.speciality}
                      onChange={(e) => {
                        const matching = specialities.find((s) => s.name === e.target.value);
                        setNewDocForm({
                          ...newDocForm,
                          speciality: e.target.value,
                          specialityId: matching ? matching.id : 'general-medicine',
                        });
                      }}
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      {specialities.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Qualifications *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MBBS, MD (Medicine), DM"
                      value={newDocForm.qualification}
                      onChange={(e) => setNewDocForm({ ...newDocForm, qualification: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Experience (Years) *
                    </label>
                    <input
                      type="number"
                      value={newDocForm.experienceYears}
                      onChange={(e) =>
                        setNewDocForm({ ...newDocForm, experienceYears: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      min={1}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Hospital / Clinic Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Maya Heart & Multispeciality Clinic"
                      value={newDocForm.hospitalOrClinic}
                      onChange={(e) => setNewDocForm({ ...newDocForm, hospitalOrClinic: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Locality / Road *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hospital Road, Banjari Road, Babunia Road"
                      value={newDocForm.locality}
                      onChange={(e) => setNewDocForm({ ...newDocForm, locality: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Patient Visit Address (Shown to Patients) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maya Hospital Road, Near Sadar Hospital, Gopalganj"
                    value={newDocForm.patientVisitAddress}
                    onChange={(e) => setNewDocForm({ ...newDocForm, patientVisitAddress: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* Consultation Fees */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                      Clinic Consultation Fee (₹) *
                    </label>
                    <input
                      type="number"
                      value={newDocForm.consultationFee}
                      onChange={(e) =>
                        setNewDocForm({ ...newDocForm, consultationFee: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2.5 bg-slate-800 border border-emerald-500/50 rounded-xl text-xs text-white focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                      Video Consultation Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={newDocForm.videoConsultationFee}
                      onChange={(e) =>
                        setNewDocForm({ ...newDocForm, videoConsultationFee: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2.5 bg-slate-800 border border-blue-500/50 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. BIMC-29401"
                      value={newDocForm.registrationNumber}
                      onChange={(e) => setNewDocForm({ ...newDocForm, registrationNumber: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('doctors')}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-full transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-full shadow-md transition-colors cursor-pointer"
                  >
                    Publish Doctor Profile Live
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: PENDING VERIFICATIONS */}
          {activeTab === 'verifications' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
                  Pending Doctor Verifications ({pendingApplications.length})
                </h1>
                <p className="text-xs text-slate-400">
                  Review doctor registrations submitted via public onboarding. Approving will automatically create their verified live profile.
                </p>
              </div>

              {pendingApplications.length === 0 ? (
                <div className="p-12 bg-[#1E293B] rounded-3xl text-center border border-slate-700 text-slate-400 text-xs">
                  <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  All doctor registration requests have been processed. Zero pending queues.
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingApplications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-[#1E293B] rounded-3xl p-6 border border-slate-700 space-y-4 shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-white">{app.fullName}</span>
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 font-bold rounded text-[10px]">
                              {app.city} District
                            </span>
                          </div>
                          <p className="text-xs text-teal-300 font-semibold">
                            {app.speciality} • {app.qualification} ({app.experienceYears} Yrs Exp)
                          </p>
                          <p className="text-xs text-slate-400">
                            <strong>Clinic:</strong> {app.hospitalOrClinic} — {app.patientVisitAddress}
                          </p>
                          <div className="text-[11px] text-slate-400 font-mono">
                            Council: {app.councilName} • Reg No: {app.registrationNumber}
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <div className="text-xs text-emerald-400 font-bold">
                            Fee: ₹{app.consultationFee}
                          </div>
                          <div className="text-[10px] text-slate-500">{app.submittedAt}</div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-700/80 flex items-center justify-end gap-3">
                        <button
                          onClick={() => rejectDoctorApplication(app.id)}
                          className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-full text-xs font-bold transition-colors cursor-pointer"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => approveDoctorApplication(app.id)}
                          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-extrabold shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Publish to Directory</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: BULK IMPORT CSV */}
          {activeTab === 'bulk-import' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
                  Bulk Import Doctors via CSV
                </h1>
                <p className="text-xs text-slate-400">
                  Paste comma-separated doctor records to rapidly seed 50+ practitioners across Gopalganj and Siwan.
                </p>
              </div>

              <div className="bg-[#1E293B] rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                    CSV Data (name, city, speciality, qualification, fee, phone, address)
                  </label>
                  <textarea
                    rows={8}
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    className="w-full p-4 bg-slate-900 border border-slate-700 rounded-2xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={handleBulkImportSubmit}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-full shadow-md transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Run Bulk Import</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: WHATSAPP BOOKINGS MANAGEMENT */}
          {activeTab === 'whatsapp-bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
                    WhatsApp Booking Requests ({whatsAppBookings.length})
                  </h1>
                  <p className="text-xs text-slate-400">
                    Appointments requested via official WhatsApp ({whatsAppSettings.phoneNumber || '+91 9007355062'}).
                  </p>
                </div>
              </div>

              <div className="bg-[#1E293B] rounded-3xl border border-slate-700/80 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-700">
                      <tr>
                        <th className="py-3 px-4">Booking Code</th>
                        <th className="py-3 px-4">Patient</th>
                        <th className="py-3 px-4">Doctor / Speciality</th>
                        <th className="py-3 px-4">Slot & Location</th>
                        <th className="py-3 px-4">Fee</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {whatsAppBookings.map((wb) => (
                        <tr key={wb.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-teal-400">
                            {wb.bookingCode}
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{wb.patientName}</div>
                            <div className="text-[11px] text-slate-400">{wb.patientMobile}</div>
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-200">{wb.doctorName}</div>
                            <div className="text-[11px] text-blue-400">{wb.doctorSpeciality}</div>
                          </td>

                          <td className="py-3 px-4">
                            <div className="text-slate-300 font-medium">
                              {wb.preferredDate} at {wb.preferredTime}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate max-w-xs">
                              {wb.patientVisitAddress}
                            </div>
                          </td>

                          <td className="py-3 px-4 font-bold text-emerald-400">
                            ₹{wb.feeAmount}
                          </td>

                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                wb.status === 'Confirmed'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-amber-500/20 text-amber-300'
                              }`}
                            >
                              {wb.status}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {wb.status === 'Pending' && (
                                <button
                                  onClick={() => updateWhatsAppBookingStatus(wb.id, 'Confirmed')}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold cursor-pointer"
                                >
                                  Confirm
                                </button>
                              )}

                              <a
                                href={`https://wa.me/${wb.patientMobile.replace(/\D/g, '')}?text=${encodeURIComponent(
                                  `Hello ${wb.patientName}, this is Hello Doctor Gopalganj/Siwan regarding your booking ${wb.bookingCode} for ${wb.doctorName}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded text-[11px] font-bold flex items-center gap-1"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>Chat</span>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: APPOINTMENTS DESK */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif] flex items-center gap-2.5">
                    <Calendar className="w-6 h-6 text-blue-400" />
                    <span>Real-Time Appointment & Token Command Desk</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    All bookings from Website OPD, WhatsApp, and Walk-in registrations across Gopalganj & Siwan. Changes sync live with persistent database.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setIsAddAptModalOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Walk-in / Manual Booking</span>
                  </button>

                  <button
                    onClick={testBookingAlarm}
                    title="Test Booking Sound Chime"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Bell className="w-3.5 h-3.5 text-amber-400" />
                    <span>Test Alarm</span>
                  </button>

                  <button
                    onClick={exportAppointmentsCSV}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Live KPI Metric Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-[#1E293B] p-3.5 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Total Bookings</div>
                  <div className="text-xl font-black text-white mt-0.5">{appointments.length}</div>
                  <div className="text-[10px] text-blue-400">Live Database</div>
                </div>

                <div className="bg-[#1E293B] p-3.5 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Website OPD</div>
                  <div className="text-xl font-black text-sky-400 mt-0.5">
                    {appointments.filter((a) => a.bookingChannel === 'Website' || !a.bookingChannel).length}
                  </div>
                  <div className="text-[10px] text-slate-400">Direct Tokens</div>
                </div>

                <div className="bg-[#1E293B] p-3.5 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] font-bold uppercase text-slate-400">WhatsApp Leads</div>
                  <div className="text-xl font-black text-emerald-400 mt-0.5">
                    {appointments.filter((a) => a.bookingChannel === 'WhatsApp').length}
                  </div>
                  <div className="text-[10px] text-emerald-300">Chat Bookings</div>
                </div>

                <div className="bg-[#1E293B] p-3.5 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Pending Review</div>
                  <div className="text-xl font-black text-amber-400 mt-0.5">
                    {appointments.filter((a) => a.status === 'Pending').length}
                  </div>
                  <div className="text-[10px] text-amber-300">Requires Action</div>
                </div>

                <div className="bg-[#1E293B] p-3.5 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Confirmed</div>
                  <div className="text-xl font-black text-emerald-400 mt-0.5">
                    {appointments.filter((a) => a.status === 'Confirmed').length}
                  </div>
                  <div className="text-[10px] text-emerald-400">Scheduled OPD</div>
                </div>

                <div className="bg-[#1E293B] p-3.5 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Completed</div>
                  <div className="text-xl font-black text-purple-400 mt-0.5">
                    {appointments.filter((a) => a.status === 'Completed').length}
                  </div>
                  <div className="text-[10px] text-purple-300">Consulted</div>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="bg-[#1E293B] p-4 rounded-2xl border border-slate-700/80 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search Token, Patient, Mobile, Doctor..."
                      value={aptSearch}
                      onChange={(e) => setAptSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Channel Filter */}
                  <div>
                    <select
                      value={aptChannelFilter}
                      onChange={(e) => setAptChannelFilter(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">All Channels (Web + WhatsApp + Walk-in)</option>
                      <option value="Website">🌐 Website Direct OPD</option>
                      <option value="WhatsApp">💬 WhatsApp Lead Requests</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <select
                      value={aptStatusFilter}
                      onChange={(e) => setAptStatusFilter(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">All Statuses (Pending, Confirmed, etc.)</option>
                      <option value="Pending">⏳ Pending Action</option>
                      <option value="Confirmed">✅ Confirmed</option>
                      <option value="Completed">🏁 Completed</option>
                      <option value="Cancelled">❌ Cancelled</option>
                    </select>
                  </div>

                  {/* District City Filter */}
                  <div>
                    <select
                      value={aptCityFilter}
                      onChange={(e) => setAptCityFilter(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">All Districts (Gopalganj + Siwan)</option>
                      <option value="Gopalganj">Gopalganj District</option>
                      <option value="Siwan">Siwan District</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Showing {filteredAppointments.length} of {appointments.length} appointments</span>
                  </div>

                  {(aptSearch || aptChannelFilter !== 'all' || aptStatusFilter !== 'all' || aptCityFilter !== 'all') && (
                    <button
                      onClick={() => {
                        setAptSearch('');
                        setAptChannelFilter('all');
                        setAptStatusFilter('all');
                        setAptCityFilter('all');
                      }}
                      className="text-blue-400 hover:underline cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Appointments Data Table */}
              <div className="bg-[#1E293B] rounded-3xl border border-slate-700/80 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-700">
                      <tr>
                        <th className="py-3 px-4">Token & Channel</th>
                        <th className="py-3 px-4">Patient Details</th>
                        <th className="py-3 px-4">Doctor & Speciality</th>
                        <th className="py-3 px-4">Slot & Type</th>
                        <th className="py-3 px-4">Fee</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Database Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-10 text-center text-slate-400">
                            No appointments found matching your search and filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((apt) => (
                          <tr key={apt.id} className="hover:bg-slate-800/50 transition-colors">
                            {/* Token Code & Channel */}
                            <td className="py-3 px-4">
                              <div className="font-mono font-bold text-blue-400">{apt.bookingCode}</div>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold ${
                                  apt.bookingChannel === 'WhatsApp'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                }`}
                              >
                                {apt.bookingChannel === 'WhatsApp' ? '💬 WhatsApp' : '🌐 Website OPD'}
                              </span>
                              <div className="text-[10px] text-slate-500 mt-0.5">{apt.bookedAt}</div>
                            </td>

                            {/* Patient Info */}
                            <td className="py-3 px-4">
                              <div className="font-bold text-white">{apt.patientName}</div>
                              <div className="text-[11px] text-slate-300 font-mono flex items-center gap-1.5 mt-0.5">
                                <span>{apt.patientMobile}</span>
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                {apt.patientAge ? `${apt.patientAge}y` : ''} • {apt.patientGender || 'Patient'}
                              </div>
                              {apt.reasonForVisit && (
                                <div className="text-[10px] text-slate-400 italic truncate max-w-xs mt-0.5" title={apt.reasonForVisit}>
                                  "{apt.reasonForVisit}"
                                </div>
                              )}
                            </td>

                            {/* Doctor with Emoji Avatar */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <DoctorAvatar
                                  doctor={{ name: apt.doctorName, speciality: apt.doctorSpeciality }}
                                  size="xs"
                                />
                                <div>
                                  <div className="font-bold text-slate-200">{apt.doctorName}</div>
                                  <div className="text-[11px] text-teal-400 font-semibold">{apt.doctorSpeciality}</div>
                                  <div className="text-[10px] text-slate-500">{apt.hospitalOrClinic} • {apt.city}</div>
                                </div>
                              </div>
                            </td>

                            {/* Slot & Type */}
                            <td className="py-3 px-4">
                              <div className="text-slate-200 font-semibold">
                                {apt.appointmentDate}
                              </div>
                              <div className="text-slate-400 text-[11px]">{apt.appointmentTime}</div>
                              <span className="inline-block mt-1 px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]">
                                {apt.consultationType}
                              </span>
                            </td>

                            {/* Fee */}
                            <td className="py-3 px-4 font-bold text-emerald-400">
                              ₹{apt.feeAmount}
                            </td>

                            {/* Status */}
                            <td className="py-3 px-4">
                              <select
                                value={apt.status}
                                onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as any)}
                                className={`px-2 py-1 rounded-lg text-[11px] font-bold border cursor-pointer focus:outline-none ${
                                  apt.status === 'Confirmed'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : apt.status === 'Pending'
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : apt.status === 'Completed'
                                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                }`}
                              >
                                <option value="Pending" className="bg-slate-900 text-amber-300">⏳ Pending</option>
                                <option value="Confirmed" className="bg-slate-900 text-emerald-300">✅ Confirmed</option>
                                <option value="Completed" className="bg-slate-900 text-purple-300">🏁 Completed</option>
                                <option value="Cancelled" className="bg-slate-900 text-rose-300">❌ Cancelled</option>
                              </select>
                            </td>

                            {/* Actions Suite */}
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                {/* Direct WhatsApp */}
                                <a
                                  href={`https://wa.me/${apt.patientMobile.replace(/\D/g, '')}?text=${encodeURIComponent(
                                    `Hello ${apt.patientName}, this is Hello Doctor Gopalganj/Siwan. Regarding your booking token ${apt.bookingCode} for ${apt.doctorName} on ${apt.appointmentDate} at ${apt.appointmentTime}. Status: ${apt.status}.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 rounded-lg transition-colors cursor-pointer"
                                  title="Chat with Patient on WhatsApp"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </a>

                                {/* Direct Call */}
                                <a
                                  href={`tel:${apt.patientMobile}`}
                                  className="p-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-lg transition-colors cursor-pointer"
                                  title="Call Patient"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>

                                {/* Edit Button */}
                                <button
                                  onClick={() => setEditingApt(apt)}
                                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
                                  title="Edit Appointment Details"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>

                                {/* Delete Button */}
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete token ${apt.bookingCode} for ${apt.patientName}?`)) {
                                      deleteAppointment(apt.id);
                                    }
                                  }}
                                  className="p-1.5 bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Appointment from Database"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MANUAL WALK-IN APPOINTMENT MODAL */}
              {isAddAptModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-[#1E293B] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                      <div>
                        <h2 className="text-lg font-bold text-white font-['Outfit',sans-serif] flex items-center gap-2">
                          <Plus className="w-5 h-5 text-blue-400" />
                          <span>Add Manual / Walk-in OPD Appointment</span>
                        </h2>
                        <p className="text-xs text-slate-400">Instantly generate a token code and register patient into database.</p>
                      </div>
                      <button
                        onClick={() => setIsAddAptModalOpen(false)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleManualAptSubmit} className="space-y-4">
                      {/* Doctor Select */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Assign Doctor *
                        </label>
                        <select
                          value={manualAptForm.doctorId}
                          onChange={(e) => {
                            const selected = doctors.find((d) => d.id === e.target.value);
                            setManualAptForm({
                              ...manualAptForm,
                              doctorId: e.target.value,
                              feeAmount: selected ? selected.consultationFee : 500,
                            });
                          }}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                          required
                        >
                          {doctors.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name} — {d.speciality} ({d.city} • ₹{d.consultationFee})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Patient Name & Mobile */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Patient Name *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Rahul Sharma"
                            value={manualAptForm.patientName}
                            onChange={(e) => setManualAptForm({ ...manualAptForm, patientName: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Patient Mobile *
                          </label>
                          <input
                            type="tel"
                            placeholder="e.g. +91 9431X XXXXX"
                            value={manualAptForm.patientMobile}
                            onChange={(e) => setManualAptForm({ ...manualAptForm, patientMobile: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>

                      {/* Age, Gender, Fee */}
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Age
                          </label>
                          <input
                            type="number"
                            value={manualAptForm.patientAge}
                            onChange={(e) => setManualAptForm({ ...manualAptForm, patientAge: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                            min={1}
                            max={120}
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Gender
                          </label>
                          <select
                            value={manualAptForm.patientGender}
                            onChange={(e) => setManualAptForm({ ...manualAptForm, patientGender: e.target.value as any })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Consultation Fee (₹)
                          </label>
                          <input
                            type="number"
                            value={manualAptForm.feeAmount}
                            onChange={(e) => setManualAptForm({ ...manualAptForm, feeAmount: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Appointment Date
                          </label>
                          <input
                            type="date"
                            value={manualAptForm.appointmentDate}
                            onChange={(e) => setManualAptForm({ ...manualAptForm, appointmentDate: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Time Slot
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 11:30 AM"
                            value={manualAptForm.appointmentTime}
                            onChange={(e) => setManualAptForm({ ...manualAptForm, appointmentTime: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Reason */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Reason for Visit / Symptoms
                        </label>
                        <input
                          type="text"
                          value={manualAptForm.reasonForVisit}
                          onChange={(e) => setManualAptForm({ ...manualAptForm, reasonForVisit: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                        <button
                          type="button"
                          onClick={() => setIsAddAptModalOpen(false)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md"
                        >
                          Save & Generate Token
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* EDIT APPOINTMENT MODAL */}
              {editingApt && (
                <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-[#1E293B] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                      <div>
                        <h2 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                          Edit Token: {editingApt.bookingCode}
                        </h2>
                        <p className="text-xs text-slate-400">Doctor: {editingApt.doctorName}</p>
                      </div>
                      <button
                        onClick={() => setEditingApt(null)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleEditAptSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                          Patient Name
                        </label>
                        <input
                          type="text"
                          value={editingApt.patientName}
                          onChange={(e) => setEditingApt({ ...editingApt, patientName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                            Mobile
                          </label>
                          <input
                            type="text"
                            value={editingApt.patientMobile}
                            onChange={(e) => setEditingApt({ ...editingApt, patientMobile: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                            Fee (₹)
                          </label>
                          <input
                            type="number"
                            value={editingApt.feeAmount}
                            onChange={(e) => setEditingApt({ ...editingApt, feeAmount: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                            Date
                          </label>
                          <input
                            type="date"
                            value={editingApt.appointmentDate}
                            onChange={(e) => setEditingApt({ ...editingApt, appointmentDate: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                            Time
                          </label>
                          <input
                            type="text"
                            value={editingApt.appointmentTime}
                            onChange={(e) => setEditingApt({ ...editingApt, appointmentTime: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                          Status
                        </label>
                        <select
                          value={editingApt.status}
                          onChange={(e) => setEditingApt({ ...editingApt, status: e.target.value as any })}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                        >
                          <option value="Pending">⏳ Pending</option>
                          <option value="Confirmed">✅ Confirmed</option>
                          <option value="Completed">🏁 Completed</option>
                          <option value="Cancelled">❌ Cancelled</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                          Reason for Visit
                        </label>
                        <input
                          type="text"
                          value={editingApt.reasonForVisit}
                          onChange={(e) => setEditingApt({ ...editingApt, reasonForVisit: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                        <button
                          type="button"
                          onClick={() => setEditingApt(null)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md"
                        >
                          Update in Database
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 8: AUDIT ACTIVITY LOGS */}
          {activeTab === 'activity-logs' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
                  Administrative Audit Activity Logs ({activityLogs.length})
                </h1>
                <p className="text-xs text-slate-400">Complete traceability of pricing updates, approvals, and imports.</p>
              </div>

              <div className="bg-[#1E293B] rounded-3xl border border-slate-700/80 p-6 space-y-3 shadow-lg">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 font-bold rounded text-[10px]">
                          {log.action}
                        </span>
                        <span className="font-bold text-white">{log.entityName}</span>
                      </div>
                      {log.newValue && (
                        <div className="text-slate-400 text-[11px]">
                          Changed from <strong className="text-slate-200">{log.oldValue || 'None'}</strong> to <strong className="text-emerald-400">{log.newValue}</strong>
                        </div>
                      )}
                    </div>

                    <div className="text-right text-[11px] text-slate-500">
                      <div>Admin: {log.adminName}</div>
                      <div>{log.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: WHATSAPP SETTINGS */}
          {activeTab === 'whatsapp-settings' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
                  WhatsApp Integration Configuration
                </h1>
                <p className="text-xs text-slate-400">
                  Configure official WhatsApp booking phone number and pre-filled message templates.
                </p>
              </div>

              <div className="bg-[#1E293B] rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Official WhatsApp Phone Number *
                  </label>
                  <input
                    type="text"
                    value={waPhone}
                    onChange={(e) => setWaPhone(e.target.value)}
                    placeholder="+91 9007355062"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Booking Request Message Template
                  </label>
                  <textarea
                    rows={8}
                    value={waBookingTemplate}
                    onChange={(e) => setWaBookingTemplate(e.target.value)}
                    className="w-full p-4 bg-slate-900 border border-slate-700 rounded-2xl text-xs font-mono text-slate-200 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      updateWhatsAppSettings({
                        phoneNumber: waPhone,
                        bookingMessageTemplate: waBookingTemplate,
                      });
                    }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-full shadow-md transition-colors cursor-pointer"
                  >
                    Save WhatsApp Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: CMS WEBSITE SETTINGS */}
          {activeTab === 'website-settings' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
                  CMS & Website Content Settings
                </h1>
                <p className="text-xs text-slate-400">Configure portal headers, emergency hotlines, and district addresses.</p>
              </div>

              <div className="bg-[#1E293B] rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Brand Name</label>
                  <input
                    type="text"
                    defaultValue={websiteSettings.brandName}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Emergency Hotline</label>
                  <input
                    type="text"
                    defaultValue={websiteSettings.emergencyNumber}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Gopalganj Address</label>
                  <input
                    type="text"
                    defaultValue={websiteSettings.addressGopalganj}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Siwan Address</label>
                  <input
                    type="text"
                    defaultValue={websiteSettings.addressSiwan}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => showToast('Website CMS settings saved!', 'success')}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-full cursor-pointer"
                  >
                    Save CMS Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 15: DATA BACKUP & EXPORT */}
          {activeTab === 'data-backup' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif] flex items-center gap-2.5">
                    <Database className="w-6 h-6 text-indigo-400" />
                    <span>Data Backup, Export & Restore Center</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Download CSV spreadsheets, full JSON database snapshots, or restore platform data.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={exportSystemBackupJSON}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full Backup (.JSON)</span>
                  </button>
                </div>
              </div>

              {/* Data Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#1E293B] p-4 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Total Doctors</div>
                  <div className="text-2xl font-black text-white mt-1">{doctors.length}</div>
                  <div className="text-[10px] text-emerald-400 mt-1">✓ Gopalganj & Siwan</div>
                </div>

                <div className="bg-[#1E293B] p-4 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Appointments & Tokens</div>
                  <div className="text-2xl font-black text-blue-400 mt-1">{appointments.length}</div>
                  <div className="text-[10px] text-slate-400 mt-1">OPD Bookings</div>
                </div>

                <div className="bg-[#1E293B] p-4 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] font-bold uppercase text-slate-400">WhatsApp Leads</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">{whatsAppBookings.length}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Direct Chat Bookings</div>
                </div>

                <div className="bg-[#1E293B] p-4 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Audit Activity Logs</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">{activityLogs.length}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Logged Actions</div>
                </div>
              </div>

              {/* Export Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1: Doctors CSV & JSON */}
                <div className="bg-[#1E293B] rounded-3xl p-6 border border-slate-700/80 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-['Outfit',sans-serif]">
                        Doctors Directory Export
                      </h3>
                      <p className="text-xs text-slate-400">
                        Export all doctor listings with phone numbers, qualifications, fees and OPD timings.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={exportDoctorsCSV}
                      className="flex-1 min-w-[140px] px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Export Doctors (CSV)</span>
                    </button>

                    <button
                      onClick={exportDoctorsJSON}
                      className="flex-1 min-w-[140px] px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-500/30 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileJson className="w-4 h-4" />
                      <span>Export Doctors (JSON)</span>
                    </button>
                  </div>
                </div>

                {/* Card 2: Appointments & WhatsApp CSV */}
                <div className="bg-[#1E293B] rounded-3xl p-6 border border-slate-700/80 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-['Outfit',sans-serif]">
                        Appointments & WhatsApp Leads
                      </h3>
                      <p className="text-xs text-slate-400">
                        Export OPD tokens and WhatsApp patient inquiries with status and contact details.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={exportAppointmentsCSV}
                      className="w-full px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export Appointments & WhatsApp Data (CSV)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3: Restore Database Snapshot */}
              <div className="bg-[#1E293B] rounded-3xl p-6 border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-['Outfit',sans-serif]">
                        Restore System Backup (.JSON)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Upload a previously downloaded JSON snapshot to restore doctors, clinics, and appointments.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-2xl border border-dashed border-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-300">
                    <div className="font-bold text-white mb-0.5">Select .JSON Backup File</div>
                    <div className="text-[11px] text-slate-400">
                      Supports `hellodoctor-complete-system-backup-*.json` or `hellodoctor-doctors-*.json`
                    </div>
                  </div>

                  <label className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2 shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Upload & Restore Backup</span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const content = event.target?.result as string;
                          if (content) {
                            if (file.name.includes('doctor')) {
                              importDoctorsJSON(content);
                            } else {
                              restoreSystemBackup(content);
                            }
                          }
                        };
                        reader.readAsText(file);
                        e.target.value = '';
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* FALLBACK FOR SPECIALITIES, HOSPITALS, PATIENTS */}
          {(activeTab === 'specialities' || activeTab === 'hospitals' || activeTab === 'clinics' || activeTab === 'patients') && (
            <div className="space-y-6">
              <h1 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif] capitalize">
                {activeTab} Management Desk
              </h1>
              <div className="bg-[#1E293B] rounded-3xl p-6 border border-slate-700/80 space-y-3">
                {activeTab === 'specialities' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {specialities.map((s) => (
                      <div key={s.id} className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-1">
                        <div className="font-bold text-white text-sm">{s.name}</div>
                        <div className="text-xs text-teal-400">{s.description}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'hospitals' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {hospitals.map((h) => (
                      <div key={h.id} className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">{h.name}</span>
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] font-bold rounded">
                            {h.city}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">{h.address}</div>
                        <div className="text-xs text-emerald-400 font-semibold">{h.departments.join(', ')}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'clinics' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {clinics.map((c) => (
                      <div key={c.id} className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">{c.name}</span>
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] font-bold rounded">
                            {c.city}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">{c.address}</div>
                        <div className="text-xs text-teal-400">{c.doctorName}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'patients' && (
                  <div className="space-y-2">
                    {patients.map((p) => (
                      <div key={p.id} className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 flex justify-between items-center text-xs">
                        <div>
                          <div className="font-bold text-white">{p.name}</div>
                          <div className="text-slate-400">{p.mobile} • {p.city}</div>
                        </div>
                        <div className="text-right font-bold text-blue-400">
                          {p.appointmentsCount} Appointments
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
