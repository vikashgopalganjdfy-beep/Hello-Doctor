import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Doctor,
  DoctorSearchParams,
  DoctorSearchResult,
  Hospital,
  Clinic,
  Speciality,
  HealthPackage,
  HealthArticle,
  Appointment,
  WhatsAppBooking,
  DoctorRegistrationApplication,
  PatientRecord,
  DoctorReview,
  ActivityLog,
  WhatsAppSettings,
  WebsiteSettings,
  FAQItem,
  ViewState,
  City,
  SpecialityId,
  UserRole,
  AdminSubRole,
  UserSession,
} from '../types';
import {
  DOCTORS,
  HOSPITALS,
  CLINICS,
  SPECIALITIES,
  HEALTH_PACKAGES,
  HEALTH_ARTICLES,
  INITIAL_WHATSAPP_BOOKINGS,
  INITIAL_PATIENTS,
  INITIAL_REVIEWS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_WHATSAPP_SETTINGS,
  INITIAL_WEBSITE_SETTINGS,
  FAQS,
} from '../data/mockData';
import confetti from 'canvas-confetti';
import { soundAlert } from '../utils/audioAlert';

interface AppContextType {
  // Navigation & View State
  currentView: ViewState;
  selectedDoctor: Doctor | null;
  selectedSpecialityId: SpecialityId | string | null;
  selectedArticleId: string | null;
  selectedHospital: Hospital | null;
  selectedClinic: Clinic | null;
  selectedCity: City;
  navigateTo: (
    view: ViewState,
    params?: {
      doctor?: Doctor;
      specialityId?: SpecialityId | string;
      city?: City;
      articleId?: string;
      hospital?: Hospital;
      clinic?: Clinic;
    }
  ) => void;

  // Search & Filtering
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  nameFilter: string;
  setNameFilter: (name: string) => void;
  locationFilter: string;
  setLocationFilter: (loc: string) => void;
  cityFilter: City;
  setCityFilter: (city: City) => void;
  areaFilter: string;
  setAreaFilter: (area: string) => void;
  specialityFilter: string;
  setSpecialityFilter: (speciality: string) => void;
  consultationTypeFilter: string;
  setConsultationTypeFilter: (type: string) => void;
  genderFilter: string;
  setGenderFilter: (gender: string) => void;
  experienceFilter: string;
  setExperienceFilter: (exp: string) => void;
  availabilityFilter: string;
  setAvailabilityFilter: (avail: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
  maxFee: number;
  setMaxFee: (fee: number) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;

  // Functional Search API Handlers
  searchDoctorRegistry: (params: string | DoctorSearchParams) => Doctor[];
  searchDoctorsAPI: (params: string | DoctorSearchParams) => Promise<DoctorSearchResult>;
  executeDoctorSearch: (params: string | DoctorSearchParams, navigateToDirectory?: boolean) => Doctor[];
  isSearching: boolean;

  // Filtered lists
  filteredDoctors: Doctor[];

  // Regular Booking Modal
  isBookingModalOpen: boolean;
  bookingDoctor: Doctor | null;
  bookingPreselectedType: 'In Clinic' | 'Video Consultation' | 'Home Visit';
  openBookingModal: (doctor: Doctor, type?: 'In Clinic' | 'Video Consultation' | 'Home Visit') => void;
  closeBookingModal: () => void;

  // WhatsApp Booking Modal
  isWhatsAppModalOpen: boolean;
  whatsAppDoctor: Doctor | null;
  openWhatsAppModal: (doctor: Doctor) => void;
  closeWhatsAppModal: () => void;

  // Auth & Session
  isAuthModalOpen: boolean;
  authInitialTab: 'login' | 'register';
  authInitialRole: UserRole;
  openAuthModal: (tab?: 'login' | 'register', role?: UserRole) => void;
  closeAuthModal: () => void;
  currentUser: UserSession | null;
  loginUser: (role: UserRole, email: string, name: string, adminRole?: AdminSubRole) => void;
  logoutUser: () => void;

  // Favorites
  savedDoctorIds: string[];
  toggleSaveDoctor: (doctorId: string) => void;

  // Doctor CRUD Operations
  doctors: Doctor[];
  addDoctor: (doctor: Omit<Doctor, 'id' | 'rating' | 'reviewCount' | 'createdAt'>) => Doctor;
  updateDoctor: (id: string, updates: Partial<Doctor>) => void;
  updateDoctorPrice: (id: string, newClinicFee: number, newOnlineFee?: number) => void;
  deleteDoctor: (id: string) => void;
  bulkUpdateDoctors: (ids: string[], updates: Partial<Doctor>) => void;
  bulkImportDoctors: (importedDoctors: Partial<Doctor>[]) => number;

  // Specialities CRUD
  specialities: Speciality[];
  addSpeciality: (spec: Omit<Speciality, 'doctorCount'>) => void;
  updateSpeciality: (id: string, updates: Partial<Speciality>) => void;

  // Hospitals & Clinics CRUD
  hospitals: Hospital[];
  addHospital: (hospital: Omit<Hospital, 'id'>) => void;
  updateHospital: (id: string, updates: Partial<Hospital>) => void;
  clinics: Clinic[];
  addClinic: (clinic: Omit<Clinic, 'id'>) => void;
  updateClinic: (id: string, updates: Partial<Clinic>) => void;

  // Appointments Management
  appointments: Appointment[];
  bookAppointment: (
    data: Omit<Appointment, 'id' | 'bookingCode' | 'bookedAt' | 'status'>
  ) => Appointment;
  addAppointment: (
    data: Omit<Appointment, 'id' | 'bookingCode' | 'bookedAt'>
  ) => Appointment;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  cancelAppointment: (id: string) => void;

  // WhatsApp Bookings Management
  whatsAppBookings: WhatsAppBooking[];
  createWhatsAppBooking: (
    data: Omit<WhatsAppBooking, 'id' | 'bookingCode' | 'submittedAt' | 'status'>
  ) => WhatsAppBooking;
  updateWhatsAppBookingStatus: (id: string, status: WhatsAppBooking['status']) => void;

  // Doctor Applications & Verification
  doctorApplications: DoctorRegistrationApplication[];
  submitDoctorApplication: (
    app: Omit<DoctorRegistrationApplication, 'id' | 'submittedAt' | 'status'>
  ) => void;
  approveDoctorApplication: (id: string) => void;
  rejectDoctorApplication: (id: string, notes?: string) => void;

  // Patient Records
  patients: PatientRecord[];

  // Reviews
  reviews: DoctorReview[];
  addReview: (review: Omit<DoctorReview, 'id' | 'date' | 'status'>) => void;
  updateReviewStatus: (id: string, status: 'Approved' | 'Pending' | 'Hidden') => void;

  // Health Packages & Articles
  healthPackages: HealthPackage[];
  healthArticles: HealthArticle[];
  addArticle: (article: Omit<HealthArticle, 'id' | 'publishedDate'>) => void;
  updateArticle: (id: string, updates: Partial<HealthArticle>) => void;
  deleteArticle: (id: string) => void;

  // Activity Logs
  activityLogs: ActivityLog[];
  logActivity: (action: string, entity: string, entityName: string, oldValue?: string, newValue?: string) => void;

  // Settings
  whatsAppSettings: WhatsAppSettings;
  updateWhatsAppSettings: (settings: Partial<WhatsAppSettings>) => void;
  websiteSettings: WebsiteSettings;
  updateWebsiteSettings: (settings: Partial<WebsiteSettings>) => void;

  // Sound Alarm & Notification System
  soundAlertEnabled: boolean;
  setSoundAlertEnabled: (enabled: boolean) => void;
  testBookingAlarm: () => void;
  playBookingSound: () => void;

  // Data Backup, Export & Import
  exportDoctorsCSV: () => void;
  exportDoctorsJSON: () => void;
  exportAppointmentsCSV: () => void;
  exportSystemBackupJSON: () => void;
  importDoctorsJSON: (jsonData: string) => number;
  restoreSystemBackup: (backupJSON: string) => boolean;

  // FAQs
  faqs: FAQItem[];

  // Toast
  toast: { text: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-sample-1',
    bookingCode: 'HD-GOP-8942',
    doctorId: 'doc-gop-1',
    doctorName: 'Dr. Rajeev Kumar',
    doctorSpeciality: 'Cardiologist',
    doctorPhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    hospitalOrClinic: 'Heart Care Center & Sadar Road Clinic',
    patientVisitAddress: 'Maya Hospital Road, Near Sadar Hospital, Gopalganj',
    city: 'Gopalganj',
    consultationType: 'In Clinic',
    appointmentDate: '2026-08-16',
    appointmentTime: '04:30 PM',
    patientName: 'Vikash Sharma',
    patientAge: 38,
    patientGender: 'Male',
    patientMobile: '+91 98765 43210',
    patientEmail: 'vikash.demo@example.com',
    reasonForVisit: 'Routine Blood Pressure follow-up and ECG check',
    feeAmount: 600,
    status: 'Confirmed',
    bookedAt: '2026-08-14 10:30 AM',
    bookingChannel: 'Website',
  },
  {
    id: 'apt-sample-2',
    bookingCode: 'HD-SIW-3104',
    doctorId: 'doc-siw-2',
    doctorName: 'Dr. Kavita Gupta',
    doctorSpeciality: 'Gynecologist & Obstetrician',
    doctorPhoto: 'https://images.unsplash.com/photo-1594824813596-f13886cf0f47?auto=format&fit=crop&q=80&w=600',
    hospitalOrClinic: 'Sanjeevani Maternity & Multi-Speciality Hospital',
    patientVisitAddress: 'Apex Hospital, Babunia Road, Siwan',
    city: 'Siwan',
    consultationType: 'Video Consultation',
    appointmentDate: '2026-08-17',
    appointmentTime: '05:00 PM',
    patientName: 'Pooja Verma',
    patientAge: 29,
    patientGender: 'Female',
    patientMobile: '+91 97654 32109',
    patientEmail: 'pooja.demo@example.com',
    reasonForVisit: 'Second trimester ultrasound counseling',
    feeAmount: 500,
    status: 'Confirmed',
    bookedAt: '2026-08-13 03:15 PM',
    bookingChannel: 'Website',
  },
];

const INITIAL_APPLICATIONS: DoctorRegistrationApplication[] = [
  {
    id: 'app-101',
    fullName: 'Dr. Alok Nath Tripathy',
    gender: 'Male',
    mobile: '+91 94311 88921',
    email: 'dr.tripathy@example.com',
    speciality: 'Gastroenterology',
    subSpeciality: 'Liver Diseases & Endoscopy',
    qualification: 'MBBS, MD (Medicine), DM (Gastro)',
    experienceYears: 9,
    hospitalOrClinic: 'Tripathy Gastro Clinic',
    city: 'Gopalganj',
    patientVisitAddress: 'Near Cinema Chowk, Main Road, Gopalganj',
    fullAddress: 'Near Cinema Chowk, Gopalganj, Bihar 841428',
    registrationNumber: 'BIMC-44910-VERIFIED',
    councilName: 'Bihar Medical Council, Patna',
    consultationFee: 600,
    videoFee: 500,
    consultationModes: ['In Clinic', 'Video Consultation'],
    status: 'Pending Verification',
    submittedAt: '2026-08-14 09:12 AM',
  },
  {
    id: 'app-102',
    fullName: 'Dr. Meenakshi Srivastav',
    gender: 'Female',
    mobile: '+91 94312 99412',
    email: 'dr.meenakshi@example.com',
    speciality: 'Pathology',
    subSpeciality: 'Clinical Pathology & Biopsy',
    qualification: 'MBBS, MD (Pathology)',
    experienceYears: 7,
    hospitalOrClinic: 'Apex Diagnostics Siwan',
    city: 'Siwan',
    patientVisitAddress: 'Hospital Road, Opposite State Bank Main Branch, Siwan',
    fullAddress: 'Hospital Road, Opposite SBI, Siwan, Bihar 841226',
    registrationNumber: 'BIMC-48192-VERIFIED',
    councilName: 'Bihar Medical Council, Patna',
    consultationFee: 400,
    videoFee: 350,
    consultationModes: ['In Clinic'],
    status: 'Pending Verification',
    submittedAt: '2026-08-13 04:40 PM',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSpecialityId, setSelectedSpecialityId] = useState<SpecialityId | string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [selectedCity, setSelectedCity] = useState<City>('All');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [nameFilter, setNameFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<City>('All');
  const [areaFilter, setAreaFilter] = useState<string>('All');
  const [specialityFilter, setSpecialityFilter] = useState<string>('All');
  const [consultationTypeFilter, setConsultationTypeFilter] = useState<string>('All');
  const [genderFilter, setGenderFilter] = useState<string>('All');
  const [experienceFilter, setExperienceFilter] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [maxFee, setMaxFee] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Booking Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingPreselectedType, setBookingPreselectedType] = useState<'In Clinic' | 'Video Consultation' | 'Home Visit'>('In Clinic');

  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState<boolean>(false);
  const [whatsAppDoctor, setWhatsAppDoctor] = useState<Doctor | null>(null);

  // Auth & Session
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');
  const [authInitialRole, setAuthInitialRole] = useState<UserRole>('patient');
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('hellodoctor_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return {
      role: 'patient',
      name: 'Vikash Kumar (User)',
      email: 'vikash.gopalganj@example.com',
      phone: '+91 94310 12345',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    };
  });

  // Saved Doctors
  const [savedDoctorIds, setSavedDoctorIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('hellodoctor_saved_doctors');
    return saved ? JSON.parse(saved) : ['doc-gop-1', 'doc-siw-2'];
  });

  // Primary Data Collections (with LocalStorage persistence for real-time CRUD)
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('hellodoctor_doctors');
    return saved ? JSON.parse(saved) : DOCTORS;
  });

  const [specialities, setSpecialities] = useState<Speciality[]>(() => {
    const saved = localStorage.getItem('hellodoctor_specialities');
    return saved ? JSON.parse(saved) : SPECIALITIES;
  });

  const [hospitals, setHospitals] = useState<Hospital[]>(() => {
    const saved = localStorage.getItem('hellodoctor_hospitals');
    return saved ? JSON.parse(saved) : HOSPITALS;
  });

  const [clinics, setClinics] = useState<Clinic[]>(() => {
    const saved = localStorage.getItem('hellodoctor_clinics');
    return saved ? JSON.parse(saved) : CLINICS;
  });

  const [healthPackages] = useState<HealthPackage[]>(HEALTH_PACKAGES);

  const [healthArticles, setHealthArticles] = useState<HealthArticle[]>(() => {
    const saved = localStorage.getItem('hellodoctor_articles');
    return saved ? JSON.parse(saved) : HEALTH_ARTICLES;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('hellodoctor_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [whatsAppBookings, setWhatsAppBookings] = useState<WhatsAppBooking[]>(() => {
    const saved = localStorage.getItem('hellodoctor_wb');
    return saved ? JSON.parse(saved) : INITIAL_WHATSAPP_BOOKINGS;
  });

  const [doctorApplications, setDoctorApplications] = useState<DoctorRegistrationApplication[]>(() => {
    const saved = localStorage.getItem('hellodoctor_doctor_apps');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [patients, setPatients] = useState<PatientRecord[]>(() => {
    const saved = localStorage.getItem('hellodoctor_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  const [reviews, setReviews] = useState<DoctorReview[]>(() => {
    const saved = localStorage.getItem('hellodoctor_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('hellodoctor_activity_logs');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
  });

  const [whatsAppSettings, setWhatsAppSettings] = useState<WhatsAppSettings>(() => {
    const saved = localStorage.getItem('hellodoctor_wa_settings');
    return saved ? JSON.parse(saved) : INITIAL_WHATSAPP_SETTINGS;
  });

  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('hellodoctor_web_settings');
    return saved ? JSON.parse(saved) : INITIAL_WEBSITE_SETTINGS;
  });

  const [faqs] = useState<FAQItem[]>(() => {
    return FAQS.map((f, i) => ({
      id: `faq-${i + 1}`,
      question: f.question,
      answer: f.answer,
      category: i < 3 ? 'General' : i < 6 ? 'Booking' : i < 8 ? 'Doctors' : 'Hospitals',
      published: true,
    }));
  });

  // Sound Alarm & Notification State
  const [soundAlertEnabled, setSoundAlertEnabledState] = useState<boolean>(() => soundAlert.isEnabled());

  const setSoundAlertEnabled = (enabled: boolean) => {
    setSoundAlertEnabledState(enabled);
    soundAlert.setEnabled(enabled);
    showToast(enabled ? 'Sound alarm alerts enabled 🔔' : 'Sound alarm alerts muted 🔕', 'info');
  };

  const testBookingAlarm = () => {
    soundAlert.playNewBookingAlert();
    showToast('🔔 Testing booking alarm chime sound!', 'info');
  };

  const playBookingSound = () => {
    soundAlert.playNewBookingAlert();
  };

  // Toast
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Cross-Tab Real-time Storage Sync (Instant reflection without page reload)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key || !e.newValue) return;
      try {
        if (e.key === 'hellodoctor_doctors') {
          setDoctors(JSON.parse(e.newValue));
        } else if (e.key === 'hellodoctor_specialities') {
          setSpecialities(JSON.parse(e.newValue));
        } else if (e.key === 'hellodoctor_hospitals') {
          setHospitals(JSON.parse(e.newValue));
        } else if (e.key === 'hellodoctor_clinics') {
          setClinics(JSON.parse(e.newValue));
        } else if (e.key === 'hellodoctor_appointments') {
          const updatedApts: Appointment[] = JSON.parse(e.newValue);
          setAppointments(updatedApts);
          soundAlert.playNewBookingAlert();
          showToast('🚨 New Patient Appointment Token Booked!', 'info');
        } else if (e.key === 'hellodoctor_wb') {
          const updatedWb: WhatsAppBooking[] = JSON.parse(e.newValue);
          setWhatsAppBookings(updatedWb);
          soundAlert.playNewBookingAlert();
          showToast('🚨 New WhatsApp Booking Request Received!', 'info');
        } else if (e.key === 'hellodoctor_articles') {
          setHealthArticles(JSON.parse(e.newValue));
        } else if (e.key === 'hellodoctor_wa_settings') {
          setWhatsAppSettings(JSON.parse(e.newValue));
        } else if (e.key === 'hellodoctor_web_settings') {
          setWebsiteSettings(JSON.parse(e.newValue));
        } else if (e.key === 'hellodoctor_doctor_apps') {
          setDoctorApplications(JSON.parse(e.newValue));
        }
      } catch (err) {
        console.warn('Real-time cross-tab sync parse error:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('hellodoctor_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_specialities', JSON.stringify(specialities));
  }, [specialities]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_hospitals', JSON.stringify(hospitals));
  }, [hospitals]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_clinics', JSON.stringify(clinics));
  }, [clinics]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_articles', JSON.stringify(healthArticles));
  }, [healthArticles]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_wb', JSON.stringify(whatsAppBookings));
  }, [whatsAppBookings]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_doctor_apps', JSON.stringify(doctorApplications));
  }, [doctorApplications]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_activity_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_wa_settings', JSON.stringify(whatsAppSettings));
  }, [whatsAppSettings]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_web_settings', JSON.stringify(websiteSettings));
  }, [websiteSettings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('hellodoctor_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('hellodoctor_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('hellodoctor_saved_doctors', JSON.stringify(savedDoctorIds));
  }, [savedDoctorIds]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const logActivity = (
    action: string,
    entity: string,
    entityName: string,
    oldValue?: string,
    newValue?: string
  ) => {
    const adminName = currentUser?.name || 'Super Admin (System)';
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      adminName,
      action,
      entity,
      entityName,
      oldValue,
      newValue,
      timestamp: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  const navigateTo = (
    view: ViewState,
    params?: {
      doctor?: Doctor;
      specialityId?: SpecialityId | string;
      city?: City;
      articleId?: string;
      hospital?: Hospital;
      clinic?: Clinic;
    }
  ) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
    if (params?.doctor) setSelectedDoctor(params.doctor);
    if (params?.specialityId) {
      setSelectedSpecialityId(params.specialityId);
      setSpecialityFilter(params.specialityId);
    }
    if (params?.city) {
      setSelectedCity(params.city);
      setCityFilter(params.city);
    }
    if (params?.articleId) setSelectedArticleId(params.articleId);
    if (params?.hospital) setSelectedHospital(params.hospital);
    if (params?.clinic) setSelectedClinic(params.clinic);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setNameFilter('');
    setLocationFilter('');
    setCityFilter('All');
    setAreaFilter('All');
    setSpecialityFilter('All');
    setConsultationTypeFilter('All');
    setGenderFilter('All');
    setExperienceFilter('All');
    setAvailabilityFilter('All');
    setVerifiedOnly(false);
    setMaxFee(1500);
    setSortBy('recommended');
  };

  const openBookingModal = (
    doctor: Doctor,
    type: 'In Clinic' | 'Video Consultation' | 'Home Visit' = 'In Clinic'
  ) => {
    setBookingDoctor(doctor);
    setBookingPreselectedType(type);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingDoctor(null);
  };

  const openWhatsAppModal = (doctor: Doctor) => {
    setWhatsAppDoctor(doctor);
    setIsWhatsAppModalOpen(true);
  };

  const closeWhatsAppModal = () => {
    setIsWhatsAppModalOpen(false);
    setWhatsAppDoctor(null);
  };

  const openAuthModal = (tab: 'login' | 'register' = 'login', role: UserRole = 'patient') => {
    setAuthInitialTab(tab);
    setAuthInitialRole(role);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginUser = (role: UserRole, email: string, name: string, adminRole: AdminSubRole = 'Super Admin') => {
    const user: UserSession = {
      role,
      adminRole: role === 'admin' ? adminRole : undefined,
      email,
      name,
      phone: '+91 94310 XXXXX',
      avatar:
        role === 'doctor'
          ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'
          : role === 'admin'
          ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      doctorId: role === 'doctor' ? 'doc-gop-1' : undefined,
    };
    setCurrentUser(user);
    closeAuthModal();
    showToast(`Welcome back, ${name}! Signed in as ${role.toUpperCase()}.`, 'success');

    if (role === 'doctor') {
      setCurrentView('doctor-dashboard');
    } else if (role === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('patient-dashboard');
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Signed out successfully', 'info');
    setCurrentView('home');
  };

  const toggleSaveDoctor = (doctorId: string) => {
    setSavedDoctorIds((prev) => {
      const exists = prev.includes(doctorId);
      if (exists) {
        showToast('Removed doctor from your favorites', 'info');
        return prev.filter((id) => id !== doctorId);
      } else {
        showToast('Doctor saved to your favorites!', 'success');
        return [...prev, doctorId];
      }
    });
  };

  // DOCTOR CRUD
  const addDoctor = (data: Omit<Doctor, 'id' | 'rating' | 'reviewCount' | 'createdAt'>): Doctor => {
    const newId = `doc-${data.city.toLowerCase().slice(0, 3)}-${Date.now()}`;
    const newDoc: Doctor = {
      ...data,
      id: newId,
      rating: 4.8,
      reviewCount: 1,
      createdAt: new Date().toISOString(),
      availableDays: data.availableDays?.length ? data.availableDays : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      availableTimeSlots: data.availableTimeSlots?.length ? data.availableTimeSlots : ['10:00 AM', '11:30 AM', '04:30 PM', '06:00 PM'],
    };

    setDoctors((prev) => [newDoc, ...prev]);
    logActivity('DOCTOR_ADDED', 'Doctor', newDoc.name, '', `Added with fee ₹${newDoc.consultationFee}`);
    showToast(`Dr. ${newDoc.name} successfully registered in ${newDoc.city}!`, 'success');
    return newDoc;
  };

  const updateDoctor = (id: string, updates: Partial<Doctor>) => {
    setDoctors((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          const updated = { ...doc, ...updates, updatedAt: new Date().toISOString() };
          logActivity('DOCTOR_UPDATED', 'Doctor', doc.name, JSON.stringify(updates));
          return updated;
        }
        return doc;
      })
    );
    showToast('Doctor information updated successfully!', 'success');
  };

  const updateDoctorPrice = (id: string, newClinicFee: number, newOnlineFee?: number) => {
    setDoctors((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          const oldFee = doc.consultationFee;
          const updated: Doctor = {
            ...doc,
            consultationFee: newClinicFee,
            videoConsultationFee: newOnlineFee ?? doc.videoConsultationFee,
            updatedAt: new Date().toISOString(),
          };
          logActivity(
            'PRICE_CHANGE',
            'Doctor Fee',
            doc.name,
            `₹${oldFee}`,
            `₹${newClinicFee}${newOnlineFee ? ` (Online: ₹${newOnlineFee})` : ''}`
          );
          return updated;
        }
        return doc;
      })
    );
    showToast(`Consultation fee updated to ₹${newClinicFee} successfully!`, 'success');
  };

  const deleteDoctor = (id: string) => {
    const docToDelete = doctors.find((d) => d.id === id);
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
    if (docToDelete) {
      logActivity('DOCTOR_ARCHIVED', 'Doctor', docToDelete.name, 'Active', 'Archived');
    }
    showToast('Doctor record archived/deleted from public directory.', 'info');
  };

  const bulkUpdateDoctors = (ids: string[], updates: Partial<Doctor>) => {
    setDoctors((prev) =>
      prev.map((doc) => {
        if (ids.includes(doc.id)) {
          return { ...doc, ...updates, updatedAt: new Date().toISOString() };
        }
        return doc;
      })
    );
    logActivity('BULK_DOCTORS_UPDATE', 'Multiple Doctors', `${ids.length} records updated`);
    showToast(`Bulk updated ${ids.length} doctor records successfully!`, 'success');
  };

  const bulkImportDoctors = (importedDoctors: Partial<Doctor>[]): number => {
    let count = 0;
    const newRecords: Doctor[] = importedDoctors.map((d, index) => {
      count++;
      return {
        id: `doc-import-${Date.now()}-${index}`,
        name: d.name || 'Dr. Medical Practitioner',
        photo: d.photo || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
        gender: d.gender || 'Male',
        speciality: d.speciality || 'General Medicine',
        specialityId: (d.specialityId as SpecialityId) || 'general-medicine',
        qualification: d.qualification || 'MBBS, MD',
        experienceYears: d.experienceYears || 5,
        hospitalOrClinic: d.hospitalOrClinic || 'City Medical Clinic',
        city: (d.city as 'Gopalganj' | 'Siwan') || 'Gopalganj',
        locality: d.locality || 'Hospital Road',
        patientVisitAddress: d.patientVisitAddress || d.fullAddress || 'Near Sadar Hospital, Gopalganj',
        fullAddress: d.fullAddress || 'Hospital Road, Gopalganj, Bihar',
        phone: d.phone || '+91 9431X XXXXX',
        consultationFee: d.consultationFee || 500,
        videoConsultationFee: d.videoConsultationFee || 400,
        consultationTypes: d.consultationTypes || ['In Clinic', 'Video Consultation'],
        languages: d.languages || ['Hindi', 'Bhojpuri', 'English'],
        about: d.about || 'Dedicated healthcare practitioner serving Gopalganj and Siwan.',
        services: d.services || ['General OPD', 'Health Checkup', 'Follow-up Care'],
        registrationNumber: d.registrationNumber || `BIMC-IMP-${Math.floor(10000 + Math.random() * 90000)}`,
        availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        availableTimeSlots: ['10:00 AM', '12:00 PM', '04:00 PM', '06:00 PM'],
        rating: 4.8,
        reviewCount: 2,
        isVerified: d.isVerified ?? true,
        verificationStatus: d.isVerified ? 'Verified' : 'Pending',
        isActive: true,
      };
    });

    setDoctors((prev) => [...newRecords, ...prev]);
    logActivity('CSV_BULK_IMPORT', 'Doctor Directory', `${count} imported doctors`);
    showToast(`Successfully imported ${count} doctors into the directory!`, 'success');
    return count;
  };

  // SPECIALITIES CRUD
  const addSpeciality = (spec: Omit<Speciality, 'doctorCount'>) => {
    const newSpec: Speciality = {
      ...spec,
      doctorCount: 0,
      active: true,
    };
    setSpecialities((prev) => [...prev, newSpec]);
    logActivity('SPECIALITY_ADDED', 'Speciality', spec.name);
    showToast(`Speciality "${spec.name}" added successfully!`, 'success');
  };

  const updateSpeciality = (id: string, updates: Partial<Speciality>) => {
    setSpecialities((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    showToast('Speciality details updated!', 'success');
  };

  // HOSPITALS & CLINICS CRUD
  const addHospital = (hosp: Omit<Hospital, 'id'>) => {
    const newHosp: Hospital = {
      ...hosp,
      id: `hosp-${Date.now()}`,
      active: true,
    };
    setHospitals((prev) => [newHosp, ...prev]);
    logActivity('HOSPITAL_ADDED', 'Hospital', hosp.name);
    showToast(`Hospital "${hosp.name}" registered successfully!`, 'success');
  };

  const updateHospital = (id: string, updates: Partial<Hospital>) => {
    setHospitals((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
    );
    showToast('Hospital updated successfully!', 'success');
  };

  const addClinic = (clinic: Omit<Clinic, 'id'>) => {
    const newClinic: Clinic = {
      ...clinic,
      id: `cl-${Date.now()}`,
      active: true,
    };
    setClinics((prev) => [newClinic, ...prev]);
    logActivity('CLINIC_ADDED', 'Clinic', clinic.name);
    showToast(`Clinic "${clinic.name}" registered successfully!`, 'success');
  };

  const updateClinic = (id: string, updates: Partial<Clinic>) => {
    setClinics((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Clinic details updated!', 'success');
  };

  // APPOINTMENTS
  const bookAppointment = (
    data: Omit<Appointment, 'id' | 'bookingCode' | 'bookedAt' | 'status'>
  ): Appointment => {
    const codePrefix = data.city === 'Gopalganj' ? 'HD-GOP' : 'HD-SIW';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      bookingCode: `${codePrefix}-${randomNum}`,
      status: 'Confirmed',
      bookedAt: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      bookingChannel: data.bookingChannel || 'Website',
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    logActivity('APPOINTMENT_BOOKED', 'Appointment', newAppointment.bookingCode, 'New', 'Confirmed');

    // Trigger audible alarm sound for new appointment booking
    try {
      soundAlert.playNewBookingAlert();
    } catch {
      // safe fallback
    }

    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#003b95', '#0052cc', '#00a3bf', '#10b981'],
      });
    } catch (e) {
      // safe fallback
    }

    showToast(`Appointment confirmed! Token ID: ${newAppointment.bookingCode}`, 'success');
    return newAppointment;
  };

  const addAppointment = (
    data: Omit<Appointment, 'id' | 'bookingCode' | 'bookedAt'>
  ): Appointment => {
    const codePrefix = data.city === 'Gopalganj' ? 'HD-GOP' : 'HD-SIW';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      ...data,
      id: `apt-manual-${Date.now()}`,
      bookingCode: `${codePrefix}-${randomNum}`,
      bookedAt: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    logActivity('ADMIN_WALKIN_APPOINTMENT', 'Appointment', newAppointment.bookingCode, 'Created', newAppointment.status);

    try {
      soundAlert.playNewBookingAlert();
    } catch {}

    showToast(`Walk-in appointment created! Token: ${newAppointment.bookingCode}`, 'success');
    return newAppointment;
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    let targetBookingCode = '';
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === id || apt.bookingCode === id) {
          targetBookingCode = apt.bookingCode;
          return { ...apt, ...updates };
        }
        return apt;
      })
    );

    // Sync to WhatsApp bookings if matching
    if (targetBookingCode) {
      setWhatsAppBookings((prev) =>
        prev.map((wb) => {
          if (wb.bookingCode === targetBookingCode || wb.id === id) {
            const syncStatus = (updates.status as any) || wb.status;
            return {
              ...wb,
              status: syncStatus,
              preferredDate: updates.appointmentDate || wb.preferredDate,
              preferredTime: updates.appointmentTime || wb.preferredTime,
              feeAmount: updates.feeAmount !== undefined ? updates.feeAmount : wb.feeAmount,
            };
          }
          return wb;
        })
      );
    }

    logActivity('APPOINTMENT_UPDATED', 'Appointment', targetBookingCode || id, 'Updated', JSON.stringify(updates));
    showToast('Appointment record updated in database successfully!', 'success');
  };

  const deleteAppointment = (id: string) => {
    const target = appointments.find((a) => a.id === id || a.bookingCode === id);
    setAppointments((prev) => prev.filter((a) => a.id !== id && a.bookingCode !== id));
    if (target?.bookingCode) {
      setWhatsAppBookings((prev) => prev.filter((wb) => wb.bookingCode !== target.bookingCode && wb.id !== id));
    }
    logActivity('APPOINTMENT_DELETED', 'Appointment', target?.bookingCode || id, 'Active', 'Deleted');
    showToast('Appointment deleted from database.', 'info');
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    let targetBookingCode = '';
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === id || apt.bookingCode === id) {
          targetBookingCode = apt.bookingCode;
          return { ...apt, status };
        }
        return apt;
      })
    );

    if (targetBookingCode) {
      setWhatsAppBookings((prev) =>
        prev.map((wb) =>
          wb.bookingCode === targetBookingCode || wb.id === id
            ? {
                ...wb,
                status:
                  status === 'Confirmed'
                    ? 'Confirmed'
                    : status === 'Cancelled'
                    ? 'Cancelled'
                    : status === 'Rescheduled'
                    ? 'Rescheduled'
                    : wb.status,
              }
            : wb
        )
      );
    }

    logActivity('APPOINTMENT_STATUS_CHANGE', 'Appointment', targetBookingCode || id, '', status);
    showToast(`Appointment status updated to ${status}.`, 'info');
  };

  const cancelAppointment = (id: string) => {
    updateAppointmentStatus(id, 'Cancelled');
  };

  // WHATSAPP BOOKINGS
  const createWhatsAppBooking = (
    data: Omit<WhatsAppBooking, 'id' | 'bookingCode' | 'submittedAt' | 'status'>
  ): WhatsAppBooking => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const bookingCode = `HD-WA-${randomNum}`;
    const timestamp = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newBooking: WhatsAppBooking = {
      ...data,
      id: `wb-${Date.now()}`,
      bookingCode,
      status: 'Pending',
      submittedAt: timestamp,
    };

    // 1. Add to WhatsApp bookings collection
    setWhatsAppBookings((prev) => [newBooking, ...prev]);

    // 2. Also automatically sync into appointments collection with bookingChannel = 'WhatsApp'
    // so it shows up in Admin Appointments Desk immediately!
    const syncedAppointment: Appointment = {
      id: `apt-wa-${Date.now()}`,
      bookingCode,
      doctorId: data.doctorId,
      doctorName: data.doctorName,
      doctorSpeciality: data.doctorSpeciality,
      doctorPhoto: '',
      hospitalOrClinic: data.hospitalOrClinic,
      patientVisitAddress: data.patientVisitAddress,
      city: data.city,
      consultationType: data.consultationType,
      appointmentDate: data.preferredDate,
      appointmentTime: data.preferredTime,
      patientName: data.patientName,
      patientAge: data.patientAge || 30,
      patientGender: (data.patientGender as any) || 'Male',
      patientMobile: data.patientMobile,
      patientEmail: '',
      reasonForVisit: data.reasonForVisit,
      feeAmount: data.feeAmount,
      status: 'Pending',
      bookedAt: timestamp,
      bookingChannel: 'WhatsApp',
    };

    setAppointments((prev) => [syncedAppointment, ...prev]);

    logActivity('WHATSAPP_BOOKING_REQUEST', 'WhatsApp Booking', newBooking.bookingCode, 'Submitted', 'Pending');

    // Trigger audible alarm sound for WhatsApp appointment booking
    try {
      soundAlert.playNewBookingAlert();
    } catch {
      // safe fallback
    }

    return newBooking;
  };

  const updateWhatsAppBookingStatus = (id: string, status: WhatsAppBooking['status']) => {
    let targetBookingCode = '';
    setWhatsAppBookings((prev) =>
      prev.map((wb) => {
        if (wb.id === id || wb.bookingCode === id) {
          targetBookingCode = wb.bookingCode;
          return { ...wb, status };
        }
        return wb;
      })
    );

    // Also sync to main appointments collection
    if (targetBookingCode) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.bookingCode === targetBookingCode || apt.id === id
            ? { ...apt, status: status as any }
            : apt
        )
      );
    }

    logActivity('WHATSAPP_STATUS_CHANGE', 'WhatsApp Booking', targetBookingCode || id, '', status);
    showToast(`WhatsApp Booking status changed to ${status}.`, 'success');
  };

  // DOCTOR APPLICATIONS
  const submitDoctorApplication = (
    app: Omit<DoctorRegistrationApplication, 'id' | 'submittedAt' | 'status'>
  ) => {
    const newApp: DoctorRegistrationApplication = {
      ...app,
      id: `app-${Date.now()}`,
      status: 'Pending Verification',
      submittedAt: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setDoctorApplications((prev) => [newApp, ...prev]);
    logActivity('DOCTOR_REGISTRATION_SUBMITTED', 'Registration Desk', app.fullName, 'New Application');
    showToast('Application submitted successfully! It is now under administrative review.', 'success');
  };

  const approveDoctorApplication = (id: string) => {
    const app = doctorApplications.find((a) => a.id === id);
    if (!app) return;

    // Update application status
    setDoctorApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Approved' } : a))
    );

    // Auto-create doctor profile in the main directory
    const matchingSpec = specialities.find(
      (s) => s.name.toLowerCase().includes(app.speciality.toLowerCase()) || s.id === app.speciality
    );

    const newDoctor: Doctor = {
      id: `doc-app-${Date.now()}`,
      name: app.fullName.startsWith('Dr.') ? app.fullName : `Dr. ${app.fullName}`,
      photo:
        app.photoUrl ||
        (app.gender === 'Female'
          ? 'https://images.unsplash.com/photo-1594824813596-f13886cf0f47?auto=format&fit=crop&q=80&w=600'
          : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'),
      gender: app.gender,
      speciality: matchingSpec ? matchingSpec.name : app.speciality,
      specialityId: matchingSpec ? matchingSpec.id : 'general-medicine',
      subSpeciality: app.subSpeciality,
      qualification: app.qualification,
      experienceYears: app.experienceYears,
      hospitalOrClinic: app.hospitalOrClinic,
      city: app.city,
      locality: 'Hospital Road',
      patientVisitAddress: app.patientVisitAddress || app.fullAddress,
      fullAddress: app.fullAddress,
      phone: app.mobile,
      email: app.email,
      consultationFee: app.consultationFee,
      videoConsultationFee: app.videoFee || Math.max(300, app.consultationFee - 100),
      consultationTypes: (app.consultationModes as any) || ['In Clinic'],
      languages: ['Hindi', 'Bhojpuri', 'English'],
      about: `Experienced ${app.speciality} practitioner dedicated to clinical excellence in ${app.city}, Bihar.`,
      services: ['OPD Consultation', 'Diagnostic Evaluation', 'Preventive Care'],
      registrationNumber: app.registrationNumber,
      registrationAuthority: app.councilName,
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      availableTimeSlots: ['10:00 AM', '11:30 AM', '04:30 PM', '06:00 PM'],
      rating: 5.0,
      reviewCount: 1,
      isVerified: true,
      verificationStatus: 'Verified',
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    setDoctors((prev) => [newDoctor, ...prev]);
    logActivity('DOCTOR_VERIFIED_APPROVED', 'Doctor Verification', app.fullName, 'Pending', 'Verified');
    showToast(`Doctor ${app.fullName} has been approved and published to the live directory!`, 'success');
  };

  const rejectDoctorApplication = (id: string, notes?: string) => {
    setDoctorApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Rejected', notes } : a))
    );
    logActivity('DOCTOR_VERIFICATION_REJECTED', 'Doctor Verification', id, 'Pending', 'Rejected');
    showToast('Doctor registration application has been rejected.', 'info');
  };

  // REVIEWS
  const addReview = (review: Omit<DoctorReview, 'id' | 'date' | 'status'>) => {
    const newRev: DoctorReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      status: 'Approved',
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you! Your review has been recorded.', 'success');
  };

  const updateReviewStatus = (id: string, status: 'Approved' | 'Pending' | 'Hidden') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showToast(`Review status updated to ${status}.`, 'info');
  };

  // ARTICLES CRUD
  const addArticle = (art: Omit<HealthArticle, 'id' | 'publishedDate'>) => {
    const newArt: HealthArticle = {
      ...art,
      id: `art-${Date.now()}`,
      publishedDate: new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      isPublished: true,
    };
    setHealthArticles((prev) => [newArt, ...prev]);
    logActivity('ARTICLE_PUBLISHED', 'Health Article', art.title);
    showToast(`Health article "${art.title}" published!`, 'success');
  };

  const updateArticle = (id: string, updates: Partial<HealthArticle>) => {
    setHealthArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
    showToast('Article updated successfully!', 'success');
  };

  const deleteArticle = (id: string) => {
    setHealthArticles((prev) => prev.filter((a) => a.id !== id));
    showToast('Article removed.', 'info');
  };

  // SETTINGS
  const updateWhatsAppSettings = (settings: Partial<WhatsAppSettings>) => {
    setWhatsAppSettings((prev) => {
      const updated = { ...prev, ...settings };
      logActivity('WHATSAPP_SETTINGS_UPDATED', 'Settings', 'WhatsApp Number & Templates');
      return updated;
    });
    showToast('WhatsApp booking settings updated successfully!', 'success');
  };

  const updateWebsiteSettings = (settings: Partial<WebsiteSettings>) => {
    setWebsiteSettings((prev) => {
      const updated = { ...prev, ...settings };
      logActivity('WEBSITE_SETTINGS_UPDATED', 'CMS Settings', 'Brand Info & Emergency Hotline');
      return updated;
    });
    showToast('Website content settings updated successfully!', 'success');
  };

  // DATA BACKUP, EXPORT & IMPORT ENGINE
  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportDoctorsCSV = () => {
    const headers = [
      'Name',
      'City',
      'Speciality',
      'Qualification',
      'ExperienceYears',
      'HospitalOrClinic',
      'Locality',
      'PatientVisitAddress',
      'FullAddress',
      'Phone',
      'Email',
      'ConsultationFee',
      'VideoFee',
      'RegistrationNumber',
      'Rating',
      'ReviewCount',
      'IsVerified',
      'IsActive',
    ];

    const rows = doctors.map((d) => [
      `"${d.name.replace(/"/g, '""')}"`,
      `"${d.city}"`,
      `"${d.speciality.replace(/"/g, '""')}"`,
      `"${d.qualification.replace(/"/g, '""')}"`,
      d.experienceYears,
      `"${d.hospitalOrClinic.replace(/"/g, '""')}"`,
      `"${d.locality.replace(/"/g, '""')}"`,
      `"${(d.patientVisitAddress || '').replace(/"/g, '""')}"`,
      `"${d.fullAddress.replace(/"/g, '""')}"`,
      `"${d.phone}"`,
      `"${d.email || ''}"`,
      d.consultationFee,
      d.videoConsultationFee || d.consultationFee,
      `"${d.registrationNumber || ''}"`,
      d.rating,
      d.reviewCount,
      d.isVerified ? 'YES' : 'NO',
      d.isActive ? 'YES' : 'NO',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadFile(
      csvContent,
      `hellodoctor-doctors-gopalganj-siwan-${new Date().toISOString().slice(0, 10)}.csv`,
      'text/csv;charset=utf-8;'
    );
    showToast('Doctors directory exported to CSV successfully!', 'success');
  };

  const exportDoctorsJSON = () => {
    const jsonContent = JSON.stringify(doctors, null, 2);
    downloadFile(
      jsonContent,
      `hellodoctor-doctors-${new Date().toISOString().slice(0, 10)}.json`,
      'application/json'
    );
    showToast('Doctors JSON export ready for download!', 'success');
  };

  const exportAppointmentsCSV = () => {
    const headers = [
      'Type',
      'BookingCode',
      'PatientName',
      'PatientMobile',
      'DoctorName',
      'Speciality',
      'City',
      'ClinicOrHospital',
      'VisitAddress',
      'Date',
      'Time',
      'FeeAmount',
      'Status',
      'BookedAt',
    ];

    const aptRows = appointments.map((a) => [
      'OPD Token',
      `"${a.bookingCode}"`,
      `"${a.patientName.replace(/"/g, '""')}"`,
      `"${a.patientMobile}"`,
      `"${a.doctorName.replace(/"/g, '""')}"`,
      `"${a.doctorSpeciality}"`,
      `"${a.city}"`,
      `"${a.hospitalOrClinic.replace(/"/g, '""')}"`,
      `"${(a.patientVisitAddress || '').replace(/"/g, '""')}"`,
      `"${a.appointmentDate}"`,
      `"${a.appointmentTime}"`,
      a.feeAmount,
      `"${a.status}"`,
      `"${a.bookedAt}"`,
    ]);

    const waRows = whatsAppBookings.map((w) => [
      'WhatsApp Booking',
      `"${w.bookingCode}"`,
      `"${w.patientName.replace(/"/g, '""')}"`,
      `"${w.patientMobile}"`,
      `"${w.doctorName.replace(/"/g, '""')}"`,
      `"${w.doctorSpeciality}"`,
      `"${w.city}"`,
      `"${w.hospitalOrClinic.replace(/"/g, '""')}"`,
      `"${w.patientVisitAddress.replace(/"/g, '""')}"`,
      `"${w.preferredDate}"`,
      `"${w.preferredTime}"`,
      w.feeAmount,
      `"${w.status}"`,
      `"${w.submittedAt}"`,
    ]);

    const allRows = [...aptRows, ...waRows];
    const csvContent = [headers.join(','), ...allRows.map((r) => r.join(','))].join('\n');
    downloadFile(
      csvContent,
      `hellodoctor-appointments-export-${new Date().toISOString().slice(0, 10)}.csv`,
      'text/csv;charset=utf-8;'
    );
    showToast('Appointments & WhatsApp requests exported to CSV!', 'success');
  };

  const exportSystemBackupJSON = () => {
    const fullBackup = {
      exportedAt: new Date().toISOString(),
      platform: 'HELLO DOCTOR GOPALGANJ & SIWAN',
      version: '2026.1.0',
      data: {
        doctors,
        specialities,
        hospitals,
        clinics,
        appointments,
        whatsAppBookings,
        doctorApplications,
        healthArticles,
        healthPackages,
        patients,
        reviews,
        activityLogs,
        whatsAppSettings,
        websiteSettings,
      },
    };

    const jsonContent = JSON.stringify(fullBackup, null, 2);
    downloadFile(
      jsonContent,
      `hellodoctor-complete-system-backup-${new Date().toISOString().slice(0, 10)}.json`,
      'application/json'
    );
    logActivity('FULL_SYSTEM_BACKUP_EXPORTED', 'Backup', 'Full Database JSON Snapshot');
    showToast('Full system backup downloaded successfully!', 'success');
  };

  const importDoctorsJSON = (jsonData: string): number => {
    try {
      const parsed = JSON.parse(jsonData);
      const docsArray: Partial<Doctor>[] = Array.isArray(parsed)
        ? parsed
        : parsed.data && Array.isArray(parsed.data.doctors)
        ? parsed.data.doctors
        : [];

      if (!docsArray.length) {
        showToast('No doctor records found in uploaded file', 'error');
        return 0;
      }

      return bulkImportDoctors(docsArray);
    } catch {
      showToast('Invalid JSON file. Please check format.', 'error');
      return 0;
    }
  };

  const restoreSystemBackup = (backupJSON: string): boolean => {
    try {
      const parsed = JSON.parse(backupJSON);
      const data = parsed.data || parsed;

      if (data.doctors && Array.isArray(data.doctors)) setDoctors(data.doctors);
      if (data.specialities && Array.isArray(data.specialities)) setSpecialities(data.specialities);
      if (data.hospitals && Array.isArray(data.hospitals)) setHospitals(data.hospitals);
      if (data.clinics && Array.isArray(data.clinics)) setClinics(data.clinics);
      if (data.appointments && Array.isArray(data.appointments)) setAppointments(data.appointments);
      if (data.whatsAppBookings && Array.isArray(data.whatsAppBookings)) setWhatsAppBookings(data.whatsAppBookings);
      if (data.healthArticles && Array.isArray(data.healthArticles)) setHealthArticles(data.healthArticles);
      if (data.whatsAppSettings) setWhatsAppSettings(data.whatsAppSettings);
      if (data.websiteSettings) setWebsiteSettings(data.websiteSettings);

      logActivity('DATABASE_RESTORED', 'System', 'Full Backup Restore');
      showToast('Complete database restored successfully from backup!', 'success');
      return true;
    } catch {
      showToast('Failed to restore backup. Invalid JSON file format.', 'error');
      return false;
    }
  };

  // FUNCTIONAL DOCTOR SEARCH & FILTER ENGINE
  const filterDoctorList = (docList: Doctor[], params: DoctorSearchParams): Doctor[] => {
    const query = (params.query || '').trim().toLowerCase();
    const nameQ = (params.name || '').trim().toLowerCase();
    const specQ = (params.speciality || params.specialityId || '').trim().toLowerCase();
    const locQ = (params.location || '').trim().toLowerCase();
    const city = params.city || 'All';
    const area = (params.area || '').trim().toLowerCase();
    const consultType = params.consultationType || 'All';
    const gender = params.gender || 'All';
    const exp = params.experience || 'All';
    const verified = params.verifiedOnly;
    const maxFeeVal = params.maxFee;

    return docList.filter((doc) => {
      // 1. City filter
      if (city !== 'All' && doc.city !== city) {
        return false;
      }

      // 2. Area/Locality filter
      if (area && area !== 'all') {
        const areaMatch =
          doc.locality.toLowerCase().includes(area) ||
          (doc.patientVisitAddress || '').toLowerCase().includes(area) ||
          doc.fullAddress.toLowerCase().includes(area);
        if (!areaMatch) return false;
      }

      // 3. Name-specific filter
      if (nameQ) {
        const cleanName = doc.name.toLowerCase().replace(/^dr\.?\s*/i, '');
        const cleanQuery = nameQ.replace(/^dr\.?\s*/i, '');
        if (!doc.name.toLowerCase().includes(nameQ) && !cleanName.includes(cleanQuery)) {
          return false;
        }
      }

      // 4. Speciality-specific filter
      if (specQ && specQ !== 'all') {
        const specMatch =
          doc.specialityId.toLowerCase().includes(specQ) ||
          doc.speciality.toLowerCase().includes(specQ) ||
          (doc.subSpeciality || '').toLowerCase().includes(specQ);
        if (!specMatch) return false;
      }

      // 5. Location-specific filter (hospital, locality, address, city)
      if (locQ && locQ !== 'all') {
        const locMatch =
          doc.city.toLowerCase().includes(locQ) ||
          doc.locality.toLowerCase().includes(locQ) ||
          (doc.patientVisitAddress || '').toLowerCase().includes(locQ) ||
          doc.fullAddress.toLowerCase().includes(locQ) ||
          doc.hospitalOrClinic.toLowerCase().includes(locQ);
        if (!locMatch) return false;
      }

      // 6. Consultation Mode
      if (consultType !== 'All') {
        if (
          consultType === 'In Clinic' &&
          !doc.consultationTypes.includes('In Clinic')
        )
          return false;
        if (
          consultType === 'Video Consultation' &&
          !doc.consultationTypes.includes('Video Consultation')
        )
          return false;
        if (
          consultType === 'Home Visit' &&
          !doc.consultationTypes.includes('Home Visit')
        )
          return false;
      }

      // 7. Gender
      if (gender !== 'All' && doc.gender !== gender) {
        return false;
      }

      // 8. Experience
      if (exp !== 'All') {
        if (exp === '5+' && doc.experienceYears < 5) return false;
        if (exp === '10+' && doc.experienceYears < 10) return false;
        if (exp === '15+' && doc.experienceYears < 15) return false;
      }
      if (params.minExperience && doc.experienceYears < params.minExperience) {
        return false;
      }

      // 9. Verified only
      if (verified && !doc.isVerified) {
        return false;
      }

      // 10. Max Fee
      if (maxFeeVal !== undefined && doc.consultationFee > maxFeeVal) {
        return false;
      }

      // 11. Multi-Token Keyword Search across all fields
      if (query !== '') {
        const tokens = query.split(/\s+/).filter(Boolean);
        const searchableDocText = [
          doc.name,
          doc.name.replace(/^dr\.?\s*/i, ''),
          doc.speciality,
          doc.specialityId,
          doc.subSpeciality || '',
          doc.qualification,
          doc.hospitalOrClinic,
          doc.city,
          doc.locality,
          doc.patientVisitAddress || '',
          doc.fullAddress,
          ...(doc.services || []),
        ]
          .join(' ')
          .toLowerCase();

        const allTokensMatch = tokens.every((token) => searchableDocText.includes(token));
        if (!allTokensMatch) {
          return false;
        }
      }

      return true;
    });
  };

  const sortDoctorList = (docList: Doctor[], sortOption: string = 'recommended'): Doctor[] => {
    return [...docList].sort((a, b) => {
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'experience') return b.experienceYears - a.experienceYears;
      if (sortOption === 'fee-low') return a.consultationFee - b.consultationFee;
      if (sortOption === 'fee-high') return b.consultationFee - a.consultationFee;
      return 0; // recommended
    });
  };

  // Pure functional search in doctor registry
  const searchDoctorRegistry = (params: string | DoctorSearchParams): Doctor[] => {
    const searchParams: DoctorSearchParams =
      typeof params === 'string' ? { query: params } : params;
    const filtered = filterDoctorList(doctors, searchParams);
    return sortDoctorList(filtered, searchParams.sortBy || sortBy);
  };

  // Async search API handler with simulated response stats and facets
  const searchDoctorsAPI = async (params: string | DoctorSearchParams): Promise<DoctorSearchResult> => {
    setIsSearching(true);
    try {
      const searchParams: DoctorSearchParams =
        typeof params === 'string' ? { query: params } : params;

      // Small async tick for API simulation
      await new Promise((resolve) => setTimeout(resolve, 30));

      const results = searchDoctorRegistry(searchParams);
      const gopalganjCount = results.filter((d) => d.city === 'Gopalganj').length;
      const siwanCount = results.filter((d) => d.city === 'Siwan').length;
      const verifiedCount = results.filter((d) => d.isVerified).length;

      return {
        doctors: results,
        total: results.length,
        filtersApplied: searchParams,
        stats: {
          totalDoctors: results.length,
          gopalganjCount,
          siwanCount,
          verifiedCount,
        },
      };
    } finally {
      setIsSearching(false);
    }
  };

  // Executing search dynamically updates AppContext state so DoctorDirectory updates instantly
  const executeDoctorSearch = (
    params: string | DoctorSearchParams,
    navigateToDirectory: boolean = false
  ): Doctor[] => {
    const searchParams: DoctorSearchParams =
      typeof params === 'string' ? { query: params } : params;

    if (searchParams.query !== undefined) setSearchQuery(searchParams.query);
    if (searchParams.name !== undefined) setNameFilter(searchParams.name);
    if (searchParams.location !== undefined) setLocationFilter(searchParams.location);
    if (searchParams.city !== undefined) setCityFilter(searchParams.city);
    if (searchParams.area !== undefined) setAreaFilter(searchParams.area);
    if (searchParams.speciality !== undefined || searchParams.specialityId !== undefined) {
      setSpecialityFilter(searchParams.specialityId || searchParams.speciality || 'All');
    }
    if (searchParams.consultationType !== undefined) {
      setConsultationTypeFilter(searchParams.consultationType);
    }
    if (searchParams.gender !== undefined) setGenderFilter(searchParams.gender);
    if (searchParams.experience !== undefined) setExperienceFilter(searchParams.experience);
    if (searchParams.verifiedOnly !== undefined) setVerifiedOnly(searchParams.verifiedOnly);
    if (searchParams.maxFee !== undefined) setMaxFee(searchParams.maxFee);
    if (searchParams.sortBy !== undefined) setSortBy(searchParams.sortBy);

    if (navigateToDirectory) {
      navigateTo('doctors');
    }

    return searchDoctorRegistry(searchParams);
  };

  // DYNAMICALLY FILTERED DOCTORS COMPUTATION
  const filteredDoctors = useMemo(() => {
    const filtered = filterDoctorList(doctors, {
      query: searchQuery,
      name: nameFilter,
      location: locationFilter,
      city: cityFilter,
      area: areaFilter,
      speciality: specialityFilter,
      consultationType: consultationTypeFilter,
      gender: genderFilter,
      experience: experienceFilter,
      verifiedOnly,
      maxFee,
    });

    return sortDoctorList(filtered, sortBy);
  }, [
    doctors,
    searchQuery,
    nameFilter,
    locationFilter,
    cityFilter,
    areaFilter,
    specialityFilter,
    consultationTypeFilter,
    genderFilter,
    experienceFilter,
    verifiedOnly,
    maxFee,
    sortBy,
  ]);

  return (
    <AppContext.Provider
      value={{
        currentView,
        selectedDoctor,
        selectedSpecialityId,
        selectedArticleId,
        selectedHospital,
        selectedClinic,
        selectedCity,
        navigateTo,

        searchQuery,
        setSearchQuery,
        nameFilter,
        setNameFilter,
        locationFilter,
        setLocationFilter,
        cityFilter,
        setCityFilter,
        areaFilter,
        setAreaFilter,
        specialityFilter,
        setSpecialityFilter,
        consultationTypeFilter,
        setConsultationTypeFilter,
        genderFilter,
        setGenderFilter,
        experienceFilter,
        setExperienceFilter,
        availabilityFilter,
        setAvailabilityFilter,
        verifiedOnly,
        setVerifiedOnly,
        maxFee,
        setMaxFee,
        sortBy,
        setSortBy,
        resetFilters,

        // Search API Handlers
        searchDoctorRegistry,
        searchDoctorsAPI,
        executeDoctorSearch,
        isSearching,

        filteredDoctors,

        isBookingModalOpen,
        bookingDoctor,
        bookingPreselectedType,
        openBookingModal,
        closeBookingModal,

        isWhatsAppModalOpen,
        whatsAppDoctor,
        openWhatsAppModal,
        closeWhatsAppModal,

        isAuthModalOpen,
        authInitialTab,
        authInitialRole,
        openAuthModal,
        closeAuthModal,
        currentUser,
        loginUser,
        logoutUser,

        savedDoctorIds,
        toggleSaveDoctor,

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
        bookAppointment,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        updateAppointmentStatus,
        cancelAppointment,

        whatsAppBookings,
        createWhatsAppBooking,
        updateWhatsAppBookingStatus,

        doctorApplications,
        submitDoctorApplication,
        approveDoctorApplication,
        rejectDoctorApplication,

        patients,
        reviews,
        addReview,
        updateReviewStatus,

        healthPackages,
        healthArticles,
        addArticle,
        updateArticle,
        deleteArticle,

        activityLogs,
        logActivity,

        whatsAppSettings,
        updateWhatsAppSettings,
        websiteSettings,
        updateWebsiteSettings,

        // Sound Alarm & Notification System
        soundAlertEnabled,
        setSoundAlertEnabled,
        testBookingAlarm,
        playBookingSound,

        // Data Backup, Export & Import
        exportDoctorsCSV,
        exportDoctorsJSON,
        exportAppointmentsCSV,
        exportSystemBackupJSON,
        importDoctorsJSON,
        restoreSystemBackup,

        faqs,

        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
