import { jsonValue } from './json-value';
import { parseGame } from './parse-game';
import { parseList } from './parse-list';
import { parseMatch } from './parse-match';
import type { LiveSchedulePayload } from './schedule-result';

export function parseLiveSchedulePayload(
  value: unknown
): LiveSchedulePayload | null {
  const record = jsonValue.record(value);

  if (!record) {
    return null;
  }

  return payloadFromRecord(record);
}

function payloadFromRecord(
  record: Record<string, unknown>
): LiveSchedulePayload | null {
  if (record.status === 'unconfigured') {
    return { status: 'unconfigured' };
  }

  if (record.status === 'error') {
    return errorPayload(record);
  }

  if (record.status === 'ok') {
    return okPayload(record);
  }

  return null;
}

function errorPayload(
  record: Record<string, unknown>
): LiveSchedulePayload | null {
  if (record.message === undefined) {
    return { status: 'error' };
  }

  const message = jsonValue.string(record.message);

  if (!message) {
    return null;
  }

  return { status: 'error', message };
}

function okPayload(
  record: Record<string, unknown>
): LiveSchedulePayload | null {
  const games = parseList(record.games, parseGame);
  const matches = parseList(record.matches, parseMatch);

  if (!games || !matches) {
    return null;
  }

  return { status: 'ok', games, matches };
}
