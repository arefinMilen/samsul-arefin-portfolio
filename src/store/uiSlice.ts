import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'en' | 'bn';
export type Theme = 'dark' | 'light';

interface UIState {
  language: Language;
  theme: Theme;
  activeSection: string;
  activeSkillCategory: string;
  activeProjectCategory: string;
  isMobileMenuOpen: boolean;
  soundEnabled: boolean;
  searchQuery: string;
}

const initialState: UIState = {
  language: 'en',
  theme: 'dark',
  activeSection: 'home',
  activeSkillCategory: 'all',
  activeProjectCategory: 'all',
  isMobileMenuOpen: false,
  soundEnabled: true,
  searchQuery: '',
};

const applyThemeToDocument = (theme: Theme) => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('portfolio_theme', theme);
    } catch {
      // Ignore write errors
    }
  }
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      applyThemeToDocument(action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      applyThemeToDocument(state.theme);
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('portfolio_lang', action.payload);
        } catch {
          // Ignore write errors
        }
      }
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setActiveSkillCategory: (state, action: PayloadAction<string>) => {
      state.activeSkillCategory = action.payload;
    },
    setActiveProjectCategory: (state, action: PayloadAction<string>) => {
      state.activeProjectCategory = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setLanguage,
  setActiveSection,
  setActiveSkillCategory,
  setActiveProjectCategory,
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleSound,
  setSearchQuery,
} = uiSlice.actions;

export default uiSlice.reducer;
