import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Crown, Medal, Award, Users, Globe } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'global' | 'friends'>('global');

  const top3 = leaderboard.slice(0, 3);
  const restList = leaderboard.slice(3);

  return (
    <div className="space-y-4 pb-24 animate-fade-in max-w-md mx-auto px-1">
      {/* Blue Top Header Bar */}
      <div className="bg-blue-600 text-white rounded-2xl p-4 text-center shadow-md">
        <h2 className="text-lg font-black tracking-tight mb-2">
          {language === 'bn' ? 'লিডারবোর্ড' : 'Leaderboard'}
        </h2>

        {/* Global / Friends Tabs */}
        <div className="flex p-1 rounded-xl bg-blue-700/60 text-xs font-bold max-w-xs mx-auto">
          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'global' ? 'bg-white text-blue-700 font-extrabold shadow-2xs' : 'text-blue-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'গ্লোবাল' : 'Global'}</span>
          </button>

          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'friends' ? 'bg-white text-blue-700 font-extrabold shadow-2xs' : 'text-blue-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'বন্ধুরা' : 'Friends'}</span>
          </button>
        </div>
      </div>

      {/* Current User Rank Highlight Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-black text-sm bg-white/20 px-2.5 py-1 rounded-xl">
            #55
          </span>
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/80" 
          />
          <div>
            <h4 className="font-extrabold text-sm leading-tight">{currentUser.name}</h4>
            <p className="text-[11px] text-blue-100 font-medium">আপনার বর্তমান স্থান</p>
          </div>
        </div>

        <div className="text-right">
          <span className="font-black text-base text-amber-300">
            {currentUser.coins.toLocaleString()}
          </span>
          <p className="text-[10px] text-blue-100 font-bold">পয়েন্ট</p>
        </div>
      </div>

      {/* Top 3 Podiums */}
      <div className="flex items-end justify-center gap-2 pt-4 pb-1">
        {/* 2nd Place */}
        {top3[1] && (
          <div className="flex flex-col items-center flex-1">
            <div className="relative mb-2">
              <img src={top3[1].avatar} alt={top3[1].name} className="w-13 h-13 rounded-full object-cover ring-4 ring-slate-300 shadow-md" />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-900 font-extrabold text-[10px] px-2 py-0.2 rounded-full shadow">
                #2
              </span>
            </div>
            <span className="font-extrabold text-xs line-clamp-1 mt-1 text-slate-900 dark:text-slate-100">{top3[1].name}</span>
            <span className="text-[11px] font-extrabold text-amber-500">{top3[1].coins.toLocaleString()} pts</span>
            <div className="w-full h-16 mt-2 bg-gradient-to-t from-slate-300 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-t-2xl flex items-center justify-center font-black">
              <Medal className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        )}

        {/* 1st Place */}
        {top3[0] && (
          <div className="flex flex-col items-center flex-1 -mt-3">
            <Crown className="w-6 h-6 text-amber-400 animate-bounce mb-1 fill-amber-400" />
            <div className="relative mb-2">
              <img src={top3[0].avatar} alt={top3[0].name} className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-400 shadow-lg" />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.2 rounded-full shadow">
                #1
              </span>
            </div>
            <span className="font-black text-xs line-clamp-1 mt-1 text-slate-900 dark:text-slate-100">{top3[0].name}</span>
            <span className="text-xs font-black text-amber-500">{top3[0].coins.toLocaleString()} pts</span>
            <div className="w-full h-24 mt-2 bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-2xl flex items-center justify-center font-black text-slate-950 shadow-md">
              <Trophy className="w-7 h-7 text-slate-950" />
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {top3[2] && (
          <div className="flex flex-col items-center flex-1">
            <div className="relative mb-2">
              <img src={top3[2].avatar} alt={top3[2].name} className="w-13 h-13 rounded-full object-cover ring-4 ring-amber-700 shadow-md" />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-700 text-white font-extrabold text-[10px] px-2 py-0.2 rounded-full shadow">
                #3
              </span>
            </div>
            <span className="font-extrabold text-xs line-clamp-1 mt-1 text-slate-900 dark:text-slate-100">{top3[2].name}</span>
            <span className="text-[11px] font-extrabold text-amber-500">{top3[2].coins.toLocaleString()} pts</span>
            <div className="w-full h-14 mt-2 bg-gradient-to-t from-amber-800 to-amber-700 rounded-t-2xl flex items-center justify-center font-black text-amber-200">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
          </div>
        )}
      </div>

      {/* Rest Ranked List */}
      <div className={`p-3.5 rounded-3xl border ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-2xs'
      }`}>
        <div className="space-y-2">
          {restList.map((usr) => (
            <div
              key={usr.id}
              className={`p-3 rounded-2xl flex items-center justify-between gap-3 text-xs border ${
                usr.name === currentUser.name
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-black text-slate-400 w-6 text-center text-xs">
                  #{usr.rank}
                </span>
                <img src={usr.avatar} alt={usr.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{usr.name}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {usr.quizzesWon || 10} Quizzes Won
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-black text-amber-500 text-xs">
                  {usr.coins.toLocaleString()} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
