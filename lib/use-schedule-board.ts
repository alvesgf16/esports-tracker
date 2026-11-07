import { useEffect, useState } from 'react';

import type {
  ScheduleBoardSource,
  ScheduleBoardState,
} from '@/modules/shared/gateways';

export function useScheduleBoard(
  source: ScheduleBoardSource
): ScheduleBoardState {
  const [board, setBoard] = useState(source.initial);

  useEffect(() => {
    if (!source.load) {
      return;
    }

    return subscribeBoard(source.load, setBoard);
  }, [source]);

  return board;
}

function subscribeBoard(
  load: () => Promise<ScheduleBoardState>,
  setBoard: (next: ScheduleBoardState) => void
): () => void {
  let cancelled = false;

  void load().then((next) => {
    if (!cancelled) {
      setBoard(next);
    }
  });

  return () => {
    cancelled = true;
  };
}
