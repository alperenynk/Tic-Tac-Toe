import { create, type StateCreator } from 'zustand';
import { createJSONStorage, persist, type PersistOptions } from 'zustand/middleware';
import { safeStorage, storageKey } from '@/storage/storage';

/** Every store in the app is created through this helper: same storage, same key scheme. */
export function createPersistedStore<T>(
  name: string,
  initializer: StateCreator<T, [['zustand/persist', unknown]], []>,
  options: Partial<PersistOptions<T>> = {},
) {
  const config: PersistOptions<T> = {
    name: storageKey(name),
    storage: createJSONStorage<T>(() => safeStorage),
    version: 1,
    ...options,
  };
  return create<T>()(persist(initializer, config));
}
