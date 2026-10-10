import React from 'react';
import { BookOpen, Clock, ArrowRight, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HealthArticle } from '../../types';

export const HealthArticlesSection: React.FC = () => {
  const { healthArticles, navigateTo } = useApp();

  const handleArticleClick = (article: HealthArticle) => {
    navigateTo('articles', { articleId: article.id });
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200/60 uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Medical Knowledge</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Latest Health Articles & Wellness Tips
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Evidence-based healthcare advice written by senior doctors in Gopalganj & Siwan.
            </p>
          </div>

          <button
            onClick={() => navigateTo('articles')}
            className="self-start md:self-auto px-4 py-2 bg-white hover:bg-slate-100 text-sky-700 border border-sky-200 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthArticles.slice(0, 4).map((art) => (
            <div
              key={art.id}
              onClick={() => handleArticleClick(art)}
              className="group bg-slate-50/70 rounded-2xl border border-slate-200/90 hover:border-sky-300 hover:bg-white hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                      {art.category}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                    <span>{art.publishedDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-sky-700 transition-colors line-clamp-2 font-['Outfit',sans-serif]">
                    {art.title}
                  </h3>

                  <p className="text-slate-600 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              {/* Author & Read More */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={art.author.avatar}
                      alt={art.author.name}
                      className="w-6 h-6 rounded-full object-cover shrink-0"
                    />
                    <span className="text-xs font-semibold text-slate-700 truncate">
                      {art.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-sky-600 group-hover:text-sky-700 flex items-center gap-0.5 shrink-0 whitespace-nowrap">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
