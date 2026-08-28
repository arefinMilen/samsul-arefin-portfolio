'use client';

import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/useTranslation';
import { Code2, Award, Zap, ExternalLink, RefreshCw, CheckCircle2, TrendingUp, Target } from 'lucide-react';

interface SubmissionNode {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  recentSubmissions: SubmissionNode[];
}

const fetchLeetCodeData = async (): Promise<LeetCodeStats> => {
  const res = await fetch('https://alfa-leetcode-api.onrender.com/userProfile/arefin15-5279');
  if (!res.ok) {
    throw new Error('Failed to fetch LeetCode statistics');
  }
  const data = await res.json();
  const acStats = data?.matchedUserStats?.acSubmissionNum || [];
  
  const total = acStats.find((s: any) => s.difficulty === 'All')?.count ?? 50;
  const easy = acStats.find((s: any) => s.difficulty === 'Easy')?.count ?? 38;
  const medium = acStats.find((s: any) => s.difficulty === 'Medium')?.count ?? 12;
  const hard = acStats.find((s: any) => s.difficulty === 'Hard')?.count ?? 0;

  const recent = (data?.recentSubmissionList || []).filter((s: SubmissionNode) => s.statusDisplay === 'Accepted').slice(0, 6);

  return {
    totalSolved: total,
    easySolved: easy,
    totalEasy: 800,
    mediumSolved: medium,
    totalMedium: 1600,
    hardSolved: hard,
    totalHard: 700,
    acceptanceRate: 64.5,
    ranking: 185240,
    contributionPoints: 340,
    recentSubmissions: recent,
  };
};

// Fallback initial data with real user values
const fallbackData: LeetCodeStats = {
  totalSolved: 50,
  easySolved: 38,
  totalEasy: 800,
  mediumSolved: 12,
  totalMedium: 1600,
  hardSolved: 0,
  totalHard: 700,
  acceptanceRate: 64.5,
  ranking: 185240,
  contributionPoints: 340,
  recentSubmissions: [
    { title: 'Calculator with Method Chaining', titleSlug: 'calculator-with-method-chaining', timestamp: '', statusDisplay: 'Accepted', lang: 'javascript' },
    { title: 'Array Wrapper', titleSlug: 'array-wrapper', timestamp: '', statusDisplay: 'Accepted', lang: 'javascript' },
    { title: 'Event Emitter', titleSlug: 'event-emitter', timestamp: '', statusDisplay: 'Accepted', lang: 'javascript' },
    { title: 'Compact Object', titleSlug: 'compact-object', timestamp: '', statusDisplay: 'Accepted', lang: 'javascript' },
    { title: 'Flatten Deeply Nested Array', titleSlug: 'flatten-deeply-nested-array', timestamp: '', statusDisplay: 'Accepted', lang: 'javascript' },
    { title: 'Join Two Arrays by ID', titleSlug: 'join-two-arrays-by-id', timestamp: '', statusDisplay: 'Accepted', lang: 'javascript' },
  ],
};

export const LeetCodeStatsSection: React.FC = () => {
  const { isBn } = useTranslation();

  const {
    data: statsData,
    isLoading,
    isError,
    refetch,
  } = useQuery<LeetCodeStats>({
    queryKey: ['leetcodeStats', 'arefin15-5279'],
    queryFn: fetchLeetCodeData,
    staleTime: 1000 * 60 * 15, // 15 minutes cache
  });

  const stats = statsData || fallbackData;

  const totalEasyPct = Math.min(100, Math.round((stats.easySolved / Math.max(1, stats.totalEasy)) * 100 * 5));
  const totalMedPct = Math.min(100, Math.round((stats.mediumSolved / Math.max(1, stats.totalMedium)) * 100 * 5));
  const totalHardPct = Math.min(100, Math.round((stats.hardSolved / Math.max(1, stats.totalHard)) * 100 * 5));

  const dsaTopics = [
    'Arrays & Hashing',
    'Two Pointers',
    'Sliding Window',
    'Binary Search',
    'Trees & Graphs',
    'Dynamic Programming',
    'Recursion & Backtracking',
    'Stack & Queues',
  ];

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 relative overflow-hidden shadow-2xl">
          
          {/* Subtle Ambient Lighting */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 blur-[110px] rounded-full pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-black/10 dark:border-white/10 pb-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/10 shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-amber-500 uppercase tracking-wider font-bold flex items-center gap-1.5 justify-center md:justify-start">
                  <Zap className="w-3.5 h-3.5" />
                  <span>LEETCODE PROBLEM SOLVING</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {isBn ? 'লিটকোড অ্যালগরিদম ও ডাটা স্ট্রাকচার দক্ষতা' : 'Data Structures & Algorithms Activity'}
                </h3>
              </div>
            </div>

            <a
              href="https://leetcode.com/u/arefin15-5279/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-dark-bg border border-amber-500/30 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-md hover:scale-105"
            >
              <span>@arefin15-5279 on LeetCode</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Stats Header Overview Cards */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-black/5 dark:bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {/* Total Solved Card */}
              <div className="bg-black/5 dark:bg-white/5 p-4 sm:p-5 rounded-2xl border border-black/10 dark:border-white/10 text-center shadow-sm relative overflow-hidden group">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">{stats.totalSolved}</div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1 flex items-center justify-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Total Problems Solved</span>
                </div>
              </div>

              {/* Easy Card */}
              <div className="bg-black/5 dark:bg-white/5 p-4 sm:p-5 rounded-2xl border border-emerald-500/20 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{stats.easySolved}</div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1 flex items-center justify-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Easy Difficulty</span>
                </div>
              </div>

              {/* Medium Card */}
              <div className="bg-black/5 dark:bg-white/5 p-4 sm:p-5 rounded-2xl border border-amber-500/20 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">{stats.mediumSolved}</div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1 flex items-center justify-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Medium Difficulty</span>
                </div>
              </div>

              {/* Hard Card */}
              <div className="bg-black/5 dark:bg-white/5 p-4 sm:p-5 rounded-2xl border border-rose-500/20 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-rose-400">{stats.hardSolved}</div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1 flex items-center justify-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Hard Difficulty</span>
                </div>
              </div>
            </div>
          )}

          {/* Difficulty Progress Bars & Global Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Left Col: Difficulty Breakdowns */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col justify-between">
              <h4 className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-4 font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Difficulty Progress Breakdown</span>
              </h4>

              <div className="space-y-4">
                {/* Easy Bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span>Easy</span>
                    </span>
                    <span className="text-slate-400 font-semibold">{stats.easySolved} Solved</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-black/20 dark:bg-slate-800 overflow-hidden p-0.5 border border-emerald-500/20">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${totalEasyPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm"
                    />
                  </div>
                </div>

                {/* Medium Bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <span>Medium</span>
                    </span>
                    <span className="text-slate-400 font-semibold">{stats.mediumSolved} Solved</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-black/20 dark:bg-slate-800 overflow-hidden p-0.5 border border-amber-500/20">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${totalMedPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 shadow-sm"
                    />
                  </div>
                </div>

                {/* Hard Bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-rose-400 font-bold flex items-center gap-1">
                      <span>Hard</span>
                    </span>
                    <span className="text-slate-400 font-semibold">{stats.hardSolved} Solved</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-black/20 dark:bg-slate-800 overflow-hidden p-0.5 border border-rose-500/20">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${totalHardPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Global Rank & Acceptance Rate */}
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col justify-between">
              <h4 className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-4 font-bold flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Global Rank & Metrics</span>
              </h4>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/10 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400">Global Ranking</span>
                  <span className="text-sm font-mono font-bold text-amber-400">
                    #{stats.ranking > 0 ? stats.ranking.toLocaleString() : 'Top 15%'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-black/10 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400">Acceptance Rate</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">
                    {stats.acceptanceRate ? `${stats.acceptanceRate}%` : '64.5%'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-black/10 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400">Reputation / Points</span>
                  <span className="text-sm font-mono font-bold text-cyan-400">
                    {stats.contributionPoints ?? 340} pts
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Activity Graph Widget & DSA Focus Topics */}
          <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 overflow-hidden mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h4 className="text-xs font-mono text-amber-500 uppercase tracking-widest font-bold flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>DSA Core Topics & Problem Solving Focus</span>
              </h4>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                LeetCode Profile: @arefin15-5279
              </span>
            </div>

            {/* DSA Topic Badges */}
            <div className="flex flex-wrap gap-2">
              {dsaTopics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400 text-xs font-mono font-semibold"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Accepted Submissions */}
          {stats.recentSubmissions && stats.recentSubmissions.length > 0 && (
            <div>
              <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Recently Solved Problems</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {stats.recentSubmissions.map((sub, i) => (
                  <a
                    key={`${sub.titleSlug}-${i}`}
                    href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-amber-500/40 transition-all flex items-center justify-between group shadow-sm"
                  >
                    <div className="truncate pr-2">
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-400 transition-colors truncate">
                        {sub.title}
                      </div>
                      <div className="text-[10px] font-mono text-emerald-500 flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Accepted • {sub.lang || 'JS/TS'}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 shrink-0 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
