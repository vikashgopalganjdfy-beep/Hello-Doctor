import React, { useState } from 'react';
import {
  Stethoscope,
  ShieldCheck,
  Building,
  Upload,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  User,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { City } from '../../types';

export const DoctorRegisterPage: React.FC = () => {
  const { specialities, showToast, navigateTo, submitDoctorApplication } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');

  const [degree, setDegree] = useState('MBBS, MD');
  const [speciality, setSpeciality] = useState('Cardiology');
  const [subSpeciality, setSubSpeciality] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [councilName, setCouncilName] = useState('Bihar Medical Council, Patna');
  const [experienceYears, setExperienceYears] = useState(8);

  const [city, setCity] = useState<City>('Gopalganj');
  const [hospitalName, setHospitalName] = useState('');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [fee, setFee] = useState(500);
  const [videoFee, setVideoFee] = useState(400);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !regNumber.trim()) {
      showToast('Please fill in all mandatory fields', 'error');
      return;
    }

    submitDoctorApplication({
      fullName: name.startsWith('Dr.') ? name : `Dr. ${name}`,
      gender,
      mobile: phone,
      email: email || `${phone.replace(/\D/g, '')}@hellodoctor-portal.com`,
      speciality,
      subSpeciality,
      qualification: degree,
      experienceYears: Number(experienceYears),
      hospitalOrClinic: hospitalName || 'Independent Medical OPD',
      city: city === 'All' ? 'Gopalganj' : city,
      patientVisitAddress: address || `${locality}, ${city}, Bihar`,
      fullAddress: address || `${locality}, ${city}, Bihar`,
      registrationNumber: regNumber,
      councilName,
      consultationFee: Number(fee),
      videoFee: Number(videoFee),
      consultationModes: ['In Clinic', 'Video Consultation'],
    });

    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold border border-blue-200/60 uppercase tracking-wider mb-2">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Practitioner Onboarding Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#003B95] tracking-tight font-['Outfit',sans-serif]">
            Doctor Registration — Gopalganj & Siwan
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
            Join the verified digital healthcare network. Reach thousands of patients seeking consultation in Gopalganj & Siwan.
          </p>
        </div>

        {/* Step Progress Bar */}
        {!isSubmitted && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8">
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <div
                className={`py-2 rounded-xl transition-colors ${
                  step >= 1 ? 'bg-blue-50 text-[#0052CC] border border-blue-200' : 'text-slate-400'
                }`}
              >
                1. Personal Details
              </div>
              <div
                className={`py-2 rounded-xl transition-colors ${
                  step >= 2 ? 'bg-blue-50 text-[#0052CC] border border-blue-200' : 'text-slate-400'
                }`}
              >
                2. Medical Council Credentials
              </div>
              <div
                className={`py-2 rounded-xl transition-colors ${
                  step >= 3 ? 'bg-blue-50 text-[#0052CC] border border-blue-200' : 'text-slate-400'
                }`}
              >
                3. Clinic & Fee Details
              </div>
            </div>
          </div>
        )}

        {/* FORM CONTAINER */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          {!isSubmitted ? (
            <form onSubmit={handleFinish} className="space-y-6">
              {/* STEP 1: PERSONAL INFO */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-[#003B95] font-['Outfit',sans-serif]">
                    Step 1: Practitioner Personal Information
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Doctor Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dr. Rajesh Kumar Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Gender *
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 9431X XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="doctor@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!name.trim() || !phone.trim()) {
                          showToast('Please enter name and phone number', 'error');
                          return;
                        }
                        setStep(2);
                      }}
                      className="px-6 py-2.5 bg-[#0052CC] hover:bg-[#003B95] text-white font-bold text-xs sm:text-sm rounded-full flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Proceed to Step 2</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CREDENTIALS */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-[#003B95] font-['Outfit',sans-serif]">
                    Step 2: Medical Qualifications & Council Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Primary Speciality *
                      </label>
                      <select
                        value={speciality}
                        onChange={(e) => setSpeciality(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                      >
                        {specialities.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Qualifications & Degrees *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. MBBS, MD (Medicine), DM"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Medical Council Registration Number *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. BIMC-48192 or MCI-89104"
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Registration Medical Council *
                      </label>
                      <input
                        type="text"
                        value={councilName}
                        onChange={(e) => setCouncilName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm rounded-full flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!degree.trim() || !regNumber.trim()) {
                          showToast('Please enter degrees and council registration number', 'error');
                          return;
                        }
                        setStep(3);
                      }}
                      className="px-6 py-2.5 bg-[#0052CC] hover:bg-[#003B95] text-white font-bold text-xs sm:text-sm rounded-full flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Proceed to Step 3</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CLINIC & FEES */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-[#003B95] font-['Outfit',sans-serif]">
                    Step 3: Clinic Location & Consultation Fees
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Primary Practicing District *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value as City)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                      >
                        <option value="Gopalganj">Gopalganj District</option>
                        <option value="Siwan">Siwan District</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Hospital / Clinic Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Health Clinic"
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Patient Visit Address (Road / Landmark) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hospital Road, Opposite State Bank Main Branch"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        In-Clinic OPD Fee (₹) *
                      </label>
                      <input
                        type="number"
                        value={fee}
                        onChange={(e) => setFee(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Video Consultation Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={videoFee}
                        onChange={(e) => setVideoFee(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0052CC]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm rounded-full flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Application for Verification</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#003B95] font-['Outfit',sans-serif]">
                Application Successfully Submitted!
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for applying to join the Hello Doctor practitioner panel in {city}. Your application has been logged into the Administrator Verification Queue for council check.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => navigateTo('home')}
                  className="px-6 py-2.5 bg-[#0052CC] hover:bg-[#003B95] text-white font-bold text-xs rounded-full cursor-pointer shadow-md"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
