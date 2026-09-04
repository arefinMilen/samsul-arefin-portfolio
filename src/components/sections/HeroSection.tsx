'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { personalDetails } from '@/data/portfolioData';
import { useTranslation } from '@/i18n/useTranslation';
import { ArrowRight, PhoneCall, Sparkles, Calendar } from 'lucide-react';

const rolesEn = [
  'SOFTWARE ENGINEER',
  'AGENTIC AI SPECIALIST',
  'FULL-STACK DEVELOPER',
];

const rolesBn = [
  'সফটওয়্যার ইঞ্জিনিয়ার',
  'এজেন্টিক এআই স্পেশালিস্ট',
  'ফুল-স্ট্যাক ডেভেলপার',
];

const TypewriterHeadline: React.FC<{ isBn: boolean }> = ({ isBn }) => {
  const roles = isBn ? rolesBn : rolesEn;
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const fullText = roles[roleIndex % roles.length];
    const typingSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && currentText === fullText) {
      const timeout = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex, roles]);

  return (
    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2] mb-6 min-h-[4rem] sm:min-h-[5rem]">
      {isBn ? 'আমি একজন ' : "I'M A "}
      <span className="text-gradient-cyan">
        {currentText}
      </span>
      <span className="inline-block w-1 h-7 sm:h-11 bg-brand-cyan ml-1.5 align-middle animate-pulse" />
    </h1>
  );
};

const AnimatedCounter: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const [count, setCount] = React.useState(0);
  const numericMatch = value.match(/(\d+)/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, '');

  React.useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutProgress * targetNumber));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [targetNumber]);

  return (
    <div className="bg-black/5 dark:bg-white/5 rounded-xl p-3 border border-black/10 dark:border-white/5 text-center hover:border-brand-cyan/40 transition-all">
      <div className="text-xl sm:text-2xl font-extrabold text-gradient-cyan">
        {count}{suffix}
      </div>
      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">{label}</div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const { t, isBn } = useTranslation();

  const statsData = [
    { value: '2+', label: t.hero.stats.experience },
    { value: '18+', label: t.hero.stats.projects },
    { value: '10+', label: t.hero.stats.charity },
    { value: '100%', label: t.hero.stats.codeQuality },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Typewriter Main Headline */}
            <TypewriterHeadline isBn={isBn} />

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl text-left sm:text-justify">
              {t.hero.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-10">
              <a
                href={personalDetails.appointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-brand-cyan to-cyan-400 text-dark-bg font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-4 h-4 text-dark-bg group-hover:rotate-12 transition-transform" />
                <span>{t.hero.bookMeeting}</span>
              </a>

              <a
                href="#work"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-card hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 border border-black/10 dark:border-white/10 group"
              >
                <span>{t.hero.exploreProjects}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`tel:${personalDetails.phone.replace(/[^0-9+]/g, '')}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-card hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 border border-black/10 dark:border-white/10"
              >
                <PhoneCall className="w-4 h-4 text-brand-cyan" />
                <span>{isBn ? 'কল করুন' : 'Call'}</span>
              </a>
            </div>

            {/* Floating Tech Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t border-black/10 dark:border-white/10 w-full">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">{isBn ? 'মূল টেকনোলজি:' : 'CORE STACK:'}</span>
              {['Next.js App Router', 'TypeScript', 'Claude Agent', 'PostgreSQL', 'Redux Toolkit', 'TanStack Query', 'Framer Motion'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] sm:text-xs font-mono text-cyan-700 dark:text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Hero Profile Card & Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Card Container */}
              <div className="relative glass-panel rounded-3xl p-5 sm:p-6 border border-black/10 dark:border-white/10 shadow-xl flex flex-col items-center text-center">
                {/* Profile Image */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-brand-cyan/50 shadow-xl mb-4 sm:mb-5 group">
                  <Image
                    src={personalDetails.avatar}
                    alt={t.hero.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-dark-bg/80 via-transparent to-transparent opacity-60" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">{t.hero.name}</h3>
                <p className="text-xs sm:text-sm text-brand-cyan font-mono mb-4">{t.hero.role}</p>

                {/* Animated Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full pt-4 border-t border-black/10 dark:border-white/10">
                  {statsData.map((stat) => (
                    <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
