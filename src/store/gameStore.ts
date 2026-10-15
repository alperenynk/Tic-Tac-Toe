import { createPersistedStore } from './createPersistedStore';
import { getOpponent } from '@/game/gameLogic';
import { addToScore, createGame, EMPTY_SCORE, playMove } from '@/game/gameSession';
import type { GameState, Player, Score } from '@/types';

interface GameStoreState {
  game: GameState;
  /** Who moves first this round. Alternates every round so the AI also gets to start. */
  starter: Player;
  score: Score;
  play: (index: number) => void;
  nextRound: () => void;
  newMatch: () => void;
}

export const useGameStore = createPersistedStore<GameStoreState>('game', (set) => ({
  game: createGame('X'),
  starter: 'X',
  score: EMPTY_SCORE,

  play: (index) =>
    set((s) => {
      const game = playMove(s.game, index);
      if (game === s.game) return s;
      return { game, score: game.status === 'playing' ? s.score : addToScore(s.score, game) };
    }),

  nextRound: () =>
    set((s) => {
      const starter = getOpponent(s.starter);
      return { starter, game: createGame(starter) };
    }),

  newMatch: () => set({ starter: 'X', game: createGame('X'), score: EMPTY_SCORE }),
}));
