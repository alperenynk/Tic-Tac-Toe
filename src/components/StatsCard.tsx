import { Text, View } from 'react-native';
import { getWinRate } from '@/game/statistics';
import { useT } from '@/i18n';
import { spacing } from '@/theme/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { formatPercent } from '@/utils/format';
import type { Stats } from '@/types';

export function StatsCard({ title, stats }: { title: string; stats: Stats }) {
  const t = useT();
  const styles = useThemedStyles((c) => ({
    title: { color: c.text, fontSize: 18, fontWeight: '800' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: spacing.md },
    cell: { width: '33.33%', alignItems: 'center' },
    value: { color: c.text, fontSize: 22, fontWeight: '800' },
    label: { color: c.textMuted, fontSize: 12, fontWeight: '600' },
  }));

  const items = [
    { label: t.played, value: stats.played },
    { label: t.wins, value: stats.wins },
    { label: t.losses, value: stats.losses },
    { label: t.draws, value: stats.draws },
    { label: t.winRate, value: formatPercent(getWinRate(stats)) },
    { label: `${t.streak} / ${t.bestStreak}`, value: `${stats.streak} / ${stats.maxStreak}` },
  ];

  return (
    <View style={{ gap: spacing.md }}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.label} style={styles.cell}>
            <Text style={styles.value}>{item.value}</Text>
            <Text style={styles.label} numberOfLines={1}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
