import { fetchScheduleBoard } from './fetch-schedule-board';
import type { ScheduleBoard } from './schedule-board';

const CACHE_TTL_MS = 60_000;

type CacheEntry = {
  expiresAt: number;
  board: ScheduleBoard;
};

type CacheStore = {
  entry: CacheEntry | null;
};

export function cachedScheduleBoard() {
  const store: CacheStore = { entry: null };

  return (token: string) => loadCached(token, store);
}

function loadCached(token: string, store: CacheStore): Promise<ScheduleBoard> {
  const now = Date.now();

  if (store.entry && store.entry.expiresAt > now) {
    return Promise.resolve(store.entry.board);
  }

  return refreshCache(token, now, store);
}

async function refreshCache(
  token: string,
  now: number,
  store: CacheStore
): Promise<ScheduleBoard> {
  const board = await fetchScheduleBoard(token);

  store.entry = { board, expiresAt: now + CACHE_TTL_MS };

  return board;
}
