import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Appointment Help');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    showToast('Your message has been sent to our Gopalganj & Siwan helpdesk!', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200/60 uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            <span>Support & Helpdesk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Get in Touch with Hello Doctor
          </h1>
          <p className="text-slate-600 text-sm">
            Have questions about booking an appointment, clinic locations, or doctor registration in Gopalganj & Siwan?
          </p>
        </div>

        {/* 2-Column Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info & Offices */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                District Helpdesk Desks
              </h2>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-1">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    <span>Gopalganj Regional Desk</span>
                  </div>
                  <p className="text-slate-600">Hospital Road, Near Sadar Chowk, Gopalganj, Bihar 841428</p>
                  <div className="font-semibold text-sky-800 pt-1">Helpline: +91 6156-224000</div>
                </div>

                <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-1">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    <span>Siwan Regional Desk</span>
                  </div>
                  <p className="text-slate-600">Babunia Road, Near JP Chowk, Siwan, Bihar 841226</p>
                  <div className="font-semibold text-indigo-800 pt-1">Helpline: +91 6154-222000</div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-600" />
                  <span>support@hellodoctor-gopalganj-siwan.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>Helpdesk Active: 8:00 AM – 9:00 PM (All 7 Days)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif] mb-4">
                  Send Us a Direct Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Phone Number *
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="Appointment Help">Appointment Booking Assistance</option>
                      <option value="Doctor Registration">Doctor Onboarding Inquiry</option>
                      <option value="Hospital Tie-up">Hospital Partnership</option>
                      <option value="Feedback">Patient Feedback / Complaint</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Message / Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Message Received
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto">
                  Our regional patient support team in {subject.includes('Siwan') ? 'Siwan' : 'Gopalganj'} will respond to you shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-5 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
