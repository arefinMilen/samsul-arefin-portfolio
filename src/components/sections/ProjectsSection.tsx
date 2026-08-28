'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setActiveProjectCategory, openProjectModal, setSearchQuery } from '@/store/uiSlice';
import { projectsData } from '@/data/portfolioData';
import { useTranslation } from '@/i18n/useTranslation';
import { ExternalLink, Eye, Search, ArrowRight, Lock, Globe, Sparkles } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeProjectCategory, searchQuery } = useAppSelector((state) => state.ui);
  const { t, isBn } = useTranslation();

  const categories = [
    { id: 'all', label: t.projects.all },
    { id: 'production', label: t.projects.productionFilter },
    { id: 'fullstack', label: t.projects.fullstack },
    { id: 'frontend', label: t.projects.frontend },
    { id: 'tool', label: t.projects.tool },
  ];

  const filteredProjects = projectsData.filter((project) => {
    const itemTrans = t.projects.items[project.id as keyof typeof t.projects.items];
    const title = itemTrans?.title || project.title;
    const description = itemTrans?.description || project.description;

    const matchesCategory =
      activeProjectCategory === 'all'
        ? true
        : activeProjectCategory === 'production'
        ? project.isProduction
        : project.category === activeProjectCategory;

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="work" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full border border-brand-cyan/20">
            {isBn ? 'প্রজেক্ট পোর্টফোলিও' : 'PROJECT PORTFOLIO'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            {t.projects.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filter Bar & Search Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl glass-panel border border-black/10 dark:border-white/10 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = activeProjectCategory === cat.id;
              const isProdCat = cat.id === 'production';
              return (
                <button
                  key={cat.id}
                  onClick={() => dispatch(setActiveProjectCategory(cat.id))}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? isProdCat
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-dark-bg font-extrabold shadow-lg shadow-emerald-500/25'
                        : 'bg-gradient-to-r from-brand-cyan to-cyan-400 text-dark-bg shadow-lg shadow-cyan-500/20'
                      : isProdCat
                      ? 'text-emerald-500 dark:text-emerald-400 hover:bg-emerald-500/10 font-bold border border-emerald-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder={isBn ? 'প্রজেক্ট খুঁজুন...' : 'Search projects...'}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const itemTrans = t.projects.items[project.id as keyof typeof t.projects.items];
            const title = itemTrans?.title || project.title;
            const description = itemTrans?.description || project.description;
            const categoryLabel = itemTrans?.categoryLabel || project.categoryLabel;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-card rounded-3xl overflow-hidden flex flex-col justify-between group border transition-all shadow-xl ${
                  project.isProduction
                    ? 'border-emerald-500/30 dark:border-emerald-500/30 hover:border-emerald-400 shadow-emerald-500/5'
                    : 'border-black/10 dark:border-white/10 hover:border-brand-cyan/40'
                }`}
              >
                <div>
                  {/* Image Container */}
                  <div className="relative w-full h-52 overflow-hidden bg-black/10 dark:bg-slate-900">
                    <Image
                      src={project.image}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-dark-bg via-transparent to-transparent opacity-80" />

                    {/* Production Indicator or Category Badge */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                      {project.isProduction && (
                        <span className="px-3 py-1 rounded-full bg-slate-950/90 dark:bg-dark-bg/90 backdrop-blur-md border border-emerald-500/50 text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span>{t.projects.productionBadge || 'Live in Production'}</span>
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 dark:bg-dark-bg/80 backdrop-blur-md border border-brand-cyan/30 text-brand-cyan font-mono text-[10px]">
                        {categoryLabel}
                      </span>
                    </div>

                    {/* Quick Action overlay button */}
                    <button
                      onClick={() => dispatch(openProjectModal(project))}
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/60 dark:bg-dark-bg/80 backdrop-blur-md border border-black/10 dark:border-white/10 text-slate-200 dark:text-slate-300 hover:text-brand-cyan transition-colors shadow-lg"
                      aria-label="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-cyan transition-colors">
                      {title}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                      {description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] font-mono text-slate-600 dark:text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                  <button
                    onClick={() => dispatch(openProjectModal(project))}
                    className="text-xs font-semibold text-brand-cyan hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>{t.projects.viewDetails}</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Live URL Button with extra focus for production */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          project.isProduction
                            ? 'bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-dark-bg border border-emerald-500/40 shadow-md shadow-emerald-500/10'
                            : 'bg-black/5 dark:bg-white/5 hover:bg-brand-cyan hover:text-dark-bg text-slate-700 dark:text-slate-300 border border-black/10 dark:border-white/10'
                        }`}
                        title={t.projects.visitLiveApp || t.projects.liveDemo}
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}

                    {/* Private Repo Indicator or GitHub Link */}
                    {project.isPrivateRepo ? (
                      <span
                        className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400 text-[11px] font-mono flex items-center gap-1 cursor-help"
                        title={t.projects.privateRepoTooltip}
                      >
                        <Lock className="w-3 h-3" />
                        <span className="hidden sm:inline">{t.projects.privateRepo}</span>
                      </span>
                    ) : (
                      project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 transition-all border border-black/10 dark:border-white/10"
                          title={t.projects.viewCode}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )
                    )}

                    <Link
                      href={`/projects/${project.slug}`}
                      className="p-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 transition-all border border-black/10 dark:border-white/10"
                      title={isBn ? 'কেস স্টাডি পেজ' : 'Case Study Page'}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
