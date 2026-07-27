import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Zap, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white p-8 overflow-hidden select-none">
      <div className="w-full flex justify-between items-center opacity-60">
        <span className="text-xs font-mono tracking-widest text-emerald-400">ANDROID PLAY STORE READY</span>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-800/60 border border-emerald-500/30">v2.4.0</span>
      </div>

      <div className="flex flex-col items-center justify-center text-center my-auto relative">
        {/* Glow effect behind badge */}
        <div className="absolute w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -z-10 animate-pulse" />

        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-6"
        >
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-emerald-300 p-1 shadow-2xl shadow-emerald-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center relative overflow-hidden">
              <Award className="w-14 h-14 text-amber-400 animate-bounce" />
              <Sparkles className="w-5 h-5 text-emerald-300 absolute top-2 right-2 animate-spin" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-emerald-200 to-teal-300">
            Quiz Master BD
          </h1>
          <p className="text-sm sm:text-base text-emerald-200/80 mt-2 max-w-xs font-medium">
            কুইজ খেলুন, জ্ঞান বাড়ান এবং রিওয়ার্ড জিতুন
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs text-amber-300"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>bKash • Nagad • Rocket Instant Withdraw</span>
        </motion.div>
      </div>

      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/40">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-400"
          />
        </div>
        <p className="text-xs text-emerald-300/60 animate-pulse">Initializing Firebase & App Engine...</p>
      </div>
    </div>
  );
};
