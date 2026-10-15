import { useRouter } from 'expo-router';
import { ScrollView, Switch } from 'react-native';
import { Button } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { InlineRow, Section, SettingRow } from '@/components/Section';
import { SegmentedControl } from '@/components/SegmentedControl';
import { DIFFICULTIES, LANGUAGES, MODES, THEMES } from '@/game/constants';
import { useT } from '@/i18n';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useStatsStore } from '@/store/statsStore';
import { useTheme } from '@/theme/ThemeContext';
import { spacing } from '@/theme/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import type { Settings } from '@/types';
import { toOptions } from '@/utils/options';
import { Text } from 'react-native';

export default function SettingsScreen() {
  const t = useT();
  const router = useRouter();
  const { colors } = useTheme();
  const settings = useSettingsStore();
  const newMatch = useGameStore((s) => s.newMatch);
  const resetStats = useStatsStore((s) => s.reset);

  const styles = useThemedStyles((c) => ({
    content: { padding: spacing.lg, gap: spacing.lg },
    note: { color: c.textMuted, fontSize: 13 },
  }));

  /** Rule changes (mode / difficulty) invalidate the current match. */
  const changeRule = <K extends 'mode' | 'difficulty'>(key: K, value: Settings[K]) => {
    settings.update(key, value);
    newMatch();
  };

  const toggle = (key: 'animations' | 'haptics', label: string) => (
    <InlineRow label={label}>
      <Switch
        value={settings[key]}
        onValueChange={(value) => settings.update(key, value)}
        trackColor={{ true: colors.primary, false: colors.border }}
      />
    </InlineRow>
  );

  return (
    <Screen>
      <ScreenHeader title={t.settings} actions={[{ icon: '✕', label: t.close, onPress: () => router.back() }]} />
      <ScrollView contentContainerStyle={styles.content}>
        <Section title={t.gameSection}>
          <SettingRow label={t.mode}>
            <SegmentedControl options={toOptions(MODES, t.modes)} value={settings.mode} onChange={(v) => changeRule('mode', v)} />
          </SettingRow>
          {settings.mode === 'ai' && (
            <SettingRow label={t.difficulty}>
              <SegmentedControl
                options={toOptions(DIFFICULTIES, t.difficulties)}
                value={settings.difficulty}
                onChange={(v) => changeRule('difficulty', v)}
              />
            </SettingRow>
          )}
          <Text style={styles.note}>{t.rulesNote}</Text>
        </Section>

        <Section title={t.appearanceSection}>
          <SettingRow label={t.theme}>
            <SegmentedControl options={toOptions(THEMES, t.themes)} value={settings.theme} onChange={(v) => settings.update('theme', v)} />
          </SettingRow>
          <SettingRow label={t.language}>
            <SegmentedControl options={toOptions(LANGUAGES, t.languages)} value={settings.language} onChange={(v) => settings.update('language', v)} />
          </SettingRow>
        </Section>

        <Section title={t.feedbackSection}>
          {toggle('animations', t.animations)}
          {toggle('haptics', t.haptics)}
        </Section>

        <Button label={t.resetStats} variant="danger" onPress={resetStats} />
      </ScrollView>
    </Screen>
  );
}
