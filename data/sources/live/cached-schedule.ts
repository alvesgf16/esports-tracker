import { loadLiveSchedule } from './load-schedule';
import type { LiveScheduleResult } from './schedule-result';

type CacheStore = {
  result: LiveScheduleResult | null;
  inFlightRequest: Promise<LiveScheduleResult> | null;
};

export function cachedLiveSchedule(
  load: () => Promise<LiveScheduleResult> = loadLiveSchedule
) {
  const store: CacheStore = { result: null, inFlightRequest: null };

  return () => readCache(load, store);
}

function readCache(
  load: () => Promise<LiveScheduleResult>,
  store: CacheStore
): Promise<LiveScheduleResult> {
  if (store.result) {
    return Promise.resolve(store.result);
  }

  if (!store.inFlightRequest) {
    store.inFlightRequest = loadAndStore(load, store);
  }

  return store.inFlightRequest;
}

async function loadAndStore(
  load: () => Promise<LiveScheduleResult>,
  store: CacheStore
): Promise<LiveScheduleResult> {
  try {
    return rememberResult(await load(), store);
  } finally {
    store.inFlightRequest = null;
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
