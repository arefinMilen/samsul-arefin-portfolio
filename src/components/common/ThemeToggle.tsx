'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleTheme, setTheme, Theme, getBDTimeTheme } from '@/store/uiSlice';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'navbar' | 'mobile';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'navbar',
}) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('portfolio_theme') as Theme | null;
        if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
          if (savedTheme !== theme) {
            dispatch(setTheme(savedTheme));
          }
        } else {
          const defaultTheme = getBDTimeTheme();
          if (defaultTheme !== theme) {
            dispatch(setTheme(defaultTheme));
          } else {
            // Sync HTML class on mount
            const root = document.documentElement;
            if (theme === 'dark') {
              root.classList.add('dark');
              root.classList.remove('light');
            } else {
              root.classList.add('light');
              root.classList.remove('dark');
            }
          }
        }
      } catch {
        // Ignore read errors
      }
    }
  }, [dispatch, theme]);

  const isDark = mounted ? theme === 'dark' : true;

  if (variant === 'mobile') {
    return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
          {isDark ? <Moon className="w-4 h-4 text-white" /> : <Sun className="w-4 h-4 text-black" />}
          <span>Theme / থিম</span>
        </div>
        <div className="flex items-center p-1 bg-white dark:bg-black rounded-full border border-black/20 dark:border-white/20 shadow-md">
          <button
            onClick={() => dispatch(setTheme('dark'))}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
              isDark
                ? 'bg-white text-black shadow-md'
                : 'text-slate-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => dispatch(setTheme('light'))}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
              !isDark
                ? 'bg-black text-white shadow-md'
                : 'text-slate-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Light
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`relative flex items-center p-1.5 rounded-full transition-all duration-300 shadow-md ${
        isDark
          ? 'bg-black text-white border border-white/20 hover:border-white/40 shadow-white/5'
          : 'bg-white text-black border border-black/20 hover:border-black/40 shadow-black/5'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      <div className="flex items-center gap-1.5 px-1.5">
        <div className={`p-1 rounded-full transition-transform duration-300 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
          {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </div>
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider pr-1">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </div>
    </button>
  );
};
