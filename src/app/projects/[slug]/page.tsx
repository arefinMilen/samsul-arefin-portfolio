import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsData } from '@/data/portfolioData';
import { ExternalLink, Github, ArrowLeft, CheckCircle2, Layers, Sparkles, Cpu, ShieldCheck, Lock, Globe } from 'lucide-react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const baseUrl = 'https://samsul-arefin.dev';
  const pageUrl = `${baseUrl}/projects/${project.slug}`;

  return {
    title: `${project.title} - Case Study`,
    description: project.description,
    keywords: [project.title, project.categoryLabel, ...project.tags, 'Case Study', 'Samsul Arefin'],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.title} - Case Study | Samsul Arefin`,
      description: project.description,
      url: pageUrl,
      type: 'article',
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Case Study`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back Button */}
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors mb-8 bg-white/5 border border-white/10 px-4 py-2 rounded-full glass-card"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Works</span>
      </Link>

      {/* Main Container */}
      <div className="glass-panel rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl space-y-10">
        
        {/* Header Metadata */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {project.isProduction && (
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Live in Production</span>
              </span>
            )}
            <span className="px-3.5 py-1 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan font-mono text-xs">
              {project.categoryLabel}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-purple-300 font-mono text-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Featured Project
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            {project.title}
          </h1>
          <p className="text-lg text-slate-300 font-medium">
            {project.subtitle}
          </p>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-80 sm:h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* Metrics Grid */}
        {project.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-white/10 py-6">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                <div className="text-xl font-extrabold text-gradient-cyan">{metric.value}</div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Deep Overview */}
        <div>
          <h3 className="text-xs font-mono tracking-widest text-brand-cyan uppercase mb-3">
            PROJECT CASE STUDY & OVERVIEW
          </h3>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Challenges Solved */}
        {project.challengesSolved && (
          <div className="bg-gradient-to-r from-brand-cyan/10 to-brand-violet/10 p-6 rounded-2xl border border-brand-cyan/30">
            <h4 className="text-sm font-mono text-cyan-300 font-bold mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-cyan" />
              <span>Technical Challenges & Architectural Solutions</span>
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {project.challengesSolved}
            </p>
          </div>
        )}

        {/* Key Features */}
        {project.keyFeatures && (
          <div>
            <h3 className="text-xs font-mono tracking-widest text-brand-cyan uppercase mb-4">
              CORE FUNCTIONALITIES & FEATURES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Breakdown */}
        {project.techStackDetailed && (
          <div>
            <h3 className="text-xs font-mono tracking-widest text-brand-cyan uppercase mb-4">
              TECHNOLOGY STACK BREAKDOWN
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.techStackDetailed.map((group) => (
                <div key={group.category} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                  <div className="text-xs font-mono text-cyan-300 font-bold mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>{group.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="px-2.5 py-1 rounded bg-black/50 text-xs font-mono text-slate-200 border border-white/5">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-white/10">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-3.5 rounded-full font-extrabold text-sm flex items-center gap-2 transition-all shadow-xl ${
                project.isProduction
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-dark-bg hover:from-emerald-400 hover:to-teal-300 shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                  : 'bg-gradient-to-r from-brand-cyan to-cyan-400 text-dark-bg hover:bg-cyan-300 shadow-cyan-500/25'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{project.isProduction ? 'Visit Live Production Application' : 'Visit Live Website'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.isPrivateRepo ? (
            <div
              className="px-6 py-3.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold text-xs flex items-center gap-2 cursor-help"
              title="Source code for this production application is maintained in a private commercial repository."
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Commercial Production Codebase (Private Repository)</span>
            </div>
          ) : (
            project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full glass-card hover:bg-white/10 text-white font-semibold text-sm flex items-center gap-2 border border-white/10"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )
          )}
        </div>

      </div>
    </div>
  );
}
