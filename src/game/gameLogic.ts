import type { Board, CellValue, GameState, Player } from '../types';
import { BOARD_SIZE, CELL_COUNT } from './constants';

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const at = (row: number, col: number) => row * BOARD_SIZE + col;

/** Winning lines are generated (not hard-coded), so the board size lives in one constant. */
export const WIN_LINES: readonly number[][] = [
  ...range(BOARD_SIZE).map((r) => range(BOARD_SIZE).map((c) => at(r, c))), // rows
  ...range(BOARD_SIZE).map((c) => range(BOARD_SIZE).map((r) => at(r, c))), // columns
  range(BOARD_SIZE).map((i) => at(i, i)), // diagonal
  range(BOARD_SIZE).map((i) => at(i, BOARD_SIZE - 1 - i)), // anti-diagonal
];

export const createEmptyBoard = (): Board => Array<CellValue>(CELL_COUNT).fill(null);

export const getOpponent = (player: Player): Player => (player === 'X' ? 'O' : 'X');

export const getEmptyCells = (board: Board): number[] =>
  board.flatMap((cell, index) => (cell === null ? [index] : []));

export function findWinner(board: Board): { winner: Player; line: number[] } | null {
  for (const line of WIN_LINES) {
    const first = board[line[0]];
    if (first && line.every((i) => board[i] === first)) {
      return { winner: first, line };
    }
  }
  return null;
}

/** Evaluates a board and returns the derived part of the game state. */
export function evaluateBoard(board: Board): Pick<GameState, 'status' | 'winner' | 'winningLine'> {
  const result = findWinner(board);
  if (result) return { status: 'won', winner: result.winner, winningLine: result.line };
  if (getEmptyCells(board).length === 0) return { status: 'draw', winner: null, winningLine: null };
  return { status: 'playing', winner: null, winningLine: null };
}
