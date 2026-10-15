import { Pressable, Text, View } from 'react-native';
import { spacing } from '@/theme/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';

export interface HeaderAction {
  icon: string;
  label: string;
  onPress: () => void;
}

interface Props {
  title: string;
  actions: HeaderAction[];
}

export function ScreenHeader({ title, actions }: Props) {
  const styles = useThemedStyles((c) => ({
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    title: { color: c.text, fontSize: 28, fontWeight: '800', letterSpacing: 0.5 },
    actions: { flexDirection: 'row', gap: spacing.sm },
    button: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface, borderWidth: 1, borderColor: c.border },
    icon: { fontSize: 20, color: c.text },
  }));

  return (
    <View style={styles.row}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <View style={styles.actions}>
        {actions.map((action) => (
          <Pressable key={action.label} onPress={action.onPress} accessibilityRole="button" accessibilityLabel={action.label} style={styles.button}>
            <Text style={styles.icon}>{action.icon}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
