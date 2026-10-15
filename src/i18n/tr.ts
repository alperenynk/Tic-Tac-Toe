import type { Translations } from './en';

export const tr: Translations = {
  appName: 'XOX',
  you: 'Sen',
  ai: 'Yapay Zekâ',
  player1: 'Oyuncu X',
  player2: 'Oyuncu O',
  draws: 'Beraberlik',

  yourTurn: 'Sıra sende',
  aiThinking: 'Yapay zekâ düşünüyor…',
  turnOf: (name) => `Sıra ${name} oyuncusunda`,
  winnerIs: (name) => `${name} kazandı! 🎉`,
  youWin: 'Kazandın! 🎉',
  youLose: 'Bu turu yapay zekâ aldı',
  draw: 'Berabere',

  nextRound: 'Sonraki tur',
  resetScore: 'Skoru sıfırla',

  settings: 'Ayarlar',
  statistics: 'İstatistikler',
  close: 'Kapat',
  gameSection: 'Oyun',
  appearanceSection: 'Görünüm',
  feedbackSection: 'Geri bildirim',
  mode: 'Mod',
  difficulty: 'Zorluk',
  theme: 'Tema',
  language: 'Dil',
  animations: 'Animasyonlar',
  haptics: 'Titreşim geri bildirimi',
  resetStats: 'İstatistikleri sıfırla',
  rulesNote: 'Mod veya zorluk değişince yeni bir maç başlar.',

  modes: { ai: 'Yapay zekâya karşı', local: '2 Oyuncu' },
  difficulties: { easy: 'Kolay', medium: 'Orta', hard: 'Zor' },
  themes: { system: 'Sistem', light: 'Açık', dark: 'Koyu' },
  languages: { tr: 'Türkçe', en: 'English' },

  played: 'Oynanan',
  wins: 'Galibiyet',
  losses: 'Mağlubiyet',
  winRate: 'Kazanma oranı',
  streak: 'Seri',
  bestStreak: 'En iyi',
  statsNote: 'Yalnızca yapay zekâya karşı oynanan oyunlar sayılır.',

  cellLabel: (row, col, value) => `${row}. satır, ${col}. sütun, ${value ?? 'boş'}`,
};
