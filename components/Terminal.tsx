"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { PortfolioData } from '@/lib/data';

interface TerminalProps {
  data: PortfolioData;
  onClose?: () => void;
  onAdminLogin?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ data, onClose, onAdminLogin }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string | React.ReactNode }[]>([
    { type: 'output', content: 'Welcome to VAISHNAV System v1.0' },
    { type: 'output', content: 'Type "help" to see available commands.' }
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.toLowerCase().trim();
    setHistory(prev => [...prev, { type: 'input', content: cmd }]);

    switch (cleanCmd) {
      case 'help':
        setHistory(prev => [...prev, { 
          type: 'output', 
          content: 'Available commands: help, whoami, skills, projects, github, contact, login, clear' 
        }]);
        break;
      case 'whoami':
        setHistory(prev => [...prev, { 
          type: 'output', 
          content: `${data.name}\n${data.heroDescription}` 
        }]);
        break;
      case 'skills':
        const skillsList = data.techStacks.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n');
        setHistory(prev => [...prev, { type: 'output', content: skillsList }]);
        break;
      case 'projects':
        const projectsList = data.projects.map(p => `- ${p.title}`).join('\n');
        setHistory(prev => [...prev, { type: 'output', content: projectsList }]);
        break;
      case 'github':
        setHistory(prev => [...prev, { type: 'output', content: `GitHub Profile: ${data.socials.github}` }]);
        break;
      case 'contact':
        setHistory(prev => [...prev, { type: 'output', content: `Email: ${data.socials.email}\nLinkedIn: ${data.socials.linkedin}` }]);
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'login':
      case 'admin':
      case 'sudo':
        if (onAdminLogin) {
          setHistory(prev => [...prev, { type: 'output', content: 'Initiating secure login protocol...' }]);
          setTimeout(() => {
            onAdminLogin();
            if (onClose) onClose();
          }, 800);
        } else {
          setHistory(prev => [...prev, { type: 'output', content: 'Access denied: Admin interface not available in this context.' }]);
        }
        break;
      case '':
        break;
      default:
        setHistory(prev => [...prev, { type: 'output', content: `Command not found: ${cleanCmd}. Type "help" for assistance.` }]);
    }
    setInput('');
  };

  return (
    <div className={`terminal-window transition-all duration-300 overflow-hidden flex flex-col ${isExpanded ? 'fixed inset-4 z-50' : 'w-full h-[400px] relative'}`}>
      {/* Terminal Header */}
      <div className="bg-[var(--text-primary)]/5 border-b border-[var(--border-color)] px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-[var(--accent-blue)]" />
          <span className="mono text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">VAISHNAV_OS_TERMINAL</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">
            {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          {onClose && (
            <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-red-500 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-1 p-6 font-mono text-xs sm:text-sm overflow-y-auto bg-black/40 backdrop-blur-md"
        data-lenis-prevent
      >
        <AnimatePresence mode="popLayout">
          {history.map((entry, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-2 whitespace-pre-wrap ${entry.type === 'input' ? 'text-[var(--text-primary)]' : 'text-[var(--accent-blue)]/80'}`}
            >
              {entry.type === 'input' ? (
                <span className="flex gap-2">
                  <span className="text-[var(--accent-blue)]">$</span>
                  {entry.content}
                </span>
              ) : (
                entry.content
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div className="flex gap-2 items-center mt-2">
          <span className="text-[var(--accent-blue)]">$</span>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
            className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] mono"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="bg-[var(--text-primary)]/5 border-t border-[var(--border-color)] px-4 py-1 flex justify-between items-center">
        <div className="mono text-[8px] text-[var(--text-secondary)]">SESSION_ACTIVE: {new Date().toLocaleTimeString()}</div>
        <div className="mono text-[8px] text-[var(--text-secondary)] uppercase tracking-widest">UTF-8 // SSH_SECURE</div>
      </div>
    </div>
  );
};
