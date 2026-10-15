import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useStatsStore } from '@/store/statsStore';

const stores = [useSettingsStore, useStatsStore, useGameStore];
const allHydrated = () => stores.every((store) => store.persist.hasHydrated());

/** True once every persisted store has been restored from storage. */
export function useStoresHydrated() {
  const [ready, setReady] = useState(allHydrated);

  useEffect(() => {
    if (ready) return;
    const check = () => allHydrated() && setReady(true);
    const unsubscribes = stores.map((store) => store.persist.onFinishHydration(check));
    check();
    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, [ready]);

  return ready;
}
