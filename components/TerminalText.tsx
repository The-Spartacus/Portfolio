"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

interface TerminalTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  as?: React.ElementType;
  onComplete?: () => void;
  playSound?: boolean;
  showPrompt?: boolean;
}

export const TerminalText: React.FC<TerminalTextProps> = ({
  text,
  delay = 0,
  speed = 30,
  className = "",
  as: Component = "span",
  onComplete,
  playSound = true,
  showPrompt = false,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTick = useCallback(() => {
    if (!playSound) return;
    
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(150 + Math.random() * 50, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Audio context might be blocked by browser policy until user interaction
    }
  }, [playSound]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        
        // Play tick sound
        if (playSound) {
          playTick();
        }

        i++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isStarted, text, speed, onComplete, playSound, playTick]);

  return (
    <Component className={className}>
      {showPrompt && <span className="text-[var(--accent-blue)] mr-2">{">"}</span>}
      {displayedText}
      {isStarted && displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-2 h-4 ml-1 bg-current align-middle"
        />
      )}
    </Component>
  );
};
