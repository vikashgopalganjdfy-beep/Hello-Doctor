import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MapPin,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Building,
  User,
  X,
  Loader2,
  Tag,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DoctorCard } from './DoctorCard';
import { City } from '../../types';

export const DoctorDirectory: React.FC = () => {
  const {
    filteredDoctors,
    searchQuery,
    setSearchQuery,
    nameFilter,
    setNameFilter,
    locationFilter,
    setLocationFilter,
    cityFilter,
    setCityFilter,
    areaFilter,
    setAreaFilter,
    specialityFilter,
    setSpecialityFilter,
    consultationTypeFilter,
    setConsultationTypeFilter,
    genderFilter,
    setGenderFilter,
    experienceFilter,
    setExperienceFilter,
    verifiedOnly,
    setVerifiedOnly,
    maxFee,
    setMaxFee,
    sortBy,
    setSortBy,
    resetFilters,
    executeDoctorSearch,
    isSearching,
    specialities,
  } = useApp();

  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const itemsPerPage = 8;

  // Reset pagination dynamically when any search or filter criteria changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    nameFilter,
    locationFilter,
    cityFilter,
    areaFilter,
    specialityFilter,
    consultationTypeFilter,
    genderFilter,
    experienceFilter,
    verifiedOnly,
    maxFee,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const gopalganjAreas = [
    'All',
    'Hospital Road',
    'Banjari Road',
    'Cinema Road',
    'Thawe Road',
    'Post Office Chowk',
    'Hathwa',
    'Mirganj',
    'Barauli',
    'Bhore',
  ];

  const siwanAreas = [
    'All',
    'Babunia Road',
    'Hospital Road',
    'Gaushala Road',
    'Rajendra Path',
    'Mairwa Road',
    'Darbar Road',
    'Maharajganj',
    'Raghunathpur',
    'Barharia',
  ];

  const areas =
    cityFilter === 'Gopalganj'
      ? gopalganjAreas
      : cityFilter === 'Siwan'
      ? siwanAreas
      : ['All', 'Hospital Road', 'Babunia Road', 'Banjari Road', 'Cinema Road', 'Thawe Road'];

  // Quick search keywords/specialities tags
  const popularKeywords = [
    { label: 'Cardiologist (Heart)', query: 'Cardiology' },
    { label: 'General Physician', query: 'General Medicine' },
    { label: 'Gynecologist', query: 'Gynecology' },
    { label: 'Orthopedic (Bone)', query: 'Orthopedics' },
    { label: 'Child Specialist', query: 'Pediatrics' },
    { label: 'Dentist', query: 'Dentistry' },
    { label: 'Hospital Road', location: 'Hospital Road' },
    { label: 'Babunia Road', location: 'Babunia Road' },
  ];

  // Active filters checking
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    nameFilter.trim() !== '' ||
    locationFilter.trim() !== '' ||
    cityFilter !== 'All' ||
    areaFilter !== 'All' ||
    specialityFilter !== 'All' ||
    consultationTypeFilter !== 'All' ||
    genderFilter !== 'All' ||
    experienceFilter !== 'All' ||
    verifiedOnly ||
    maxFee < 1500;

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold border border-blue-200/60 uppercase tracking-wider mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Verified District Practitioners</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#003B95] tracking-tight font-['Outfit',sans-serif]">
              Doctor Directory — Gopalganj & Siwan
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Search and book confirmed OPD tokens with senior doctors, surgeons & consultants across Bihar.
            </p>
          </div>

          {/* Quick City Switcher */}
          <div className="inline-flex p-1 bg-slate-200/70 rounded-full shrink-0">
            {(['All', 'Gopalganj', 'Siwan'] as City[]).map((city) => (
              <button
                key={city}
                onClick={() => setCityFilter(city)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  cityFilter === city
                    ? 'bg-[#0052CC] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {city === 'All' ? 'All Districts' : city}
              </button>
            ))}
          </div>
        </div>

        {/* Global Multi-Field Search Hub */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            {/* Keyword Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by doctor name, speciality (e.g. Cardiologist), hospital, or locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0052CC] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200/60"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="fee-low">Fee: Low to High</option>
                <option value="fee-high">Fee: High to Low</option>
              </select>

              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden px-4 py-3 bg-[#0052CC] text-white rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Quick Keywords & Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs pt-1 no-scrollbar">
            <span className="text-[11px] font-bold text-slate-500 shrink-0 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              Quick Filters:
            </span>
            {popularKeywords.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.query) {
                    setSearchQuery(item.query);
                  }
                  if (item.location) {
                    setAreaFilter(item.location);
                  }
                }}
                className="px-3 py-1 bg-slate-100/90 hover:bg-blue-50 text-slate-700 hover:text-[#0052CC] rounded-full font-medium shrink-0 border border-slate-200/70 transition-all cursor-pointer text-[11px]"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-600">Active filters:</span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0052CC] text-[11px] font-semibold">
                  Query: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-blue-900 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {nameFilter && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0052CC] text-[11px] font-semibold">
                  Doctor: "{nameFilter}"
                  <button onClick={() => setNameFilter('')} className="hover:text-blue-900 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {locationFilter && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0052CC] text-[11px] font-semibold">
                  Location: "{locationFilter}"
                  <button onClick={() => setLocationFilter('')} className="hover:text-blue-900 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {cityFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-semibold">
                  District: {cityFilter}
                  <button onClick={() => setCityFilter('All')} className="hover:text-indigo-900 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {areaFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-semibold">
                  Area: {areaFilter}
                  <button onClick={() => setAreaFilter('All')} className="hover:text-teal-900 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {specialityFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[11px] font-semibold">
                  Speciality: {specialityFilter}
                  <button onClick={() => setSpecialityFilter('All')} className="hover:text-cyan-900 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {consultationTypeFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-semibold">
                  Mode: {consultationTypeFilter}
                  <button onClick={() => setConsultationTypeFilter('All')} className="hover:text-slate-900 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {verifiedOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                  Verified Only
                  <button onClick={() => setVerifiedOnly(false)} className="hover:text-emerald-900 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {maxFee < 1500 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold">
                  Max Fee: ₹{maxFee}
                  <button onClick={() => setMaxFee(1500)} className="hover:text-amber-900 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-red-600 hover:text-red-700 ml-auto cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Main 2-Column Grid: Filter Sidebar + Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar Filters */}
          <div
            className={`md:col-span-4 lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-6 ${
              showMobileFilters ? 'block' : 'hidden md:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#003B95] font-bold text-sm">
                <SlidersHorizontal className="w-4 h-4 text-[#0052CC]" />
                <span>Filter Doctors</span>
              </div>

              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-[#0052CC] hover:text-[#003B95] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Doctor Name Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Doctor Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Sinha, Mishra, Verma"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0052CC]"
              />
            </div>

            {/* Speciality Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
                <span>Speciality / Category</span>
              </label>
              <select
                value={specialityFilter}
                onChange={(e) => setSpecialityFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0052CC]"
              >
                <option value="All">All Specialities (20+)</option>
                {specialities.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name} ({spec.doctorCount || 10})
                  </option>
                ))}
              </select>
            </div>

            {/* Area / Locality Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Area / Locality</span>
              </label>
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0052CC]"
              >
                {areas.map((ar) => (
                  <option key={ar} value={ar}>
                    {ar === 'All' ? 'All Localities' : ar}
                  </option>
                ))}
              </select>
            </div>

            {/* Location / Landmark Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>Hospital / Landmark</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Sadar, Babunia, Mirganj"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0052CC]"
              />
            </div>

            {/* Consultation Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Consultation Mode
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { label: 'All Modes', value: 'All' },
                  { label: 'In-Clinic OPD', value: 'In Clinic' },
                  { label: 'Video Consultation', value: 'Video Consultation' },
                  { label: 'Home Visit', value: 'Home Visit' },
                ].map((mode) => (
                  <label
                    key={mode.value}
                    className="flex items-center gap-2 text-slate-700 cursor-pointer font-medium"
                  >
                    <input
                      type="radio"
                      name="consultMode"
                      checked={consultationTypeFilter === mode.value}
                      onChange={() => setConsultationTypeFilter(mode.value)}
                      className="accent-[#0052CC]"
                    />
                    <span>{mode.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Doctor Gender
              </label>
              <div className="flex gap-2">
                {['All', 'Male', 'Female'].map((gen) => (
                  <button
                    key={gen}
                    onClick={() => setGenderFilter(gen)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      genderFilter === gen
                        ? 'bg-[#0052CC] text-white border-[#0052CC]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Experience
              </label>
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0052CC]"
              >
                <option value="All">Any Experience</option>
                <option value="5+">5+ Years Experience</option>
                <option value="10+">10+ Years Experience</option>
                <option value="15+">15+ Years Senior Specialist</option>
              </select>
            </div>

            {/* Verified Only Switch */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2.5 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
                />
                <span className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Doctors Only</span>
                </span>
              </label>
            </div>

            {/* Max Fee Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Max Fee</span>
                <span className="text-[#003B95]">Up to ₹{maxFee}</span>
              </div>
              <input
                type="range"
                min="200"
                max="1500"
                step="50"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="w-full accent-[#0052CC]"
              />
            </div>
          </div>

          {/* Right Area: Results Count + Doctor Grid + Pagination */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            {/* Results Count Summary */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <div className="flex items-center gap-2">
                {isSearching ? (
                  <div className="flex items-center gap-1.5 text-[#0052CC] font-bold">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Searching doctors registry...</span>
                  </div>
                ) : (
                  <span>
                    Showing <strong>{filteredDoctors.length}</strong> matching doctors in{' '}
                    <strong>{cityFilter === 'All' ? 'Gopalganj & Siwan' : cityFilter}</strong>
                  </span>
                )}
              </div>

              {totalPages > 1 && (
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>

            {/* Empty State */}
            {filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#003B95] font-['Outfit',sans-serif]">
                  No Doctors Matching Your Filter
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try clearing your search query, adjusting your speciality or location filters, or increasing your max fee to view all available practitioners.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#0052CC] text-white font-bold text-xs rounded-full shadow-xs cursor-pointer hover:bg-[#003B95] transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paginatedDoctors.map((doc) => (
                  <DoctorCard key={doc.id} doctor={doc} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#0052CC] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer shadow-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
