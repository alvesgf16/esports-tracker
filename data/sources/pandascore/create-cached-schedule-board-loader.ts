import { loadScheduleBoard } from './load-schedule-board';
import type { ScheduleBoard } from './schedule-board';

const CACHE_TTL_MS = 60_000;
const FAILURE_COOLDOWN_MS = 10_000;

type CachedBoard = {
  kind: 'board';
  expiresAt: number;
  board: ScheduleBoard;
};

type CachedFailure = {
  kind: 'failure';
  expiresAt: number;
  error: Error;
};

type CacheEntry = CachedBoard | CachedFailure;

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

  return isFresh(store.entry, now)
    ? settleCached(store.entry)
    : startRefresh(store, now, token);
}

function isFresh(entry: CacheEntry | null, now: number): entry is CacheEntry {
  return entry !== null && entry.expiresAt > now;
}

function settleCached(entry: CacheEntry): Promise<ScheduleBoard> {
  return entry.kind === 'board'
    ? Promise.resolve(entry.board)
    : Promise.reject(entry.error);
}

function startRefresh(
  store: CacheStore,
  now: number,
  token: string
): Promise<ScheduleBoard> {
  if (store.inFlightRequest) {
    return store.inFlightRequest;
  }

  store.inFlightRequest = refresh(store, now, token).finally(() => {
    store.inFlightRequest = null;
  });

  return store.inFlightRequest;
}

async function refresh(
  store: CacheStore,
  now: number,
  token: string
): Promise<ScheduleBoard> {
  try {
    return rememberBoard(await loadScheduleBoard(token), store, now);
  } catch (error) {
    return rememberFailure(error, store);
  }
}

function rememberBoard(
  board: ScheduleBoard,
  store: CacheStore,
  now: number
): ScheduleBoard {
  store.entry = { kind: 'board', board, expiresAt: now + CACHE_TTL_MS };

  return board;
}

function rememberFailure(error: unknown, store: CacheStore): never {
  const failure = asError(error);

  store.entry = {
    kind: 'failure',
    error: failure,
    expiresAt: Date.now() + FAILURE_COOLDOWN_MS,
  };

  throw failure;
}

function asError(error: unknown): Error {
  return error instanceof Error
    ? error
    : new Error('PandaScore refresh failed');
}
