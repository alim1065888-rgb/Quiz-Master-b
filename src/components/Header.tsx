import React from 'react';
import { UserProfile, AppSettings } from '../types';
import { translations } from '../data/translations';
import { Coins, Bell, Moon, Sun, Globe, Smartphone, ShieldCheck, Zap } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  settings: AppSettings;
  unreadCount: number;
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
        : 'bg-white/90 border-slate-200/80 text-slate-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
        {/* User Info / Guest Pill */}
        <div 
          onClick={user.isGuest ? onOpenAuthModal : undefined}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/80 shadow-sm" 
            />
            {user.isGuest && (
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-[9px] text-slate-950 font-bold px-1 rounded-full shadow">
                GUEST
              </span>
            )}
            {user.role === 'admin' && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-[8px] text-white font-bold p-0.5 rounded-full shadow">
                <ShieldCheck className="w-3 h-3" />
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight group-hover:text-emerald-500 transition-colors line-clamp-1">
                {user.name}
              </span>
              {user.isGuest && (
                <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold px-1.5 py-0.2 rounded-full border border-amber-300/40">
                  {t.upgrade_account}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {t.level} {user.level}
              </span>
              <span>•</span>
              <span>{user.xp} {t.xp}</span>
            </div>
          </div>
        </div>

        {/* Balance & Actions */}
        <div className="flex items-center gap-2">
          {/* Coin Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full shadow-inner">
            <Coins className="w-4 h-4 text-amber-500 animate-pulse fill-amber-400" />
            <span className="font-extrabold text-sm text-amber-600 dark:text-amber-400">
              {user.coins.toLocaleString()}
            </span>
          </div>

          {/* Quick Language Toggle */}
          <button 
            onClick={onToggleLanguage}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            title="Switch Language (EN/BN)"
          >
            <div className="flex items-center gap-0.5 font-bold text-xs uppercase px-1">
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span>{settings.language}</span>
            </div>
          </button>

          {/* Theme Switcher */}
          <button 
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            title="Toggle Dark/Light Mode"
          >
            {settings.darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Device Frame View Toggle */}
          <button 
            onClick={onToggleDeviceFrame}
            className={`p-2 rounded-full transition-colors hidden sm:flex ${
              settings.deviceFrameEnabled 
                ? 'bg-emerald-500 text-white shadow-sm' 
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
            title="Toggle Android Device Frame Preview"
          >
            <Smartphone className="w-4 h-4" />
          </button>

          {/* Notification Icon */}
          <button 
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
