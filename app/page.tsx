"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolioData } from '@/lib/data';
import { Navbar, Footer, SocialSidebar, FloatingSettings } from '@/components/Navigation';
import { Hero, SystemStatus, Overview, Capabilities, Developments, Research, Contact, GithubSection, TerminalSection } from '@/components/PortfolioSections';
import { Admin } from '@/components/Admin';
import { Terminal } from '@/components/Terminal';
import { SystemLogs } from '@/components/SystemLogs';
import { SplashScreen } from '@/components/SplashScreen';
import { Terminal as TerminalIcon, X } from 'lucide-react';

export default function Home() {
  const { data, updateData, isLoaded } = usePortfolioData();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isLoaded || !isSplashComplete) {
    return <SplashScreen onComplete={() => setIsSplashComplete(true)} />;
  }

  return (
    <main className="min-h-screen bg-[var(--bg-color)] selection:bg-[var(--accent-blue)] selection:text-black transition-colors scanline crt-flicker">
      <Navbar data={data} />
      <FloatingSettings onAdminClick={() => setIsAdminOpen(true)} />
      <SocialSidebar data={data} />
      
      <Hero data={data} />
      <SystemStatus data={data} />
      <Overview data={data} />
      <Capabilities data={data} />
      <Developments data={data} />
      <GithubSection data={data} />
      <Research data={data} />
      <TerminalSection data={data} />
      <Contact />
      
      <Footer data={data} />
      <SystemLogs />

      {/* Terminal Toggle */}
      <button 
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-[var(--text-primary)] text-[var(--bg-color)] rounded-full flex items-center justify-center hover:bg-[var(--accent-blue)] hover:text-black transition-all shadow-xl glow"
        title="Open System Terminal"
      >
        <TerminalIcon size={18} />
      </button>

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-4xl"
          >
            <Terminal data={data} onClose={() => setIsTerminalOpen(false)} />
          </motion.div>
        </div>
      )}

      {/* Admin Modal */}
      {isAdminOpen && (
        <Admin 
          data={data} 
          onSave={updateData} 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}
    </main>
  );
}
