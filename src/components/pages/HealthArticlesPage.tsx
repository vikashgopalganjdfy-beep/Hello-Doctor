import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  UserCheck,
  Calendar,
  Share2,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HealthArticle } from '../../types';

export const HealthArticlesPage: React.FC = () => {
  const { healthArticles, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState<HealthArticle | null>(null);

  const categories = ['All', 'Cardiology', 'Diabetes', 'Pediatrics', 'Orthopedics', 'Preventive Health'];

  const filtered = healthArticles.filter((art) => {
    if (selectedCategory !== 'All' && art.category !== selectedCategory) return false;
    if (
      searchQuery.trim() &&
      !art.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !art.summary.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !art.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleShareArticle = (art: HealthArticle) => {
    if (navigator.share) {
      navigator.share({ title: art.title, text: art.summary, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200/60 uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Medical Knowledge Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Health & Wellness Articles
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Verified clinical articles, preventive seasonal guidance, and home care tips written by doctors in Gopalganj & Siwan.
            </p>
          </div>

          {/* Search & Categories */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-80 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search health tips, diseases, nutrition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === c
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="group bg-white rounded-3xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold rounded-lg uppercase tracking-wider">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span>{art.publishedDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {art.readTime}
                    </span>
                  </div>

                  <h2 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-sky-700 transition-colors font-['Outfit',sans-serif]">
                    {art.title}
                  </h2>

                  <p className="text-slate-600 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={art.author.avatar}
                      alt={art.author.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {art.author.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">{art.author.role}</div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-sky-600 group-hover:text-sky-700 flex items-center gap-1 shrink-0">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Top */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-sky-50 text-sky-800 text-xs font-bold rounded-lg border border-sky-200 uppercase">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-500">{activeArticle.publishedDate}</span>
                <span className="text-xs text-slate-500">• {activeArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {activeArticle.title}
              </h2>

              {/* Author badge */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <img
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    Written by {activeArticle.author.name}
                  </div>
                  <div className="text-xs text-slate-500">{activeArticle.author.role}</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="h-64 rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content body */}
            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p className="font-medium text-slate-900 text-base sm:text-lg">
                {activeArticle.summary}
              </p>
              <p className="whitespace-pre-line">{activeArticle.content}</p>
            </div>

            {/* Disclaimer */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Educational Guidance Only:</strong> This article is authored for public health awareness in Bihar and does not substitute direct physical clinical evaluation. Please consult your physician for individualized medical advice.
              </span>
            </div>

            {/* Bottom buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => handleShareArticle(activeArticle)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Article</span>
              </button>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
