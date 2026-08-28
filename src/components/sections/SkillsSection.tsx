'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setActiveSkillCategory } from '@/store/uiSlice';
import { skillsCategoriesData } from '@/data/portfolioData';
import { SkillIcon } from '@/components/common/SkillIcon';
import { useTranslation } from '@/i18n/useTranslation';
import { Sparkles, Star } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeSkillCategory } = useAppSelector((state) => state.ui);
  const { t, isBn } = useTranslation();

  const categoryTabs = [
    { id: 'all', label: t.skills.categories.all },
    { id: 'ai', label: t.skills.categories.ai },
    { id: 'languages', label: t.skills.categories.languages },
    { id: 'dbms', label: t.skills.categories.dbms },
    { id: 'frameworks', label: t.skills.categories.frameworks },
    { id: 'tools', label: t.skills.categories.tools },
  ];

  const displayedCategories = skillsCategoriesData.filter(
    (cat) => activeSkillCategory === 'all' || cat.id === activeSkillCategory
  );

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full border border-brand-cyan/20">
            {isBn ? 'প্রযুক্তিগত দক্ষতা' : 'TECHNICAL EXPERTISE'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            {t.skills.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categoryTabs.map((tab) => {
            const isActive = activeSkillCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => dispatch(setActiveSkillCategory(tab.id))}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all border ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-violet text-white border-transparent shadow-lg shadow-cyan-500/20'
                    : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-black/20 dark:hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Skills Display Categories */}
        <div className="space-y-12">
          {displayedCategories.map((category) => {
            const categoryTitleTrans =
              t.skills.categories[category.id as keyof typeof t.skills.categories] || category.title;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-xl"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-b border-black/10 dark:border-white/10 pb-4">
                  <Sparkles className="w-5 h-5 text-brand-cyan" />
                  <span>{categoryTitleTrans}</span>
                </h3>

                {/* Proficient Sub-Section */}
                {category.proficient.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs font-mono text-cyan-600 dark:text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-cyan-500 text-cyan-500" />
                      <span>{isBn ? 'দক্ষ প্রযুক্তি' : 'Proficient Stack'}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {category.proficient.map((skill) => (
                        <div
                          key={skill.name}
                          className="px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-brand-cyan/40 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-md hover:border-brand-cyan hover:scale-[1.02] transition-all"
                        >
                          <SkillIcon name={skill.name} className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" />
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Familiar Sub-Section */}
                {category.familiar.length > 0 && (
                  <div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 font-semibold">
                      {isBn ? 'পরিচিত প্রযুক্তি' : 'Familiar Technologies'}
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {category.familiar.map((skill) => (
                        <div
                          key={skill.name}
                          className="px-3.5 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-mono flex items-center gap-2 hover:border-brand-violet/40 transition-colors"
                        >
                          <SkillIcon name={skill.icon} className="w-3.5 h-3.5 shrink-0" />
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
