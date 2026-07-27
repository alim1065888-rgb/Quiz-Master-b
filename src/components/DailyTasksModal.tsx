import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, Coins, Brain, Video, UserPlus, CalendarCheck, Sparkles } from 'lucide-react';
import { DailyTask, Language } from '../types';
import { translations } from '../data/translations';

interface DailyTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: DailyTask[];
  onClaimTask: (taskId: string) => void;
  language: Language;
  darkMode: boolean;
}

export const DailyTasksModal: React.FC<DailyTasksModalProps> = ({
  isOpen,
  onClose,
  tasks,
  onClaimTask,
  language,
  darkMode,
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  const getTaskIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Video': return Video;
      case 'UserPlus': return UserPlus;
      case 'CalendarCheck': return CalendarCheck;
      default: return Coins;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-md rounded-3xl p-6 shadow-2xl relative overflow-hidden ${
          darkMode ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-1">
          <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-500">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black">{t.daily_tasks}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete tasks daily to earn extra bonus coins!
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {tasks.map((task) => {
            const Icon = getTaskIcon(task.icon);
            const progress = Math.min(100, Math.round((task.currentCount / task.targetCount) * 100));
            const isReadyToClaim = task.currentCount >= task.targetCount && !task.claimed;

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all ${
                  task.claimed
                    ? 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-75'
                    : isReadyToClaim
                    ? 'bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">
                        {language === 'bn' ? task.titleBn : task.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {language === 'bn' ? task.descriptionBn : task.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-black text-amber-500 text-xs shrink-0">
                    <Coins className="w-4 h-4 fill-amber-400" />
                    <span>+{task.rewardCoins}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    {task.currentCount}/{task.targetCount}
                  </span>

                  {isReadyToClaim ? (
                    <button
                      onClick={() => onClaimTask(task.id)}
                      className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow transition-all animate-pulse"
                    >
                      {t.claim_bonus}
                    </button>
                  ) : task.claimed ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.claimed}</span>
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
