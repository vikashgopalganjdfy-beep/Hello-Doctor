import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const SEOHead: React.FC = () => {
  const { currentView, selectedDoctor, cityFilter } = useApp();

  useEffect(() => {
    let title = 'Hello Doctor — Best Doctors in Gopalganj & Siwan | Instant OPD Booking';
    let description =
      'Book confirmed OPD tokens and video consultations with verified top doctors, surgeons, and specialists in Gopalganj and Siwan, Bihar.';

    switch (currentView) {
      case 'home':
        title = 'HELLO DOCTOR — Gopalganj & Siwan Healthcare Portal | Book OPD Tokens';
        description = 'Official healthcare portal for Gopalganj & Siwan districts. Book top cardiologists, gynecologists, pediatricians & emergency care.';
        break;
      case 'doctors':
      case 'gopalganj-doctors':
      case 'siwan-doctors':
        const loc = cityFilter === 'All' ? 'Gopalganj & Siwan' : cityFilter;
        title = `Find Top Doctors in ${loc} (2026 Directory) | Hello Doctor`;
        description = `Browse verified medical practitioners, OPD visiting hours, consultation fees, and patient reviews in ${loc}, Bihar.`;
        break;
      case 'doctor-detail':
        if (selectedDoctor) {
          title = `${selectedDoctor.name} — ${selectedDoctor.speciality} in ${selectedDoctor.city} | Book Token`;
          description = `Book consultation with ${selectedDoctor.name} (${selectedDoctor.qualification}) at ${selectedDoctor.hospitalOrClinic}, ${selectedDoctor.city}. Fee: ₹${selectedDoctor.consultationFee}.`;
        }
        break;
      case 'gopalganj':
        title = 'Best Doctors & Hospitals in Gopalganj (Hospital Rd, Banjari, Cinema Rd) | Hello Doctor';
        description = 'Comprehensive directory of clinics, senior physicians, child specialists, and nursing homes in Gopalganj district.';
        break;
      case 'siwan':
        title = 'Top Doctors & Clinics in Siwan (Babunia Rd, Hospital Rd, Rajendra Path) | Hello Doctor';
        description = 'Find experienced surgeons, orthopedic doctors, gynecologists, and diagnostic centers in Siwan district.';
        break;
      case 'emergency':
        title = '24x7 Emergency & Ambulance Helpline — Gopalganj & Siwan | Hello Doctor';
        description = 'Immediate emergency medical assistance, trauma care centers, and 24/7 ambulance hotline for Gopalganj & Siwan.';
        break;
      case 'hospitals':
      case 'hospital-detail':
        title = 'Hospitals & Trauma Centers in Gopalganj & Siwan | Hello Doctor';
        description = 'View Sadar Hospital, private nursing homes, ICU facilities, and bed availability in Gopalganj and Siwan.';
        break;
      case 'clinics':
        title = 'Private Polyclinics & Diagnostic Centers | Hello Doctor';
        description = 'Explore top polyclinics, pathology labs, and diagnostic centers across Gopalganj and Siwan.';
        break;
      case 'health-packages':
        title = 'Preventive Health Packages & Full Body Checkups | Hello Doctor';
        description = 'Discounted cardiac, diabetic, senior citizen, and women health checkup packages in Gopalganj & Siwan.';
        break;
      case 'articles':
      case 'article-detail':
        title = 'Health Tips, Articles & Medical Guides | Hello Doctor';
        description = 'Read expert health advice and preventive wellness guides by Bihar medical specialists.';
        break;
      case 'doctor-register':
        title = 'Doctor Onboarding & Registration Portal | Hello Doctor';
        description = 'Register your clinic and expand your patient appointments across Gopalganj and Siwan districts.';
        break;
      case 'admin-dashboard':
      case 'admin-login':
        title = 'Admin Control Suite — Hello Doctor Management Panel';
        description = 'Administrative portal for doctor approvals, OPD tokens, pricing updates, and system data.';
        break;
      default:
        break;
    }

    document.title = title;

    // Update meta description if present or create it
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
  }, [currentView, selectedDoctor, cityFilter]);

  return null;
};
