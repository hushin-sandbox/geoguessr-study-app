import { create } from 'zustand';
import { AppState } from '../types';

const STORAGE_KEY = 'geoguessr-study-notes';

interface UserNotes {
  countries: Record<string, string>;
  languages: Record<string, string>;
}

const loadUserNotes = (): UserNotes => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading user notes:', error);
  }
  return { countries: {}, languages: {} };
};

const saveUserNotes = (notes: UserNotes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving user notes:', error);
  }
};

export const useAppStore = create<AppState>((set, get) => ({
  selectedCountry: null,
  selectedLanguage: null,
  isLanguagePanelOpen: false,
  userNotes: loadUserNotes(),

  selectCountry: (countryId: string) => {
    set({
      selectedCountry: countryId,
      selectedLanguage: null,
      isLanguagePanelOpen: false
    });
  },

  selectLanguage: (languageId: string) => {
    set({
      selectedLanguage: languageId,
      isLanguagePanelOpen: true
    });
  },

  toggleLanguagePanel: () => {
    set((state) => ({
      isLanguagePanelOpen: !state.isLanguagePanelOpen
    }));
  },

  updateCountryNote: (countryId: string, note: string) => {
    const currentNotes = get().userNotes;
    const newNotes = {
      ...currentNotes,
      countries: {
        ...currentNotes.countries,
        [countryId]: note
      }
    };
    set({ userNotes: newNotes });
    saveUserNotes(newNotes);
  },

  updateLanguageNote: (languageId: string, note: string) => {
    const currentNotes = get().userNotes;
    const newNotes = {
      ...currentNotes,
      languages: {
        ...currentNotes.languages,
        [languageId]: note
      }
    };
    set({ userNotes: newNotes });
    saveUserNotes(newNotes);
  }
}));