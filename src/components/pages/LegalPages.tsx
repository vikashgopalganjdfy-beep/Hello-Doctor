import React from 'react';
import { ShieldCheck, FileText, AlertTriangle, ChevronLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LegalPages: React.FC<{ type: 'privacy' | 'terms' | 'disclaimer' }> = ({ type }) => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0052CC] bg-white px-4 py-2 rounded-full border border-slate-200 shadow-xs transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-6">
          {type === 'privacy' && (
            <>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052CC] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003B95] font-['Outfit',sans-serif]">
                    Privacy Policy
                  </h1>
                  <p className="text-xs text-slate-500">Last updated: August 2026 • Hello Doctor Gopalganj & Siwan</p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
                <h3 className="font-bold text-base text-[#003B95]">1. Data Collection & Healthcare Records</h3>
                <p>
                  Hello Doctor collects patient names, contact telephone numbers, preferred appointment dates, and brief clinical reasons strictly to facilitate medical appointments and WhatsApp confirmations with registered clinics in Gopalganj and Siwan.
                </p>

                <h3 className="font-bold text-base text-[#003B95]">2. Confidentiality & Third-Party Sharing</h3>
                <p>
                  We do not sell, rent, or lease patient contact details or consultation records to advertisers. Contact information is securely shared solely with the chosen healthcare provider and clinic desk for queue token assignment.
                </p>

                <h3 className="font-bold text-base text-[#003B95]">3. Communications via WhatsApp & SMS</h3>
                <p>
                  By generating an appointment token or initiating a WhatsApp consultation request, patients consent to receive transaction receipts, appointment confirmation slips, and clinic address navigation assistance.
                </p>
              </div>
            </>
          )}

          {type === 'terms' && (
            <>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052CC] flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003B95] font-['Outfit',sans-serif]">
                    Terms & Conditions
                  </h1>
                  <p className="text-xs text-slate-500">Effective from August 2026</p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
                <h3 className="font-bold text-base text-[#003B95]">1. Platform Role</h3>
                <p>
                  Hello Doctor functions as a verified healthcare discovery and token scheduling platform linking patients in Gopalganj & Siwan with registered independent medical practitioners and hospitals.
                </p>

                <h3 className="font-bold text-base text-[#003B95]">2. Appointment Tokens & Fees</h3>
                <p>
                  Consultation fees displayed on doctor profiles reflect clinic charges. Payments may be made at the clinic desk or through verified clinic billing counters unless specified otherwise for teleconsultation.
                </p>

                <h3 className="font-bold text-base text-[#003B95]">3. Rescheduling & Cancellation</h3>
                <p>
                  Patients may reschedule or cancel their token at any time without platform penalties. Practitioners reserve the right to prioritize urgent emergency cases at their physical OPD chambers.
                </p>
              </div>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003B95] font-['Outfit',sans-serif]">
                    Medical & Emergency Disclaimer
                  </h1>
                  <p className="text-xs text-slate-500">Important safety advisory for patients</p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-900 font-bold">
                  ⚠️ NOT FOR IMMEDIATE LIFE-THREATENING EMERGENCIES: If you or a family member is experiencing severe chest pain, acute respiratory arrest, massive trauma, stroke symptoms, or severe poisoning, immediately dial 108 / 102 or proceed directly to Sadar Hospital Emergency Trauma Desk in Gopalganj or Siwan.
                </div>

                <h3 className="font-bold text-base text-[#003B95]">1. Professional Doctor-Patient Relationship</h3>
                <p>
                  Health articles, FAQs, and informational tips on Hello Doctor are published for general awareness and education. They do not constitute formal medical diagnosis or replace personalized examination by a licensed physician.
                </p>

                <h3 className="font-bold text-base text-[#003B95]">2. Practitioner Qualifications & Councils</h3>
                <p>
                  All practitioners listed on this platform are registered with medical councils (such as the Bihar Medical Council, Medical Council of India / NMC). Patients are encouraged to discuss full medical histories openly with their chosen doctor.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
