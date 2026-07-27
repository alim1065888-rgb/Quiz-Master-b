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
    <div className="max-w-xl mx-auto space-y-4 pb-24 animate-fade-in">
      {/* Header Info */}
      <div className={`p-4 rounded-3xl border flex items-center justify-between gap-3 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
      }`}>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onCancel}
            className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-xs"
          >
            Exit
          </button>
          <div>
            <h3 className="font-extrabold text-sm line-clamp-1">
              {language === 'bn' ? category.nameBn : category.name}
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              {t.question} {currentIndex + 1} / {questions.length}
            </span>
          </div>
        </div>

        {/* Circular Timer Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-xs">
          <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`} />
          <span className={timeLeft <= 5 ? 'text-rose-500' : ''}>{timeLeft}s</span>
        </div>
      </div>

      {/* Question Card */}
      <div className={`p-5 sm:p-6 rounded-3xl border transition-all ${
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
        <h2 className="text-base sm:text-lg font-black leading-snug mb-4">
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

        {/* Answer Options */}
        <div className="space-y-2.5 my-4">
          {optionsList.map((opt, idx) => {
            let stateClass = 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-emerald-400';
            let icon = null;

            if (currentAnswer !== undefined) {
              if (idx === currentQuestion.correctOptionIndex) {
                stateClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-extrabold';
                icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
              } else if (idx === currentAnswer) {
                stateClass = 'bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300 font-extrabold';
                icon = <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
              } else {
                stateClass = 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60';
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
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-xs flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
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

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          disabled={currentIndex === 0}
          onClick={handlePrev}
          className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 font-bold text-xs flex items-center gap-1 disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.previous}</span>
        </button>

        <button
          onClick={handleSkip}
          className="px-4 py-2.5 rounded-2xl bg-amber-500/10 text-amber-600 font-bold text-xs flex items-center gap-1 hover:bg-amber-500/20"
        >
          <SkipForward className="w-4 h-4" />
          <span>{t.skip}</span>
        </button>

        <button
          onClick={handleNext}
          className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
        >
          <span>{currentIndex === questions.length - 1 ? t.submit : t.next}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
