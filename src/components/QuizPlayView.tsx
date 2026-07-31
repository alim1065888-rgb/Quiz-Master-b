import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, ArrowRight, ArrowLeft, SkipForward, CheckCircle2, 
  XCircle, HelpCircle, Award, Sparkles, AlertCircle
} from 'lucide-react';
import { QuizQuestion, QuizCategory, QuizResult, Language } from '../types';
import { translations } from '../data/translations';
import { playSoundEffect, triggerVibration } from '../utils/sound';

interface QuizPlayViewProps {
  category: QuizCategory;
  questions: QuizQuestion[];
  onFinishQuiz: (result: QuizResult) => void;
  onCancel: () => void;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  language: Language;
  darkMode: boolean;
}

export const QuizPlayView: React.FC<QuizPlayViewProps> = ({
  category,
  questions,
  onFinishQuiz,
  onCancel,
  soundEnabled,
  vibrationEnabled,
  language,
  darkMode,
}) => {
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(15);
  const [startTime] = useState(Date.now());
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentIndex];

  // Question Timer
  useEffect(() => {
    if (showExplanation) return;

    setTimeLeft(15);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, showExplanation]);

  const handleTimeOut = () => {
    playSoundEffect('wrong', soundEnabled);
    triggerVibration(100, vibrationEnabled);
    setShowExplanation(true);
  };

  const handleSelectOption = (optionIdx: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return; // Already answered

    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optionIdx }));
    setShowExplanation(true);

    const isCorrect = optionIdx === currentQuestion.correctOptionIndex;
    if (isCorrect) {
      playSoundEffect('correct', soundEnabled);
      triggerVibration([50, 50], vibrationEnabled);
    } else {
      playSoundEffect('wrong', soundEnabled);
      triggerVibration(150, vibrationEnabled);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setShowExplanation(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    questions.forEach((q, idx) => {
      const ans = selectedAnswers[idx];
      if (ans === undefined) {
        skipped++;
      } else if (ans === q.correctOptionIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    const scorePct = Math.round((correct / questions.length) * 100);
    const coinsEarned = correct * 15; // 15 coins per correct answer
    const xpEarned = correct * 25;
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    const result: QuizResult = {
      categoryId: category.id,
      categoryName: category.name,
      totalQuestions: questions.length,
      correctAnswers: correct,
      wrongAnswers: wrong,
      skippedQuestions: skipped,
      scorePercentage: scorePct,
      coinsEarned: coinsEarned,
      xpEarned: xpEarned,
      timeSpentSeconds: timeSpent,
      date: new Date().toISOString()
    };

    onFinishQuiz(result);
  };

  if (!currentQuestion) return null;

  const currentAnswer = selectedAnswers[currentIndex];
  const optionsList = language === 'bn' && currentQuestion.optionsBn ? currentQuestion.optionsBn : currentQuestion.options;

  return (
    <div className="max-w-md mx-auto space-y-3 pb-24 animate-fade-in px-1">
      {/* Top Blue Header Bar from Reference Image */}
      <div className="bg-blue-600 text-white rounded-2xl p-3 flex items-center justify-between shadow-md">
        <button
          onClick={onCancel}
          className="p-1.5 rounded-full hover:bg-blue-700/80 transition-colors text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="font-extrabold text-base tracking-tight text-white">
          {language === 'bn' ? category.nameBn : category.name}
        </h3>
        <div className="w-6" /> {/* Placeholder for alignment balance */}
      </div>

      {/* Sub Header: Timer and Question Count */}
      <div className={`px-4 py-2.5 rounded-2xl border flex items-center justify-between text-xs font-bold ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200/80 text-slate-700 shadow-2xs'
      }`}>
        <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-extrabold">
          <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-rose-500 animate-pulse' : ''}`} />
          <span>
            {language === 'bn' ? `সময়: ০০:${timeLeft < 10 ? '০' + timeLeft : timeLeft}` : `Time: 00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`}
          </span>
        </div>

        <span className="font-extrabold text-slate-800 dark:text-slate-100">
          {language === 'bn' ? `প্রশ্ন: ${currentIndex + 1}/${questions.length}` : `Question: ${currentIndex + 1}/${questions.length}`}
        </span>
      </div>

      {/* Top Emerald Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className={`p-5 rounded-3xl border transition-all ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
      }`}>
        {/* Difficulty Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
            currentQuestion.difficulty === 'easy'
              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
              : currentQuestion.difficulty === 'medium'
              ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
              : 'bg-rose-500/10 text-rose-600 border-rose-500/30'
          }`}>
            {currentQuestion.difficulty}
          </span>
          <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            +15 Coins
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-base sm:text-lg font-black leading-snug mb-4 text-slate-900 dark:text-white">
          {language === 'bn' ? currentQuestion.questionBn : currentQuestion.question}
        </h2>

        {/* Image if question type === 'image' */}
        {currentQuestion.type === 'image' && currentQuestion.imageUrl && (
          <div className="mb-4 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-48">
            <img 
              src={currentQuestion.imageUrl} 
              alt="Question illustration" 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Option Buttons with colorful pills matching image */}
        <div className="space-y-2.5 my-4">
          {optionsList.map((opt, idx) => {
            let stateClass = 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-800 dark:text-slate-100';
            let letterBg = 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
            let icon = null;

            if (idx === 0) letterBg = 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300';
            else if (idx === 1) letterBg = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
            else if (idx === 2) letterBg = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
            else if (idx === 3) letterBg = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';

            if (currentAnswer !== undefined) {
              if (idx === currentQuestion.correctOptionIndex) {
                stateClass = 'bg-emerald-500 border-emerald-600 text-white font-black shadow-md';
                letterBg = 'bg-white text-emerald-700 font-extrabold';
                icon = <CheckCircle2 className="w-5 h-5 text-white shrink-0" />;
              } else if (idx === currentAnswer) {
                stateClass = 'bg-rose-500 border-rose-600 text-white font-black shadow-md';
                letterBg = 'bg-white text-rose-700 font-extrabold';
                icon = <XCircle className="w-5 h-5 text-white shrink-0" />;
              } else {
                stateClass = 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                disabled={currentAnswer !== undefined}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-3.5 rounded-2xl border text-left font-bold text-sm flex items-center justify-between gap-3 transition-all ${stateClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center shrink-0 shadow-xs ${letterBg}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm font-extrabold">{opt}</span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Explanation Card */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs mt-3"
          >
            <div className="flex items-center gap-1.5 font-extrabold text-amber-700 dark:text-amber-400 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>{t.explanation}</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              {language === 'bn' ? currentQuestion.explanationBn : currentQuestion.explanation}
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom Controls: 50:50 Lifeline & Next Question Button */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={handleSkip}
          className="px-4 py-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-extrabold text-xs flex items-center gap-1.5 border border-amber-300/50 hover:scale-105 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>{language === 'bn' ? '৫০:৫০' : '50:50'}</span>
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <span>{currentIndex === questions.length - 1 ? t.submit : (language === 'bn' ? 'পরবর্তী প্রশ্ন >' : 'Next Question >')}</span>
        </button>
      </div>
    </div>
  );
};
