import type { Difficulty, GameMode, Language, Player, ThemeMode } from '../types';

export const BOARD_SIZE = 3;
export const CELL_COUNT = BOARD_SIZE * BOARD_SIZE;

export const HUMAN_PLAYER: Player = 'X';
export const AI_PLAYER: Player = 'O';
export const AI_DELAY_MS = 450;

// Single source of truth for every option list (used by the settings UI and the stats screen).
export const MODES: readonly GameMode[] = ['ai', 'local'];
export const DIFFICULTIES: readonly Difficulty[] = ['easy', 'medium', 'hard'];
export const THEMES: readonly ThemeMode[] = ['system', 'light', 'dark'];
export const LANGUAGES: readonly Language[] = ['tr', 'en'];
