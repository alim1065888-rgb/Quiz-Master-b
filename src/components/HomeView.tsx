import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Brain, Wallet, Trophy, Users, Gift, Sparkles, 
  ChevronRight, Flame, ArrowUpRight, Zap, CheckCircle2, AlertCircle,
  Search, Play, Microscope, Laptop, Landmark, Dribbble, Map, BookOpen, Film, Lightbulb
} from 'lucide-react';
import { UserProfile, QuizCategory, Language } from '../types';
import { translations } from '../data/translations';
import { BannerSlider } from './BannerSlider';

interface HomeViewProps {
  user: UserProfile;
  categories: QuizCategory[];
  onSelectCategory: (catId: string) => void;
  onNavigate: (tab: string) => void;
  onClaimDailyReward: () => void;
  onOpenSpin: () => void;
  onOpenScratch: () => void;
  onOpenTasks: () => void;
  onOpenAuthModal: () => void;
  language: Language;
  darkMode: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  categories,
  onSelectCategory,
  onNavigate,
  onClaimDailyReward,
  onOpenSpin,
  onOpenScratch,
  onOpenTasks,
  onOpenAuthModal,
  language,
  darkMode,
}) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');

  // Main 8 categories with vibrant colorful styling
  const visualCategories = [
    { id: 'science', name: 'Science', nameBn: 'বিজ্ঞান', icon: Microscope, color: 'from-blue-500 to-cyan-500 text-white', bgColor: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900' },
    { id: 'computer', name: 'Technology', nameBn: 'প্রযুক্তি', icon: Laptop, color: 'from-indigo-500 to-purple-500 text-white', bgColor: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900' },
    { id: 'history', name: 'History', nameBn: 'ইতিহাস', icon: Landmark, color: 'from-amber-500 to-orange-500 text-white', bgColor: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900' },
    { id: 'sports', name: 'Sports', nameBn: 'খেলাধুলা', icon: Dribbble, color: 'from-emerald-500 to-teal-500 text-white', bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900' },
    { id: 'geography', name: 'Geography', nameBn: 'ভূগোল', icon: Map, color: 'from-sky-500 to-blue-500 text-white', bgColor: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900' },
    { id: 'english', name: 'Literature', nameBn: 'সাহিত্য', icon: BookOpen, color: 'from-rose-500 to-pink-500 text-white', bgColor: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900' },
    { id: 'world', name: 'Cinema', nameBn: 'চলচ্চিত্র', icon: Film, color: 'from-purple-500 to-fuchsia-500 text-white', bgColor: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900' },
    { id: 'gen_knowledge', name: 'General Knowledge', nameBn: 'সাধারণ জ্ঞান', icon: Lightbulb, color: 'from-yellow-400 to-amber-500 text-slate-950', bgColor: 'bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-900' },
  ];

  const quickActions = [
    { id: 'daily_quiz', label: t.daily_quiz, icon: Brain, color: 'from-emerald-500 to-teal-500 text-white', action: () => onNavigate('quiz') },
    { id: 'categories', label: t.categories, icon: Zap, color: 'from-blue-500 to-indigo-500 text-white', action: () => onNavigate('categories') },
    { id: 'leaderboard', label: t.leaderboard, icon: Trophy, color: 'from-amber-400 to-orange-500 text-white', action: () => onNavigate('leaderboard') },
    { id: 'wallet', label: t.wallet, icon: Wallet, color: 'from-indigo-500 to-purple-600 text-white', action: () => onNavigate('wallet') },
    { id: 'invite', label: t.invite_friends, icon: Users, color: 'from-pink-500 to-rose-500 text-white', action: () => onNavigate('referral') },
    { id: 'tasks', label: t.daily_tasks, icon: Gift, color: 'from-red-500 to-rose-600 text-white', action: onOpenTasks },
    { id: 'spin', label: t.spin_wheel, icon: Sparkles, color: 'from-teal-400 to-cyan-500 text-white', action: onOpenSpin },
    { id: 'scratch', label: t.scratch_card, icon: Flame, color: 'from-orange-500 to-amber-600 text-white', action: onOpenScratch },
  ];

  const [showQuickServicesModal, setShowQuickServicesModal] = useState(false);

  const recentWinners = [
    { name: 'Tanvir H.', amount: '150 BDT', method: 'bKash', time: '2m ago', color: 'bg-pink-500 text-white' },
    { name: 'Sadia I.', amount: '100 BDT', method: 'Nagad', time: '5m ago', color: 'bg-orange-500 text-white' },
    { name: 'Raju K.', amount: '200 BDT', method: 'Rocket', time: '12m ago', color: 'bg-purple-600 text-white' },
    { name: 'Mitu A.', amount: '100 BDT', method: 'bKash', time: '18m ago', color: 'bg-pink-500 text-white' },
  ];

  return (
    <div className="space-y-4 pb-24 animate-fade-in max-w-md mx-auto px-1">
      {/* Search Bar matching reference image: 🔍 কুইজ খুঁজুন */}
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100/90 border-slate-200/80 text-slate-700 shadow-2xs'
      }`}>
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input 
          type="text" 
          placeholder={language === 'bn' ? 'কুইজ খুঁজুন' : 'Search quizzes'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 font-medium"
        />
      </div>

      {/* Hero Banner matching image: "আজকের ডেইলি চ্যালেঞ্জ!" */}
      <div 
        onClick={() => onNavigate('quiz')}
        className="p-5 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white shadow-md flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-transform relative overflow-hidden"
      >
        <div className="z-10 space-y-1">
          <h2 className="font-extrabold text-lg tracking-tight">
            {language === 'bn' ? 'আজকের ডেইলি চ্যালেঞ্জ!' : 'Today\'s Daily Challenge!'}
          </h2>
          <p className="text-xs text-blue-100 font-medium opacity-90">
            {language === 'bn' ? 'কুইজ খেলে ৫০০ পয়েন্ট জিতে নিন' : 'Win 500 bonus points playing today\'s quiz'}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-white text-blue-700 flex items-center justify-center shrink-0 shadow-lg z-10 hover:scale-110 transition-transform">
          <Play className="w-6 h-6 fill-blue-700 ml-0.5" />
        </div>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Guest Mode Restriction Warning Banner if Guest */}
      {user.isGuest && (
        <div 
          onClick={onOpenAuthModal}
          className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 line-clamp-1">
              {t.guest_limit_title} ({user.dailyQuizzesPlayed}/5 Quizzes)
            </span>
          </div>
          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-lg shrink-0">
            {t.upgrade_account}
          </span>
        </div>
      )}

      {/* Categories Grid matching reference image */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            {language === 'bn' ? 'কুইজ ক্যাটাগরি' : 'Quiz Categories'}
          </h3>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 hover:underline"
          >
            <span>{language === 'bn' ? 'সবগুলো দেখুন' : 'See All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {visualCategories.map((vCat) => {
            const Icon = vCat.icon;
            return (
              <button
                key={vCat.id}
                onClick={() => onSelectCategory(vCat.id)}
                className={`flex flex-col items-center justify-center text-center p-2.5 rounded-2xl border transition-all hover:scale-105 active:scale-95 shadow-2xs ${vCat.bgColor}`}
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-1.5 shadow-xs bg-gradient-to-br ${vCat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-100 line-clamp-1">
                  {language === 'bn' ? vCat.nameBn : vCat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Reward Card - Colorful Gradient */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md text-white">
              <Gift className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm">{t.daily_reward}</h3>
                <span className="text-[10px] font-extrabold bg-white/30 text-white px-2 py-0.5 rounded-full">
                  Streak {user.dailyStreak} 🔥
                </span>
              </div>
              <p className="text-[11px] text-amber-100 font-medium">
                {user.hasClaimedDailyBonus ? (language === 'bn' ? 'আজকের বোনাস নেওয়া হয়েছে' : 'Already claimed today') : (language === 'bn' ? '+৫০ পয়েন্ট ফ্রি ডেইলি বোনাস' : '+50 points daily bonus')}
              </p>
            </div>
          </div>

          {!user.hasClaimedDailyBonus ? (
            <button
              onClick={onClaimDailyReward}
              className="px-4 py-2 rounded-xl bg-white text-slate-950 font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
            >
              {t.claim_bonus}
            </button>
          ) : (
            <div className="flex items-center gap-1 text-xs font-black text-emerald-950 bg-white/90 px-3 py-1.5 rounded-xl shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.claimed}</span>
            </div>
          )}
        </div>
        <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-white/10 rounded-full blur-lg pointer-events-none" />
      </div>

      {/* Quick Action Services */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
            {language === 'bn' ? 'দ্রুত সেবা' : t.quick_actions}
          </h3>
          <button
            onClick={() => setShowQuickServicesModal(true)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 hover:underline"
          >
            <span>{language === 'bn' ? 'আরও দেখুন' : 'See More'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
          {quickActions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={act.action}
                className={`flex flex-col items-center text-center p-2.5 rounded-2xl border transition-all hover:scale-105 active:scale-95 shadow-2xs ${
                  darkMode 
                    ? 'bg-slate-900 border-slate-800' 
                    : 'bg-white border-slate-200/80 hover:border-blue-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl mb-1.5 flex items-center justify-center bg-gradient-to-br ${act.color} shadow-xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-100 line-clamp-1 leading-tight">
                  {act.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Cash Withdrawals Ticker */}
      <div className={`p-3.5 rounded-2xl border ${
        darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-blue-200/60'
      }`}>
        <div className="flex items-center gap-2 mb-2 text-xs font-black text-blue-800 dark:text-blue-300 uppercase tracking-wider">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>{t.recent_winners}</span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
          {recentWinners.map((winner, idx) => (
            <div
              key={idx}
              className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-2 shrink-0 ${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-extrabold text-slate-900 dark:text-white">{winner.name}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-black">{winner.amount}</span>
              <span className={`text-[9px] px-1.5 py-0.3 rounded-md font-bold ${winner.color}`}>
                {winner.method}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Services Full Modal */}
      {showQuickServicesModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4 animate-fade-in">
          <div className={`w-full max-w-md rounded-3xl p-5 border shadow-2xl animate-scale-in ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-600 text-white rounded-xl">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base">
                  {language === 'bn' ? 'সকল দ্রুত সেবা (Quick Services)' : 'All Quick Services'}
                </h3>
              </div>
              <button
                onClick={() => setShowQuickServicesModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {quickActions.map((act) => {
                const Icon = act.icon;
                return (
                  <button
                    key={act.id}
                    onClick={() => {
                      setShowQuickServicesModal(false);
                      act.action();
                    }}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 text-left transition-all hover:scale-102 active:scale-98 ${
                      darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${act.color} shrink-0 shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-1">{act.label}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">ক্লিক করুন</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
