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
  heroTag: string;
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
  heroTag: "AI SECURITY ENGINEER",
  roles: ["AI_SECURITY_RESEARCHER", "FULLSTACK_DEVELOPER", "CYBER_ENGINEER"],
  heroDescription: "I build AI-powered cybersecurity tools, intelligent detection systems, and scalable full-stack applications.",
  portraitUrl: "https://picsum.photos/seed/portrait/800/1000",
  githubUsername: "The-Spartacus",
  stats: [
    { label: "PROJECTS_BUILT", value: "12+" },
    { label: "RESEARCH_PROJECTS", value: "3" },
    { label: "TECHNOLOGIES", value: "20+" },
    { label: "GITHUB_REPOS", value: "40+" }
  ],
  philosophy: {
    title: "Mission_Statement",
    content: "My goal is to develop intelligent systems capable of detecting cyber threats before they cause damage. I am particularly interested in AI Security, Deepfake Detection, and Autonomous Cyber Defense.",
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
      category: "AI / ML",
      items: ["PYTHON", "PYTORCH", "TENSORFLOW", "OPENCV", "SCIKIT_LEARN"],
      icon: "cpu"
    },
    {
      id: "2",
      category: "WEB_DEV",
      items: ["REACT", "NODE.JS", "MONGODB", "EXPRESS", "TYPESCRIPT", "NEXT.JS"],
      icon: "code"
    },
    {
      id: "3",
      category: "SECURITY",
      items: ["WIRESHARK", "LINUX", "NMAP", "METASPLOIT", "CRYPTOGRAPHY", "EBPF"],
      icon: "shield"
    }
  ],
  projects: [
    {
      id: "1",
      title: "AI Deepfake Detection System",
      description: "Vision Transformer based system to detect manipulated media. Implements ensemble-based uncertainty estimation for proactive defense in neural pipelines.",
      tags: ["PYTHON", "PYTORCH", "COMPUTER_VISION"],
      githubUrl: "https://github.com",
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
      githubUrl: "https://github.com",
      docsUrl: "https://docs.example.com",
      techStackStats: [
        { label: "Golang", value: 90 },
        { label: "eBPF", value: 65 },
        { label: "gRPC", value: 50 }
      ]
    },
    {
      id: "3",
      title: "EventSphere",
      description: "Full-stack event management platform with real-time updates and secure payment integration. Built with MERN stack for high scalability.",
      tags: ["REACT", "NODE.JS", "MONGODB", "EXPRESS"],
      githubUrl: "https://github.com",
      liveUrl: "https://eventsphere.example.com",
      techStackStats: [
        { label: "React", value: 80 },
        { label: "Node.js", value: 75 },
        { label: "MongoDB", value: 60 }
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
