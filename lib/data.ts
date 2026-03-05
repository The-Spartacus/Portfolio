"use client";

import { useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  module: string;
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  videoUrl?: string;
}

export interface TechStack {
  id: string;
  category: string;
  items: string[];
  icon: string;
}

export interface ResearchDoc {
  id: string;
  number: string;
  title: string;
  content: string;
}

export interface PortfolioData {
  name: string;
  version: string;
  status: string;
  heroTag: string;
  roles: string[];
  heroDescription: string;
  portraitUrl: string;
  philosophy: {
    title: string;
    content: string;
    subContent: string;
    specs: { label: string; value: string }[];
  };
  techStacks: TechStack[];
  projects: Project[];
  researchDocs: ResearchDoc[];
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  cvUrl: string;
}

const INITIAL_DATA: PortfolioData = {
  name: "VAISHNAV",
  version: "v1.0",
  status: "ACTIVE_AND_AVAILABLE",
  heroTag: "DESIGNER / DEVELOPER",
  roles: ["AI_ENTHUSIAST", "CYBER_RESEARCHER", "FULLSTACK_DEV"],
  heroDescription: "A designer/developer specialized in high-integrity intelligent systems, bridging the gap between neural logic and seamless user experience.",
  portraitUrl: "https://picsum.photos/seed/portrait/800/1000",
  philosophy: {
    title: "Core Philosophy",
    content: "Developing at the intersection of AI_LOGIC and SEC_ARCH. My focus is on creating systems that are both highly intelligent and resilient.",
    subContent: "Leveraging academic rigor to solve real-world engineering challenges. I bridge the technical gap between abstract neural architectures and high-performance production code.",
    specs: [
      { label: "SPEC_01", value: "CS_GRAD" },
      { label: "SPEC_02", value: "AI.ML" },
      { label: "SPEC_03", value: "CYBERSEC" }
    ]
  },
  techStacks: [
    {
      id: "1",
      category: "PROG_LANGS",
      items: ["PYTHON", "C++", "GOLANG", "TYPESCRIPT", "RUST"],
      icon: "code"
    },
    {
      id: "2",
      category: "AI_MODELS",
      items: ["PYTORCH", "TRANSFORMERS", "NLP", "COMPUTER_VISION", "SCIKIT_LEARN"],
      icon: "cpu"
    },
    {
      id: "3",
      category: "SECURITY_OPS",
      items: ["NETSEC", "CRYPTOGRAPHY", "SIEM", "EBPF", "PEN_TESTING"],
      icon: "shield"
    }
  ],
  projects: [
    {
      id: "1",
      title: "Adversarial ML Detection",
      description: "Detection of perturbed inputs in deep learning models using ensemble-based uncertainty estimation. Developed as a proactive defense mechanism for neural pipelines.",
      tags: ["PYTHON", "PYTORCH", "ADV_SECURITY"],
      module: "RESEARCH.MODULE_01"
    },
    {
      id: "2",
      title: "Zero-Trust Network Analyzer",
      description: "A Go-based distributed system for monitoring internal network traffic and identifying anomalous lateral movements using eBPF hooks for high performance.",
      tags: ["GOLANG", "GRPC", "EBPF"],
      module: "SYSTEM.MODULE_02"
    }
  ],
  researchDocs: [
    {
      id: "1",
      number: "01//_",
      title: "AUTONOMOUS THREAT DEFENSE",
      content: "Investigating the use of Reinforcement Learning for real-time network reconfiguration during active intrusion attempts. Aiming to create 'immune-like' systems for cloud architectures."
    },
    {
      id: "2",
      number: "02//_",
      title: "PRIVACY-PRESERVING AI",
      content: "Exploring Federated Learning and Differential Privacy to enable collaborative AI training without compromising individual user data or corporate secrets."
    }
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:contact@example.com"
  },
  cvUrl: "#",
};

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_data');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setData(prev => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error("Failed to parse saved data", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('portfolio_data', JSON.stringify(newData));
  };

  return { data, updateData, isLoaded };
}
