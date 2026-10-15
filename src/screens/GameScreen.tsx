import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Board } from '@/components/Board';
import { Button } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScoreBoard } from '@/components/ScoreBoard';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import { useT } from '@/i18n';
import { useSettingsStore } from '@/store/settingsStore';
import { useTheme } from '@/theme/ThemeContext';
import { radius, spacing } from '@/theme/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';

export default function GameScreen() {
  const t = useT();
  const router = useRouter();
  const { colors } = useTheme();
  const animations = useSettingsStore((s) => s.animations);
  const { game, score, labels, statusText, mode, difficulty, activePlayer, onCellPress, nextRound, newMatch } = useTicTacToe();

  const styles = useThemedStyles((c) => ({
    content: { flex: 1, alignItems: 'center', paddingHorizontal: spacing.lg, gap: spacing.lg },
    chip: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radius.pill, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border },
    chipText: { color: c.textMuted, fontSize: 13, fontWeight: '700' },
    status: { fontSize: 22, fontWeight: '800', textAlign: 'center', minHeight: 30 },
    actions: { width: '100%', gap: spacing.sm, marginTop: 'auto', paddingBottom: spacing.lg },
  }));

  const modeLabel = mode === 'ai' ? `${t.modes.ai} · ${t.difficulties[difficulty]}` : t.modes.local;
  const statusColor = activePlayer === 'X' ? colors.playerX : activePlayer === 'O' ? colors.playerO : colors.text;

  return (
    <Screen>
      <ScreenHeader
        title={t.appName}
        actions={[
          { icon: '📊', label: t.statistics, onPress: () => router.push('/stats') },
          { icon: '⚙️', label: t.settings, onPress: () => router.push('/settings') },
        ]}
      />
      <View style={styles.content}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{modeLabel}</Text>
        </View>
        <ScoreBoard score={score} labels={labels} active={game.status === 'playing' ? game.current : null} />
        <Text style={[styles.status, { color: statusColor }]} accessibilityLiveRegion="polite">
          {statusText}
        </Text>
        <Board board={game.board} winningLine={game.winningLine} animated={animations} onCellPress={onCellPress} />
        <View style={styles.actions}>
          <Button label={t.nextRound} onPress={nextRound} />
          <Button label={t.resetScore} variant="secondary" onPress={newMatch} />
        </View>
      </View>
    </Screen>
  );
}
