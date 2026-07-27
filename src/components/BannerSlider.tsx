import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Zap, Users, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { Language } from '../types';

interface BannerSliderProps {
  language: Language;
  onSelectAction: (action: string) => void;
}

export const BannerSlider: React.FC<BannerSliderProps> = ({ language, onSelectAction }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      id: 'refer',
      title: language === 'bn' ? 'বন্ধুকে রেফার করুন ও ১০০ কয়েন পান!' : 'Refer Friends & Earn 100 Coins!',
      subtitle: language === 'bn' ? 'প্রতিটি রেফারে বিকাশ উইথড্র ব্যালেন্স বাড়ান' : 'Boost your cash withdraw balance today',
      gradient: 'from-amber-500 via-orange-600 to-rose-600',
      icon: Users,
      action: 'referral',
      badge: 'POPULAR'
    },
    {
      id: 'spin',
      title: language === 'bn' ? 'দৈনিক লাকি স্পিন দিয়ে ৫০ পয়েন্ট জিতুন!' : 'Daily Lucky Spin Wheel is Ready!',
      subtitle: language === 'bn' ? 'ঘুরিয়ে জিতুন মেগা কয়েন প্রাইস' : 'Spin now to hit the mega coin jackpot',
      gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
      icon: Sparkles,
      action: 'spin',
      badge: 'DAILY BONUS'
    },
    {
      id: 'bcs',
      title: language === 'bn' ? 'বিসিএস ও ব্যাংক জব স্পেশাল কুইজ' : 'BCS & Bank Job Special Mock Test',
      subtitle: language === 'bn' ? 'আজই শুরু করুন প্রস্তুতি ও আয়' : 'Prepare for exams while earning rewards',
      gradient: 'from-purple-600 via-indigo-600 to-blue-700',
      icon: Zap,
      action: 'quiz_bcs',
      badge: 'FEATURED'
    },
    {
      id: 'task',
      title: language === 'bn' ? 'আজকের ডেইলি টাস্ক শেষ করে ডাবল কয়েন!' : 'Complete Today\'s Daily Tasks!',
      subtitle: language === 'bn' ? 'সহজ টাস্ক পূর্ণ করে অতিরিক্ত আয়' : 'Claim bonus rewards on every task',
      gradient: 'from-rose-600 via-pink-600 to-purple-700',
      icon: Gift,
      action: 'tasks',
      badge: 'HOT'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [banners.length]);

  const current = banners[currentIndex];
  const Icon = current.icon;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-lg my-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className={`relative p-5 sm:p-6 bg-gradient-to-r ${current.gradient} text-white flex items-center justify-between min-h-[140px] select-none cursor-pointer`}
          onClick={() => onSelectAction(current.action)}
        >
          {/* Background pattern circles */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -left-6 -top-6 w-32 h-32 bg-black/10 rounded-full blur-lg pointer-events-none" />

          <div className="relative z-10 flex-1 pr-4">
            <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] font-extrabold tracking-wider bg-white/20 backdrop-blur-md rounded-full uppercase border border-white/30">
              {current.badge}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold leading-tight tracking-tight drop-shadow-sm">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 mt-1 font-medium">
              {current.subtitle}
            </p>
            <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold bg-white text-slate-900 px-3 py-1.5 rounded-xl shadow-md hover:scale-105 transition-transform">
              <span>{language === 'bn' ? 'অংশ নিন' : 'Play Now'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
            <Icon className="w-9 h-9 sm:w-11 sm:h-11 text-white animate-pulse" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Pagination Dots & Arrows */}
      <div className="absolute bottom-2 right-4 flex items-center gap-1.5 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
          }}
          className="p-1 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        {banners.map((b, idx) => (
          <button
            key={b.id}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev + 1) % banners.length);
          }}
          className="p-1 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
