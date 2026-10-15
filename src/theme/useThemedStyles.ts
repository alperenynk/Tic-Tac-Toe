import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import type { Palette } from './theme';

type Styles = Record<string, object>;

/** `const styles = useThemedStyles((c) => ({ box: { backgroundColor: c.surface } }))` */
export function useThemedStyles<T extends StyleSheet.NamedStyles<T> | Styles>(
  factory: (colors: Palette) => T,
): T {
  const { colors } = useTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => StyleSheet.create(factory(colors)) as T, [colors]);
}
