import assert from 'node:assert/strict';
import { getAiMove } from '../src/game/ai';
import { WIN_LINES, createEmptyBoard, evaluateBoard, findWinner } from '../src/game/gameLogic';
import { addToScore, createGame, EMPTY_SCORE, getOutcome, playMove } from '../src/game/gameSession';
import { applyOutcome, EMPTY_STATS, getWinRate } from '../src/game/statistics';
import type { Board, Difficulty, GameState, Player } from '../src/types';

let passed = 0;
const test = (name: string, fn: () => void) => {
  fn();
  passed += 1;
  console.log(`✓ ${name}`);
};

const board = (s: string): Board => [...s.replace(/\s/g, '')].map((c) => (c === '.' ? null : (c as Player)));

test('generates 8 winning lines for a 3x3 board', () => {
  assert.equal(WIN_LINES.length, 8);
  assert.ok(WIN_LINES.every((l) => l.length === 3));
});

test('detects rows, columns and both diagonals', () => {
  assert.deepEqual(findWinner(board('XXX ... ...'))?.line, [0, 1, 2]);
  assert.deepEqual(findWinner(board('O.. O.. O..'))?.line, [0, 3, 6]);
  assert.deepEqual(findWinner(board('X.. .X. ..X'))?.line, [0, 4, 8]);
  assert.deepEqual(findWinner(board('..O .O. O..'))?.line, [2, 4, 6]);
  assert.equal(findWinner(createEmptyBoard()), null);
});

test('detects a draw', () => {
  const result = evaluateBoard(board('XOX XOO OXX'));
  assert.equal(result.status, 'draw');
  assert.equal(result.winner, null);
});

test('rejects moves on occupied cells and after the game ended', () => {
  let game = createGame('X');
  game = playMove(game, 0);
  assert.equal(playMove(game, 0), game);
  const finished = { ...game, status: 'won' as const };
  assert.equal(playMove(finished, 5), finished);
});

test('alternates players and ends the game on a win', () => {
  let game = createGame('X');
  for (const i of [0, 3, 1, 4, 2]) game = playMove(game, i);
  assert.equal(game.status, 'won');
  assert.equal(game.winner, 'X');
  assert.deepEqual(game.winningLine, [0, 1, 2]);
});

test('score and outcome helpers', () => {
  let game = createGame('X');
  for (const i of [0, 3, 1, 4, 2]) game = playMove(game, i);
  assert.deepEqual(addToScore(EMPTY_SCORE, game), { X: 1, O: 0, draws: 0 });
  assert.equal(getOutcome(game, 'X'), 'win');
  assert.equal(getOutcome(game, 'O'), 'loss');
});

test('statistics: streaks, draws and win rate', () => {
  let s = applyOutcome(EMPTY_STATS, 'win');
  s = applyOutcome(s, 'win');
  s = applyOutcome(s, 'draw');
  assert.equal(s.streak, 2);
  s = applyOutcome(s, 'loss');
  assert.equal(s.streak, 0);
  assert.equal(s.maxStreak, 2);
  assert.equal(getWinRate(s), 50);
});

test('medium AI wins when it can and blocks when it must', () => {
  assert.equal(getAiMove(board('OO. X.. X..'), 'O', 'medium'), 2);
  assert.equal(getAiMove(board('XX. O.. ...'), 'O', 'medium'), 2);
});

const simulate = (xDiff: Difficulty, oDiff: Difficulty, first: Player): GameState => {
  let game = createGame(first);
  while (game.status === 'playing') {
    const diff = game.current === 'X' ? xDiff : oDiff;
    game = playMove(game, getAiMove(game.board, game.current, diff));
  }
  return game;
};

test('hard AI never loses (200 games per matchup, both starting sides)', () => {
  for (let n = 0; n < 100; n++) {
    for (const first of ['X', 'O'] as const) {
      assert.notEqual(simulate('easy', 'hard', first).winner, 'X');
      assert.notEqual(simulate('medium', 'hard', first).winner, 'X');
      assert.notEqual(simulate('hard', 'easy', first).winner, 'O');
      assert.notEqual(simulate('hard', 'medium', first).winner, 'O');
    }
  }
});

test('hard vs hard is always a draw', () => {
  for (let n = 0; n < 20; n++) assert.equal(simulate('hard', 'hard', 'X').status, 'draw');
});

console.log(`\n${passed} tests passed`);
