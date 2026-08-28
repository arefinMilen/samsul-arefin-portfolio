'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { closeProjectModal } from '@/store/uiSlice';
import { useTranslation } from '@/i18n/useTranslation';
import { X, ExternalLink, Github, CheckCircle2, Layers, ArrowUpRight, Lock, Globe, Sparkles } from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedProject, isProjectModalOpen } = useAppSelector((state) => state.ui);
  const { t, isBn } = useTranslation();

  if (!isProjectModalOpen || !selectedProject) return null;

  const itemTrans = t.projects.items[selectedProject.id as keyof typeof t.projects.items];
  const title = itemTrans?.title || selectedProject.title;
  const subtitle = itemTrans?.subtitle || selectedProject.subtitle;
  const longDescription = itemTrans?.longDescription || selectedProject.longDescription;
  const categoryLabel = itemTrans?.categoryLabel || selectedProject.categoryLabel;
  const keyFeatures = itemTrans?.keyFeatures || selectedProject.keyFeatures;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 border border-black/15 dark:border-white/15 shadow-2xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-dark-bg/95">
        
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeProjectModal())}
          className="absolute top-6 right-6 p-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 mb-8 group">
          <Image
            src={selectedProject.image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 dark:from-dark-bg via-slate-950/40 dark:via-dark-bg/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {selectedProject.isProduction && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 font-mono text-xs font-bold shadow-lg shadow-emerald-500/20 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{t.projects.productionBadge || 'Live in Production'}</span>
                </span>
              )}
              <span className="inline-block px-3 py-1 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan font-mono text-xs backdrop-blur-md">
                {categoryLabel}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-cyan-200 mt-1 font-medium">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-8 text-slate-700 dark:text-slate-300">
          
          {/* Long Description */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-brand-cyan uppercase mb-2">
              {isBn ? 'সারসংক্ষেপ' : 'OVERVIEW'}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed">
              {longDescription}
            </p>
          </div>

          {/* Key Features */}
          {keyFeatures && (
            <div>
              <h4 className="text-xs font-mono tracking-widest text-brand-cyan uppercase mb-3">
                {t.projects.keyFeatures}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5 text-xs text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Breakdown */}
          {selectedProject.techStackDetailed && (
            <div>
              <h4 className="text-xs font-mono tracking-widest text-brand-cyan uppercase mb-3">
                {t.projects.techStack}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedProject.techStackDetailed.map((stackGroup) => (
                  <div key={stackGroup.category} className="bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-black/5 dark:border-white/5">
                    <div className="text-xs font-mono text-cyan-700 dark:text-cyan-300 font-bold mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{stackGroup.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {stackGroup.items.map((item) => (
                        <span key={item} className="px-2 py-0.5 rounded bg-black/10 dark:bg-black/40 text-[11px] font-mono text-slate-800 dark:text-slate-300 border border-black/5 dark:border-white/5">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Links Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/10 dark:border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${
                    selectedProject.isProduction
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-dark-bg hover:from-emerald-400 hover:to-teal-300 shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                      : 'bg-brand-cyan text-dark-bg hover:bg-cyan-300 shadow-cyan-500/20'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>{selectedProject.isProduction ? (t.projects.visitLiveApp || 'Visit Live Application') : t.projects.liveDemo}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {selectedProject.isPrivateRepo ? (
                <div
                  className="px-5 py-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 font-semibold text-xs flex items-center gap-2 cursor-help"
                  title={t.projects.privateRepoTooltip}
                >
                  <Lock className="w-4 h-4 text-amber-500" />
                  <span>{t.projects.privateRepoNotice}</span>
                </div>
              ) : (
                selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full glass-card hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-white font-semibold text-sm flex items-center gap-2 border border-black/10 dark:border-white/10"
                  >
                    <Github className="w-4 h-4" />
                    <span>{t.projects.viewCode}</span>
                  </a>
                )
              )}
            </div>

            {/* Dynamic Route Link */}
            <Link
              href={`/projects/${selectedProject.slug}`}
              onClick={() => dispatch(closeProjectModal())}
              className="inline-flex items-center gap-1 text-xs font-mono text-cyan-700 dark:text-cyan-300 hover:text-black dark:hover:text-white transition-colors"
            >
              <span>{isBn ? 'সম্পূর্ণ কেস স্টাডি পেজ' : 'Full Case Study Page'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
