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

  // Main 8 categories matching reference image: Science, Tech, History, Sports, Geography, Literature, Movies, General Knowledge
  const visualCategories = [
    { id: 'science', name: 'Science', nameBn: 'বিজ্ঞান', icon: Microscope, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300' },
    { id: 'computer', name: 'Technology', nameBn: 'প্রযুক্তি', icon: Laptop, color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' },
    { id: 'history', name: 'History', nameBn: 'ইতিহাস', icon: Landmark, color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
    { id: 'sports', name: 'Sports', nameBn: 'খেলাধুলা', icon: Dribbble, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300' },
    { id: 'geography', name: 'Geography', nameBn: 'ভূগোল', icon: Map, color: 'bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300' },
    { id: 'english', name: 'Literature', nameBn: 'সাহিত্য', icon: BookOpen, color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300' },
    { id: 'world', name: 'Cinema', nameBn: 'চলচ্চিত্র', icon: Film, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300' },
    { id: 'gen_knowledge', name: 'General Knowledge', nameBn: 'সাধারণ জ্ঞান', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-300' },
  ];

  const quickActions = [
    { id: 'daily_quiz', label: t.daily_quiz, icon: Brain, color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', action: () => onNavigate('quiz') },
    { id: 'categories', label: t.categories, icon: Zap, color: 'bg-blue-500/15 text-blue-600 dark:text-blue-400', action: () => onNavigate('categories') },
    { id: 'leaderboard', label: t.leaderboard, icon: Trophy, color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', action: () => onNavigate('leaderboard') },
    { id: 'wallet', label: t.wallet, icon: Wallet, color: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400', action: () => onNavigate('wallet') },
    { id: 'invite', label: t.invite_friends, icon: Users, color: 'bg-purple-500/15 text-purple-600 dark:text-purple-400', action: () => onNavigate('referral') },
    { id: 'tasks', label: t.daily_tasks, icon: Gift, color: 'bg-rose-500/15 text-rose-600 dark:text-rose-400', action: onOpenTasks },
    { id: 'spin', label: t.spin_wheel, icon: Sparkles, color: 'bg-teal-500/15 text-teal-600 dark:text-teal-400', action: onOpenSpin },
    { id: 'scratch', label: t.scratch_card, icon: Flame, color: 'bg-orange-500/15 text-orange-600 dark:text-orange-400', action: onOpenScratch },
  ];

  const recentWinners = [
    { name: 'Tanvir H.', amount: '150 BDT', method: 'bKash', time: '2m ago' },
    { name: 'Sadia I.', amount: '100 BDT', method: 'Nagad', time: '5m ago' },
    { name: 'Raju K.', amount: '200 BDT', method: 'Rocket', time: '12m ago' },
    { name: 'Mitu A.', amount: '100 BDT', method: 'bKash', time: '18m ago' },
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
            {language === 'bn' ? 'Categories' : 'Categories'}
          </h3>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 hover:underline"
          >
            <span>{language === 'bn' ? 'সবগুলো দেখুন' : 'See All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {visualCategories.map((vCat) => {
            const Icon = vCat.icon;
            return (
              <button
                key={vCat.id}
                onClick={() => onSelectCategory(vCat.id)}
                className={`flex flex-col items-center justify-center text-center p-3.5 rounded-2xl border transition-all hover:scale-105 active:scale-95 shadow-2xs ${
                  darkMode 
                    ? 'bg-slate-900 border-slate-800' 
                    : 'bg-white border-slate-200/70 hover:border-blue-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-xs ${vCat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 line-clamp-1">
                  {language === 'bn' ? vCat.nameBn : vCat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Reward Card */}
      <div className={`p-4 rounded-3xl border transition-all ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
      }`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
              <Gift className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm">{t.daily_reward}</h3>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 px-1.5 py-0.2 rounded-full">
                  Streak {user.dailyStreak} 🔥
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {user.hasClaimedDailyBonus ? 'Already claimed today' : '+50 coins daily bonus'}
              </p>
            </div>
          </div>

          {!user.hasClaimedDailyBonus ? (
            <button
              onClick={onClaimDailyReward}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-2xs hover:scale-105 active:scale-95 transition-all shrink-0"
            >
              {t.claim_bonus}
            </button>
          ) : (
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-xl">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.claimed}</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Services */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="font-extrabold text-base tracking-tight">{t.quick_actions}</h3>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
          {quickActions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={act.action}
                className={`flex flex-col items-center text-center p-2.5 rounded-2xl border transition-all hover:scale-105 active:scale-95 ${
                  darkMode 
                    ? 'bg-slate-900 border-slate-800' 
                    : 'bg-white border-slate-200/80 hover:border-emerald-300 shadow-2xs'
                }`}
              >
                <div className={`p-2 rounded-xl mb-1 ${act.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold line-clamp-1 leading-tight">
                  {act.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Cash Withdrawals Ticker */}
      <div className={`p-3.5 rounded-2xl border ${
        darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100/60 border-slate-200/80'
      }`}>
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-emerald-500" />
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
              <span className="font-bold">{winner.name}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{winner.amount}</span>
              <span className="text-[9px] bg-slate-100 dark:bg-slate-700 px-1 py-0.2 rounded text-slate-500 font-medium">
                {winner.method}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
