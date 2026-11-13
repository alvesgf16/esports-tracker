import { asOrNull } from '@/data/mappers/as-or-null';
import { matchesForKnownGames } from '@/data/mappers/matches-for-known-games';
import { parseAll } from '@/data/mappers/parse-all';
import { parseSome } from '@/data/mappers/parse-some';

import type { LiveSchedulePayload } from '../schedule-result';
import { toGame } from './to-game';
import { toMatch } from './to-match';

export function parseLiveSchedulePayload(
  value: unknown
): LiveSchedulePayload | null {
  const record = asOrNull.record(value);

  return record ? payloadFrom(record) : null;
}

function payloadFrom(
  record: Record<string, unknown>
): LiveSchedulePayload | null {
  if (record.status === 'unconfigured') {
    return { status: 'unconfigured' };
  }

  if (record.status === 'error') {
    return errorPayloadFrom(record);
  }

  if (record.status === 'ok') {
    return okPayloadFrom(record);
  }

  return null;
}

function errorPayloadFrom(
  record: Record<string, unknown>
): LiveSchedulePayload | null {
  if (record.message === undefined) {
    return { status: 'error' };
  }

  const message = asOrNull.string(record.message);

  return message ? { status: 'error', message } : null;
}

function okPayloadFrom(
  record: Record<string, unknown>
): LiveSchedulePayload | null {
  const games = parseAll(record.games, toGame);
  const matches = parseSome(record.matches, toMatch);

  return games && matches
    ? { status: 'ok', games, matches: matchesForKnownGames(games, matches) }
    : null;
}
