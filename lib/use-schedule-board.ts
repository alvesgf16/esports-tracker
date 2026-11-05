import { useEffect, useState } from 'react';

import {
  boardFromPayload,
  failedBoard,
  loadingBoard,
  type LivePayload,
  type ScheduleBoardState,
} from '@/lib/schedule-board';

export type { ScheduleBoardState };

export function useScheduleBoard(
  offlineBoard: ScheduleBoardState
): ScheduleBoardState {
  const liveEnabled = process.env.EXPO_PUBLIC_LIVE_SCHEDULE === '1';
  const [board, setBoard] = useState(() =>
    liveEnabled ? loadingBoard : offlineBoard
  );

  useEffect(() => {
    if (!liveEnabled) {
      return;
    }

    return fetchLiveBoard(setBoard);
  }, [liveEnabled]);

  return board;
}

function fetchLiveBoard(
  setBoard: (next: ScheduleBoardState) => void
): () => void {
  let cancelled = false;

  void loadLiveBoard().then((next) => {
    if (!cancelled) {
      setBoard(next);
    }
  });

  return () => {
    cancelled = true;
  };
}

async function loadLiveBoard(): Promise<ScheduleBoardState> {
  try {
    const response = await fetch('/api/matches');
    const payload = (await response.json()) as LivePayload;

    return boardFromPayload(payload);
  } catch {
    return failedBoard("Couldn't load schedule.");
  }
}
