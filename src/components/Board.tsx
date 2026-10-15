import { useWindowDimensions, View } from 'react-native';
import { BoardCell } from './BoardCell';
import { BOARD_SIZE } from '@/game/constants';
import { useT } from '@/i18n';
import { spacing } from '@/theme/theme';
import type { Board as BoardType } from '@/types';
import { chunk } from '@/utils/chunk';

const GAP = 10;
const MAX_BOARD_WIDTH = 420;
// Leaves room for header, score, status and buttons on short screens.
const MAX_HEIGHT_RATIO = 0.46;

interface Props {
  board: BoardType;
  winningLine: number[] | null;
  animated: boolean;
  onCellPress: (index: number) => void;
}

export function Board({ board, winningLine, animated, onCellPress }: Props) {
  const t = useT();
  const { width, height } = useWindowDimensions();
  const boardWidth = Math.min(width - spacing.lg * 2, MAX_BOARD_WIDTH, height * MAX_HEIGHT_RATIO);
  // floor() avoids fractional overflow that would push a cell onto the next row.
  const cellSize = Math.floor((boardWidth - GAP * (BOARD_SIZE - 1)) / BOARD_SIZE);

  // Explicit rows (no flexWrap): the grid can never reflow into a 2-2-2-2-1 layout.
  return (
    <View style={{ gap: GAP }}>
      {chunk(board, BOARD_SIZE).map((row, r) => (
        <View key={r} style={{ flexDirection: 'row', gap: GAP }}>
          {row.map((value, c) => {
            const index = r * BOARD_SIZE + c;
            return (
              <BoardCell
                key={index}
                value={value}
                size={cellSize}
                animated={animated}
                highlighted={winningLine?.includes(index) ?? false}
                label={t.cellLabel(r + 1, c + 1, value)}
                onPress={() => onCellPress(index)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}
