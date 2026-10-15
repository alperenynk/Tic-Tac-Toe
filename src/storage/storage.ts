import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware';

const memoryFallback = new Map<string, string>();

export const storageKey = (...parts: string[]) => ['tictactoe', ...parts].join(':');

/** AsyncStorage with an in-memory fallback so gameplay never breaks if storage fails. */
export const safeStorage: StateStorage = {
  getItem: async (name) => {
    try {
      return await AsyncStorage.getItem(name);
    } catch {
      return memoryFallback.get(name) ?? null;
    }
  },
  setItem: async (name, value) => {
    memoryFallback.set(name, value);
    try {
      await AsyncStorage.setItem(name, value);
    } catch {
      /* keep the in-memory copy */
    }
  },
  removeItem: async (name) => {
    memoryFallback.delete(name);
    try {
      await AsyncStorage.removeItem(name);
    } catch {
      /* ignore */
    }
  },
};
