import { Pressable, Text } from 'react-native';
import { useHaptics } from '@/hooks/useHaptics';
import { radius, spacing } from '@/theme/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({ label, onPress, variant = 'primary' }: Props) {
  const haptics = useHaptics();
  const styles = useThemedStyles((c) => ({
    base: { paddingVertical: 14, paddingHorizontal: spacing.lg, borderRadius: radius.pill, alignItems: 'center', borderWidth: 1 },
    primary: { backgroundColor: c.primary, borderColor: c.primary },
    secondary: { backgroundColor: 'transparent', borderColor: c.border },
    danger: { backgroundColor: 'transparent', borderColor: c.danger },
    text: { fontSize: 16, fontWeight: '700' },
    primaryText: { color: c.primaryText },
    secondaryText: { color: c.text },
    dangerText: { color: c.danger },
  }));

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        haptics.select();
        onPress();
      }}
      style={({ pressed }) => [styles.base, styles[variant], pressed && { opacity: 0.7 }]}
    >
      <Text style={[styles.text, styles[`${variant}Text` as const]]}>{label}</Text>
    </Pressable>
  );
}
