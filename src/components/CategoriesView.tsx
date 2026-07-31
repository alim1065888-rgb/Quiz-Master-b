import React, { useState } from 'react';
import { Search, Brain, ArrowRight, Zap, Filter } from 'lucide-react';
import { QuizCategory, Language } from '../types';
import { translations } from '../data/translations';

interface CategoriesViewProps {
  categories: QuizCategory[];
  onSelectCategory: (catId: string) => void;
  language: Language;
  darkMode: boolean;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  onSelectCategory,
  language,
  darkMode,
}) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'new' | 'level'>('all');

  const filteredCategories = categories.filter((cat) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = (
      cat.name.toLowerCase().includes(term) ||
      cat.nameBn.toLowerCase().includes(term) ||
      cat.description.toLowerCase().includes(term)
    );

    if (!matchesSearch) return false;

    if (activeFilter === 'popular') return cat.questionCount >= 10;
    if (activeFilter === 'new') return cat.id === 'current_affairs' || cat.id === 'science' || cat.id === 'english';
    if (activeFilter === 'level') return cat.id === 'bcs' || cat.id === 'math';
    return true;
  });

  return (
    <div className="space-y-4 pb-24 animate-fade-in max-w-md mx-auto px-1">
      {/* Top Header */}
      <div className="bg-blue-600 text-white rounded-2xl p-4 text-center shadow-md">
        <h2 className="text-lg font-black tracking-tight mb-1">
          {language === 'bn' ? 'কুইজ বিভাগ (Categories)' : 'Quiz Categories'}
        </h2>
        <p className="text-xs text-blue-100 font-medium">
          {language === 'bn' ? 'আপনার পছন্দের বিষয় বেছে নিয়ে খেলা শুরু করুন' : 'Select a topic and start playing'}
        </p>
      </div>

      {/* Search Input */}
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
      }`}>
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder={language === 'bn' ? 'ক্যাটাগরি খুঁজুন...' : 'Search categories...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 font-medium dark:text-white"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: language === 'bn' ? 'সব বিভাগ' : 'All' },
          { id: 'popular', label: language === 'bn' ? 'জনপ্রিয়' : 'Popular' },
          { id: 'new', label: language === 'bn' ? 'নতুন সংযোজন' : 'New' },
          { id: 'level', label: language === 'bn' ? 'কঠিন লেভেল' : 'Hard Level' },
        ].map((flt) => (
          <button
            key={flt.id}
            onClick={() => setActiveFilter(flt.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeFilter === flt.id
                ? 'bg-blue-600 text-white shadow-2xs'
                : darkMode
                  ? 'bg-slate-800 text-slate-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {flt.label}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-3 pt-1">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`p-4 rounded-3xl border cursor-pointer transition-all hover:scale-[1.01] active:scale-99 flex items-center justify-between gap-3 ${
              darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200/80 hover:border-blue-300 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {language === 'bn' ? cat.nameBn : cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {language === 'bn' ? cat.descriptionBn : cat.description}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[10px] font-extrabold text-slate-400">
                  <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                    {language === 'bn' ? `${cat.questionCount}টি প্রশ্ন` : `${cat.questionCount} Questions`}
                  </span>
                  <span>•</span>
                  <span>10-30 Pts/Question</span>
                </div>
              </div>
            </div>

            <div className="p-2 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
