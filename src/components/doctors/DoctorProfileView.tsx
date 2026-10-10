import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  Phone,
  ShieldCheck,
  Building,
  GraduationCap,
  Briefcase,
  Award,
  Video,
  ChevronLeft,
  Heart,
  Share2,
  CheckCircle,
  MessageSquare,
  Sparkles,
  Info,
  DollarSign,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Doctor } from '../../types';
import { DoctorAvatar } from '../common/DoctorAvatar';

interface DoctorProfileViewProps {
  doctor: Doctor;
}

export const DoctorProfileView: React.FC<DoctorProfileViewProps> = ({ doctor }) => {
  const {
    navigateTo,
    openBookingModal,
    openWhatsAppModal,
    savedDoctorIds,
    toggleSaveDoctor,
    whatsAppSettings,
    reviews,
    addReview,
    showToast,
  } = useApp();

  const isSaved = savedDoctorIds.includes(doctor.id);
  const [selectedDay, setSelectedDay] = useState(
    doctor.availableDays && doctor.availableDays.length > 0 ? doctor.availableDays[0] : 'Mon'
  );
  const [selectedSlot, setSelectedSlot] = useState(
    doctor.availableTimeSlots && doctor.availableTimeSlots.length > 0
      ? doctor.availableTimeSlots[0]
      : '10:00 AM'
  );

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const doctorReviews = reviews.filter((r) => r.doctorId === doctor.id && r.status === 'Approved');

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Doctor profile link copied to clipboard!', 'success');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      showToast('Please enter your name and review comment', 'error');
      return;
    }
    addReview({
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientName: reviewerName,
      rating: reviewRating,
      comment: reviewComment,
      consultationType: 'In Clinic',
    });
    setReviewComment('');
    setReviewerName('');
    setShowReviewForm(false);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('doctors')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0052CC] bg-white px-4 py-2 rounded-full border border-slate-200 shadow-xs transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Doctors</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 bg-white rounded-full border border-slate-200 text-slate-600 hover:text-[#0052CC] shadow-xs transition-colors cursor-pointer"
              title="Share Doctor Profile"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleSaveDoctor(doctor.id)}
              className={`p-2 bg-white rounded-full border border-slate-200 shadow-xs transition-colors cursor-pointer ${
                isSaved ? 'text-rose-500 bg-rose-50 border-rose-200' : 'text-slate-600 hover:text-rose-500'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save doctor'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Doctor Profile Overview (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Doctor Hero Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative shrink-0">
                  <DoctorAvatar doctor={doctor} size="xl" />
                  {doctor.isVerified && (
                    <div
                      className="absolute -top-2 -left-2 bg-emerald-600 text-white rounded-full p-1.5 shadow-md flex items-center gap-1 z-10"
                      title="Verified Medical Practitioner"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-[#0052CC] text-xs font-bold rounded-full">
                      {doctor.city} District
                    </span>
                    {doctor.isVerified && (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Practitioner</span>
                      </span>
                    )}
                    {doctor.registrationNumber && (
                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-mono">
                        Reg: {doctor.registrationNumber}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003B95] font-['Outfit',sans-serif]">
                    {doctor.name}
                  </h1>

                  <p className="text-sm font-bold text-[#0052CC]">
                    {doctor.speciality} {doctor.subSpeciality ? `• ${doctor.subSpeciality}` : ''}
                  </p>

                  <p className="text-xs text-slate-600 font-medium">
                    {doctor.qualification} • {doctor.experienceYears}+ Years Clinical Experience
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-amber-800 text-xs font-bold">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      <span>{doctor.rating}</span>
                      <span className="text-slate-400 font-normal">({doctor.reviewCount || 12} reviews)</span>
                    </div>

                    <div className="text-xs text-slate-600">
                      <strong>Languages:</strong> {(doctor.languages || ['Hindi', 'Bhojpuri', 'English']).join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Visit Location Banner */}
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-start gap-3 text-xs">
                <MapPin className="w-5 h-5 text-[#0052CC] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-bold text-[#003B95]">
                    Patient Visit Location / Clinic Address:
                  </div>
                  <div className="text-slate-700 font-medium">
                    {doctor.patientVisitAddress || `${doctor.hospitalOrClinic}, ${doctor.fullAddress}`}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Clinic: {doctor.hospitalOrClinic} • Locality: {doctor.locality}
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Breakdown Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-[#003B95] font-['Outfit',sans-serif] flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#0052CC]" />
                <span>Consultation Fee Structure</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] uppercase font-bold text-slate-500 block">In-Clinic Visit</span>
                  <span className="text-xl font-extrabold text-[#003B95] mt-1 block">
                    ₹{doctor.consultationFee}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Standard OPD</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] uppercase font-bold text-slate-500 block">Video Teleconsult</span>
                  <span className="text-xl font-extrabold text-[#003B95] mt-1 block">
                    ₹{doctor.videoConsultationFee || doctor.consultationFee}
                  </span>
                  <span className="text-[10px] text-[#0052CC] font-semibold">Online Video</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] uppercase font-bold text-slate-500 block">Follow-Up Visit</span>
                  <span className="text-xl font-extrabold text-[#003B95] mt-1 block">
                    ₹{doctor.followUpFee || Math.round(doctor.consultationFee * 0.6)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">Within 7 Days</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] uppercase font-bold text-slate-500 block">Home Visit</span>
                  <span className="text-xl font-extrabold text-[#003B95] mt-1 block">
                    ₹{doctor.homeVisitFee || doctor.consultationFee * 2}
                  </span>
                  <span className="text-[10px] text-amber-700 font-semibold">On Request</span>
                </div>
              </div>
            </div>

            {/* About & Clinical Summary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-[#003B95] font-['Outfit',sans-serif]">
                About {doctor.name}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {doctor.about ||
                  `${doctor.name} is a highly accomplished ${doctor.speciality} specialist with over ${doctor.experienceYears} years of clinical practice in ${doctor.city}, Bihar. Known for accurate diagnosis, ethical care, and patient-first consultation.`}
              </p>

              {/* Services & Treatments */}
              <div className="pt-2 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Treatments & Clinical Services
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(doctor.services && doctor.services.length > 0
                    ? doctor.services
                    : ['Comprehensive Clinical OPD', 'Emergency Consultation', 'Preventive Health', 'Post-Op Followup']
                  ).map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200"
                    >
                      ✓ {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Patient Reviews Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-[#003B95] font-['Outfit',sans-serif]">
                    Patient Feedback & Reviews
                  </h2>
                  <p className="text-xs text-slate-500">Verified patient experiences in {doctor.city}</p>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#0052CC] text-xs font-bold rounded-full transition-colors cursor-pointer"
                >
                  {showReviewForm ? 'Cancel Review' : '+ Write a Review'}
                </button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-800">Share Your Consultation Experience</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      required
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600">Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Describe how the doctor treated you, clinic hygiene, and overall experience..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                    required
                  />

                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0052CC] hover:bg-[#003B95] text-white font-bold text-xs rounded-full cursor-pointer shadow-xs"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-3">
                {doctorReviews.length === 0 ? (
                  <div className="text-center py-6 text-slate-500 text-xs">
                    Be the first patient to write a verified review for {doctor.name}!
                  </div>
                ) : (
                  doctorReviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">{rev.patientName}</span>
                        <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{rev.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">{rev.comment}</p>
                      <div className="text-[10px] text-slate-400">{rev.date} • Verified Patient</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking & WhatsApp Action Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-20 space-y-5">
              {/* Main Booking Action Box */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl space-y-5">
                <div className="pb-4 border-b border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Consultation Fee
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-[#003B95]">
                      ₹{doctor.consultationFee}
                    </span>
                    <span className="text-xs text-slate-500">per patient visit</span>
                  </div>
                </div>

                {/* Day selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Available Days
                  </label>
                  <div className="grid grid-cols-6 gap-1.5">
                    {(doctor.availableDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']).map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                          selectedDay === day
                            ? 'bg-[#0052CC] text-white shadow-xs'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slot selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(doctor.availableTimeSlots || ['10:00 AM', '12:00 PM', '04:30 PM', '06:00 PM']).map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          selectedSlot === slot
                            ? 'bg-blue-50 border-[#0052CC] text-[#0052CC]'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => openBookingModal(doctor, 'In Clinic')}
                    className="w-full py-3.5 px-6 bg-[#0052CC] hover:bg-[#003B95] active:bg-[#002D72] text-white font-extrabold text-sm rounded-full shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment Token</span>
                  </button>

                  <button
                    onClick={() => openWhatsAppModal(doctor)}
                    className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm rounded-full shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Book on WhatsApp</span>
                  </button>
                </div>

                {/* Official WhatsApp Info */}
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-center text-xs text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant Booking via WhatsApp</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-mono">
                    {whatsAppSettings.phoneNumber || '+91 9007355062'}
                  </div>
                </div>
              </div>

              {/* Direct Clinic Contact Card */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 text-xs space-y-3">
                <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Clinic Assistance
                </div>
                <div className="text-slate-600 space-y-1">
                  <div><strong>Phone:</strong> {doctor.phone || '+91 9431X XXXXX'}</div>
                  <div><strong>City:</strong> {doctor.city} District, Bihar</div>
                  <div><strong>Hours:</strong> 09:00 AM – 08:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
