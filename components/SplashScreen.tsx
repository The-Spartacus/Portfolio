"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

const LOADING_STEPS = [
  { label: "INITIALIZING_KERNEL", duration: 300 },
  { label: "LOADING_SYSTEM_MODULES", duration: 400 },
  { label: "ESTABLISHING_SECURE_SHELL", duration: 400 },
  { label: "MOUNTING_PORTFOLIO_DATA", duration: 500 },
  { label: "OPTIMIZING_RENDER_PIPELINE", duration: 400 },
  { label: "SYSTEM_READY", duration: 300 },
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const runSteps = async () => {
      for (let i = 0; i < LOADING_STEPS.length; i++) {
        setCurrentStep(i);
        const step = LOADING_STEPS[i];
        
        const startTime = Date.now();
        const duration = step.duration;
        
        while (Date.now() - startTime < duration) {
          const elapsed = Date.now() - startTime;
          const stepProgress = (elapsed / duration) * (100 / LOADING_STEPS.length);
          const totalProgress = (i * (100 / LOADING_STEPS.length)) + stepProgress;
          setProgress(Math.min(totalProgress, 100));
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        setCompletedSteps(prev => [...prev, i]);
      }
      
      setProgress(100);
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 500);
      }, 300);
    };

    runSteps();
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--bg-color)] z-[100] p-6 overflow-hidden"
    >
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-blue)]/10 to-transparent animate-pulse" />
      </div>

      <div className="max-w-md w-full mono text-[10px] space-y-6 text-[var(--accent-blue)] relative z-10">
        <div className="flex justify-between items-end border-b border-[var(--accent-blue)]/20 pb-2">
          <div className="space-y-1">
            <div className="text-xs font-bold tracking-widest text-[var(--text-primary)]">VAISHNAV_OS_V1.0</div>
            <div className="opacity-50 text-[var(--text-secondary)]">BOOT_SEQUENCE_IN_PROGRESS</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-black leading-none text-[var(--text-primary)]">{Math.round(progress)}%</div>
            <div className="text-[8px] opacity-50 text-[var(--text-secondary)]">SYSTEM_LOAD</div>
          </div>
        </div>

        <div className="h-1.5 w-full bg-[var(--accent-blue)]/5 relative overflow-hidden border border-[var(--accent-blue)]/10">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
            className="absolute inset-y-0 left-0 bg-[var(--accent-blue)] shadow-[0_0_15px_rgba(0,255,255,0.5)]"
          />
        </div>

        <div className="space-y-2 min-h-[120px]">
          <AnimatePresence mode="popLayout">
            {LOADING_STEPS.map((step, i) => {
              const isCurrent = i === currentStep;
              const isCompleted = completedSteps.includes(i);
              
              if (i > currentStep) return null;

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isCurrent ? 1 : 0.4, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <span className={isCompleted ? "text-emerald-500" : isCurrent ? "animate-pulse" : ""}>
                    {isCompleted ? "[OK]" : isCurrent ? "[..]" : "[WAIT]"}
                  </span>
                  <span className="tracking-tighter">{step.label}</span>
                  {isCurrent && (
                    <motion.span 
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="w-1.5 h-3 bg-[var(--accent-blue)]"
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="pt-4 border-t border-[var(--accent-blue)]/10 opacity-30 text-[8px] flex justify-between">
          <span>SECURE_SHELL_ACTIVE</span>
          <span>{mounted ? new Date().toISOString() : "..."}</span>
        </div>
      </div>
      
      {/* Scanline effect for splash screen */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </motion.div>
  );
};
