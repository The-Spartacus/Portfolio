"use client";

import React from 'react';
import { motion } from 'motion/react';
import { BruteforceText } from './BruteforceText';
import { TerminalText } from './TerminalText';
import { Code, Cpu, Shield, ArrowRight, ExternalLink, ArrowUpRight, Github, FileText, Video, Linkedin, Mail } from 'lucide-react';
import { PortfolioData } from '@/lib/data';

import Image from 'next/image';

export const Hero = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="hero" className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative overflow-hidden bg-[var(--bg-color)] transition-colors">
      <div className="z-10 flex flex-col items-center">
        <div className="mono text-[10px] text-[var(--accent-blue)] mb-8 flex items-center gap-2 glow-text">
          <span className="w-1.5 h-1.5 bg-[var(--accent-blue)] glow" />
          STATUS: #{data.status}
        </div>
        
        <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter mb-4 text-[var(--text-primary)] leading-none">
          {data.name}
        </h1>

        <div className="mono text-[10px] text-[var(--text-secondary)] mb-12 flex flex-wrap justify-center gap-x-6 gap-y-4">
          {data.roles.map((role, i) => (
            <div key={role} className="flex items-center gap-2">
              <span className="opacity-20">[</span>
              <BruteforceText 
                text={role} 
                delay={800 + (i * 400)} 
                className="text-[var(--text-primary)] font-bold"
              />
              <span className="opacity-20">]</span>
              {i < data.roles.length - 1 && <span className="opacity-10 ml-2">|</span>}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mb-12 min-h-[3rem] text-center">
          <TerminalText 
            text={data.heroDescription}
            delay={2000}
            showPrompt={true}
            className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-lg"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <a 
            href="#projects"
            className="bg-[var(--text-primary)] text-[var(--bg-color)] px-10 py-4 mono text-[10px] font-bold flex items-center justify-center gap-4 hover:bg-[var(--accent-blue)] hover:text-black hover:glow transition-all group min-w-[200px]"
          >
            EXE.PROJECTS() <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href="#contact"
            className="border border-[var(--border-color)] px-10 py-4 mono text-[10px] font-bold flex items-center justify-center gap-4 hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] transition-all min-w-[200px]"
          >
            _CONNECT
          </a>
        </div>
      </div>

      {/* Portrait as subtle background or floating element if needed, but for now keeping it centered as requested */}
      <div className="absolute bottom-10 right-10 opacity-10 grayscale pointer-events-none hidden lg:block">
        <div className="relative w-64 aspect-[4/5]">
          <Image 
            src={data.portraitUrl} 
            alt={data.name}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-[var(--text-primary)]/5 rotate-45 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-[var(--text-primary)]/5 -rotate-12 pointer-events-none" />
    </section>
  );
};

export const Overview = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 max-w-7xl mx-auto bg-[var(--bg-color)] transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-4">
          <div className="mono text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center gap-2 glow-text">
            <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> OVERVIEW
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-[var(--text-primary)] leading-none">
            {data.philosophy.title}
          </h2>
          <div className="w-12 h-1 bg-[var(--accent-blue)] mt-6 glow" />
        </div>
        
        <div className="lg:col-span-8 flex flex-col justify-end">
          <p className="text-xl md:text-2xl text-[var(--text-primary)] font-medium leading-tight mb-8">
            {data.philosophy.content.split(' ').map((word, i) => (
              <span key={i} className={word.includes('_') ? 'text-[var(--accent-blue)]' : ''}>
                {word}{' '}
              </span>
            ))}
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {data.philosophy.subContent}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-[var(--border-color)]">
        {data.philosophy.specs.map((spec, i) => (
          <div key={spec.label} className="group">
            <div className="mono text-[8px] text-[var(--text-secondary)] mb-2 uppercase tracking-widest">{spec.label}</div>
            <div className="mono text-xl font-bold text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent-blue)] transition-colors">
              {spec.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Capabilities = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 max-w-7xl mx-auto bg-[var(--bg-color)] transition-colors">
      <div className="mono text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center gap-2 glow-text">
        <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> CAPABILITIES
      </div>
      <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-16 text-[var(--text-primary)]">Technical_Stack.json</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {data.techStacks.map((stack, i) => (
          <div key={stack.id} className="group p-10 border border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--text-primary)]/5 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 mono text-[8px] text-[var(--text-primary)]/20">0x0{i+1}</div>
            <div className="text-[var(--accent-blue)] mb-10">
              {stack.icon === 'code' && <Code size={24} />}
              {stack.icon === 'cpu' && <Cpu size={24} />}
              {stack.icon === 'shield' && <Shield size={24} />}
            </div>
            <h3 className="mono text-sm font-bold mb-8 text-[var(--text-primary)] tracking-widest uppercase">{stack.category}</h3>
            <div className="flex flex-wrap gap-2">
              {stack.items.map(item => (
                <span key={item} className="mono text-[8px] font-bold px-2 py-1 border border-[var(--border-color)] text-[var(--text-secondary)] group-hover:border-[var(--accent-blue)] group-hover:text-[var(--accent-blue)] transition-all">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Developments = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 max-w-7xl mx-auto bg-[var(--bg-color)] transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <div className="mono text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center gap-2 glow-text">
            <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> DEPLOYMENT
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-[var(--text-primary)]">Featured_Developments</h2>
        </div>
        <a 
          href={data.socials.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mono text-[8px] font-bold text-[var(--accent-blue)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2 tracking-widest uppercase"
        >
          OPEN_REMOTE_REPOS <ExternalLink size={10} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-color)] border border-[var(--border-color)]">
        {data.projects.map(project => (
          <div key={project.id} className="p-10 bg-[var(--bg-color)] hover:bg-[var(--text-primary)]/5 transition-all flex flex-col group">
            <div className="mono text-[8px] text-[var(--text-primary)]/40 mb-8 flex items-center gap-2 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-[var(--accent-blue)] glow" /> {project.module}
            </div>
            <h3 className="text-3xl font-bold mb-6 text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">{project.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-10 flex-grow">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="mono text-[8px] font-bold px-2 py-1 bg-[var(--text-primary)]/5 text-[var(--text-secondary)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Research = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="research" className="py-24 md:py-32 px-6 max-w-7xl mx-auto bg-[var(--bg-color)] transition-colors">
      <div className="text-center mb-16 md:mb-20">
        <div className="mono text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center justify-center gap-2 glow-text">
          <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> 04. STRATEGIC_FOCUS
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mono text-[var(--text-primary)]">RESEARCH_DOCUMENT.MD</h2>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        {data.researchDocs.map(doc => (
          <div key={doc.id} className="flex flex-col md:flex-row gap-4 md:gap-12 group">
            <div className="mono text-xs text-[var(--text-primary)]/20 md:pt-8 group-hover:text-[var(--accent-blue)] transition-colors glow-text">
              {doc.number}
            </div>
            <div className="flex-1 p-6 md:p-10 border border-[var(--border-color)] bg-[var(--card-bg)] relative terminal-window">
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--accent-blue)]/20" />
              <h3 className="mono text-sm font-bold mb-6 text-[var(--text-primary)]">{doc.title}</h3>
              <p className="italic text-sm text-[var(--text-primary)]/60 leading-relaxed">
                &quot;{doc.content}&quot;
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Contact = () => {
  const [isTransmitting, setIsTransmitting] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    // Simulate packet transmission
    setTimeout(() => {
      setIsTransmitting(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 max-w-3xl mx-auto text-center bg-[var(--bg-color)] transition-colors">
      <div className="mono text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center justify-center gap-2 glow-text">
        <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> COMMUNICATION
      </div>
      <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-[var(--text-primary)] uppercase">INITIALIZE_CONTACT</h2>
      <p className="mono text-[10px] text-[var(--text-primary)]/40 mb-16 uppercase tracking-[0.2em]">
        {isSent ? "PACKET_RECEIVED_SUCCESSFULLY" : "Waiting for incoming request..."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-8 text-left">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="mono text-[8px] text-[var(--text-secondary)] uppercase tracking-widest">INPUT.NAME</label>
            <input 
              required
              type="text" 
              placeholder="IDENTIFY_YOURSELF"
              className="w-full p-4 bg-transparent border-b border-[var(--border-color)] mono text-xs text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none transition-all placeholder:text-[var(--text-primary)]/20"
            />
          </div>
          <div className="space-y-2">
            <label className="mono text-[8px] text-[var(--text-secondary)] uppercase tracking-widest">INPUT.EMAIL</label>
            <input 
              required
              type="email" 
              placeholder="COMM_CHANNEL_ADDRESS"
              className="w-full p-4 bg-transparent border-b border-[var(--border-color)] mono text-xs text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none transition-all placeholder:text-[var(--text-primary)]/20"
            />
          </div>
          <div className="space-y-2">
            <label className="mono text-[8px] text-[var(--text-secondary)] uppercase tracking-widest">INPUT.MESSAGE</label>
            <textarea 
              required
              rows={4}
              placeholder="DESCRIBE_COLLABORATION_PARAMETERS"
              className="w-full p-4 bg-transparent border-b border-[var(--border-color)] mono text-xs text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none transition-all resize-none placeholder:text-[var(--text-primary)]/20"
            />
          </div>
        </div>
        <button 
          disabled={isTransmitting}
          className="w-full bg-[var(--accent-blue)] text-black py-5 mono text-xs font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] hover:glow transition-all flex items-center justify-center gap-4 disabled:opacity-50 uppercase tracking-widest"
        >
          {isTransmitting ? "TRANSMITTING_PACKET..." : "SEND_PACKET"} 
          {!isTransmitting && <ArrowRight size={16} className="rotate-[-45deg]" />}
        </button>
      </form>
    </section>
  );
};
