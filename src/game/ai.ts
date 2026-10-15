import type { Board, Difficulty, Player } from '../types';
import { findWinner, getEmptyCells, getOpponent } from './gameLogic';

const pickRandom = <T,>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)];
const withMove = (board: Board, cell: number, player: Player): Board =>
  board.map((value, i) => (i === cell ? player : value));

/** Returns a cell that completes a line for `player`, if one exists. */
const findImmediateWin = (board: Board, player: Player): number | null =>
  getEmptyCells(board).find((cell) => findWinner(withMove(board, cell, player))) ?? null;

function minimax(board: Board, turn: Player, ai: Player, depth: number, alpha: number, beta: number): number {
  const result = findWinner(board);
  if (result) return result.winner === ai ? 10 - depth : depth - 10;

  const empty = getEmptyCells(board);
  if (empty.length === 0) return 0;

  const maximizing = turn === ai;
  let best = maximizing ? -Infinity : Infinity;

  for (const cell of empty) {
    const score = minimax(withMove(board, cell, turn), getOpponent(turn), ai, depth + 1, alpha, beta);
    if (maximizing) {
      best = Math.max(best, score);
      alpha = Math.max(alpha, best);
    } else {
      best = Math.min(best, score);
      beta = Math.min(beta, best);
    }
    if (beta <= alpha) break;
  }
  return best;
}

/** All moves sharing the best minimax score (random pick among them keeps the AI unpredictable). */
function getBestMoves(board: Board, ai: Player): number[] {
  const scored = getEmptyCells(board).map((cell) => ({
    cell,
    score: minimax(withMove(board, cell, ai), getOpponent(ai), ai, 1, -Infinity, Infinity),
  }));
  const top = Math.max(...scored.map((s) => s.score));
  return scored.filter((s) => s.score === top).map((s) => s.cell);
}

// Every difficulty is a strategy: (board, ai) => cell index. Adding a level = adding one entry.
const strategies: Record<Difficulty, (board: Board, ai: Player) => number> = {
  easy: (board) => pickRandom(getEmptyCells(board)),
  medium: (board, ai) =>
    findImmediateWin(board, ai) ?? findImmediateWin(board, getOpponent(ai)) ?? pickRandom(getEmptyCells(board)),
  hard: (board, ai) => pickRandom(getBestMoves(board, ai)),
};

export const getAiMove = (board: Board, ai: Player, difficulty: Difficulty): number =>
  strategies[difficulty](board, ai);
