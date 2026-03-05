"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolioData } from '@/lib/data';
import { Navbar, Footer } from '@/components/Navigation';
import { Hero, Overview, Capabilities, Developments, Research, Contact } from '@/components/PortfolioSections';
import { Admin } from '@/components/Admin';
import { SystemLogs } from '@/components/SystemLogs';
import { SplashScreen } from '@/components/SplashScreen';
import { Settings } from 'lucide-react';

export default function Home() {
  const { data, updateData, isLoaded } = usePortfolioData();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  if (!isLoaded || !isSplashComplete) {
    return <SplashScreen onComplete={() => setIsSplashComplete(true)} />;
  }

  return (
    <main className="min-h-screen bg-[var(--bg-color)] selection:bg-[var(--accent-blue)] selection:text-black transition-colors scanline crt-flicker">
      <Navbar data={data} />
      
      <Hero data={data} />
      <Overview data={data} />
      <Capabilities data={data} />
      <Developments data={data} />
      <Research data={data} />
      <Contact />
      
      <Footer data={data} />
      <SystemLogs />

      {/* Admin Toggle */}
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-[var(--text-primary)] text-[var(--bg-color)] rounded-full flex items-center justify-center hover:bg-[var(--accent-blue)] hover:text-black transition-all shadow-xl glow"
        title="Open Admin Panel"
      >
        <Settings size={18} />
      </button>

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
