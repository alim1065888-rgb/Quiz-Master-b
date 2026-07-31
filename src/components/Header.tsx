import React from 'react';
import { UserProfile, AppSettings } from '../types';
import { translations } from '../data/translations';
import { Coins, Bell, Moon, Sun, Globe, Smartphone, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  settings: AppSettings;
  unreadCount: number;
  canGoBack?: boolean;
  onGoBack?: () => void;
  onOpenNotifications: () => void;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onToggleDeviceFrame: () => void;
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  settings,
  unreadCount,
  canGoBack,
  onGoBack,
  onOpenNotifications,
  onToggleTheme,
  onToggleLanguage,
  onToggleDeviceFrame,
  onOpenAuthModal,
}) => {
  const t = translations[settings.language];

  return (
    <header className={`sticky top-0 z-30 transition-colors duration-200 border-b backdrop-blur-md ${
      settings.darkMode 
        ? 'bg-slate-900/90 border-slate-800 text-white' 
        : 'bg-white/95 border-slate-200/80 text-slate-900 shadow-xs'
    }`}>
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Left Section: Back Button or User Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          {canGoBack && onGoBack && (
            <button
              onClick={onGoBack}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1 shrink-0 shadow-xs transition-all active:scale-95"
              title={settings.language === 'bn' ? 'পিছনে যান' : 'Go Back'}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[11px]">{settings.language === 'bn' ? 'ব্যাক' : 'Back'}</span>
            </button>
          )}

          <div 
            onClick={user.isGuest ? onOpenAuthModal : undefined}
            className="flex items-center gap-2.5 cursor-pointer group min-w-0"
          >
            {/* User Profile Picture */}
            <div className="relative shrink-0">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500 shadow-sm" 
              />
              {user.role === 'admin' && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-[8px] text-white font-bold p-0.5 rounded-full shadow">
                  <ShieldCheck className="w-3 h-3" />
                </span>
              )}
            </div>

            {/* User Name on top, Level below */}
            <div className="flex flex-col justify-center min-w-0">
              <h1 className="font-extrabold text-sm tracking-tight leading-snug text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                {user.name}
              </h1>
              <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                <span>{settings.language === 'bn' ? `লেভেল ${user.level}` : `Level ${user.level}`}</span>
                {user.isGuest && (
                  <span className="text-[8px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold px-1 rounded-full border border-amber-300/40">
                    {t.guest_mode}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Coin Points Count on Top Right */}
        <div className="flex items-center gap-2">
          {/* Coin Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full shadow-2xs">
            <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="font-black text-xs text-amber-600 dark:text-amber-400">
              {user.coins.toLocaleString()} {settings.language === 'bn' ? 'পয়েন্ট' : 'Pts'}
            </span>
          </div>

          {/* Quick Language Toggle */}
          <button 
            onClick={onToggleLanguage}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            title="Switch Language (EN/BN)"
          >
            <div className="flex items-center gap-0.5 font-extrabold text-xs uppercase px-1">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>{settings.language}</span>
            </div>
          </button>

          {/* Theme Switcher */}
          <button 
            onClick={onToggleTheme}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            title="Toggle Dark/Light Mode"
          >
            {settings.darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
