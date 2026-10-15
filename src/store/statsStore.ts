import { createPersistedStore } from './createPersistedStore';
import { applyOutcome, createEmptyStatsMap } from '@/game/statistics';
import type { Outcome, StatsKey, StatsMap } from '@/types';

interface StatsState {
  stats: StatsMap;
  record: (key: StatsKey, outcome: Outcome) => void;
  reset: () => void;
}

export const useStatsStore = createPersistedStore<StatsState>('statistics', (set) => ({
  stats: createEmptyStatsMap(),
  record: (key, outcome) => set((s) => ({ stats: { ...s.stats, [key]: applyOutcome(s.stats[key], outcome) } })),
  reset: () => set({ stats: createEmptyStatsMap() }),
}));
