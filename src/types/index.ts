export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];

export type GameMode = 'ai' | 'local';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameStatus = 'playing' | 'won' | 'draw';
export type Outcome = 'win' | 'loss' | 'draw';

export type ThemeMode = 'system' | 'light' | 'dark';
export type Language = 'tr' | 'en';

export interface GameState {
  board: Board;
  current: Player;
  status: GameStatus;
  winner: Player | null;
  winningLine: number[] | null;
}

export interface Score {
  X: number;
  O: number;
  draws: number;
}

export interface Settings {
  mode: GameMode;
  difficulty: Difficulty;
  theme: ThemeMode;
  language: Language;
  animations: boolean;
  haptics: boolean;
}

export interface Stats {
  played: number;
  wins: number;
  losses: number;
  draws: number;
  streak: number;
  maxStreak: number;
}

/** Statistics are tracked per difficulty (vs AI only), like Wordle tracks per language. */
export type StatsKey = Difficulty;
export type StatsMap = Record<StatsKey, Stats>;
