"use client";

import React from 'react';
import { motion } from 'motion/react';
import { BruteforceText } from './BruteforceText';
import { TerminalText } from './TerminalText';
import { Code, Cpu, Shield, ArrowRight, ExternalLink, ArrowUpRight, Github, FileText, Video } from 'lucide-react';
import { PortfolioData } from '@/lib/data';

export const Hero = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="hero" className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center text-center relative overflow-hidden bg-[var(--bg-color)] transition-colors">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[var(--text-primary)]/10" />
      <div className="mono text-[10px] text-[var(--accent-blue)] mb-8 flex items-center gap-2 glow-text">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] animate-pulse glow" />
        STATUS: {data.status}
      </div>
      
      <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 relative text-[var(--text-primary)]">
        {data.name}
        <span className="absolute -bottom-2 right-0 md:right-[-20px] mono text-[10px] font-bold text-[var(--accent-blue)] tracking-normal glow-text">
          {data.heroTag}
        </span>
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {data.roles.map((role, i) => (
          <div key={role} className="mono text-xs font-bold text-[var(--text-secondary)] flex items-center gap-2">
            [ <BruteforceText text={role} delay={i * 800} className="text-[var(--text-primary)]" /> ]
            {i < data.roles.length - 1 && <span className="text-[var(--text-primary)]/10">|</span>}
          </div>
        ))}
      </div>

      <p className="max-w-2xl text-[var(--text-secondary)] leading-relaxed mb-12 min-h-[3em]">
        <TerminalText text={data.heroDescription} showPrompt={true} />
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a 
          href="#projects"
          className="bg-[var(--text-primary)] text-[var(--bg-color)] px-8 py-3 mono text-xs font-bold flex items-center justify-center gap-2 hover:bg-[var(--accent-blue)] hover:text-black hover:glow transition-all"
        >
          EXE.PROJECTS() <ArrowRight size={14} />
        </a>
        <a 
          href="#contact"
          className="border border-[var(--border-color)] px-8 py-3 mono text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all flex items-center justify-center"
        >
          _CONNECT
        </a>
      </div>
      
      <div className="absolute left-6 top-1/2 -translate-y-1/2 vertical-text mono text-[8px] text-[var(--text-primary)]/20 tracking-[0.5em]">
        SYSTEM_VERSION_{data.version} | {new Date().getFullYear()}
      </div>
    </section>
  );
};

export const Overview = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 max-w-7xl mx-auto bg-[var(--bg-color)] transition-colors">
      <div className="mb-16">
        <div className="mono text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center gap-2 glow-text">
          <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> 01. PHILOSOPHY
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--text-primary)]">{data.philosophy.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Card */}
        <div className="lg:col-span-2 p-8 md:p-12 border border-[var(--border-color)] bg-[var(--card-bg)] terminal-window relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 mono text-[8px] text-[var(--text-primary)]/10">CORE_DIRECTIVE</div>
          <div className="relative z-10">
            <p className="text-xl md:text-2xl text-[var(--text-primary)] font-medium leading-relaxed mb-8">
              {data.philosophy.content}
            </p>
            <div className="w-12 h-0.5 bg-[var(--accent-blue)] mb-8 glow" />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              {data.philosophy.subContent}
            </p>
          </div>
          {/* Decorative corner */}
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[var(--accent-blue)]/20" />
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 gap-4">
          {data.philosophy.specs.map((spec, i) => (
            <div key={spec.label} className="p-6 border border-[var(--border-color)] bg-[var(--card-bg)] terminal-window flex flex-col justify-center group hover:border-[var(--accent-blue)]/30 transition-all">
              <div className="mono text-[8px] text-[var(--accent-blue)] mb-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-[var(--accent-blue)] rounded-full glow" />
                PARAM_0{i + 1}
              </div>
              <div className="mono text-[10px] text-[var(--text-secondary)] uppercase mb-1">{spec.label}</div>
              <div className="mono text-lg font-bold text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent-blue)] transition-colors">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Capabilities = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 max-w-7xl mx-auto bg-[var(--bg-color)] transition-colors">
      <div className="mono text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center gap-2 glow-text">
        <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> 02. CAPABILITIES
      </div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-[var(--text-primary)]">Technical_Stack.json</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.techStacks.map((stack, i) => (
          <div key={stack.id} className="group p-8 border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--accent-black)]/20 transition-all relative overflow-hidden terminal-window">
            <div className="absolute top-0 right-0 p-4 mono text-[8px] text-[var(--text-primary)]/10">0x0{i+1}</div>
            <div className="w-10 h-10 bg-[var(--accent-blue)]/5 flex items-center justify-center text-[var(--accent-blue)] mb-8 group-hover:bg-[var(--accent-blue)] group-hover:text-black group-hover:glow transition-all">
              {stack.icon === 'code' && <Code size={20} />}
              {stack.icon === 'cpu' && <Cpu size={20} />}
              {stack.icon === 'shield' && <Shield size={20} />}
            </div>
            <h3 className="mono text-sm font-bold mb-6 text-[var(--text-primary)]">{stack.category}</h3>
            <div className="flex flex-wrap gap-2">
              {stack.items.map(item => (
                <span key={item} className="mono text-[8px] font-bold px-2 py-1 bg-[var(--text-primary)]/5 text-[var(--text-secondary)] group-hover:bg-[var(--accent-blue)]/10 group-hover:text-[var(--accent-blue)] transition-all">
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
            <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> 03. DEVELOPMENTS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--text-primary)]">Featured_Developments</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.projects.map(project => (
          <div key={project.id} className="p-6 md:p-10 border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--text-primary)]/10 transition-all terminal-window flex flex-col">
            <div className="mono text-[8px] text-[var(--text-primary)]/20 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--accent-blue)] glow" /> {project.module}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">{project.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 flex-grow">
              {project.description}
            </p>
            
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="mono text-[8px] font-bold px-2 py-1 border border-[var(--border-color)] text-[var(--text-secondary)]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--border-color)]">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="mono text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--accent-blue)] flex items-center gap-1.5 transition-colors glow-text">
                    <Github size={14} /> GITHUB
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mono text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--accent-blue)] flex items-center gap-1.5 transition-colors glow-text">
                    <ExternalLink size={14} /> LIVE_DEMO
                  </a>
                )}
                {project.docsUrl && (
                  <a href={project.docsUrl} target="_blank" rel="noopener noreferrer" className="mono text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--accent-blue)] flex items-center gap-1.5 transition-colors glow-text">
                    <FileText size={14} /> DOCS
                  </a>
                )}
                {project.videoUrl && (
                  <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="mono text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--accent-blue)] flex items-center gap-1.5 transition-colors glow-text">
                    <Video size={14} /> VIDEO
                  </a>
                )}
              </div>
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
        <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> 05. COMMUNICATION
      </div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-[var(--text-primary)]">INITIALIZE_CONTACT</h2>
      <p className="mono text-[10px] text-[var(--text-primary)]/20 mb-12 md:mb-16">
        {isSent ? "PACKET_RECEIVED_SUCCESSFULLY" : "Waiting for incoming request..."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div className="space-y-2">
          <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Input.Name</label>
          <input 
            required
            type="text" 
            placeholder="IDENTIFY_YOURSELF"
            className="w-full p-4 bg-transparent border border-[var(--border-color)] mono text-xs text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Input.Email</label>
          <input 
            required
            type="email" 
            placeholder="COMM_CHANNEL_ADDRESS"
            className="w-full p-4 bg-transparent border border-[var(--border-color)] mono text-xs text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Input.Message</label>
          <textarea 
            required
            rows={4}
            placeholder="DESCRIBE_COLLABORATION_PARAMETERS"
            className="w-full p-4 bg-transparent border border-[var(--border-color)] mono text-xs text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none transition-all resize-none"
          />
        </div>
        <button 
          disabled={isTransmitting}
          className="w-full bg-[var(--accent-blue)] text-black py-4 mono text-xs font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] hover:glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isTransmitting ? "TRANSMITTING_PACKET..." : "SEND_PACKET"} 
          {!isTransmitting && <ArrowRight size={14} className="rotate-[-45deg]" />}
        </button>
      </form>
    </section>
  );
};
