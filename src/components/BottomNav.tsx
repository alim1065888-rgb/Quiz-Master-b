import React from 'react';
import { Home, Brain, Wallet, Trophy, User, ShieldAlert } from 'lucide-react';
import { translations } from '../data/translations';
import { Language } from '../types';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: Language;
  darkMode: boolean;
  isAdmin: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  language,
  darkMode,
  isAdmin,
}) => {
  const t = translations[language];

  const navItems = [
    { id: 'home', label: t.nav_home, icon: Home, activeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
    { id: 'quiz', label: t.nav_quiz, icon: Brain, activeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
    { id: 'wallet', label: t.nav_wallet, icon: Wallet, activeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' },
    { id: 'leaderboard', label: t.nav_leaderboard, icon: Trophy, activeColor: 'bg-amber-500/15 text-amber-500 dark:text-amber-400' },
    { id: 'profile', label: t.nav_profile, icon: User, activeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400' },
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'এডমিন', icon: ShieldAlert, activeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' });
  }

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 transition-colors duration-200 border-t ${
      darkMode 
        ? 'bg-slate-900/95 border-slate-800 text-slate-300' 
        : 'bg-white/95 border-slate-200 text-slate-700'
    } backdrop-blur-lg shadow-lg`}>
      <div className="max-w-md mx-auto px-1 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'font-extrabold scale-105' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${
                isActive 
                  ? item.activeColor 
                  : 'bg-transparent'
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[10px] sm:text-[11px] mt-0.5 tracking-tight ${
                isActive ? 'font-black text-slate-900 dark:text-white' : 'font-medium'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
