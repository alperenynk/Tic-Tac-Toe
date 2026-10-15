import type { Outcome, Stats, StatsMap } from '../types';
import { DIFFICULTIES } from './constants';

export const EMPTY_STATS: Stats = { played: 0, wins: 0, losses: 0, draws: 0, streak: 0, maxStreak: 0 };

export const createEmptyStatsMap = (): StatsMap =>
  Object.fromEntries(DIFFICULTIES.map((d) => [d, { ...EMPTY_STATS }])) as StatsMap;

/** A draw keeps the streak alive; a loss breaks it. */
export function applyOutcome(stats: Stats, outcome: Outcome): Stats {
  const streak = outcome === 'win' ? stats.streak + 1 : outcome === 'loss' ? 0 : stats.streak;
  return {
    played: stats.played + 1,
    wins: stats.wins + (outcome === 'win' ? 1 : 0),
    losses: stats.losses + (outcome === 'loss' ? 1 : 0),
    draws: stats.draws + (outcome === 'draw' ? 1 : 0),
    streak,
    maxStreak: Math.max(stats.maxStreak, streak),
  };
}

export const getWinRate = (stats: Stats): number =>
  stats.played === 0 ? 0 : Math.round((stats.wins / stats.played) * 100);
