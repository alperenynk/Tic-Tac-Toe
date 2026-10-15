import { useCallback, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useHaptics } from './useHaptics';
import { getAiMove } from '@/game/ai';
import { AI_DELAY_MS, AI_PLAYER, HUMAN_PLAYER } from '@/game/constants';
import { getOutcome } from '@/game/gameSession';
import { useT } from '@/i18n';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useStatsStore } from '@/store/statsStore';
import type { Player } from '@/types';

/** Glue between the pure game engine, the stores and the UI. Screens only render what this returns. */
export function useTicTacToe() {
  const t = useT();
  const haptics = useHaptics();
  const { mode, difficulty } = useSettingsStore(useShallow((s) => ({ mode: s.mode, difficulty: s.difficulty })));
  const { game, score, play, nextRound, newMatch } = useGameStore(
    useShallow((s) => ({ game: s.game, score: s.score, play: s.play, nextRound: s.nextRound, newMatch: s.newMatch })),
  );
  const record = useStatsStore((s) => s.record);

  const isAiMode = mode === 'ai';
  const isAiTurn = isAiMode && game.status === 'playing' && game.current === AI_PLAYER;

  // AI move (also resumes correctly when a saved game is restored on the AI's turn).
  useEffect(() => {
    if (!isAiTurn) return;
    const timer = setTimeout(() => {
      play(getAiMove(game.board, AI_PLAYER, difficulty));
      haptics.tap();
    }, AI_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isAiTurn, game.board, difficulty, play, haptics]);

  // Runs once per finished game: stats + result haptics. A restored finished game is not re-counted.
  const previousStatus = useRef(game.status);
  useEffect(() => {
    if (previousStatus.current === 'playing' && game.status !== 'playing') {
      const outcome = getOutcome(game, HUMAN_PLAYER);
      if (isAiMode && outcome) record(difficulty, outcome);
      if (game.status === 'draw') haptics.tap();
      else if (!isAiMode || outcome === 'win') haptics.success();
      else haptics.warning();
    }
    previousStatus.current = game.status;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.status]);

  const onCellPress = useCallback(
    (index: number) => {
      if (isAiTurn || game.status !== 'playing') return;
      if (game.board[index] !== null) return haptics.warning();
      haptics.tap();
      play(index);
    },
    [isAiTurn, game.status, game.board, haptics, play],
  );

  const labels: Record<Player, string> = isAiMode ? { X: t.you, O: t.ai } : { X: t.player1, O: t.player2 };

  const statusText = (() => {
    if (game.status === 'draw') return t.draw;
    if (game.status === 'won') {
      if (!isAiMode) return t.winnerIs(labels[game.winner as Player]);
      return game.winner === HUMAN_PLAYER ? t.youWin : t.youLose;
    }
    if (isAiMode) return isAiTurn ? t.aiThinking : t.yourTurn;
    return t.turnOf(labels[game.current]);
  })();

  return {
    game,
    score,
    labels,
    statusText,
    mode,
    difficulty,
    activePlayer: game.status === 'playing' ? game.current : (game.winner as Player | null),
    onCellPress,
    nextRound,
    newMatch,
  };
}
