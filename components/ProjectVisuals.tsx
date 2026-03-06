"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ProjectVisualsProps {
  techStackStats?: { label: string; value: number }[];
  architecture?: { from: string; to: string; label: string }[];
}

export const ProjectVisuals: React.FC<ProjectVisualsProps> = ({ techStackStats, architecture }) => {
  if (!techStackStats && !architecture) return null;

  return (
    <div className="mt-8 space-y-8 border-t border-[var(--border-color)] pt-8">
      {/* Tech Stack Bars */}
      {techStackStats && (
        <div className="space-y-4">
          <div className="mono text-[8px] text-[var(--text-secondary)] uppercase tracking-widest mb-4">TECH_COMPOSITION.SYS</div>
          {techStackStats.map((stat, i) => (
            <div key={stat.label} className="space-y-1">
              <div className="flex justify-between mono text-[10px]">
                <span className="text-[var(--text-primary)]">{stat.label}</span>
                <span className="text-[var(--text-secondary)]">{stat.value}%</span>
              </div>
              <div className="h-1 w-full bg-[var(--text-primary)]/5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.value}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full bg-[var(--accent-blue)] glow"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Architecture Diagram */}
      {architecture && (
        <div className="space-y-4">
          <div className="mono text-[8px] text-[var(--text-secondary)] uppercase tracking-widest mb-6">SYSTEM_ARCHITECTURE.MD</div>
          <div className="flex flex-wrap items-center justify-center gap-4 p-4 border border-[var(--border-color)] bg-black/20">
            {architecture.map((node, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                  <div className="px-3 py-2 border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/5 mono text-[10px] text-[var(--accent-blue)]">
                    {node.from}
                  </div>
                  {i === architecture.length - 1 && (
                    <div className="mt-4 flex flex-col items-center">
                       <ArrowRight size={12} className="rotate-90 text-[var(--text-secondary)] mb-2" />
                       <div className="px-3 py-2 border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/5 mono text-[10px] text-[var(--accent-blue)]">
                        {node.to}
                      </div>
                    </div>
                  )}
                </div>
                {i < architecture.length - 1 && (
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight size={12} className="text-[var(--text-secondary)]" />
                    <span className="mono text-[8px] text-[var(--text-secondary)] uppercase">{node.label}</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
