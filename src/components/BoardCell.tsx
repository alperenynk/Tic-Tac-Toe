import { Pressable } from 'react-native';
import { Mark } from './Mark';
import { radius } from '@/theme/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import type { CellValue } from '@/types';

interface Props {
  value: CellValue;
  size: number;
  label: string;
  highlighted: boolean;
  animated: boolean;
  onPress: () => void;
}

export function BoardCell({ value, size, label, highlighted, animated, onPress }: Props) {
  const styles = useThemedStyles((c) => ({
    cell: { alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface, borderRadius: radius.md, borderWidth: 1, borderColor: c.border },
    highlighted: { backgroundColor: c.winHighlight, borderColor: c.primary, borderWidth: 2 },
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.cell, { width: size, height: size }, highlighted && styles.highlighted, pressed && !value && { opacity: 0.6 }]}
    >
      {value && <Mark player={value} size={size * 0.52} animated={animated} />}
    </Pressable>
  );
}
