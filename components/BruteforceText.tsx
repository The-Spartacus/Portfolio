"use client";

import React, { useState, useEffect, useCallback } from 'react';

interface BruteforceTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export const BruteforceText: React.FC<BruteforceTextProps> = ({ 
  text, 
  delay = 0, 
  speed = 40,
  className = "" 
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const startAnimation = useCallback(() => {
    let iteration = 0;
    const iterationsPerChar = 3;
    let lockedCount = 0;

    const interval = setInterval(() => {
      const result = text
        .split("")
        .map((char, index) => {
          if (index < lockedCount) {
            return char;
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(result);

      if (iteration % iterationsPerChar === 0 && iteration > 0) {
        lockedCount++;
      }

      if (lockedCount > text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsComplete(true);
      }

      iteration++;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    // Initialize with random characters of same length
    const initial = text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
    setDisplayText(initial);

    const timeout = setTimeout(startAnimation, delay);
    return () => clearTimeout(timeout);
  }, [startAnimation, delay, text]);

  return (
    <span className={`${className} inline-flex items-center mono whitespace-pre`}>
      {displayText}
      <span className="w-[3px] h-4 bg-[var(--accent-blue)] ml-2 animate-pulse shadow-[0_0_8px_var(--accent-blue)]" />
    </span>
  );
};
