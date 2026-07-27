import React from 'react';
import { Wifi, Battery, Signal, Smartphone } from 'lucide-react';

interface DeviceFrameWrapperProps {
  children: React.ReactNode;
  enabled: boolean;
  onToggleFrame: () => void;
  darkMode: boolean;
}

export const DeviceFrameWrapper: React.FC<DeviceFrameWrapperProps> = ({
  children,
  enabled,
  onToggleFrame,
  darkMode,
}) => {
  if (!enabled) {
    return <div className="w-full min-h-screen">{children}</div>;
  }

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className={`min-h-screen py-6 px-2 flex flex-col items-center justify-center transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-200 text-slate-900'
    }`}>
      {/* Device Frame Toolbar */}
      <div className="mb-3 flex items-center justify-between w-full max-w-md px-2 text-xs font-bold text-slate-500">
        <span className="flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-emerald-500" />
          <span>Android Pixel 8 Preview</span>
        </span>
        <button
          onClick={onToggleFrame}
          className="hover:underline text-emerald-600 dark:text-emerald-400"
        >
          Switch to Full Screen
        </button>
      </div>

      {/* Outer Phone Shell */}
      <div className="w-full max-w-[420px] h-[850px] bg-slate-900 p-3 rounded-[50px] shadow-2xl border-4 border-slate-700/80 relative flex flex-col overflow-hidden">
        {/* Camera Punch Hole Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 rounded-full border border-slate-800 z-50 shadow-inner" />

        {/* Android Status Bar */}
        <div className="w-full pt-1.5 pb-1 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-300 z-40 select-none">
          <span>{currentTime}</span>
          <div className="flex items-center gap-2">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span>95%</span>
              <Battery className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Screen Content Viewport */}
        <div className={`flex-1 overflow-y-auto rounded-[38px] relative no-scrollbar ${
          darkMode ? 'bg-slate-950' : 'bg-slate-50'
        }`}>
          {children}
        </div>

        {/* Bottom Gesture Navigation Bar */}
        <div className="w-full py-2 flex justify-center z-40">
          <div className="w-32 h-1 bg-slate-500/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};
