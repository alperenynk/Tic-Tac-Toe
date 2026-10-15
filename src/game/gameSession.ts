import type { GameState, Outcome, Player, Score } from '../types';
import { createEmptyBoard, evaluateBoard, getOpponent } from './gameLogic';

export const EMPTY_SCORE: Score = { X: 0, O: 0, draws: 0 };

export const createGame = (first: Player = 'X'): GameState => {
  const board = createEmptyBoard();
  return { board, current: first, ...evaluateBoard(board) };
};

/** Pure move function. Invalid moves return the very same state object. */
export function playMove(state: GameState, index: number): GameState {
  if (state.status !== 'playing' || state.board[index] !== null) return state;

  const board = state.board.map((cell, i) => (i === index ? state.current : cell));
  const result = evaluateBoard(board);

  return {
    board,
    ...result,
    current: result.status === 'playing' ? getOpponent(state.current) : state.current,
  };
}

export function addToScore(score: Score, game: GameState): Score {
  if (game.status === 'won' && game.winner) return { ...score, [game.winner]: score[game.winner] + 1 };
  if (game.status === 'draw') return { ...score, draws: score.draws + 1 };
  return score;
}

export function getOutcome(game: GameState, human: Player): Outcome | null {
  if (game.status === 'draw') return 'draw';
  if (game.status === 'won') return game.winner === human ? 'win' : 'loss';
  return null;
}
