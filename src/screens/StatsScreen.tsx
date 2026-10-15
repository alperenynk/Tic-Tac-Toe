import { useRouter } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Section } from '@/components/Section';
import { StatsCard } from '@/components/StatsCard';
import { DIFFICULTIES } from '@/game/constants';
import { useT } from '@/i18n';
import { useStatsStore } from '@/store/statsStore';
import { spacing } from '@/theme/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';

export default function StatsScreen() {
  const t = useT();
  const router = useRouter();
  const stats = useStatsStore((s) => s.stats);
  const styles = useThemedStyles((c) => ({
    content: { padding: spacing.lg, gap: spacing.lg },
    note: { color: c.textMuted, fontSize: 13, textAlign: 'center' },
  }));

  return (
    <Screen>
      <ScreenHeader title={t.statistics} actions={[{ icon: '✕', label: t.close, onPress: () => router.back() }]} />
      <ScrollView contentContainerStyle={styles.content}>
        {DIFFICULTIES.map((difficulty) => (
          <Section key={difficulty} title={t.modes.ai}>
            <StatsCard title={t.difficulties[difficulty]} stats={stats[difficulty]} />
          </Section>
        ))}
        <Text style={styles.note}>{t.statsNote}</Text>
      </ScrollView>
    </Screen>
  );
}
