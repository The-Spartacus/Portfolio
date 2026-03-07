"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ShieldAlert, Terminal } from 'lucide-react';

interface LoginProps {
  onLogin: (success: boolean) => void;
  onClose: () => void;
  dbStatus: 'connected' | 'error' | 'loading' | 'local';
}

export const Login = ({ onLogin, onClose, dbStatus }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError(false);

    // Simulate network delay
    setTimeout(() => {
      if (email === 'vaishnavvineedkumar@gmail.com' && password === 'vaishnav') {
        onLogin(true);
      } else {
        setError(true);
        setIsAuthenticating(false);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-colors scanline crt-flicker">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md terminal-window p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent-blue)] glow" />
        
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-[var(--accent-blue)]/10 rounded border border-[var(--accent-blue)]/20">
            <Terminal className="text-[var(--accent-blue)]" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tighter text-[var(--text-primary)]">SECURE_AUTH_GATE</h2>
            <p className="mono text-[8px] text-[var(--text-secondary)]">LEVEL_04_CLEARANCE_REQUIRED</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="mono text-[8px] text-[var(--text-secondary)] uppercase flex items-center gap-2">
              <User size={10} /> Identity.Identifier
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@domain.com"
              required
              className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="mono text-[8px] text-[var(--text-secondary)] uppercase flex items-center gap-2">
              <Lock size={10} /> Security.Keyphrase
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-all"
            />
          </div>

          {error && (
            <motion.div 
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              className="p-3 bg-red-900/20 border border-red-500/30 flex items-center gap-3 text-red-500"
            >
              <ShieldAlert size={16} />
              <span className="mono text-[10px] font-bold uppercase">Access_Denied: Invalid_Credentials</span>
            </motion.div>
          )}

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-[var(--border-color)] mono text-[10px] font-bold text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 transition-all"
            >
              ABORT
            </button>
            <button 
              type="submit"
              disabled={isAuthenticating}
              className="flex-1 px-4 py-3 bg-[var(--accent-blue)] text-black mono text-[10px] font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] transition-all disabled:opacity-50 glow"
            >
              {isAuthenticating ? 'AUTHENTICATING...' : 'INITIALIZE_SESSION'}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex justify-between items-center">
          <div className="flex gap-1">
            <div className={`w-1 h-1 ${dbStatus === 'connected' ? 'bg-emerald-500 shadow-[0_0_4px_#10b981]' : 'bg-[var(--accent-blue)]'} animate-pulse`} />
            <div className={`w-1 h-1 ${dbStatus === 'connected' ? 'bg-emerald-500 shadow-[0_0_4px_#10b981]' : 'bg-[var(--accent-blue)]'} animate-pulse delay-75`} />
            <div className={`w-1 h-1 ${dbStatus === 'connected' ? 'bg-emerald-500 shadow-[0_0_4px_#10b981]' : 'bg-[var(--accent-blue)]'} animate-pulse delay-150`} />
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-1 h-1 rounded-full ${
              dbStatus === 'connected' ? 'bg-emerald-500 shadow-[0_0_4px_#10b981]' : 
              dbStatus === 'error' ? 'bg-red-500 shadow-[0_0_4px_#ef4444]' : 
              dbStatus === 'loading' ? 'bg-yellow-500 animate-pulse' : 
              'bg-gray-500'
            }`} />
            <span className={`mono text-[7px] font-bold ${
              dbStatus === 'connected' ? 'text-emerald-500' : 
              dbStatus === 'error' ? 'text-red-500' : 
              dbStatus === 'loading' ? 'text-yellow-500' : 
              'text-gray-500'
            }`}>
              DB_{dbStatus.toUpperCase()}
            </span>
            <span className="text-[var(--text-secondary)] text-[7px]">|</span>
            <span className="mono text-[7px] text-[var(--text-secondary)]">ENCRYPTION: AES-256-GCM</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
