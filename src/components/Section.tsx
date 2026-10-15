import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { radius, spacing } from '@/theme/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  const styles = useThemedStyles((c) => ({
    wrapper: { gap: spacing.sm },
    title: { color: c.textMuted, fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginLeft: spacing.xs },
    card: { backgroundColor: c.surface, borderRadius: radius.md, borderWidth: 1, borderColor: c.border, padding: spacing.md, gap: spacing.md },
  }));
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

export function SettingRow({ label, children }: { label: string; children: ReactNode }) {
  const styles = useThemedStyles((c) => ({
    label: { color: c.text, fontSize: 16, fontWeight: '600', marginBottom: spacing.sm },
  }));
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

export function InlineRow({ label, children }: { label: string; children: ReactNode }) {
  const styles = useThemedStyles((c) => ({
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    label: { color: c.text, fontSize: 16, fontWeight: '600' },
  }));
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}
