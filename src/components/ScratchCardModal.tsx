import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Trophy, Coins, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSoundEffect, triggerVibration } from '../utils/sound';

interface ScratchCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReward: (coins: number) => void;
  scratchesRemaining: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  darkMode: boolean;
}

export const ScratchCardModal: React.FC<ScratchCardModalProps> = ({
  isOpen,
  onClose,
  onReward,
  scratchesRemaining,
  soundEnabled,
  vibrationEnabled,
  darkMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rewardValue] = useState(() => [20, 30, 50, 75, 100][Math.floor(Math.random() * 5)]);
  const [isScratched, setIsScratched] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 260;
    canvas.height = 140;

    // Draw silver metallic scratch layer
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#94a3b8');
    grad.addColorStop(0.5, '#cbd5e1');
    grad.addColorStop(1, '#64748b');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text on scratch layer
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE TO WIN!', canvas.width / 2, canvas.height / 2 + 5);

    setIsScratched(false);
    setHasClaimed(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Check how much is scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparentPixels++;
    }

    const percentage = transparentPixels / (imageData.data.length / 4);
    if (percentage > 0.45 && !isScratched) {
      setIsScratched(true);
      if (!hasClaimed) {
        setHasClaimed(true);
        onReward(rewardValue);
        playSoundEffect('fanfare', soundEnabled);
        triggerVibration([80, 40, 80], vibrationEnabled);
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    scratch(touch.clientX - rect.left, touch.clientY - rect.top);
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
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-extrabold">Mystery Scratch Card</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Scratch off the silver layer to reveal your coin reward!
        </p>

        {/* Scratch Card Stage */}
        <div className="relative w-[260px] h-[140px] mx-auto rounded-2xl overflow-hidden shadow-xl border-2 border-amber-400/50 bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-600 flex flex-col items-center justify-center text-slate-950 font-black">
          {/* Revealed Reward beneath */}
          <div className="flex flex-col items-center justify-center">
            <Trophy className="w-8 h-8 text-slate-950 mb-1 animate-bounce" />
            <span className="text-2xl font-black tracking-tight">+{rewardValue} COINS</span>
            <span className="text-[10px] font-bold tracking-widest text-slate-900/80 uppercase">REWARD UNLOCKED</span>
          </div>

          {/* HTML5 Canvas overlay layer */}
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="absolute inset-0 cursor-pointer touch-none"
          />
        </div>

        <div className="mt-6">
          {isScratched ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-600 dark:text-emerald-400 font-bold text-sm"
            >
              🎉 Congratulations! +{rewardValue} coins added to wallet!
            </motion.div>
          ) : (
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-bold">
              <Coins className="w-4 h-4 text-amber-500" />
              <span>Cards Remaining Today: {scratchesRemaining}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
