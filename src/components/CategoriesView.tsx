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

  const filteredCategories = categories.filter((cat) => {
    const term = searchTerm.toLowerCase();
    return (
      cat.name.toLowerCase().includes(term) ||
      cat.nameBn.toLowerCase().includes(term) ||
      cat.description.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">{t.categories}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select a category to start your quiz and earn rewards
          </p>
        </div>
        <div className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-500 font-bold text-xs">
          {categories.length} Categories
        </div>
      </div>

      {/* Search Input */}
      <div className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border transition-all ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
      }`}>
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder={language === 'bn' ? 'ক্যাটাগরি খুঁজুন...' : 'Search categories...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`p-4 rounded-3xl border cursor-pointer transition-all hover:scale-[1.01] active:scale-99 flex items-center justify-between gap-3 ${
              darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200/80 hover:border-emerald-300 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm line-clamp-1">
                  {language === 'bn' ? cat.nameBn : cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {language === 'bn' ? cat.descriptionBn : cat.description}
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] font-bold text-slate-400">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-emerald-600 dark:text-emerald-400">
                    {cat.questionCount} Questions
                  </span>
                  <span>•</span>
                  <span>10-30 Coins/Question</span>
                </div>
              </div>
            </div>

            <div className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
