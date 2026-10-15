import { Pressable, Text, View } from 'react-native';
import { useHaptics } from '@/hooks/useHaptics';
import { radius } from '@/theme/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';

interface Props<T extends string> {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

/** One generic control for mode, difficulty, theme and language. */
export function SegmentedControl<T extends string>({ options, value, onChange }: Props<T>) {
  const haptics = useHaptics();
  const styles = useThemedStyles((c) => ({
    track: { flexDirection: 'row', backgroundColor: c.surfaceAlt, borderRadius: radius.pill, padding: 4 },
    segment: { flex: 1, paddingVertical: 10, paddingHorizontal: 6, borderRadius: radius.pill, alignItems: 'center' },
    active: { backgroundColor: c.primary },
    text: { color: c.textMuted, fontWeight: '600', fontSize: 14 },
    activeText: { color: c.primaryText },
  }));

  return (
    <View style={styles.track} accessibilityRole="radiogroup">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            style={[styles.segment, selected && styles.active]}
            onPress={() => {
              if (selected) return;
              haptics.select();
              onChange(option.value);
            }}
          >
            <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.text, selected && styles.activeText]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
