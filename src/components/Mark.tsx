import { View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { useTheme } from '@/theme/ThemeContext';
import type { Player } from '@/types';

interface Props {
  player: Player;
  size: number;
  animated: boolean;
}

/** X and O are drawn with plain Views: no SVG/icon dependency. */
export function Mark({ player, size, animated }: Props) {
  const { colors } = useTheme();
  const color = player === 'X' ? colors.playerX : colors.playerO;
  const thickness = size * 0.17;
  const bar = { position: 'absolute', width: size, height: thickness, borderRadius: thickness / 2, backgroundColor: color } as const;

  return (
    <Animated.View
      entering={animated ? ZoomIn.springify().damping(14) : undefined}
      style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}
    >
      {player === 'X' ? (
        <>
          <View style={[bar, { transform: [{ rotate: '45deg' }] }]} />
          <View style={[bar, { transform: [{ rotate: '-45deg' }] }]} />
        </>
      ) : (
        <View style={{ width: size * 0.9, height: size * 0.9, borderRadius: size, borderWidth: thickness, borderColor: color }} />
      )}
    </Animated.View>
  );
}
