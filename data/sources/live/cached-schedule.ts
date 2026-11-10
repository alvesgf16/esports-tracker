import { loadLiveSchedule } from './load-schedule';
import type { LiveScheduleResult } from './schedule-result';

type CacheStore = {
  result: LiveScheduleResult | null;
  pending: Promise<LiveScheduleResult> | null;
};

export function cachedLiveSchedule(
  load: () => Promise<LiveScheduleResult> = loadLiveSchedule
) {
  const store: CacheStore = { result: null, pending: null };

  return () => readCache(load, store);
}

function readCache(
  load: () => Promise<LiveScheduleResult>,
  store: CacheStore
): Promise<LiveScheduleResult> {
  if (store.result) {
    return Promise.resolve(store.result);
  }

  if (!store.pending) {
    store.pending = loadAndStore(load, store);
  }

  return store.pending;
}

async function loadAndStore(
  load: () => Promise<LiveScheduleResult>,
  store: CacheStore
): Promise<LiveScheduleResult> {
  try {
    return rememberResult(await load(), store);
  } finally {
    store.pending = null;
  }
}

function rememberResult(
  result: LiveScheduleResult,
  store: CacheStore
): LiveScheduleResult {
  if (result.status !== 'error') {
    store.result = result;
  }

  return result;
}
