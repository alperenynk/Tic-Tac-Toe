export interface Palette {
  backgroundTop: string;
  backgroundBottom: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryText: string;
  playerX: string;
  playerO: string;
  winHighlight: string;
  danger: string;
}

export const darkPalette: Palette = {
  backgroundTop: '#141830',
  backgroundBottom: '#0A0C18',
  surface: '#1C2140',
  surfaceAlt: '#262C52',
  border: '#303762',
  text: '#F4F5FB',
  textMuted: '#9AA0C3',
  primary: '#6C7BFF',
  primaryText: '#FFFFFF',
  playerX: '#FF6B6B',
  playerO: '#4ECDC4',
  winHighlight: 'rgba(108,123,255,0.28)',
  danger: '#FF5C7A',
};

export const lightPalette: Palette = {
  backgroundTop: '#F6F7FF',
  backgroundBottom: '#E4E8FB',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF0FC',
  border: '#D5DAF2',
  text: '#161A33',
  textMuted: '#6A7096',
  primary: '#4F5DF0',
  primaryText: '#FFFFFF',
  playerX: '#F0485A',
  playerO: '#119C94',
  winHighlight: 'rgba(79,93,240,0.18)',
  danger: '#D92D4F',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const radius = { sm: 10, md: 16, lg: 24, pill: 999 } as const;
