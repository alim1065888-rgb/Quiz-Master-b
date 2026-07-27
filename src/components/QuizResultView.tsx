import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Coins, Zap, CheckCircle2, XCircle, Share2, RefreshCw, Home, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizResult, Language } from '../types';
import { translations } from '../data/translations';

interface QuizResultViewProps {
  result: QuizResult;
  onPlayAgain: () => void;
  onGoHome: () => void;
  language: Language;
  darkMode: boolean;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  result,
  onPlayAgain,
  onGoHome,
  language,
  darkMode,
}) => {
  const t = translations[language];

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 }
    });
  }, []);

  const handleShare = () => {
    const text = `🎉 I scored ${result.scorePercentage}% in ${result.categoryName} on Quiz Master BD! Earned +${result.coinsEarned} Coins. Play now & earn cash!`;
    if (navigator.share) {
      navigator.share({ title: 'Quiz Master BD Result', text });
    } else {
      navigator.clipboard.writeText(text);
      alert(t.copied);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pb-24 animate-fade-in text-center">
      {/* Trophy Badge */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-teal-400 p-1 mx-auto shadow-2xl shadow-emerald-500/30 flex items-center justify-center my-4"
      >
        <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
          <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
        </div>
      </motion.div>

      <div>
        <h2 className="text-2xl font-black">{t.quiz_completed}</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {result.categoryName} • {result.totalQuestions} Questions
        </p>
      </div>

      {/* Main Score & Earnings Card */}
      <div className={`p-6 rounded-3xl border shadow-lg ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
      }`}>
        <div className="grid grid-cols-3 gap-2 divide-x divide-slate-200 dark:divide-slate-800">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.your_score}</span>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {result.scorePercentage}%
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.coins_earned}</span>
            <p className="text-2xl font-black text-amber-500 mt-1 flex items-center justify-center gap-1">
              <Coins className="w-5 h-5 fill-amber-400" />
              <span>+{result.coinsEarned}</span>
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.xp_earned}</span>
            <p className="text-2xl font-black text-indigo-500 mt-1 flex items-center justify-center gap-1">
              <Zap className="w-5 h-5" />
              <span>+{result.xpEarned}</span>
            </p>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-2 text-xs font-bold">
          <div className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-600">
            <span>{result.correctAnswers} Correct</span>
          </div>
          <div className="p-2 rounded-2xl bg-rose-500/10 text-rose-600">
            <span>{result.wrongAnswers} Wrong</span>
          </div>
          <div className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500">
            <span>{result.skippedQuestions} Skipped</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={handleShare}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-98 transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>{t.share_result}</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onPlayAgain}
            className="py-3 rounded-2xl border border-slate-200 dark:border-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t.play_again}</span>
          </button>

          <button
            onClick={onGoHome}
            className="py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-700 shadow"
          >
            <Home className="w-4 h-4" />
            <span>{t.go_home}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
