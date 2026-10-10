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

export const DoctorRegistrationPage: React.FC = () => {
  const { specialities, showToast, navigateTo } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');

  const [degree, setDegree] = useState('MBBS, MD');
  const [specialityId, setSpecialityId] = useState('cardiology');
  const [regNumber, setRegNumber] = useState('');
  const [experienceYears, setExperienceYears] = useState(8);

  const [city, setCity] = useState<City>('Gopalganj');
  const [hospitalName, setHospitalName] = useState('');
  const [locality, setLocality] = useState('');
  const [fee, setFee] = useState(500);
  const [videoFee, setVideoFee] = useState(400);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Your doctor registration has been submitted for manual verification!', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200/60 uppercase tracking-wider mb-2">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Practitioner Onboarding</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Register as a Doctor on Hello Doctor
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
            Join the leading verified digital OPD network serving patients across Gopalganj and Siwan districts.
          </p>
        </div>

        {/* Step Progress Bar */}
        {!isSubmitted && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8">
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <div
                className={`py-2 rounded-xl transition-colors ${
                  step >= 1 ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'text-slate-400'
                }`}
              >
                1. Personal Info
              </div>
              <div
                className={`py-2 rounded-xl transition-colors ${
                  step >= 2 ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'text-slate-400'
                }`}
              >
                2. Credentials & Council
              </div>
              <div
                className={`py-2 rounded-xl transition-colors ${
                  step >= 3 ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'text-slate-400'
                }`}
              >
                3. Clinic & Schedule
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
                  <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2">
                    <User className="w-5 h-5 text-sky-600" />
                    <span>Personal & Contact Information</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Doctor Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Rajesh Shrivastava"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Gender
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="doctor@hospital.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9431X XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2"
                    >
                      <span>Next: Credentials</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CREDENTIALS */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-sky-600" />
                    <span>Medical Qualifications & Registration</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Primary Speciality *
                      </label>
                      <select
                        value={specialityId}
                        onChange={(e) => setSpecialityId(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                      >
                        {specialities.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Degrees & Qualifications *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. MBBS, MD (Medicine), DM"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        State Medical Council Registration No *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BH-MC-2026-XXXX"
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Years of Clinical Experience *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2"
                    >
                      <span>Next: Clinic & Schedule</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CLINIC & FEES */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2">
                    <Building className="w-5 h-5 text-sky-600" />
                    <span>Clinic Address, District & Fees</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        District *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value as City)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                      >
                        <option value="Gopalganj">Gopalganj District</option>
                        <option value="Siwan">Siwan District</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Hospital / Clinic Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shrivastava Heart Clinic"
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Locality / Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Banjari Road / Babunia Road"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          OPD Fee (₹)
                        </label>
                        <input
                          type="number"
                          step="50"
                          value={fee}
                          onChange={(e) => setFee(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Video Fee (₹)
                        </label>
                        <input
                          type="number"
                          step="50"
                          value={videoFee}
                          onChange={(e) => setVideoFee(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Document Upload Simulation */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                    <div className="text-xs font-bold text-slate-700">
                      Upload Medical Registration Certificate / ID Proof
                    </div>
                    <p className="text-[11px] text-slate-500">PDF, JPG, or PNG (Max 5MB)</p>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Doctor Registration</span>
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
              <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                Registration Application Received!
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for applying to join the Hello Doctor practitioner panel in {city}. Our medical verification officer will verify your council credentials within 24-48 hours.
              </p>
              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 inline-block text-xs font-bold text-sky-800">
                Application Reference ID: <span className="text-slate-900">DOC-ONB-9142</span>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => navigateTo('home')}
                  className="px-6 py-2.5 bg-sky-600 text-white font-bold text-xs rounded-xl"
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
