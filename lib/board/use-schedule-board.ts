import { useEffect, useSyncExternalStore } from 'react';

import type {
  ScheduleBoardSource,
  ScheduleBoardState,
} from '@/modules/shared/gateways';

type Listener = () => void;

type BoardStore = {
  board: ScheduleBoardState;
  listeners: Set<Listener>;
  pendingLoad: Promise<void> | null;
};

const stores = new WeakMap<ScheduleBoardSource, BoardStore>();

export function useScheduleBoard(
  source: ScheduleBoardSource
): ScheduleBoardState {
  const store = storeFor(source);

  useEffect(() => {
    if (source.load) {
      loadBoardIfNeeded(store, source.load);
    }
  }, [source, store]);

  const subscribeToStore = (listener: Listener) => subscribeTo(store, listener);

  return useSyncExternalStore(
    subscribeToStore,
    () => store.board,
    () => source.initial
  );
}

function storeFor(source: ScheduleBoardSource): BoardStore {
  const existing = stores.get(source);

  if (existing) {
    return existing;
  }

  const created: BoardStore = {
    board: source.initial,
    listeners: new Set(),
    pendingLoad: null,
  };

  stores.set(source, created);

  return created;
}

function loadBoardIfNeeded(
  store: BoardStore,
  load: () => Promise<ScheduleBoardState>
): void {
  if (store.pendingLoad || !needsLoading(store.board)) {
    return;
  }

  store.pendingLoad = loadBoardInto(store, load);
}

function needsLoading(board: ScheduleBoardState): boolean {
  const { status } = board.loadState;

  return status === 'loading' || status === 'error';
}

async function loadBoardInto(
  store: BoardStore,
  load: () => Promise<ScheduleBoardState>
): Promise<void> {
  try {
    const nextBoard = await load();

    replaceBoardIn(store, nextBoard);
  } finally {
    store.pendingLoad = null;
  }
}

function replaceBoardIn(store: BoardStore, board: ScheduleBoardState): void {
  store.board = board;
  notifyListenersOf(store);
}

function notifyListenersOf(store: BoardStore): void {
  for (const listener of store.listeners) {
    listener();
  }
}

function subscribeTo(store: BoardStore, listener: Listener): () => void {
  store.listeners.add(listener);

  return () => {
    store.listeners.delete(listener);
  };
}
