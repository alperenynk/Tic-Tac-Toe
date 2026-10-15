import { Text, View } from 'react-native';
import { useT } from '@/i18n';
import { radius, spacing } from '@/theme/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { useTheme } from '@/theme/ThemeContext';
import type { Player, Score } from '@/types';

interface Props {
  score: Score;
  labels: Record<Player, string>;
  active: Player | null;
}

export function ScoreBoard({ score, labels, active }: Props) {
  const t = useT();
  const { colors } = useTheme();
  const styles = useThemedStyles((c) => ({
    row: { flexDirection: 'row', gap: spacing.sm, width: '100%' },
    item: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm, borderRadius: radius.md, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border },
    label: { color: c.textMuted, fontSize: 12, fontWeight: '600' },
    value: { fontSize: 26, fontWeight: '800' },
  }));

  const items = [
    { key: 'X', label: labels.X, value: score.X, color: colors.playerX, isActive: active === 'X' },
    { key: 'draws', label: t.draws, value: score.draws, color: colors.textMuted, isActive: false },
    { key: 'O', label: labels.O, value: score.O, color: colors.playerO, isActive: active === 'O' },
  ];

  return (
    <View style={styles.row}>
      {items.map((item) => (
        <View key={item.key} style={[styles.item, item.isActive && { borderColor: item.color, borderWidth: 2 }]}>
          <Text style={styles.label} numberOfLines={1}>
            {item.label}
          </Text>
          <Text style={[styles.value, { color: item.color }]}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}
