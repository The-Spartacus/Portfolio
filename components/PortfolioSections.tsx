"use client";

import React from 'react';
import { motion } from 'motion/react';
import { BruteforceText } from './BruteforceText';
import { TerminalText } from './TerminalText';
import { Code, Cpu, Shield, ArrowRight, ExternalLink, ArrowUpRight, Github, FileText, Video, Linkedin, Mail, Terminal as TerminalIcon, Download } from 'lucide-react';
import { PortfolioData } from '@/lib/data';
import { ProjectVisuals } from './ProjectVisuals';
import { Terminal } from './Terminal';
import { GithubActivity } from './GithubActivity';

import Image from 'next/image';

import { useScroll, useTransform } from 'motion/react';

export const Hero = ({ data }: { data: PortfolioData }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section id="hero" className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative overflow-hidden bg-[var(--bg-color)] transition-colors">
      <motion.div 
        style={{ y, opacity, scale }}
        className="z-10 flex flex-col items-center w-full"
      >
        <div className="mono text-[9px] sm:text-[10px] text-[var(--accent-blue)] mb-6 sm:mb-8 flex items-center gap-2 glow-text">
          <span className="w-1.5 h-1.5 bg-[var(--accent-blue)] glow" />
          STATUS: #{data.status}
        </div>
        
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 text-[var(--text-primary)] leading-[0.8]">
          {data.name}
        </h1>
        
        <div className="mono text-[9px] sm:text-[10px] text-[var(--text-secondary)] mb-10 sm:mb-12 flex flex-wrap justify-center gap-x-3 sm:gap-x-6 gap-y-3 px-2">
          {data.roles.map((role, i) => (
            <div key={role} className="flex items-center gap-1.5 sm:gap-2">
              <span className="opacity-20">[</span>
              <BruteforceText 
                text={role} 
                delay={800 + (i * 400)} 
                className="text-[var(--text-primary)] font-bold"
              />
              <span className="opacity-20">]</span>
              {i < data.roles.length - 1 && <span className="hidden sm:inline opacity-10 ml-2">|</span>}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mb-10 sm:mb-12 min-h-[4rem] text-center px-4">
          <TerminalText 
            text={data.heroDescription}
            delay={2000}
            showPrompt={true}
            className="text-[var(--text-secondary)] leading-relaxed text-xs sm:text-sm md:text-lg"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
          <a 
            href="#projects"
            className="w-full sm:w-auto bg-[var(--text-primary)] text-[var(--bg-color)] px-8 sm:px-10 py-4 mono text-[10px] font-bold flex items-center justify-center gap-4 hover:bg-[var(--accent-blue)] hover:text-black hover:glow transition-all group min-w-[180px] sm:min-w-[200px]"
          >
            EXE.VIEW_PROJECTS() <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href={data.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-[var(--border-color)] px-8 sm:px-10 py-4 mono text-[10px] font-bold flex items-center justify-center gap-4 hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] transition-all min-w-[180px] sm:min-w-[200px]"
          >
            DOWNLOAD_CV <Download size={14} />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export const SystemStatus = ({ data }: { data: PortfolioData }) => {
  return (
    <section className="py-12 border-y border-[var(--border-color)] bg-[var(--text-primary)]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.stats.map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="mono text-[8px] text-[var(--text-secondary)] mb-1 uppercase tracking-widest">{stat.label}</div>
              <div className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] glow-text">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Overview = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="about" className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto bg-[var(--bg-color)] transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20"
      >
        <div className="lg:col-span-4">
          <div className="mono text-[9px] sm:text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center gap-2 glow-text">
            <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> MISSION
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[var(--text-primary)] leading-none">
            {data.philosophy.title}
          </h2>
          <div className="w-12 h-1 bg-[var(--accent-blue)] mt-4 sm:mt-6 glow" />
        </div>
        
        <div className="lg:col-span-8 flex flex-col justify-end">
          <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-primary)] font-medium leading-tight mb-6 sm:mb-8">
            {data.philosophy.content.split(' ').map((word, i) => (
              <span key={i} className={word.includes('_') || ['AI', 'Security', 'Deepfake', 'Detection', 'Defense'].includes(word.replace(/[,.]/g, '')) ? 'text-[var(--accent-blue)]' : ''}>
                {word}{' '}
              </span>
            ))}
          </p>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {data.philosophy.subContent}
          </p>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-[var(--border-color)]">
        {data.philosophy.specs.map((spec, i) => (
          <motion.div 
            key={spec.label} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="group"
          >
            <div className="mono text-[8px] text-[var(--text-secondary)] mb-2 uppercase tracking-widest">{spec.label}</div>
            <div className="mono text-xl font-bold text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent-blue)] transition-colors">
              {spec.value}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const Capabilities = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="skills" className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto bg-[var(--bg-color)] transition-colors">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mono text-[9px] sm:text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center gap-2 glow-text">
          <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> CAPABILITIES
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-8 sm:mb-12 text-[var(--text-primary)] uppercase">TECH_STACK.JSON</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
        {data.techStacks.map((stack, i) => (
          <motion.div 
            key={stack.id} 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-8 sm:p-10 border border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--text-primary)]/5 transition-all relative overflow-hidden"
          >
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
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const Developments = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="projects" className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto bg-[var(--bg-color)] transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-6 sm:gap-8"
      >
        <div>
          <div className="mono text-[9px] sm:text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center gap-2 glow-text">
            <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> DEPLOYMENT
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[var(--text-primary)]">Featured_Developments</h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-color)] border border-[var(--border-color)]">
        {data.projects.map((project, i) => (
          <motion.div 
            key={project.id} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`p-8 sm:p-10 bg-[var(--bg-color)] hover:bg-[var(--text-primary)]/5 transition-all flex flex-col group ${i === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
          >
            <div className="flex justify-between items-start mb-6 sm:mb-8">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="mono text-[8px] font-bold px-2 py-1 bg-[var(--text-primary)]/5 text-[var(--text-secondary)]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-all" 
                    title="GitHub"
                  >
                    <Github size={14} />
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-all" 
                    title="Live Demo"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
            
            <h3 className={`font-bold mb-4 sm:mb-6 text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors ${i === 0 ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-3xl'}`}>{project.title}</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-8 sm:mb-10 flex-grow">
              {project.description}
            </p>

            <ProjectVisuals 
              techStackStats={project.techStackStats} 
              architecture={project.architecture} 
            />
            
            <div className="mt-auto pt-6 border-t border-[var(--border-color)] opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 mono text-[8px] text-[var(--accent-blue)] font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-[var(--accent-blue)] glow" /> 
                {project.liveUrl ? "SYSTEM_READY_FOR_DEPLOYMENT" : "SOURCE_CODE_AVAILABLE"}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const Research = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="research" className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto bg-[var(--bg-color)] transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 md:mb-12"
      >
        <div className="mono text-[9px] sm:text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center justify-center gap-2 glow-text">
          <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> STRATEGIC_RESEARCH
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-[var(--text-primary)] uppercase break-words">ACADEMIC_PUBLICATIONS.MD</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
        {data.researchDocs.map((doc, i) => (
          <motion.div 
            key={doc.id} 
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group p-8 border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--accent-blue)] transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent-blue)]/10 group-hover:bg-[var(--accent-blue)] transition-all" />
            <div className="mono text-[10px] text-[var(--accent-blue)] mb-4 flex items-center gap-2">
              <FileText size={12} /> {doc.number}
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">{doc.title}</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
              &quot;{doc.content}&quot;
            </p>
            <div className="mt-6 flex items-center gap-2 mono text-[8px] text-[var(--text-secondary)] uppercase tracking-widest">
              <span className="w-1 h-1 rounded-full bg-[var(--accent-blue)]" /> PEER_REVIEWED_INTERNAL
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const TerminalSection = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="terminal" className="py-20 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto bg-[var(--bg-color)] transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6 sm:gap-8"
      >
        <div>
          <div className="mono text-[9px] sm:text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center gap-2 glow-text">
            <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> INTERACTIVE_SHELL
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[var(--text-primary)]">System_Terminal</h2>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <Terminal data={data} />
      </motion.div>
    </section>
  );
};

export const GithubSection = ({ data }: { data: PortfolioData }) => {
  return (
    <section id="github" className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto bg-[var(--bg-color)] transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-6 sm:gap-8"
      >
        <div>
          <div className="mono text-[9px] sm:text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center gap-2 glow-text">
            <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> OPEN_SOURCE
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[var(--text-primary)]">Github_Activity</h2>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <GithubActivity username={data.githubUsername} />
      </motion.div>
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
    <section id="contact" className="py-12 md:py-20 px-4 sm:px-6 max-w-3xl mx-auto text-center bg-[var(--bg-color)] transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mono text-[9px] sm:text-[10px] font-bold text-[var(--accent-blue)] mb-4 flex items-center justify-center gap-2 glow-text">
          <span className="w-2 h-0.5 bg-[var(--accent-blue)] glow" /> COMMUNICATION
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-[var(--text-primary)] uppercase">INITIALIZE_CONTACT</h2>
        <p className="mono text-[8px] sm:text-[10px] text-[var(--text-primary)]/40 mb-12 sm:mb-16 uppercase tracking-[0.2em]">
          {isSent ? "PACKET_RECEIVED_SUCCESSFULLY" : "Waiting for incoming request..."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 text-left">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="mono text-[8px] text-[var(--text-secondary)] uppercase tracking-widest">INPUT.NAME</label>
              <input 
                required
                type="text" 
                placeholder="IDENTIFY_YOURSELF"
                className="w-full p-3 sm:p-4 bg-transparent border-b border-[var(--border-color)] mono text-xs text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none transition-all placeholder:text-[var(--text-primary)]/20"
              />
            </div>
            <div className="space-y-2">
              <label className="mono text-[8px] text-[var(--text-secondary)] uppercase tracking-widest">INPUT.EMAIL</label>
              <input 
                required
                type="email" 
                placeholder="COMM_CHANNEL_ADDRESS"
                className="w-full p-3 sm:p-4 bg-transparent border-b border-[var(--border-color)] mono text-xs text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none transition-all placeholder:text-[var(--text-primary)]/20"
              />
            </div>
            <div className="space-y-2">
              <label className="mono text-[8px] text-[var(--text-secondary)] uppercase tracking-widest">INPUT.MESSAGE</label>
              <textarea 
                required
                rows={4}
                placeholder="DESCRIBE_COLLABORATION_PARAMETERS"
                className="w-full p-3 sm:p-4 bg-transparent border-b border-[var(--border-color)] mono text-xs text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none transition-all resize-none placeholder:text-[var(--text-primary)]/20"
              />
            </div>
          </div>
          <button 
            disabled={isTransmitting}
            className="w-full bg-[var(--accent-blue)] text-black py-4 sm:py-5 mono text-xs font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] hover:glow transition-all flex items-center justify-center gap-4 disabled:opacity-50 uppercase tracking-widest"
          >
            {isTransmitting ? "TRANSMITTING_PACKET..." : "SEND_PACKET"} 
            {!isTransmitting && <ArrowRight size={16} className="rotate-[-45deg]" />}
          </button>
        </form>
      </motion.div>
    </section>
  );
};
