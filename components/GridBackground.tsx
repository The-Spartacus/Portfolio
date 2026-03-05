"use client";

import React from 'react';
import { motion } from 'motion/react';

export const GridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Horizontal lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 2.5,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            className="absolute left-0 right-0 h-px bg-[var(--grid-color)] origin-left dark:shadow-[0_0_5px_var(--accent-blue)]/20"
            style={{ top: `${(i + 1) * 5}%` }}
          />
        ))}
      </div>
      
      {/* Vertical lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{
              duration: 2.5,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            className="absolute top-0 bottom-0 w-px bg-[var(--grid-color)] origin-top dark:shadow-[0_0_5px_var(--accent-blue)]/20"
            style={{ left: `${(i + 1) * 5}%` }}
          />
        ))}
      </div>

      {/* Radial gradient mask to make it fade out at edges */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, var(--bg-color) 80%)`
        }}
      />
    </div>
  );
};
