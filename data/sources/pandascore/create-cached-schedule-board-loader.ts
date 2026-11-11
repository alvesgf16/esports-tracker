import { loadScheduleBoard } from './load-schedule-board';
import type { ScheduleBoard } from './schedule-board';

const CACHE_TTL_MS = 60_000;

type CacheEntry = {
  expiresAt: number;
  board: ScheduleBoard;
};

type CacheStore = {
  entry: CacheEntry | null;
  inFlightRequest: Promise<ScheduleBoard> | null;
};

export function createCachedScheduleBoardLoader() {
  const store: CacheStore = { entry: null, inFlightRequest: null };

  return (token: string) => loadCached(store, token);
}

function loadCached(store: CacheStore, token: string): Promise<ScheduleBoard> {
  const now = Date.now();

  if (isFresh(store.entry, now)) {
    return Promise.resolve(store.entry.board);
  }

  return store.inFlightRequest ?? startRefresh(store, now, token);
}

function startRefresh(
  store: CacheStore,
  now: number,
  token: string
): Promise<ScheduleBoard> {
  store.inFlightRequest = refresh(store, now, token).finally(() => {
    store.inFlightRequest = null;
  });

  return store.inFlightRequest;
}

function isFresh(entry: CacheEntry | null, now: number): entry is CacheEntry {
  return entry !== null && entry.expiresAt > now;
}

async function refresh(
  store: CacheStore,
  now: number,
  token: string
): Promise<ScheduleBoard> {
  const board = await loadScheduleBoard(token);

  store.entry = { board, expiresAt: now + CACHE_TTL_MS };

  return board;
}
