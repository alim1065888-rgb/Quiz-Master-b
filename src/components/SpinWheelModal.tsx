import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Coins, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSoundEffect, triggerVibration } from '../utils/sound';

interface SpinWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReward: (coins: number) => void;
  spinsRemaining: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  darkMode: boolean;
}

export const SpinWheelModal: React.FC<SpinWheelModalProps> = ({
  isOpen,
  onClose,
  onReward,
  spinsRemaining,
  soundEnabled,
  vibrationEnabled,
  darkMode,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonAmount, setWonAmount] = useState<number | null>(null);

  const wheelPrizes = [10, 25, 50, 100, 5, 200, 15, 30];
  const prizeColors = [
    '#059669', '#d97706', '#2563eb', '#9333ea',
    '#e11d48', '#0891b2', '#4f46e5', '#ca8a04'
  ];

  if (!isOpen) return null;

  const handleSpin = () => {
    if (isSpinning || spinsRemaining <= 0) return;

    setIsSpinning(true);
    setWonAmount(null);
    playSoundEffect('spin', soundEnabled);
    triggerVibration(50, vibrationEnabled);

    // Randomize prize index
    const randomIndex = Math.floor(Math.random() * wheelPrizes.length);
    const prizeCoins = wheelPrizes[randomIndex];

    // Calculate rotation angle
    const segmentAngle = 360 / wheelPrizes.length;
    const extraTurns = 5 * 360; // 5 full rotations
    // Adjust target angle so the pointer at top points to chosen index
    const targetAngle = rotation + extraTurns + (360 - (randomIndex * segmentAngle + segmentAngle / 2));

    setRotation(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setWonAmount(prizeCoins);
      onReward(prizeCoins);

      playSoundEffect('fanfare', soundEnabled);
      triggerVibration([100, 50, 100], vibrationEnabled);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl relative text-center overflow-hidden ${
          darkMode ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          disabled={isSpinning}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-extrabold">Lucky Spin Wheel</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Spin to win up to 200 free bonus coins!
        </p>

        {/* Wheel Container */}
        <div className="relative w-64 h-64 mx-auto my-2 flex items-center justify-center">
          {/* Top Pointer Arrow */}
          <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-md" />

          {/* Rotating Wheel */}
          <div
            className="w-full h-full rounded-full border-4 border-amber-400 shadow-2xl relative overflow-hidden transition-transform ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: isSpinning ? '4s' : '0s',
            }}
          >
            {wheelPrizes.map((prize, idx) => {
              const rotateDeg = (360 / wheelPrizes.length) * idx;
              return (
                <div
                  key={idx}
                  className="absolute top-0 left-0 w-full h-full flex items-start justify-center pt-2 font-black text-white text-sm"
                  style={{
                    transform: `rotate(${rotateDeg}deg)`,
                    transformOrigin: '50% 50%',
                    backgroundColor: prizeColors[idx],
                    clipPath: 'polygon(50% 50%, 15% 0, 85% 0)',
                  }}
                >
                  <span className="mt-2 text-xs drop-shadow-md">+{prize}</span>
                </div>
              );
            })}
          </div>

          {/* Center Hub Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning || spinsRemaining <= 0}
            className="absolute z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 border-4 border-white shadow-xl flex flex-col items-center justify-center active:scale-95 transition-transform"
          >
            <span className="text-xs font-black text-slate-900 uppercase tracking-tighter">
              {isSpinning ? 'SPINNING' : 'SPIN'}
            </span>
          </button>
        </div>

        {/* Outcome or Spins counter */}
        <div className="mt-6">
          {wonAmount !== null ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-base"
            >
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>You Won +{wonAmount} Coins!</span>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-bold">
              <Coins className="w-4 h-4 text-amber-500" />
              <span>Spins Remaining Today: {spinsRemaining}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
