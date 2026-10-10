import React, { useState } from 'react';
import {
  Package,
  Check,
  Clock,
  Building,
  ShieldCheck,
  Sparkles,
  Info,
  ChevronDown,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HealthPackage } from '../../types';

export const HealthPackagesPage: React.FC = () => {
  const { healthPackages, openBookingModal, doctors } = useApp();
  const [selectedModalPkg, setSelectedModalPkg] = useState<HealthPackage | null>(null);

  const handleBook = (pkg: HealthPackage) => {
    const doc = doctors.find((d) => d.specialityId === 'general-medicine') || doctors[0];
    openBookingModal(doc);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diagnostic Wellness Plans</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Affordable Health Checkup Packages in Gopalganj & Siwan
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              NABL accredited diagnostic partner laboratories with optional home sample collection across Gopalganj and Siwan.
            </p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthPackages.map((pkg) => {
            const isPopular = pkg.badge === 'Most Popular';
            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-3xl p-6 sm:p-8 border shadow-xs transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-xl'
                    : 'border-slate-200/90 hover:shadow-lg'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-xs ${
                        isPopular ? 'bg-sky-600 text-white' : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="text-center pt-2 pb-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                      {pkg.name}
                    </h2>
                    <p className="text-xs font-semibold text-sky-700 mt-1">
                      Includes {pkg.testsCount} Essential Tests
                    </p>

                    <div className="mt-4 flex items-baseline justify-center gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                        ₹{pkg.price}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        ₹{pkg.originalPrice}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        {pkg.discountPercent}% OFF
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 mt-1">
                      {pkg.fastingRequired}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 my-4 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 pb-4">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Included Parameters:
                    </div>
                    {pkg.testsIncluded.slice(0, 6).map((t, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{t}</span>
                      </div>
                    ))}

                    {pkg.testsIncluded.length > 6 && (
                      <button
                        onClick={() => setSelectedModalPkg(pkg)}
                        className="text-xs font-bold text-sky-600 hover:text-sky-700 pt-1"
                      >
                        + View all {pkg.testsIncluded.length} tests →
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{pkg.reportTurnaround}</span>
                    </div>
                    <span className="text-emerald-700 font-semibold">Home Sample Pickup</span>
                  </div>

                  <button
                    onClick={() => handleBook(pkg)}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    <span>Book Checkup Package</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPARISON TABLE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
              Compare Health Checkup Packages
            </h2>
            <p className="text-xs text-slate-500">
              Select the best preventive medical package tailored to your family's health profile.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 uppercase text-slate-600 border-b">
                <tr>
                  <th className="p-3">Package Tier</th>
                  <th className="p-3">Test Count</th>
                  <th className="p-3">Fasting</th>
                  <th className="p-3">Reports In</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {healthPackages.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{p.name}</td>
                    <td className="p-3">{p.testsCount} Tests</td>
                    <td className="p-3">{p.fastingRequired}</td>
                    <td className="p-3">{p.reportTurnaround}</td>
                    <td className="p-3 font-bold text-sky-700">₹{p.price}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleBook(p)}
                        className="px-3 py-1.5 bg-sky-600 text-white rounded-lg font-bold text-[11px]"
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FULL TESTS MODAL */}
      {selectedModalPkg && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setSelectedModalPkg(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
              {selectedModalPkg.name} — All {selectedModalPkg.testsCount} Tests
            </h3>
            <p className="text-xs text-slate-500">{selectedModalPkg.description}</p>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              {selectedModalPkg.testsIncluded.map((test, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{test}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const p = selectedModalPkg;
                setSelectedModalPkg(null);
                handleBook(p);
              }}
              className="w-full py-3 bg-sky-600 text-white font-bold text-xs rounded-xl"
            >
              Proceed to Book for ₹{selectedModalPkg.price}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
