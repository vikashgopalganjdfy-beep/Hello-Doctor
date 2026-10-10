import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Phone,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FAQPage: React.FC = () => {
  const { faqs, whatsAppSettings, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const categories = ['All', 'General', 'Booking', 'Doctors', 'Hospitals'];

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCategory !== 'All' && faq.category !== selectedCategory) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#003B95] font-['Outfit',sans-serif]">
            How Can We Help You?
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            Everything you need to know about booking verified doctors, token slips, emergency care, and WhatsApp bookings in Gopalganj & Siwan.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. appointment cancel, Gopalganj doctors, WhatsApp)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#0052CC] shadow-xs"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0052CC] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#003B95] text-sm sm:text-base cursor-pointer hover:text-[#0052CC]"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#0052CC] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="bg-gradient-to-r from-[#003B95] to-[#0052CC] rounded-3xl p-8 text-white shadow-xl text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit',sans-serif]">
            Have a Specific Query or Need Support?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md mx-auto">
            Our local support team is active 7 days a week for Gopalganj and Siwan patients and medical clinics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/${(whatsAppSettings.phoneNumber || '+91 9007355062').replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full flex items-center gap-2 shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on Official WhatsApp</span>
            </a>

            <button
              onClick={() => navigateTo('contact')}
              className="py-3 px-6 bg-white hover:bg-slate-100 text-[#003B95] font-bold text-xs rounded-full transition-colors cursor-pointer"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
