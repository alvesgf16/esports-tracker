import { loadScheduleBoard } from './load-schedule-board';
import type { ScheduleBoard } from './schedule-board';

const CACHE_TTL_MS = 60_000;

type CacheEntry = {
  expiresAt: number;
  board: ScheduleBoard;
};

type CacheStore = {
  entry: CacheEntry | null;
};

export function createCachedScheduleBoardLoader() {
  const store: CacheStore = { entry: null };

  return (token: string) => loadCached(store, token);
}

function loadCached(store: CacheStore, token: string): Promise<ScheduleBoard> {
  const now = Date.now();

  return isFresh(store.entry, now)
    ? Promise.resolve(store.entry.board)
    : refresh(store, now, token);
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
