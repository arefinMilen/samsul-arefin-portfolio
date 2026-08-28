'use client';

import React from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiDart,
  SiPhp,
  SiCplusplus,
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiMysql,
  SiDjango,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiReactquery,
  SiRedux,
  SiZod,
  SiFramer,
  SiGsap,
  SiShadcnui,
  SiFlutter,
  SiGit,
  SiPostman,
  SiVercel,
  SiJest,
  SiDocker,
  SiNginx,
  SiGithubactions,
  SiAnthropic,
  SiGithub,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import {
  Sparkles,
  Cpu,
  Workflow,
  Terminal,
  Zap,
  Code2,
  Database,
  HardDrive,
  Server,
  Layers,
  ShieldCheck,
  Box,
  Send,
  Globe,
  GitBranch,
  FileCode,
  Code,
  Coffee,
  Smartphone,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import StackIcon from 'tech-stack-icons';

interface SkillIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className = 'w-4 h-4', size }) => {
  // Normalize string comparison
  const iconKey = name.toLowerCase().trim();

  // Custom Icon + Color Map
  switch (iconKey) {
    // AI & Workflows
    case 'sianthropic':
    case 'claude':
    case 'claude agent':
      return <StackIcon name="claude" className={className} />;
    case 'sparkles':
    case 'antigravity':
    case 'cursor':
    case 'antigravity & cursor ai':
    case 'cursor ai':
      return <StackIcon name="antigravity" className={className} />;
    case 'cpu':
    case 'mcp':
    case 'mcp tool calling':
      return <Cpu className={`${className} text-purple-400`} size={size} />;
    case 'workflow':
    case 'multi-llm':
    case 'multi-llm orchestration':
      return <Workflow className={`${className} text-emerald-400`} size={size} />;
    case 'terminal':
    case 'prompt':
    case 'context & prompt eng.':
      return <Terminal className={`${className} text-pink-400`} size={size} />;
    case 'zap':
    case 'agentic workflows':
      return <Zap className={`${className} text-yellow-400`} size={size} />;
    case 'code2':
    case 'function calling':
      return <Code2 className={`${className} text-blue-400`} size={size} />;

    // Languages
    case 'sijavascript':
    case 'javascript':
    case 'javascript (es6+)':
      return <SiJavascript className={`${className} text-[#F7DF1E]`} size={size} />;
    case 'sitypescript':
    case 'typescript':
      return <SiTypescript className={`${className} text-[#3178C6]`} size={size} />;
    case 'sinodedotjs':
    case 'node':
    case 'node.js':
      return <SiNodedotjs className={`${className} text-[#5FA04E]`} size={size} />;
    case 'sipython':
    case 'python':
      return <SiPython className={`${className} text-[#3776AB]`} size={size} />;
    case 'fajava':
    case 'java':
      return <FaJava className={`${className} text-[#ED8B00]`} size={size} />;
    case 'sidart':
    case 'dart':
      return <SiDart className={`${className} text-[#0175C2]`} size={size} />;
    case 'siphp':
    case 'php':
      return <SiPhp className={`${className} text-[#777BB4]`} size={size} />;
    case 'sicplusplus':
    case 'c / c++':
    case 'c++':
    case 'c':
      return <SiCplusplus className={`${className} text-[#00599C]`} size={size} />;

    // Database & Backend
    case 'simongodb':
    case 'mongodb':
      return <SiMongodb className={`${className} text-[#47A248]`} size={size} />;
    case 'sipostgresql':
    case 'postgresql':
      return <SiPostgresql className={`${className} text-[#4169E1]`} size={size} />;
    case 'siexpress':
    case 'express':
    case 'express.js':
      return <SiExpress className={`${className} text-slate-200`} size={size} />;
    case 'simysql':
    case 'mysql':
      return <SiMysql className={`${className} text-[#4479A1]`} size={size} />;
    case 'sidjango':
    case 'django':
    case 'django rest':
      return <SiDjango className={`${className} text-[#092E20] text-emerald-500`} size={size} />;

    // Frameworks & State
    case 'sinextdotjs':
    case 'next':
    case 'next.js':
    case 'next.js (app router)':
      return <SiNextdotjs className={`${className} text-white`} size={size} />;
    case 'sireact':
    case 'react':
    case 'react.js':
      return <SiReact className={`${className} text-[#61DAFB]`} size={size} />;
    case 'sitailwindcss':
    case 'tailwind':
    case 'tailwind css':
      return <SiTailwindcss className={`${className} text-[#06B6D4]`} size={size} />;
    case 'sireactquery':
    case 'tanstack query':
      return <SiReactquery className={`${className} text-[#FF4154]`} size={size} />;
    case 'siredux':
    case 'redux':
    case 'redux toolkit & zustand':
    case 'redux toolkit':
      return <SiRedux className={`${className} text-[#764ABC]`} size={size} />;
    case 'sizod':
    case 'zod':
    case 'zod & validation':
      return <SiZod className={`${className} text-[#3E67B1]`} size={size} />;
    case 'siframer':
    case 'framer':
    case 'framer motion':
      return <SiFramer className={`${className} text-[#0055FF]`} size={size} />;
    case 'sigsap':
    case 'sigreenstock':
    case 'gsap':
      return <SiGsap className={`${className} text-[#88CE02]`} size={size} />;
    case 'sishadcnui':
    case 'shadcn':
    case 'shadcn ui':
      return <SiShadcnui className={`${className} text-slate-100`} size={size} />;
    case 'siflutter':
    case 'flutter':
      return <SiFlutter className={`${className} text-[#02569B]`} size={size} />;

    // Tools & DevOps
    case 'sigit':
    case 'git':
    case 'git & github':
      return <SiGit className={`${className} text-[#F05032]`} size={size} />;
    case 'sigithub':
    case 'github':
      return <SiGithub className={`${className} text-white`} size={size} />;
    case 'sipostman':
    case 'postman':
      return <SiPostman className={`${className} text-[#FF6C37]`} size={size} />;
    case 'sivercel':
    case 'vercel':
      return <SiVercel className={`${className} text-white`} size={size} />;
    case 'sijest':
    case 'jest':
    case 'jest & supertest':
      return <SiJest className={`${className} text-[#C21325]`} size={size} />;
    case 'sidocker':
    case 'docker':
    case 'docker & nginx':
      return <SiDocker className={`${className} text-[#2496ED]`} size={size} />;
    case 'siningx':
    case 'nginx':
      return <SiNginx className={`${className} text-[#009639]`} size={size} />;
    case 'sigithubactions':
    case 'github actions':
    case 'github actions (ci/cd)':
      return <SiGithubactions className={`${className} text-[#2088FF]`} size={size} />;

    // Lucide Fallbacks
    case 'database':
      return <Database className={`${className} text-cyan-400`} size={size} />;
    case 'harddrive':
      return <HardDrive className={`${className} text-blue-400`} size={size} />;
    case 'server':
      return <Server className={`${className} text-emerald-400`} size={size} />;
    case 'layers':
      return <Layers className={`${className} text-purple-400`} size={size} />;
    case 'shieldcheck':
      return <ShieldCheck className={`${className} text-emerald-400`} size={size} />;
    case 'box':
      return <Box className={`${className} text-amber-400`} size={size} />;
    case 'send':
      return <Send className={`${className} text-orange-400`} size={size} />;
    case 'globe':
      return <Globe className={`${className} text-cyan-300`} size={size} />;
    case 'gitbranch':
      return <GitBranch className={`${className} text-orange-400`} size={size} />;
    case 'filecode':
      return <FileCode className={`${className} text-blue-400`} size={size} />;
    case 'code':
      return <Code className={`${className} text-yellow-400`} size={size} />;
    case 'coffee':
      return <Coffee className={`${className} text-amber-600`} size={size} />;
    case 'smartphone':
      return <Smartphone className={`${className} text-sky-400`} size={size} />;

    default:
      return <CheckCircle2 className={`${className} text-brand-cyan`} size={size} />;
  }
};
