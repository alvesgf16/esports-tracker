import { useState } from 'react';

import type { DayKeyState } from '../contracts';

export function useDayKey(todayKey: string): DayKeyState {
  const [pinnedKey, setPinnedKey] = useState<string | null>(null);

  const dayKey = pinnedKey ?? todayKey;
  const selectDayFromKey = (selectedKey: string) => {
    setPinnedKey(pinnedKeyFor(selectedKey, todayKey));
  };

  return { dayKey, selectDayFromKey };
}

function pinnedKeyFor(selectedKey: string, todayKey: string): string | null {
  return selectedKey === todayKey ? null : selectedKey;
}
