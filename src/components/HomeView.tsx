import React from 'react';
import { motion } from 'motion/react';
import { 
  Brain, Wallet, Trophy, Users, Gift, Sparkles, 
  ChevronRight, Flame, ArrowUpRight, Zap, CheckCircle2, AlertCircle
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
    <div className="space-y-5 pb-24 animate-fade-in">
      {/* Guest Mode Restriction Warning Banner */}
      {user.isGuest && (
        <div 
          onClick={onOpenAuthModal}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 flex items-center justify-between gap-3 cursor-pointer hover:border-amber-500/60 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <h4 className="text-xs font-black text-amber-700 dark:text-amber-400">
                {t.guest_limit_title} ({user.dailyQuizzesPlayed}/5 Quizzes)
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                {t.guest_limit_desc}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-xl shrink-0">
            {t.upgrade_account}
          </span>
        </div>
      )}

      {/* Banner Slider */}
      <BannerSlider 
        language={language} 
        onSelectAction={(act) => {
          if (act === 'referral') onNavigate('referral');
          else if (act === 'spin') onOpenSpin();
          else if (act === 'tasks') onOpenTasks();
          else onNavigate('quiz');
        }} 
      />

      {/* Daily Reward Card */}
      <div className={`p-4 rounded-3xl border transition-all ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
      }`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
              <Gift className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm">{t.daily_reward}</h3>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">
                  Streak {user.dailyStreak} Days 🔥
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user.hasClaimedDailyBonus ? 'Already claimed today\'s bonus' : 'Claim +50 coins bonus for logging in today'}
              </p>
            </div>
          </div>

          {!user.hasClaimedDailyBonus ? (
            <button
              onClick={onClaimDailyReward}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
            >
              {t.claim_bonus}
            </button>
          ) : (
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-2xl">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.claimed}</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Buttons Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-extrabold text-base tracking-tight">{t.quick_actions}</h3>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">8 Services</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
          {quickActions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={act.action}
                className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all hover:scale-105 active:scale-95 ${
                  darkMode 
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
                    : 'bg-white border-slate-200/80 hover:border-emerald-300 shadow-sm'
                }`}
              >
                <div className={`p-2.5 rounded-2xl mb-1.5 ${act.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold line-clamp-1 leading-tight">
                  {act.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Categories Carousel */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-extrabold text-base tracking-tight">{t.popular_categories}</h3>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 hover:underline"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-4 rounded-3xl border cursor-pointer transition-all hover:scale-[1.02] active:scale-98 relative overflow-hidden group ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
              }`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${cat.color} opacity-10 group-hover:opacity-20 transition-opacity -mr-6 -mt-6`} />

              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center mb-2.5 shadow-md`}>
                <Brain className="w-5 h-5" />
              </div>

              <h4 className="font-extrabold text-sm line-clamp-1">
                {language === 'bn' ? cat.nameBn : cat.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {cat.questionCount} Questions
              </p>

              <div className="mt-3 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Play Now</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Cash Withdrawals Ticker */}
      <div className={`p-4 rounded-3xl border ${
        darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200/80'
      }`}>
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Zap className="w-4 h-4 text-emerald-500" />
          <span>{t.recent_winners}</span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {recentWinners.map((winner, idx) => (
            <div
              key={idx}
              className={`px-3 py-2 rounded-2xl border text-xs flex items-center gap-2 shrink-0 ${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold">{winner.name}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{winner.amount}</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500 font-medium">
                {winner.method}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
