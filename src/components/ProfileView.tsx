import React from 'react';
import { motion } from 'motion/react';
import { 
  User, Award, Settings, Moon, Sun, Globe, Volume2, VolumeX, 
  Vibrate, Smartphone, LogOut, ShieldCheck, Flame, Coins, Zap, Flag 
} from 'lucide-react';
import { UserProfile, AppSettings, Achievement, Language } from '../types';
import { translations } from '../data/translations';

interface ProfileViewProps {
  user: UserProfile;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
  onOpenAuthModal: () => void;
  onOpenAdmin: () => void;
  language: Language;
  darkMode: boolean;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  settings,
  onUpdateSettings,
  onUpdateProfile,
  onLogout,
  onOpenAuthModal,
  onOpenAdmin,
  language,
  darkMode,
}) => {
  const t = translations[language];
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [editedName, setEditedName] = React.useState(user.name);

  const handleSaveName = () => {
    if (editedName.trim() && onUpdateProfile) {
      onUpdateProfile({ name: editedName.trim() });
    }
    setIsEditingName(false);
  };

  const presetAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
  ];

  const allAchievements: Achievement[] = [
    {
      id: 'ach_first',
      title: 'First Quiz',
      titleBn: 'প্রথম কুইজ',
      description: 'Completed your first quiz challenge',
      descriptionBn: 'প্রথম কুইজ সম্পন্ন করেছেন',
      icon: 'Brain',
      badgeColor: 'bg-blue-500',
      unlocked: true,
    },
    {
      id: 'ach_100',
      title: '100 Correct Answers',
      titleBn: '১০০টি সঠিক উত্তর',
      description: 'Answered 100 questions correctly',
      descriptionBn: '১০০টি প্রশ্নের সঠিক উত্তর দিয়েছেন',
      icon: 'CheckCircle2',
      badgeColor: 'bg-emerald-500',
      unlocked: user.coins >= 200,
    },
    {
      id: 'ach_500',
      title: '500 Coins Master',
      titleBn: '৫০০ কয়েন মাস্টার',
      description: 'Accumulated over 500 coins',
      descriptionBn: '৫০০-র বেশি কয়েন জমা করেছেন',
      icon: 'Coins',
      badgeColor: 'bg-amber-500',
      unlocked: user.coins >= 500,
    },
    {
      id: 'ach_ref',
      title: 'Referral Master',
      titleBn: 'রেফারেল মাস্টার',
      description: 'Invited friends to Quiz Master BD',
      descriptionBn: 'বন্ধুদের রেফার করেছেন',
      icon: 'Users',
      badgeColor: 'bg-purple-500',
      unlocked: user.totalReferred > 0,
    }
  ];

  return (
    <div className="space-y-5 pb-24 animate-fade-in max-w-xl mx-auto">
      <div>
        <h2 className="text-2xl font-black tracking-tight">{t.profile}</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage your account, achievements and app preferences
        </p>
      </div>

      {/* Profile Header Card */}
      <div className={`p-5 rounded-3xl border ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
      }`}>
        <div className="flex items-center gap-4">
          {/* Avatar with Selector */}
          <div className="relative group shrink-0">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-500 shadow-md" />
            {user.role === 'admin' && (
              <span className="absolute -top-1 -right-1 p-1 bg-purple-600 rounded-full text-white shadow">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="flex-1">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="px-2.5 py-1 text-sm font-extrabold rounded-lg border border-blue-500 bg-transparent text-slate-900 dark:text-white outline-none w-full"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold shrink-0"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{user.name}</h3>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                >
                  {language === 'bn' ? 'এডিট' : 'Edit'}
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                {language === 'bn' ? `লেভেল ${user.level}` : `Level ${user.level}`}
              </span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Coins className="w-3 h-3 text-amber-500 fill-amber-400" />
                {user.coins.toLocaleString()} {language === 'bn' ? 'পয়েন্ট' : 'Pts'}
              </span>
            </div>
          </div>
        </div>

        {/* Change Avatar Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">
            {language === 'bn' ? 'প্রোফাইল ছবি পরিবর্তন করুন:' : 'Choose Profile Picture:'}
          </p>
          <div className="flex gap-2">
            {presetAvatars.map((avUrl, i) => (
              <img
                key={i}
                src={avUrl}
                alt={`Avatar ${i}`}
                onClick={() => onUpdateProfile && onUpdateProfile({ avatar: avUrl })}
                className={`w-9 h-9 rounded-full object-cover cursor-pointer transition-all hover:scale-110 ${
                  user.avatar === avUrl ? 'ring-2 ring-blue-600 scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Level Progression */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs font-extrabold mb-1.5">
            <span className="text-blue-600 dark:text-blue-400">
              {language === 'bn' ? `পরবর্তী লেভেল (${user.level + 1})` : `Next Level (${user.level + 1})`}
            </span>
            <span className="text-slate-500">{user.xp} / {user.level * 500} XP</span>
          </div>
          <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all"
              style={{ width: `${Math.min(100, (user.xp / (user.level * 500)) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Admin Panel Toggle shortcut - Visible only to admin emails */}
      {Boolean(!user.isGuest && user.email && ['alim1065888@gmail.com', 'aa.alim234@gmail.com'].includes(user.email.toLowerCase().trim())) && (
        <button
          onClick={onOpenAdmin}
          className="w-full p-4 rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-slate-900 text-white font-black text-sm flex items-center justify-between shadow-lg hover:scale-[1.01] transition-all border border-purple-500/30"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-300 animate-pulse" />
            <div className="text-left">
              <span className="block text-sm">অ্যাডমিন কন্ট্রোল প্যানেল (Admin Panel)</span>
              <span className="text-[10px] text-purple-200 font-normal">প্রশ্ন, ক্যাটাগরি, ক্যাশআউট ও ইউজার কন্ট্রোল</span>
            </div>
          </div>
          <span className="bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black">
            OPEN
          </span>
        </button>
      )}

      {/* Achievements Section */}
      <div className={`p-5 rounded-3xl border ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
      }`}>
        <h4 className="font-extrabold text-base mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>{t.achievements}</span>
        </h4>

        <div className="grid grid-cols-2 gap-2.5">
          {allAchievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all ${
                ach.unlocked
                  ? 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                  : 'bg-slate-100/50 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-800 opacity-50 grayscale'
              }`}
            >
              <div className={`p-2 rounded-xl text-white ${ach.badgeColor}`}>
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-xs">{language === 'bn' ? ach.titleBn : ach.title}</h5>
                <p className="text-[10px] text-slate-400 line-clamp-1">
                  {language === 'bn' ? ach.descriptionBn : ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* App Settings Section */}
      <div className={`p-5 rounded-3xl border ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
      }`}>
        <h4 className="font-extrabold text-base mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-400" />
          <span>{t.settings}</span>
        </h4>

        <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
          {/* Dark Mode */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-sm">{t.dark_mode}</span>
            </div>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => onUpdateSettings({ ...settings, darkMode: e.target.checked })}
              className="w-5 h-5 accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Language Switch */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-500" />
              <span className="font-bold text-sm">{t.language}</span>
            </div>
            <div className="flex p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
              <button
                onClick={() => onUpdateSettings({ ...settings, language: 'en' })}
                className={`px-3 py-1 rounded-lg ${settings.language === 'en' ? 'bg-white dark:bg-slate-700 text-emerald-600 font-extrabold shadow-sm' : 'text-slate-400'}`}
              >
                English
              </button>
              <button
                onClick={() => onUpdateSettings({ ...settings, language: 'bn' })}
                className={`px-3 py-1 rounded-lg ${settings.language === 'bn' ? 'bg-white dark:bg-slate-700 text-emerald-600 font-extrabold shadow-sm' : 'text-slate-400'}`}
              >
                বাংলা
              </button>
            </div>
          </div>

          {/* Sound Effects */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-500" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
              <span className="font-bold text-sm">{t.sound_effects}</span>
            </div>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => onUpdateSettings({ ...settings, soundEnabled: e.target.checked })}
              className="w-5 h-5 accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Vibration */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              <Vibrate className="w-5 h-5 text-indigo-500" />
              <span className="font-bold text-sm">{t.vibration}</span>
            </div>
            <input
              type="checkbox"
              checked={settings.vibrationEnabled}
              onChange={(e) => onUpdateSettings({ ...settings, vibrationEnabled: e.target.checked })}
              className="w-5 h-5 accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Device Frame View */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-sm">{t.device_frame}</span>
            </div>
            <input
              type="checkbox"
              checked={settings.deviceFrameEnabled}
              onChange={(e) => onUpdateSettings({ ...settings, deviceFrameEnabled: e.target.checked })}
              className="w-5 h-5 accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full mt-6 py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.logout}</span>
        </button>
      </div>
    </div>
  );
};
