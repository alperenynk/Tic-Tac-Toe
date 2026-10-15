import { createPersistedStore } from './createPersistedStore';
import type { Language, Settings } from '@/types';

const detectLanguage = (): Language => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase().startsWith('tr') ? 'tr' : 'en';
  } catch {
    return 'en';
  }
};

export const DEFAULT_SETTINGS: Settings = {
  mode: 'ai',
  difficulty: 'medium',
  theme: 'system',
  language: detectLanguage(),
  animations: true,
  haptics: true,
};

interface SettingsState extends Settings {
  /** One generic setter instead of one setter per setting. */
  update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

export const useSettingsStore = createPersistedStore<SettingsState>('settings', (set) => ({
  ...DEFAULT_SETTINGS,
  update: (key, value) => set({ [key]: value } as Pick<Settings, typeof key>),
}));
