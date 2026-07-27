import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Crown, Medal, Award, Flame, Zap, ShieldAlert } from 'lucide-react';
import { LeaderboardUser, UserProfile, Language } from '../types';
import { translations } from '../data/translations';

interface LeaderboardViewProps {
  leaderboard: LeaderboardUser[];
  currentUser: UserProfile;
  language: Language;
  darkMode: boolean;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  leaderboard,
  currentUser,
  language,
  darkMode,
}) => {
  const t = translations[language];
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'alltime'>('daily');

  const top3 = leaderboard.slice(0, 3);
  const restList = leaderboard.slice(3);

  return (
    <div className="space-y-5 pb-24 animate-fade-in max-w-xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">{t.leaderboard}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compete with top players across Bangladesh & win prizes
          </p>
        </div>
        <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-500">
          <Trophy className="w-6 h-6" />
        </div>
      </div>

      {/* Timeframe Selector Tabs */}
      <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
        {[
          { id: 'daily', label: 'Daily' },
          { id: 'weekly', label: 'Weekly' },
          { id: 'monthly', label: 'Monthly' },
          { id: 'alltime', label: 'All Time' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTimeframe(tab.id as any)}
            className={`flex-1 py-2 rounded-xl transition-all ${
              timeframe === tab.id
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm font-black'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podiums */}
      <div className="flex items-end justify-center gap-2 pt-6 pb-2">
        {/* 2nd Place */}
        {top3[1] && (
          <div className="flex flex-col items-center flex-1">
            <div className="relative mb-2">
              <img src={top3[1].avatar} alt={top3[1].name} className="w-14 h-14 rounded-full object-cover ring-4 ring-slate-300 shadow-lg" />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow">
                #2
              </span>
            </div>
            <span className="font-extrabold text-xs line-clamp-1 mt-1">{top3[1].name}</span>
            <span className="text-[11px] font-bold text-amber-500">{top3[1].coins} Coins</span>
            <div className="w-full h-20 mt-2 bg-gradient-to-t from-slate-300 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-t-2xl flex items-center justify-center font-black text-slate-500">
              <Medal className="w-6 h-6 text-slate-400" />
            </div>
          </div>
        )}

        {/* 1st Place */}
        {top3[0] && (
          <div className="flex flex-col items-center flex-1 -mt-4">
            <Crown className="w-7 h-7 text-amber-400 animate-bounce mb-1 fill-amber-400" />
            <div className="relative mb-2">
              <img src={top3[0].avatar} alt={top3[0].name} className="w-18 h-18 rounded-full object-cover ring-4 ring-amber-400 shadow-xl" />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow">
                #1
              </span>
            </div>
            <span className="font-black text-sm line-clamp-1 mt-1">{top3[0].name}</span>
            <span className="text-xs font-black text-amber-500">{top3[0].coins} Coins</span>
            <div className="w-full h-28 mt-2 bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-2xl flex items-center justify-center font-black text-slate-950 shadow-lg">
              <Trophy className="w-8 h-8 text-slate-950" />
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {top3[2] && (
          <div className="flex flex-col items-center flex-1">
            <div className="relative mb-2">
              <img src={top3[2].avatar} alt={top3[2].name} className="w-14 h-14 rounded-full object-cover ring-4 ring-amber-700 shadow-lg" />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-700 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow">
                #3
              </span>
            </div>
            <span className="font-extrabold text-xs line-clamp-1 mt-1">{top3[2].name}</span>
            <span className="text-[11px] font-bold text-amber-500">{top3[2].coins} Coins</span>
            <div className="w-full h-16 mt-2 bg-gradient-to-t from-amber-800 to-amber-700 rounded-t-2xl flex items-center justify-center font-black text-amber-200">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
          </div>
        )}
      </div>

      {/* Rest Ranked List */}
      <div className={`p-4 rounded-3xl border ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
      }`}>
        <div className="space-y-2">
          {restList.map((usr) => (
            <div
              key={usr.id}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-black text-slate-400 w-5 text-center">
                  #{usr.rank}
                </span>
                <img src={usr.avatar} alt={usr.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-sm">{usr.name}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {usr.quizzesWon} Quizzes Won
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-black text-amber-500 text-sm">
                  {usr.coins.toLocaleString()}
                </span>
                <p className="text-[10px] text-slate-400 font-bold">{usr.xp} XP</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
