import { en, type Translations } from './en';
import { tr } from './tr';
import { useSettingsStore } from '@/store/settingsStore';
import type { Language } from '@/types';

export const translations: Record<Language, Translations> = { en, tr };

export const useT = (): Translations => translations[useSettingsStore((s) => s.language)];
