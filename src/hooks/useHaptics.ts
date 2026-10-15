import * as Haptics from 'expo-haptics';
import { useMemo } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

/** Haptic helpers that respect the user's setting. */
export function useHaptics() {
  const enabled = useSettingsStore((s) => s.haptics);

  return useMemo(() => {
    const guard = (fn: () => Promise<void>) => () => {
      if (enabled) fn().catch(() => undefined);
    };
    return {
      tap: guard(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
      select: guard(() => Haptics.selectionAsync()),
      success: guard(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
      warning: guard(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)),
    };
  }, [enabled]);
}
