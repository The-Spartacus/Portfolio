"use client";

import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Download, Sun, Moon, Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData } from '@/lib/data';

export const Navbar = ({ data, onAdminClick }: { data: PortfolioData; onAdminClick: () => void }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = ['ABOUT', 'PROJECTS', ...(data.researchDocs?.length ? ['BLOG'] : []), 'SKILLS', 'GITHUB'];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 left-0 w-full z-40 bg-[var(--bg-color)]/80 backdrop-blur-sm border-b border-[var(--border-color)] px-4 md:px-6 py-4 flex justify-between items-center transition-colors"
    >
      <a href="#hero" className="flex items-center gap-2 hover:text-[var(--accent-blue)] transition-colors group">
        <div className="w-6 h-6 bg-[var(--text-primary)] group-hover:bg-[var(--accent-blue)] flex items-center justify-center text-[var(--bg-color)] text-[10px] font-bold transition-colors">V</div>
        <span className="mono text-xs font-bold tracking-tighter text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
          {data.name} {data.version}
        </span>
      </a>
      
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item, i) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="mono text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span className="text-[var(--text-secondary)]/50 mr-1">0{i+1}.</span>
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-[var(--text-primary)]"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[var(--bg-color)] border-b border-[var(--border-color)] p-6 md:hidden flex flex-col gap-6"
          >
            {navItems.map((item, i) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="mono text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-4"
              >
                <span className="text-[var(--text-secondary)]/50 text-[10px]">0{i+1}.</span>
                {item}
              </a>
            ))}
            <div className="flex items-center gap-6 pt-6 border-t border-[var(--border-color)]">
              <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"><Github size={18} /></a>
              <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"><Linkedin size={18} /></a>
              <a href={data.socials.email} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"><Mail size={18} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export const SocialSidebar = ({ data }: { data: PortfolioData }) => {
  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
      className="fixed top-24 left-6 z-30 hidden md:flex flex-col items-center gap-6"
    >
      <div className="w-[1px] h-12 bg-[var(--border-color)] mb-2" />
      <a 
        href={data.socials.github} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-all hover:-translate-y-1"
        title="GitHub"
      >
        <Github size={18} />
      </a>
      <a 
        href={data.socials.linkedin} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-all hover:-translate-y-1"
        title="LinkedIn"
      >
        <Linkedin size={18} />
      </a>
      <a 
        href={data.socials.email} 
        className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-all hover:-translate-y-1"
        title="Email"
      >
        <Mail size={18} />
      </a>
      <div className="w-[1px] h-24 bg-[var(--border-color)] mt-2" />
      <span className="mono text-[8px] text-[var(--text-secondary)] vertical-text tracking-widest uppercase opacity-50">
        Connect_Secure
      </span>
    </motion.div>
  );
};

export const Footer = ({ data }: { data: PortfolioData }) => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      className="px-6 py-12 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-6 bg-[var(--bg-color)] transition-colors"
    >
      <div className="mono text-[10px] text-[var(--text-secondary)]">
        {data.name} {data.version} {"//"} BUILT_WITH_REACT_THREE_JS {"//"} AI_SECURITY_RESEARCHER {"//"} INDIA {"//"} © 2026 {data.name}
      </div>
      <div className="flex items-center gap-6">
        <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className="mono text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-2">
          <Github size={12} /> GITHUB
        </a>
        <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="mono text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-2">
          <Linkedin size={12} /> LINKEDIN
        </a>
        <a href={data.socials.email} className="mono text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-2">
          <Mail size={12} /> EMAIL
        </a>
      </div>
    </motion.footer>
  );
};
