"use client";

import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'motion/react';
import { Github, Star, GitFork, Users, Code2 } from 'lucide-react';

interface GithubActivityProps {
  username: string;
}

interface GithubStats {
  repos: number;
  stars: number;
  followers: number;
  topLang: string;
}

export const GithubActivity: React.FC<GithubActivityProps> = ({ username }) => {
  const [stats, setStats] = useState<GithubStats>({
    repos: 0,
    stars: 0,
    followers: 0,
    topLang: "LOADING..."
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers: HeadersInit = {};
        if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
          headers.Authorization = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
        }

        const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
        const userData = await userRes.json();

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
        const reposData = await reposRes.json();

        let totalStars = 0;
        const langCounts: Record<string, number> = {};

        if (Array.isArray(reposData)) {
          reposData.forEach((repo: any) => {
            totalStars += repo.stargazers_count;
            if (repo.language) {
              langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            }
          });
        }

        const topLang = Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

        setStats({
          repos: userData.public_repos || 0,
          stars: totalStars,
          followers: userData.followers || 0,
          topLang: topLang.toUpperCase()
        });
      } catch (error) {
        console.error("Failed to fetch GitHub stats", error);
      }
    };

    if (username) {
      fetchStats();
    }
  }, [username]);

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "REPOSITORIES", value: stats.repos.toString(), icon: <GitFork size={14} /> },
          { label: "STARS_EARNED", value: stats.stars.toString(), icon: <Star size={14} /> },
          { label: "FOLLOWERS", value: stats.followers.toString(), icon: <Users size={14} /> },
          { label: "TOP_LANG", value: stats.topLang, icon: <Code2 size={14} /> },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 border border-[var(--border-color)] bg-[var(--card-bg)] flex flex-col gap-2 group hover:border-[var(--accent-blue)] transition-all"
          >
            <div className="text-[var(--text-secondary)] group-hover:text-[var(--accent-blue)] transition-colors">
              {stat.icon}
            </div>
            <div className="mono text-[8px] text-[var(--text-secondary)] uppercase tracking-widest">{stat.label}</div>
            <div className="text-xl font-bold text-[var(--text-primary)]">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Contribution Graph */}
      <div className="p-8 border border-[var(--border-color)] bg-[var(--card-bg)] overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
          <Github className="text-[var(--accent-blue)]" size={20} />
          <div className="mono text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">COMMIT_HISTORY_LOG</div>
        </div>
        
        <div className="flex justify-center overflow-x-auto pb-4 scrollbar-hide">
          <GitHubCalendar 
            username={username}
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            theme={{
              light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
              dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
          />
        </div>
      </div>
    </div>
  );
};
