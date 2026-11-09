import type { Match, MatchStatus, Team } from '@/modules/shared/entities';

import { jsonValue } from './json-value';
import { parseList } from './parse-list';

type MatchCore = {
  id: string;
  game: string;
  name: string;
  tournament: string;
  format: string;
  startsAt: string;
};

export function parseMatch(value: unknown): Match | null {
  const record = jsonValue.record(value);

  if (!record) {
    return null;
  }

  return matchFromRecord(record);
}

function matchFromRecord(record: Record<string, unknown>): Match | null {
  const core = matchCore(record);
  const teams = parseList(record.teams, parseTeam);
  const status = parseMatchStatus(record.status);

  if (!core || !teams || status === null) {
    return null;
  }

  return status ? { ...core, teams, status } : { ...core, teams };
}

function matchCore(record: Record<string, unknown>): MatchCore | null {
  const id = jsonValue.string(record.id);
  const game = jsonValue.string(record.game);
  const name = jsonValue.string(record.name);

  if (!id || !game || !name) {
    return null;
  }

  return matchMeta(record, { id, game, name });
}

function matchMeta(
  record: Record<string, unknown>,
  ids: Pick<MatchCore, 'id' | 'game' | 'name'>
): MatchCore | null {
  const tournament = jsonValue.string(record.tournament);
  const format = jsonValue.string(record.format);
  const startsAt = jsonValue.string(record.startsAt);

  if (!tournament || !format || !startsAt) {
    return null;
  }

  return { ...ids, tournament, format, startsAt };
}

function parseTeam(value: unknown): Team | null {
  const record = jsonValue.record(value);
  const name = record && jsonValue.string(record.name);
  const shortName = record && jsonValue.string(record.shortName);

  if (!name || !shortName) {
    return null;
  }

  return { name, shortName };
}

function parseMatchStatus(value: unknown): MatchStatus | undefined | null {
  if (value === undefined) {
    return undefined;
  }

  if (isMatchStatus(value)) {
    return value;
  }

  return null;
}

function isMatchStatus(value: unknown): value is MatchStatus {
  return value === 'not_started' || value === 'running' || value === 'finished';
}
