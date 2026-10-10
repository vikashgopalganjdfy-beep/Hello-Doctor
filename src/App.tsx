import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { SpecialitiesGrid } from './components/home/SpecialitiesGrid';
import { FeaturedDoctors } from './components/home/FeaturedDoctors';
import { EmergencySection } from './components/home/EmergencySection';
import { DoctorRegistrationCTA } from './components/home/DoctorRegistrationCTA';
import { DoctorDirectory } from './components/doctors/DoctorDirectory';
import { DoctorProfileView } from './components/doctors/DoctorProfileView';
import { GopalganjPage } from './components/pages/GopalganjPage';
import { SiwanPage } from './components/pages/SiwanPage';
import { ClinicsPage } from './components/pages/ClinicsPage';
import { FAQPage } from './components/pages/FAQPage';
import { LegalPages } from './components/pages/LegalPages';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { PatientDashboard } from './components/dashboard/PatientDashboard';
import { DoctorDashboard } from './components/dashboard/DoctorDashboard';
import { DoctorRegisterPage } from './components/pages/DoctorRegisterPage';
import { HospitalsPage } from './components/pages/HospitalsPage';
import { HealthPackagesPage } from './components/pages/HealthPackagesPage';
import { HealthArticlesPage } from './components/pages/HealthArticlesPage';
import { SpecialitiesPage } from './components/pages/SpecialitiesPage';
import { BookingModal } from './components/booking/BookingModal';
import { WhatsAppBookingModal } from './components/booking/WhatsAppBookingModal';
import { AuthModal } from './components/auth/AuthModal';
import { AdminLoginPage } from './components/auth/AdminLoginPage';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { SEOHead } from './components/common/SEOHead';
import { QuickContactWidget } from './components/common/QuickContactWidget';
import { CheckCircle2, AlertCircle, Info, ShieldCheck, HeartPulse } from 'lucide-react';

export function App() {
  const { currentView, selectedDoctor, toast } = useApp();

  // If in full Admin Dashboard, render standalone admin interface
  if (currentView === 'admin-dashboard') {
    return (
      <div className="min-h-screen bg-[#0F172A] font-sans antialiased text-slate-100 selection:bg-blue-600 selection:text-white">
        <SEOHead />
        <AdminDashboard />
        {toast && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-2xl shadow-2xl text-xs font-bold animate-in fade-in duration-150">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            )}
            <span>{toast.text}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans antialiased text-slate-800 selection:bg-[#0052CC] selection:text-white">
      {/* Dynamic SEO Head Title & Meta Updater */}
      <SEOHead />

      {/* Universal Top Navbar */}
      <Navbar />

      {/* Main Dynamic View Routing */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection />
            <SpecialitiesGrid />
            <FeaturedDoctors />
            <EmergencySection />
            <DoctorRegistrationCTA />
            <TestimonialsSection />
          </>
        )}

        {currentView === 'doctors' && <DoctorDirectory />}
        {currentView === 'gopalganj-doctors' && <DoctorDirectory />}
        {currentView === 'siwan-doctors' && <DoctorDirectory />}

        {currentView === 'doctor-detail' && selectedDoctor && (
          <DoctorProfileView doctor={selectedDoctor} />
        )}

        {currentView === 'gopalganj' && <GopalganjPage />}
        {currentView === 'siwan' && <SiwanPage />}

        {currentView === 'specialities' && <SpecialitiesPage />}
        {currentView === 'speciality-detail' && <DoctorDirectory />}

        {currentView === 'hospitals' && <HospitalsPage />}
        {currentView === 'hospital-detail' && <HospitalsPage />}

        {currentView === 'clinics' && <ClinicsPage />}

        {currentView === 'emergency' && (
          <div className="py-8">
            <EmergencySection />
          </div>
        )}

        {currentView === 'health-packages' && <HealthPackagesPage />}
        {currentView === 'articles' && <HealthArticlesPage />}
        {currentView === 'article-detail' && <HealthArticlesPage />}

        {currentView === 'faq' && <FAQPage />}
        {currentView === 'doctor-register' && <DoctorRegisterPage />}

        {currentView === 'patient-dashboard' && <PatientDashboard />}
        {currentView === 'doctor-dashboard' && <DoctorDashboard />}

        {currentView === 'admin-login' && <AdminLoginPage />}

        {currentView === 'privacy-policy' && <LegalPages type="privacy" />}
        {currentView === 'terms' && <LegalPages type="terms" />}
        {currentView === 'medical-disclaimer' && <LegalPages type="disclaimer" />}
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Sticky Fast Emergency & WhatsApp Contact Action Hub */}
      <QuickContactWidget />

      {/* Global Modals & Dialogs */}
      <BookingModal />
      <WhatsAppBookingModal />
      <AuthModal />

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 bg-slate-900/95 backdrop-blur-sm text-white rounded-2xl shadow-2xl border border-slate-700/80 text-xs font-bold animate-in fade-in slide-in-from-bottom-2 duration-150 max-w-sm">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-[#00A3BF] shrink-0" />
          )}
          <span className="leading-snug">{toast.text}</span>
        </div>
      )}
    </div>
  );
}
export default App;
