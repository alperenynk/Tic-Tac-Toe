import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { darkPalette, lightPalette, type Palette } from './theme';
import { useSettingsStore } from '@/store/settingsStore';

interface ThemeValue {
  colors: Palette;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeValue>({ colors: darkPalette, isDark: true });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mode = useSettingsStore((s) => s.theme);
  const system = useColorScheme();

  const value = useMemo<ThemeValue>(() => {
    const isDark = mode === 'system' ? system !== 'light' : mode === 'dark';
    return { isDark, colors: isDark ? darkPalette : lightPalette };
  }, [mode, system]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
