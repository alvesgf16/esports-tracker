import { asOrNull } from '@/data/mappers/as-or-null';
import { parseAll } from '@/data/mappers/parse-all';
import { parseOptional } from '@/data/mappers/parse-optional';
import type { Match, MatchStatus, Team } from '@/modules/shared/entities';

type MatchCore = {
  id: string;
  game: string;
  name: string;
  tournament: string;
  format: string;
  startsAt: string;
};

type MatchMeta = {
  tournament: string;
  format: string;
  startsAt: string;
};

export function toMatch(value: unknown): Match | null {
  const record = asOrNull.record(value);

  return record && matchFrom(record);
}

function matchFrom(record: Record<string, unknown>): Match | null {
  const core = matchCoreFrom(record);
  const teams = parseAll(record.teams, toTeam);
  const status = parseOptional(record.status, toMatchStatus);

  if (!core || !teams || status === null) {
    return null;
  }

  return status ? { ...core, teams, status } : { ...core, teams };
}

function matchCoreFrom(record: Record<string, unknown>): MatchCore | null {
  const id = asOrNull.string(record.id);
  const game = asOrNull.string(record.game);
  const name = asOrNull.string(record.name);
  const meta = matchMetaFrom(record);

  return id && game && name && meta ? { id, game, name, ...meta } : null;
}

function matchMetaFrom(record: Record<string, unknown>): MatchMeta | null {
  const tournament = asOrNull.string(record.tournament);
  const format = asOrNull.string(record.format);
  const startsAt = asOrNull.string(record.startsAt);

  return tournament && format && startsAt
    ? { tournament, format, startsAt }
    : null;
}

function toTeam(value: unknown): Team | null {
  const record = asOrNull.record(value);
  const name = record && asOrNull.string(record.name);
  const shortName = record && asOrNull.string(record.shortName);

  return name && shortName ? { name, shortName } : null;
}

function toMatchStatus(value: unknown): MatchStatus | null {
  return isMatchStatus(value) ? value : null;
}

function isMatchStatus(value: unknown): value is MatchStatus {
  return value === 'not_started' || value === 'running' || value === 'finished';
}
