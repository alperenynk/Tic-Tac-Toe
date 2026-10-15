import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeContext';

export function Screen({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  return (
    <LinearGradient colors={[colors.backgroundTop, colors.backgroundBottom]} style={styles.fill}>
      <SafeAreaView style={styles.fill}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });
