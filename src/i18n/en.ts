import type { Difficulty, GameMode, Language, ThemeMode } from '@/types';

export const en = {
  appName: 'Tic Tac Toe',
  you: 'You',
  ai: 'AI',
  player1: 'Player X',
  player2: 'Player O',
  draws: 'Draws',

  yourTurn: 'Your turn',
  aiThinking: 'AI is thinking…',
  turnOf: (name: string) => `${name}'s turn`,
  winnerIs: (name: string) => `${name} wins! 🎉`,
  youWin: 'You win! 🎉',
  youLose: 'AI wins this one',
  draw: "It's a draw",

  nextRound: 'Next round',
  resetScore: 'Reset score',

  settings: 'Settings',
  statistics: 'Statistics',
  close: 'Close',
  gameSection: 'Game',
  appearanceSection: 'Appearance',
  feedbackSection: 'Feedback',
  mode: 'Mode',
  difficulty: 'Difficulty',
  theme: 'Theme',
  language: 'Language',
  animations: 'Animations',
  haptics: 'Haptic feedback',
  resetStats: 'Reset statistics',
  rulesNote: 'Changing mode or difficulty starts a new match.',

  modes: { ai: 'Vs AI', local: '2 Players' } satisfies Record<GameMode, string>,
  difficulties: { easy: 'Easy', medium: 'Medium', hard: 'Hard' } satisfies Record<Difficulty, string>,
  themes: { system: 'System', light: 'Light', dark: 'Dark' } satisfies Record<ThemeMode, string>,
  languages: { tr: 'Türkçe', en: 'English' } satisfies Record<Language, string>,

  played: 'Played',
  wins: 'Wins',
  losses: 'Losses',
  winRate: 'Win rate',
  streak: 'Streak',
  bestStreak: 'Best',
  statsNote: 'Only games against the AI are counted.',

  cellLabel: (row: number, col: number, value: string | null) =>
    `Row ${row}, column ${col}, ${value ?? 'empty'}`,
};

export type Translations = typeof en;
