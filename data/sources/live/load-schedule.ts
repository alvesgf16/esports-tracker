import { gameCatalog } from '@/data/catalogs/game-catalog';
import { matchCatalog } from '@/data/catalogs/match-catalog';

import { parseLiveSchedulePayload } from './mappers/parse-live-schedule-payload';
import { scheduleError } from './schedule-error';
import type {
  LiveSchedulePayload,
  LiveScheduleResult,
} from './schedule-result';

/** Device client for `/api/matches` — PandaScore mapped on the server. */
export async function loadLiveSchedule(): Promise<LiveScheduleResult> {
  try {
    return resultFromBody(await fetchLiveJson());
  } catch (error) {
    return scheduleError(error);
  }
}

async function fetchLiveJson(): Promise<unknown> {
  const response = await fetch('/api/matches');

  return response.json();
}

function resultFromBody(body: unknown): LiveScheduleResult {
  const payload = parseLiveSchedulePayload(body);

  if (!payload) {
    return scheduleError('Invalid schedule payload');
  }

  return resultFromPayload(payload);
}

function resultFromPayload(payload: LiveSchedulePayload): LiveScheduleResult {
  if (payload.status === 'ok') {
    return {
      status: 'ok',
      games: gameCatalog(payload.games),
      matches: matchCatalog(payload.matches),
    };
  }

  return payload;
}
