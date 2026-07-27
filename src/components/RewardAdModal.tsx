import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, CheckCircle2, X, Zap, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSoundEffect } from '../utils/sound';

interface RewardAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReward: (coins: number) => void;
  soundEnabled: boolean;
  darkMode: boolean;
}

export const RewardAdModal: React.FC<RewardAdModalProps> = ({
  isOpen,
  onClose,
  onReward,
  soundEnabled,
  darkMode,
}) => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setTimeLeft(15);
    setIsCompleted(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          onReward(25);
          playSoundEffect('coin', soundEnabled);
          confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl relative text-center overflow-hidden ${
          darkMode ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900'
        }`}
      >
        {isCompleted && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center justify-center gap-2 mb-2">
          <Play className="w-5 h-5 text-emerald-500 fill-emerald-500" />
          <h2 className="text-xl font-extrabold">Rewarded Video Ad</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Watch this 15s sponsored ad to claim 25 bonus coins!
        </p>

        {/* Video Canvas Container */}
        <div className="relative w-full h-44 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col items-center justify-center shadow-inner my-2">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 via-slate-900/60 to-purple-900/40 animate-pulse" />
          
          {!isCompleted ? (
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                <Play className="w-8 h-8 text-emerald-400 fill-emerald-400 animate-ping" />
              </div>
              <span className="text-xs font-mono text-emerald-300 font-bold">
                Sponsored Video Playing... ({timeLeft}s)
              </span>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center gap-2 text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
              <span className="text-sm font-extrabold">+25 Coins Earned!</span>
            </div>
          )}

          {/* Video Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000 ease-linear"
              style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-6">
          {isCompleted ? (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg transition-all"
            >
              Collect 25 Coins
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-bold">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Please keep ad open to receive reward</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
