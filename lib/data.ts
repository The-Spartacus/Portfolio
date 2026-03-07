"use client";

import { useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  videoUrl?: string;
  architecture?: { from: string; to: string; label: string }[];
  techStackStats?: { label: string; value: number }[];
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
  roles: string[];
  heroDescription: string;
  portraitUrl: string;
  githubUsername: string;
  stats: { label: string; value: string }[];
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
  roles: ["AI_SECURITY_RESEARCHER", "FULLSTACK_DEVELOPER", "CYBER_ENGINEER"],
  heroDescription: "Specializing in the intersection of AI_LOGIC and SEC_ARCH to build autonomous, resilient systems against cyber threats.",
  portraitUrl: "https://picsum.photos/seed/cyber/800/1000",
  githubUsername: "The-Spartacus",
  stats: [
    { label: "PROJECTS_BUILT", value: "15+" },
    { label: "RESEARCH_PAPERS", value: "4" },
    { label: "TECHNOLOGIES", value: "25+" },
    { label: "GITHUB_REPOS", value: "50+" }
  ],
  philosophy: {
    title: "Core Philosophy",
    content: "Developing at the intersection of AI_LOGIC and SEC_ARCH. My focus is on creating autonomous systems that are both highly intelligent and resilient to malicious influence.",
    subContent: "Leveraging academic rigor to solve real-world engineering challenges. I bridge the technical gap between abstract neural architectures and high-performance production code.",
    specs: [
      { label: "SPEC_01", value: "CS_GRAD" },
      { label: "SPEC_02", value: "AI.ML" },
      { label: "SPEC_03", value: "SEC_ARCH" }
    ]
  },
  techStacks: [
    {
      id: "1",
      category: "AI / ML",
      items: ["PYTHON", "PYTORCH", "TENSORFLOW", "OPENCV", "NLP", "TRANSFORMERS"],
      icon: "cpu"
    },
    {
      id: "2",
      category: "SEC_ARCH",
      items: ["WIRESHARK", "LINUX", "NMAP", "METASPLOIT", "CRYPTOGRAPHY", "EBPF"],
      icon: "shield"
    },
    {
      id: "3",
      category: "FULLSTACK",
      items: ["REACT", "NODE.JS", "MONGODB", "EXPRESS", "TYPESCRIPT", "NEXT.JS", "GOLANG"],
      icon: "code"
    }
  ],
  projects: [
    {
      id: "1",
      title: "AI Deepfake Detection System",
      description: "Vision Transformer based system to detect manipulated media. Implements ensemble-based uncertainty estimation for proactive defense in neural pipelines.",
      tags: ["PYTHON", "PYTORCH", "COMPUTER_VISION"],
      githubUrl: "https://github.com/The-Spartacus",
      liveUrl: "https://demo.example.com",
      techStackStats: [
        { label: "Python", value: 85 },
        { label: "PyTorch", value: 70 },
        { label: "OpenCV", value: 45 }
      ],
      architecture: [
        { from: "Input", to: "ViT_Model", label: "Image_Stream" },
        { from: "ViT_Model", to: "Uncertainty_Head", label: "Features" },
        { from: "Uncertainty_Head", to: "Output", label: "Prediction" }
      ]
    },
    {
      id: "2",
      title: "AI Intrusion Detection System",
      description: "Behavioral analysis using CICIDS dataset. A Go-based distributed system for monitoring internal network traffic and identifying anomalous lateral movements using eBPF hooks.",
      tags: ["GOLANG", "GRPC", "EBPF", "ML"],
      githubUrl: "https://github.com/The-Spartacus",
      docsUrl: "https://docs.example.com",
      techStackStats: [
        { label: "Golang", value: 90 },
        { label: "eBPF", value: 65 },
        { label: "gRPC", value: 50 }
      ]
    },
    {
      id: "3",
      title: "Autonomous Cyber Defense Bot",
      description: "Reinforcement learning agent trained to respond to active network intrusions. Dynamically reconfigures firewall rules and isolates compromised nodes in real-time.",
      tags: ["PYTHON", "RL", "CYBER_SECURITY"],
      githubUrl: "https://github.com/The-Spartacus",
      techStackStats: [
        { label: "Python", value: 80 },
        { label: "RL", value: 75 },
        { label: "Security", value: 60 }
      ]
    }
  ],
  researchDocs: [
    {
      id: "1",
      number: "01//_",
      title: "AI Driven Intrusion Detection",
      content: "Investigating the use of Reinforcement Learning for real-time network reconfiguration during active intrusion attempts."
    },
    {
      id: "2",
      number: "02//_",
      title: "Vision Transformer Deepfake Detection",
      content: "Exploring ViT architectures for robust detection of manipulated media in high-latency environments."
    },
    {
      id: "3",
      number: "03//_",
      title: "AI Enhanced Threat Detection",
      content: "Developing behavioral analysis models to identify zero-day exploits in distributed cloud architectures."
    }
  ],
  socials: {
    github: "https://github.com/The-Spartacus",
    linkedin: "https://linkedin.com/in/vaishnav-ds",
    email: "mailto:contact@vaishnav.ds"
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
