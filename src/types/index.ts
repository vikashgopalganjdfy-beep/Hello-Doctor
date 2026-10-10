export type City = 'Gopalganj' | 'Siwan' | 'All';

export type ConsultationType = 'In Clinic' | 'Video Consultation' | 'Home Visit' | 'Both' | 'All';

export type SpecialityId =
  | 'general-medicine'
  | 'cardiology'
  | 'neurology'
  | 'orthopedics'
  | 'pediatrics'
  | 'gynecology'
  | 'dermatology'
  | 'dentistry'
  | 'ent'
  | 'ophthalmology'
  | 'general-surgery'
  | 'urology'
  | 'gastroenterology'
  | 'pulmonology'
  | 'nephrology'
  | 'psychiatry'
  | 'physiotherapy'
  | 'radiology'
  | 'pathology'
  | 'anesthesiology'
  | 'oncology';

export interface Speciality {
  id: SpecialityId | string;
  name: string;
  hindiName?: string;
  iconName: string;
  description: string;
  doctorCount: number;
  featured?: boolean;
  active?: boolean;
}

export interface DoctorSearchParams {
  query?: string;
  name?: string;
  speciality?: string;
  specialityId?: string;
  location?: string;
  city?: City;
  area?: string;
  consultationType?: string;
  gender?: string;
  experience?: string;
  minExperience?: number;
  verifiedOnly?: boolean;
  maxFee?: number;
  sortBy?: string;
}

export interface DoctorSearchResult {
  doctors: Doctor[];
  total: number;
  filtersApplied: DoctorSearchParams;
  stats?: {
    totalDoctors: number;
    gopalganjCount: number;
    siwanCount: number;
    verifiedCount: number;
  };
}

export interface Doctor {
  id: string;
  name: string;
  photo: string;
  emoji?: string;
  gender: 'Male' | 'Female';
  speciality: string;
  specialityId: SpecialityId | string;
  subSpeciality?: string;
  qualification: string;
  experienceYears: number;
  hospitalOrClinic: string;
  city: 'Gopalganj' | 'Siwan';
  locality: string;
  patientVisitAddress?: string;
  fullAddress: string;
  phone: string;
  email?: string;
  consultationFee: number; // Clinic fee
  videoConsultationFee?: number; // Online fee
  followUpFee?: number;
  homeVisitFee?: number;
  consultationTypes: ('In Clinic' | 'Video Consultation' | 'Home Visit')[];
  languages: string[];
  about: string;
  services: string[];
  awards?: string[];
  registrationNumber: string; // e.g. "BIMC-28491 (Sample)"
  registrationAuthority?: string; // e.g. "Bihar Medical Council, Patna"
  availableDays: string[];
  availableTimeSlots: string[];
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  verificationStatus?: 'Pending' | 'Under Review' | 'Verified' | 'Rejected';
  isFeatured?: boolean;
  isActive?: boolean;
  isAvailableToday?: boolean;
  isAvailableTomorrow?: boolean;
  nextSlot?: string;
  education?: {
    degree: string;
    college: string;
    year: string;
  }[];
  experience?: {
    role: string;
    institution: string;
    duration: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Hospital {
  id: string;
  name: string;
  photo?: string;
  image?: string;
  city: 'Gopalganj' | 'Siwan';
  locality: string;
  address?: string;
  fullAddress?: string;
  phone: string;
  emergencyPhone?: string;
  has24x7Emergency: boolean;
  departments: string[];
  rating: number;
  reviewCount: number;
  bedCount: number;
  openingHours: string;
  facilities: string[];
  description?: string;
  about?: string;
  isGovt?: boolean;
  active?: boolean;
  doctorsCount?: number;
}

export interface Clinic {
  id: string;
  name: string;
  doctorName?: string;
  speciality?: string;
  city: 'Gopalganj' | 'Siwan';
  locality: string;
  address: string;
  phone: string;
  openingHours: string;
  services: string[];
  photo: string;
  active: boolean;
}

export interface HealthPackage {
  id: string;
  name: string;
  badge?: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  testsCount: number;
  category: 'General' | 'Senior Citizen' | 'Women' | 'Diabetic' | 'Heart' | 'Executive';
  testsIncluded: string[];
  fastingRequired: string;
  reportTurnaround: string;
  availableIn: ('Gopalganj' | 'Siwan')[];
  hospitalOrLab: string;
  description?: string;
  active?: boolean;
}

export interface HealthArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  publishedDate: string;
  image: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  isPublished?: boolean;
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  doctorConsulted: string;
  speciality: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  verifiedPatient: boolean;
}

export interface Appointment {
  id: string;
  bookingCode: string;
  doctorId: string;
  doctorName: string;
  doctorSpeciality: string;
  doctorPhoto: string;
  hospitalOrClinic: string;
  patientVisitAddress?: string;
  city: 'Gopalganj' | 'Siwan';
  consultationType: 'In Clinic' | 'Video Consultation' | 'Home Visit';
  appointmentDate: string;
  appointmentTime: string;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  patientMobile: string;
  patientEmail: string;
  reasonForVisit: string;
  feeAmount: number;
  status: 'Pending' | 'Confirmed' | 'Rescheduled' | 'Completed' | 'Cancelled' | 'No Show';
  bookedAt: string;
  notes?: string;
  bookingChannel?: 'Website' | 'WhatsApp' | 'Walk-in';
}

export interface WhatsAppBooking {
  id: string;
  bookingCode: string;
  doctorId: string;
  doctorName: string;
  doctorSpeciality: string;
  city: 'Gopalganj' | 'Siwan';
  hospitalOrClinic: string;
  patientVisitAddress: string;
  consultationType: 'In Clinic' | 'Video Consultation' | 'Home Visit';
  preferredDate: string;
  preferredTime: string;
  patientName: string;
  patientMobile: string;
  patientAge?: number;
  patientGender?: string;
  reasonForVisit: string;
  feeAmount: number;
  status: 'Pending' | 'Confirmed' | 'Rescheduled' | 'Cancelled';
  submittedAt: string;
}

export interface DoctorRegistrationApplication {
  id: string;
  fullName: string;
  gender: 'Male' | 'Female';
  mobile: string;
  email: string;
  speciality: string;
  subSpeciality?: string;
  qualification: string;
  experienceYears: number;
  hospitalOrClinic: string;
  city: 'Gopalganj' | 'Siwan';
  patientVisitAddress: string;
  fullAddress: string;
  registrationNumber: string;
  councilName: string;
  consultationFee: number;
  videoFee?: number;
  consultationModes: string[];
  status: 'Pending Verification' | 'Under Review' | 'Approved' | 'Rejected';
  submittedAt: string;
  documents?: string[];
  photoUrl?: string;
  notes?: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: 'Gopalganj' | 'Siwan';
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  registeredAt: string;
  appointmentsCount: number;
  status: 'Active' | 'Inactive';
}

export interface DoctorReview {
  id: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Hidden';
  consultationType: string;
}

export interface ActivityLog {
  id: string;
  adminName: string;
  action: string;
  entity: string;
  entityName: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
}

export interface WhatsAppSettings {
  phoneNumber: string; // e.g. "+91 9007355062"
  bookingMessageTemplate: string;
  confirmationMessageTemplate: string;
  cancellationMessageTemplate: string;
  reminderMessageTemplate: string;
  supportHours: string;
}

export interface WebsiteSettings {
  brandName: string;
  brandTagline: string;
  secondaryTagline: string;
  emergencyNumber: string;
  helplineNumber: string;
  emailContact: string;
  addressGopalganj: string;
  addressSiwan: string;
  heroHeading: string;
  heroSubheading: string;
  bannerNotice?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Booking' | 'Doctors' | 'Hospitals' | 'WhatsApp' | 'Payments';
  published: boolean;
}

export type ViewState =
  | 'home'
  | 'doctors'
  | 'doctor-detail'
  | 'specialities'
  | 'speciality-detail'
  | 'gopalganj'
  | 'gopalganj-doctors'
  | 'siwan'
  | 'siwan-doctors'
  | 'hospitals'
  | 'hospital-detail'
  | 'clinics'
  | 'appointments'
  | 'book-appointment'
  | 'health-packages'
  | 'articles'
  | 'article-detail'
  | 'emergency'
  | 'about'
  | 'contact'
  | 'faq'
  | 'doctor-register'
  | 'patient-dashboard'
  | 'doctor-dashboard'
  | 'admin-dashboard'
  | 'admin-login'
  | 'privacy-policy'
  | 'terms'
  | 'medical-disclaimer';

export type UserRole = 'patient' | 'doctor' | 'admin' | 'guest';

export type AdminSubRole = 'Super Admin' | 'Doctor Manager' | 'Appointment Manager' | 'Content Manager';

export interface UserSession {
  role: UserRole;
  adminRole?: AdminSubRole;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  doctorId?: string;
}
