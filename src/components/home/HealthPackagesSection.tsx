import React, { useState } from 'react';
import { Package, Check, Clock, ArrowRight, ShieldCheck, Sparkles, Building } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HealthPackage } from '../../types';

export const HealthPackagesSection: React.FC = () => {
  const { healthPackages, navigateTo, openBookingModal, doctors } = useApp();
  const [selectedPkg, setSelectedPkg] = useState<HealthPackage | null>(null);

  const handleBookPackage = (pkg: HealthPackage) => {
    // Open booking modal with a general physician for health checkup
    const physician = doctors.find((d) => d.specialityId === 'general-medicine') || doctors[0];
    openBookingModal(physician);
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Preventive Diagnostics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Affordable Health Checkup Packages
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Comprehensive blood tests, imaging, and full-body wellness screening at certified diagnostic labs in Gopalganj & Siwan.
            </p>
          </div>

          <button
            onClick={() => navigateTo('health-packages')}
            className="self-start md:self-auto px-4 py-2 bg-white hover:bg-slate-100 text-sky-700 border border-sky-200 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Main Packages in Hero Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {healthPackages.slice(0, 3).map((pkg, idx) => {
            const isPopular = pkg.badge === 'Most Popular';
            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-3xl p-6 sm:p-8 border shadow-sm transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-xl'
                    : 'border-slate-200/90 hover:shadow-lg hover:border-slate-300'
                }`}
              >
                {/* Popular Pill */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-xs ${
                        isPopular
                          ? 'bg-sky-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Package Title & Tests Count */}
                  <div className="text-center pt-2 pb-4 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                      {pkg.name}
                    </h3>
                    <p className="text-xs font-semibold text-sky-600 mt-1">
                      Includes {pkg.testsCount} Essential Medical Parameters
                    </p>

                    {/* Price Block */}
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

                  {/* Included Tests List */}
                  <div className="py-5 space-y-2.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      What's Included:
                    </div>
                    {pkg.testsIncluded.slice(0, 6).map((test, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="leading-tight">{test}</span>
                      </div>
                    ))}

                    {pkg.testsIncluded.length > 6 && (
                      <div className="text-[11px] text-sky-600 font-semibold pl-6">
                        + {pkg.testsIncluded.length - 6} more specialized tests
                      </div>
                    )}
                  </div>
                </div>

                {/* Turnaround, Lab & Action Button */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{pkg.reportTurnaround}</span>
                    </div>
                    <span className="text-emerald-700 font-semibold">Home Collection Avail.</span>
                  </div>

                  <button
                    onClick={() => handleBookPackage(pkg)}
                    className={`w-full py-3 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    <span>Book Health Package</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo Notice */}
        <div className="mt-8 text-center text-xs text-slate-500">
          * Note: Listed test packages and discount rates are sample partner prices provided by diagnostic laboratories in Gopalganj & Siwan.
        </div>
      </div>
    </section>
  );
};
